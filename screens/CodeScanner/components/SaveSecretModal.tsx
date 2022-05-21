import React, {
  memo,
  useEffect,
  useState,
} from 'react';
import { CryptoDigestAlgorithm, digestStringAsync } from 'expo-crypto';
import { Text } from 'react-native';

import { COLORS, SPACER } from '../../../constants';
import { generateToken, parseKeyURI } from '../../../utilities/otp';
import ModalWrap from '../../../components/ModalWrap';
import styles from '../styles';
import { KeyURIData, SecretEntry } from '../../../types/models';
import WideButton from '../../../components/WideButton';

interface SaveSecretModalProps {
  handleCancel: () => void;
  handleSaveSecret: (entry: SecretEntry) => Promise<void>;
  keyURI: string;
  showSaveSecretModal: boolean;
}

function SaveSecretModal(props: SaveSecretModalProps): React.ReactElement {
  const {
    handleCancel,
    handleSaveSecret,
    keyURI,
    showSaveSecretModal,
  } = props;

  const [parsed, setParsed] = useState<KeyURIData>();

  // TODO: move parsing logic to the parent component
  useEffect(
    (): void => {
      const values = parseKeyURI(keyURI);
      if (values) {
        setParsed(values);
      }
    },
    [keyURI],
  );

  const handleSave = async (): Promise<null | void> => {
    if (!parsed) {
      return null;
    }

    console.log('@@@@@@@@@@@@@@@@@@@@@@', parsed.secret);
    const id = await digestStringAsync(
      CryptoDigestAlgorithm.SHA512,
      'test asd',
    );
    const entry: SecretEntry = {
      id,
      ...parsed,
    };
    return handleSaveSecret(entry);
  };

  return (
    <ModalWrap isVisible={showSaveSecretModal}>
      <>
        { !parsed && (
          <>
            <Text style={styles.modalText}>
              Scanned QR is invalid!
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
        { parsed && (
          <>
            <Text style={styles.modalText}>
              { `Service: ${parsed.issuer}` }
            </Text>
            <Text style={styles.modalText}>
              { `Account: ${parsed.accountName}` }
            </Text>
            <Text style={styles.modalText}>
              { `Token: ${generateToken(parsed)}` }
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
