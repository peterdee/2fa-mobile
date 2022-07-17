import React, { memo } from 'react';
import { Text } from 'react-native';

import { COLORS, SPACER } from '../../../constants';
import ModalWrap from '../../../components/ModalWrap';
import styles from '../styles';
import WideButton from '../../../components/WideButton';

interface SuccessModalProps {
  handleClose: () => void;
  login: string;
  showModal: boolean;
}

function SuccessModal(props: SuccessModalProps): React.ReactElement {
  const {
    handleClose,
    login,
    showModal,
  } = props;

  return (
    <ModalWrap isVisible={showModal}>
      <Text
        style={{
          ...styles.title,
          color: COLORS.positive,
        }}
      >
        SUCCESS
      </Text>
      <Text style={styles.modalText}>
        Account recovery is completed, new password is saved
      </Text>
      <Text style={styles.modalText}>
        { `You have been signed in as ${login}` }
      </Text>
      <WideButton
        buttonStyle={{
          backgroundColor: COLORS.positive,
          marginTop: SPACER * 2,
        }}
        onPress={handleClose}
        text="Ok"
      />
    </ModalWrap>
  );
}

export default memo(SuccessModal);
