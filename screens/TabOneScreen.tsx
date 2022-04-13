import React, { memo, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import totp from 'totp-generator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

function TabOneScreen(): React.ReactElement {
  const [code, setCode] = useState<string>('');
  const [scanned, setScanned] = useState<boolean>(false);
  const [scanning, setScanning] = useState<boolean>(false);

  const handleScan = async (): Promise<void> => {
    setScanning(true);
    await BarCodeScanner.requestPermissionsAsync();
  };
  const handleScanned = (result: BarCodeScannerResult): void => {
    console.log('scanned', JSON.stringify(result));
    setCode(result.data);
    setScanned(true);
  };

  return (
    <View style={styles.container}>
      { !scanning && !scanned && (
        <>
          <Text style={styles.title}>Tab One</Text>
          <View style={styles.separator} />
          <Pressable onPress={handleScan}>
            <Text style={styles.title}>
              Start scanning
            </Text>
          </Pressable>
        </>
      ) }
      { scanning && !scanned && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleScanned}
          style={StyleSheet.absoluteFillObject}
        />
      ) }
      { scanned && (
        <Text style={styles.title}>
          { `Code: ${totp(code)}` }
        </Text>
      ) }
    </View>
  );
}

export default memo(TabOneScreen);
