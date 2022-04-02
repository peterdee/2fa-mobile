import React, { memo, useEffect, useState } from 'react';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { StyleSheet, Text, View } from 'react-native';

import Loader from '../../components/Loader';
import styles from './styles';

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

  const handleScanned = ({ data }: BarCodeScannerResult): void => {
    console.log('scanned', data);
    setScanned(true);
    setToken(data);
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
