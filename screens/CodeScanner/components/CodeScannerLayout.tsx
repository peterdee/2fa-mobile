import React, { memo } from 'react';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { StyleSheet, Text, View } from 'react-native';

import Loader from '../../../components/Loader';
import SaveSecretModal from './SaveSecretModal';
import styles from '../styles';

interface CodeScannerLayoutProps {
  handleCancel: () => void;
  handleSaveSecret: () => Promise<void>;
  handleScanned: (value: BarCodeScannerResult) => void;
  havePermission: boolean;
  keyURI: string;
  loading: boolean;
  scanned: boolean;
  showSaveSecretModal: boolean;
}

function CodeScannerLayout(props: CodeScannerLayoutProps): React.ReactElement {
  const {
    handleCancel,
    handleSaveSecret,
    handleScanned,
    havePermission,
    keyURI,
    loading,
    scanned,
    showSaveSecretModal,
  } = props;

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
      { !loading && havePermission && !scanned && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleScanned}
          style={StyleSheet.absoluteFillObject}
        />
      ) }
      { !loading && scanned && keyURI && (
        <SaveSecretModal
          handleCancel={handleCancel}
          handleSaveSecret={handleSaveSecret}
          keyURI={keyURI}
          showSaveSecretModal={showSaveSecretModal}
        />
      ) }
    </View>
  );
}

export default memo(CodeScannerLayout);
