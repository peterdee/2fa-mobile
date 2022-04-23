import React, { memo, useEffect, useState } from 'react';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { StyleSheet, Text, View } from 'react-native';

import Loader from '../../components/Loader';
import styles from './styles';

function CodeScanner(): React.ReactElement {
  const [havePermission, setHavePermission] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [scanned, setScanned] = useState<boolean>(false);

  useEffect(
    (): void => {
      async function getPermissions() {
        const result = await BarCodeScanner.requestPermissionsAsync();
        // TODO: check permissions

        setLoading(false);
      }

      getPermissions();
    },
    [],
  );

  const handleScanned = () => console.log('scanned');

  return (
    <View style={styles.container}>
      { loading && (
        <Loader />
      ) }
      { !loading && havePermission && !scanned && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleScanned}
          style={StyleSheet.absoluteFillObject}
        />
      ) }
      { !loading && !havePermission && (
        <Text>
          Permission required
        </Text>
      ) }
    </View>
  );
}

export default memo(CodeScanner);
