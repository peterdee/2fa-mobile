import React, { memo, useEffect, useState } from 'react';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { Text, View } from 'react-native';

import styles from './styles';

function Scanner(): React.ReactElement {
  const [havePermission, setHavePermission] = useState<boolean>(false);
  const [scanned, setScanned] = useState<boolean>(false);

  useEffect(
    () => {
      async function getPermissions() {
        const result = await BarCodeScanner.requestPermissionsAsync();
        // TODO: check permissions
      }

      getPermissions();
    },
    [],
  );

  const handleScanned = () => console.log('scanned');

  return (
    <View style={styles.container}>
      { havePermission && !scanned && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleScanned}
          style={StyleSheet.absoluteFillObject}
        />
      ) }
      { !havePermission && (
        <Text>
          Permission required
        </Text>
      ) }
    </View>
  );
}

export default memo(Scanner);
