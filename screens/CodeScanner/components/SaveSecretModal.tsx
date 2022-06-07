import React, { memo } from 'react';
import { Text, View } from 'react-native';

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

const INPUT_LENGTH = 32;

function SaveSecretModal(props: SaveSecretModalProps): React.ReactElement {
  const {
    handleCancel,
    handleInput,
    handleSaveSecret,
    keyURIData,
    showSaveSecretModal,
  } = props;

  const accountNameLeft = INPUT_LENGTH - (keyURIData?.accountName as string).length;
  const issuerLeft = INPUT_LENGTH - (keyURIData?.issuer as string).length;

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
            <View style={styles.contentRow}>
              <Text
                style={{
                  ...styles.modalText,
                  color: issuerLeft === INPUT_LENGTH
                    ? COLORS.negative
                    : COLORS.textInverted,
                }}
              >
                Service name
              </Text>
              <Text
                style={{
                  ...styles.modalText,
                  color: issuerLeft < 10
                    ? COLORS.negative
                    : COLORS.textInverted,
                }}
              >
                { issuerLeft }
              </Text>
            </View>
            <Input
              customStyles={styles.inputStyles}
              handleChange={(value: string) => handleInput('issuer', value)}
              maxLength={INPUT_LENGTH}
              value={keyURIData.issuer as string}
            />
            <View style={styles.contentRow}>
              <Text
                style={{
                  ...styles.modalText,
                  color: accountNameLeft === INPUT_LENGTH
                    ? COLORS.negative
                    : COLORS.textInverted,
                }}
              >
                Account name
              </Text>
              <Text
                style={{
                  ...styles.modalText,
                  color: accountNameLeft < 10
                    ? COLORS.negative
                    : COLORS.textInverted,
                }}
              >
                { accountNameLeft }
              </Text>
            </View>
            <Input
              customStyles={styles.inputStyles}
              handleChange={(value: string) => handleInput('accountName', value)}
              maxLength={INPUT_LENGTH}
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
                backgroundColor: COLORS.positive,
                marginTop: SPACER,
              }}
              disabled={!keyURIData.accountName || !keyURIData.issuer}
              disabledButtonStyle={styles.disabledButtonStyle}
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
