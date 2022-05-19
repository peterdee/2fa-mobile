import React, {
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';

import CodeScannerLayout from './components/CodeScannerLayout';
import { getValue, KEYS, storeValue } from '../../utilities/storage';
import { RootStackScreenProps } from '../../types/navigation';
import { SecretEntry } from '../../types/models';

function CodeScanner({ navigation }: RootStackScreenProps<'Root'>): React.ReactElement {
  const [havePermission, setHavePermission] = useState<boolean>(false);
  const [keyURI, setKeyURI] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [scanned, setScanned] = useState<boolean>(false);
  const [showSaveSecretModal, setShowSaveSecretModal] = useState<boolean>(false);

  useEffect(
    (): void => {
      async function getPermissions() {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        if (status === 'granted') {
          setHavePermission(true);
        }

        setLoading(false);
      }

      getPermissions();
    },
    [],
  );

  const handleCancel = (): void => {
    setScanned(false);
    setShowSaveSecretModal(false);
    return setKeyURI('');
  };

  const handleSaveSecret = useCallback(
    async (entry: SecretEntry): Promise<void> => {
      const existingSecrets = await getValue<SecretEntry[]>(KEYS.secrets);
      await storeValue<SecretEntry[]>(
        KEYS.secrets,
        existingSecrets ? [...existingSecrets, entry] : [entry],
      );

      setScanned(false);
      setShowSaveSecretModal(false);
      setKeyURI('');
      return navigation.push('Root');
    },
    [keyURI],
  );

  const handleScanned = async ({ data }: BarCodeScannerResult): Promise<void> => {
    setScanned(true);
    setKeyURI(data);
    return setShowSaveSecretModal(true);
  };

  return (
    <CodeScannerLayout
      handleCancel={handleCancel}
      handleSaveSecret={handleSaveSecret}
      handleScanned={handleScanned}
      havePermission={havePermission}
      keyURI={keyURI}
      loading={loading}
      scanned={scanned}
      showSaveSecretModal={showSaveSecretModal}
    />
  );
}

export default memo(CodeScanner);
