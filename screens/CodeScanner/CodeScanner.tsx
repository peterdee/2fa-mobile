import React, {
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';

import CodeScannerLayout from './components/CodeScannerLayout';
import { getValue, KEYS, storeValue } from '../../utilities/storage';
import { TokenEntry } from '../../types/models';

function CodeScanner(): React.ReactElement {
  const [havePermission, setHavePermission] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [scanned, setScanned] = useState<boolean>(false);
  const [showSaveTokenModal, setShowSaveTokenModal] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');

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
    setShowSaveTokenModal(false);
    return setToken('');
  };

  const handleSaveToken = useCallback(
    async (): Promise<void> => {
      const existingTokens = await getValue<TokenEntry[]>(KEYS.tokens);
      const newEntry: TokenEntry = {
        name: `${Date.now()}`,
        token,
      };
      await storeValue<TokenEntry[]>(
        KEYS.tokens,
        existingTokens ? [...existingTokens, newEntry] : [newEntry],
      );

      setScanned(false);
      setShowSaveTokenModal(false);
      return setToken('');
    },
    [token],
  );

  const handleScanned = async ({ data }: BarCodeScannerResult): Promise<void> => {
    setScanned(true);
    setToken(data);
    return setShowSaveTokenModal(true);
  };

  return (
    <CodeScannerLayout
      handleCancel={handleCancel}
      handleSaveToken={handleSaveToken}
      handleScanned={handleScanned}
      havePermission={havePermission}
      loading={loading}
      scanned={scanned}
      showSaveTokenModal={showSaveTokenModal}
      token={token}
    />
  );
}

export default memo(CodeScanner);
