import React, { memo } from 'react';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { StyleSheet, Text, View } from 'react-native';

import Loader from '../../../components/Loader';
import SaveTokenModal from './SaveTokenModal';

interface CodeScannerLayoutProps {
  handleScanned: (value: BarCodeScannerResult) => Promise<void>;
  havePermission: boolean;
  loading: boolean;
  scanned: boolean;
  showSaveTokenModal: boolean;
  token: string;
}

function CodeScannerLayout(props: CodeScannerLayoutProps): React.ReactElement {
  const {
    handleScanned,
    havePermission,
    loading,
    scanned,
    showSaveTokenModal,
    token,
  } = props;

  return (
    <View>
      { loading && (
        <Loader />
      ) }
      { !loading && !havePermission && (
        <Text>
          Please provide an access to camera in order for the scanner to work!
        </Text>
      ) }
      { !loading && havePermission && (
        <View>
          { !scanned && (
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleScanned}
              style={StyleSheet.absoluteFillObject}
            />
          ) }
          { scanned && token && (
            <SaveTokenModal
              handleCancel={() => console.log('cancel')}
              handleSaveToken={async () => console.log('save')}
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
