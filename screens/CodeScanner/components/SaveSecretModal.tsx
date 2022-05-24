import React, { memo } from 'react';
import { Text } from 'react-native';

import { COLORS, SPACER } from '../../../constants';
import Input from '../../../components/Input';
import { KeyURIData } from '../../../types/models';
import ModalWrap from '../../../components/ModalWrap';
import styles from '../styles';
import Token from '../../../components/Token';
import WideButton from '../../../components/WideButton';

interface SaveSecretModalProps {
  handleCancel: () => void;
  handleInput: (key: keyof KeyURIData, value: string) => void;
  handleSaveSecret: () => Promise<void>;
  keyURIData: KeyURIData | null;
  showSaveSecretModal: boolean;
}

function SaveSecretModal(props: SaveSecretModalProps): React.ReactElement {
  const {
    handleCancel,
    handleInput,
    handleSaveSecret,
    keyURIData,
    showSaveSecretModal,
  } = props;

  return (
    <ModalWrap isVisible={showSaveSecretModal}>
      <>
        { !keyURIData && (
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
        { keyURIData && (
          <>
            <Text style={styles.modalText}>
              Service
            </Text>
            <Input
              customStyles={{
                color: COLORS.textInverted,
              }}
              handleChange={(value: string) => handleInput('issuer', value)}
              value={keyURIData.issuer as string}
            />
            <Text style={styles.modalText}>
              Account
            </Text>
            <Input
              customStyles={{
                color: COLORS.textInverted,
              }}
              handleChange={(value: string) => handleInput('accountName', value)}
              value={keyURIData.accountName as string}
            />
            <Token
              secretEntry={keyURIData}
              showDetails={false}
              timeStyles={styles.timeText}
              tokenStyles={styles.tokenText}
              wrapStyles={styles.tokenWrap}
            />
            <WideButton
              buttonStyle={{
                backgroundColor: COLORS.negative,
                marginTop: SPACER,
              }}
              onPress={handleSaveSecret}
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
