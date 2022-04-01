import React, { memo, useEffect, useState } from 'react';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { StyleSheet, Text, View } from 'react-native';

import { getValue, KEYS, storeValue } from '../../utilities/storage';
import Loader from '../../components/Loader';
import styles from './styles';
import { TokenEntry } from '../../types/models';

function CodeScanner(): React.ReactElement {
  const [havePermission, setHavePermission] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [scanned, setScanned] = useState<boolean>(false);
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

  const handleScanned = async ({ data }: BarCodeScannerResult): Promise<void> => {
    console.log('scanned', data);
    setScanned(true);
    setToken(data);
    const existingTokens = await getValue<TokenEntry[]>(KEYS.tokens);
    const newEntry: TokenEntry = {
      name: `${Date.now()}`,
      token: data,
    };
    return storeValue<TokenEntry[]>(
      KEYS.tokens,
      existingTokens ? [...existingTokens, newEntry] : [newEntry],
    );
  };

  return (
    <View style={styles.container}>
      { loading && (
        <Loader />
      ) }
      { !loading && !havePermission && (
        <Text>
          Permission required
        </Text>
      ) }
      { !loading && havePermission && !scanned && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleScanned}
          style={StyleSheet.absoluteFillObject}
        />
      ) }
      { !loading && havePermission && scanned && (
        <Text>
          { `Token value is ${token}` }
        </Text>
      ) }
    </View>
  );
}

export default memo(CodeScanner);
