import React, { memo, useEffect, useState } from 'react';
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

const DISPLAY_TIME = 30;

function TabOneScreen(): React.ReactElement {
  const [code, setCode] = useState<number>();
  const [displayTime, setDisplayTime] = useState<number>(DISPLAY_TIME);
  const [scanned, setScanned] = useState<boolean>(false);
  const [scanning, setScanning] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');

  const handleScan = async (): Promise<void> => {
    setScanning(true);
    await BarCodeScanner.requestPermissionsAsync();
  };
  const handleScanned = (result: BarCodeScannerResult): void => {
    setCode(totp(result.data));
    setScanned(true);
    setToken(result.data);
  };

  useEffect(
    (): (() => void) => {
      if (displayTime === 0) {
        setCode(totp(token));
        setDisplayTime(DISPLAY_TIME);
      }

      const timer = setTimeout(
        (): void => setDisplayTime((state): number => state - 1),
        1000,
      );

      return (): void => {
        clearTimeout(timer);
      };
    },
    [
      displayTime,
      token,
    ],
  );

  return (
    <View style={styles.container}>
      { !scanning && !scanned && (
        <Pressable onPress={handleScan}>
          <Text style={styles.title}>
            Start scanning
          </Text>
        </Pressable>
      ) }
      { scanning && !scanned && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleScanned}
          style={StyleSheet.absoluteFillObject}
        />
      ) }
      { scanned && (
        <Text style={styles.title}>
          { `Code: ${code}, time: ${displayTime}` }
        </Text>
      ) }
    </View>
  );
}

export default memo(TabOneScreen);
