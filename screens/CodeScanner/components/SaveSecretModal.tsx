import React, { memo } from 'react';
import { Text } from 'react-native';

import { COLORS, SPACER } from '../../../constants';
import { parseKeyURI } from '../../../utilities/otp';
import ModalWrap from '../../../components/ModalWrap';
import styles from '../styles';
import WideButton from '../../../components/WideButton';

interface SaveSecretModalProps {
  handleCancel: () => void;
  handleSaveSecret: () => Promise<void>;
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

  return (
    <ModalWrap isVisible={showSaveSecretModal}>
      <Text style={styles.modalText}>
        { `Key URI: ${keyURI}` }
      </Text>
      <Text style={styles.modalText}>
        { `Secret: ${parseKeyURI(keyURI)?.secret}` }
      </Text>
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
    </ModalWrap>
  );
}

export default memo(SaveSecretModal);
