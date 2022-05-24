import React, { memo } from 'react';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../../constants';
import { KeyURIData } from '../../../types/models';
import Loader from '../../../components/Loader';
import SaveSecretModal from './SaveSecretModal';
import styles from '../styles';

interface CodeScannerLayoutProps {
  handleCancel: () => void;
  handleInput: (key: keyof KeyURIData, value: string) => void;
  handleSaveSecret: () => Promise<void>;
  handleScanned: (value: BarCodeScannerResult) => void;
  havePermission: boolean;
  keyURIData: KeyURIData | null;
  loading: boolean;
  scanned: boolean;
  showSaveSecretModal: boolean;
}

function CodeScannerLayout(props: CodeScannerLayoutProps): React.ReactElement {
  const {
    handleCancel,
    handleInput,
    handleSaveSecret,
    handleScanned,
    havePermission,
    keyURIData,
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
        <Text style={{ color: COLORS.text }}>
          Please provide an access to camera in order for the scanner to work!
        </Text>
      ) }
      { !loading && havePermission && !scanned && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleScanned}
          style={StyleSheet.absoluteFillObject}
        />
      ) }
      { !loading && scanned && (
        <SaveSecretModal
          handleCancel={handleCancel}
          handleInput={handleInput}
          handleSaveSecret={handleSaveSecret}
          keyURIData={keyURIData}
          showSaveSecretModal={showSaveSecretModal}
        />
      ) }
    </View>
  );
}

export default memo(CodeScannerLayout);
