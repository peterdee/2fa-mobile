import React, { memo } from 'react';
import { Text } from 'react-native';

import { COLORS, SPACER } from '../../../constants';
import { generateToken } from '../../../utilities/otp';
import { KeyURIData } from '../../../types/models';
import ModalWrap from '../../../components/ModalWrap';
import styles from '../styles';
import WideButton from '../../../components/WideButton';

interface SaveSecretModalProps {
  handleCancel: () => void;
  handleSaveSecret: (entry: KeyURIData) => Promise<void>;
  keyURIData: KeyURIData | null;
  scanError: boolean;
  showSaveSecretModal: boolean;
}

function SaveSecretModal(props: SaveSecretModalProps): React.ReactElement {
  const {
    handleCancel,
    handleSaveSecret,
    keyURIData,
    scanError,
    showSaveSecretModal,
  } = props;

  const handleSave = () => handleSaveSecret(keyURIData as KeyURIData);

  return (
    <ModalWrap isVisible={showSaveSecretModal}>
      <>
        { scanError && (
          <>
            <Text style={styles.modalText}>
              Scanned QR is invalid!
            </Text>
            <Text
              style={{
                ...styles.modalText,
                marginTop: SPACER,
              }}
            >
              Please scan a valid QR!
            </Text>
            <WideButton
              buttonStyle={{
                marginTop: SPACER * 2,
              }}
              onPress={handleCancel}
              text="OK"
            />
          </>
        ) }
        { !scanError && keyURIData && (
          <>
            <Text style={styles.modalText}>
              { `Service: ${keyURIData.issuer}` }
            </Text>
            <Text style={styles.modalText}>
              { `Account: ${keyURIData.accountName}` }
            </Text>
            <Text style={styles.modalText}>
              { `Token: ${generateToken(keyURIData)}` }
            </Text>
            <WideButton
              buttonStyle={{
                backgroundColor: COLORS.negative,
                marginTop: SPACER,
              }}
              onPress={handleSave}
              text="Save"
            />
            <WideButton
              buttonStyle={{
                marginTop: SPACER * 2,
              }}
              onPress={handleCancel}
              text="Cancel"
            />
          </>
        ) }
      </>
    </ModalWrap>
  );
}

export default memo(SaveSecretModal);
