import React, { memo } from 'react';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { StyleSheet, Text, View } from 'react-native';

import Loader from '../../../components/Loader';
import SaveTokenModal from './SaveTokenModal';
import styles from '../styles';

interface CodeScannerLayoutProps {
  handleCancel: () => void;
  handleSaveToken: () => Promise<void>;
  handleScanned: (value: BarCodeScannerResult) => void;
  havePermission: boolean;
  loading: boolean;
  scanned: boolean;
  showSaveTokenModal: boolean;
  token: string;
}

function CodeScannerLayout(props: CodeScannerLayoutProps): React.ReactElement {
  const {
    handleCancel,
    handleSaveToken,
    handleScanned,
    havePermission,
    loading,
    scanned,
    showSaveTokenModal,
    token,
  } = props;

  console.log(loading, havePermission, scanned, token);
  return (
    <View style={styles.container}>
      { loading && (
        <Loader />
      ) }
      { !loading && !havePermission && (
        <Text style={{ color: 'black' }}>
          Please provide an access to camera in order for the scanner to work!
        </Text>
      ) }
      { !loading && havePermission && (
        <View style={styles.container}>
          { !scanned && (
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleScanned}
              style={StyleSheet.absoluteFillObject}
            />
          ) }
          { scanned && token && (
            <SaveTokenModal
              handleCancel={handleCancel}
              handleSaveToken={handleSaveToken}
              showSaveTokenModal={showSaveTokenModal}
              token={token}
            />
          ) }
        </View>
      ) }
    </View>
  );
}

export default memo(CodeScannerLayout);
