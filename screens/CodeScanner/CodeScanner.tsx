import React, {
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import * as Crypto from 'expo-crypto';

import CodeScannerLayout from './components/CodeScannerLayout';
import { getValue, KEYS, storeValue } from '../../utilities/storage';
import { RootStackScreenProps } from '../../types/navigation';
import { KeyURIData, SecretEntry } from '../../types/models';
import { parseKeyURI } from '../../utilities/otp';

function CodeScanner({ navigation }: RootStackScreenProps<'Root'>): React.ReactElement {
  const [havePermission, setHavePermission] = useState<boolean>(false);
  const [keyURIData, setKeyURIData] = useState<KeyURIData | null>(null);
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
    return setKeyURIData(null);
  };

  const handleInput = (
    key: keyof KeyURIData,
    value: string,
  ): void => setKeyURIData((state: KeyURIData | null): KeyURIData | null => {
    if (!state) {
      return state;
    }
    return {
      ...state,
      [key]: value,
    };
  });

  const handleSaveSecret = useCallback(
    async (): Promise<void> => {
      const [id, existingSecrets] = await Promise.all([
        Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA256,
          `${keyURIData?.secret}${Date.now()}` as string,
        ),
        getValue<SecretEntry[]>(KEYS.secrets),
      ]);

      const newEntry: SecretEntry = {
        ...keyURIData as KeyURIData,
        id,
      };
      await storeValue<SecretEntry[]>(
        KEYS.secrets,
        existingSecrets ? [...existingSecrets, newEntry] : [newEntry],
      );

      setScanned(false);
      setShowSaveSecretModal(false);
      setKeyURIData(null);
      return navigation.push('Root');
    },
    [keyURIData],
  );

  const handleScanned = async ({ data }: BarCodeScannerResult): Promise<void> => {
    setScanned(true);

    const parsed = parseKeyURI(data);
    setKeyURIData(parsed);
    return setShowSaveSecretModal(true);
  };

  return (
    <CodeScannerLayout
      handleCancel={handleCancel}
      handleInput={handleInput}
      handleSaveSecret={handleSaveSecret}
      handleScanned={handleScanned}
      havePermission={havePermission}
      keyURIData={keyURIData}
      loading={loading}
      scanned={scanned}
      showSaveSecretModal={showSaveSecretModal}
    />
  );
}

export default memo(CodeScanner);
