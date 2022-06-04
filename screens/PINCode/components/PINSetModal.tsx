import React, { memo } from 'react';
import { Text } from 'react-native';

import ModalWrap from '../../../components/ModalWrap';
import styles from '../styles';
import WideButton from '../../../components/WideButton';

interface PINSetModalProps {
  handleClose: () => void;
  PIN: string;
  showPINSetModal: boolean;
}

function PINSetModal(props: PINSetModalProps): React.ReactElement {
  const {
    handleClose,
    PIN,
    showPINSetModal,
  } = props;

  return (
    <ModalWrap isVisible={showPINSetModal}>
      <Text style={styles.PINModalPINText}>
        { PIN }
      </Text>
      <Text style={styles.PINModalText}>
        Your PIN code has been saved!
      </Text>
      <WideButton
        onPress={handleClose}
        text="OK"
      />
    </ModalWrap>
  );
}

export default memo(PINSetModal);
