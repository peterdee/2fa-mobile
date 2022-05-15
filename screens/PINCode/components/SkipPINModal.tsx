import React, { memo } from 'react';
import { Text } from 'react-native';

import ModalWrap from '../../../components/ModalWrap';
import styles from '../styles';
import WideButton from '../../../components/WideButton';

interface SkipPINModalProps {
  handleClose: () => void;
  showSkipPINModal: boolean;
}

function SkipPINModal(props: SkipPINModalProps): React.ReactElement {
  const {
    handleClose,
    showSkipPINModal,
  } = props;

  return (
    <ModalWrap isVisible={showSkipPINModal}>
      <Text style={styles.PINModalText}>
        You can enable PIN code later
      </Text>
      <WideButton
        onPress={handleClose}
        text="OK"
      />
    </ModalWrap>
  );
}

export default memo(SkipPINModal);
