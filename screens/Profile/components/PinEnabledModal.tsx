import React, { memo } from 'react';
import { Text } from 'react-native';

import ModalWrap from '../../../components/ModalWrap';
import { SPACER } from '../../../constants';
import styles from '../styles';
import WideButton from '../../../components/WideButton';

interface PINEnabledModalProps {
  handleClose: () => void;
  showModal: boolean;
}

function PINEnabledModal(props: PINEnabledModalProps): React.ReactElement {
  const {
    handleClose,
    showModal,
  } = props;

  return (
    <ModalWrap isVisible={showModal}>
      <Text style={styles.modalText}>
        PIN code is now enabled!
      </Text>
      <Text style={styles.modalText}>
        You need to restart the application to set up a new PIN code!
      </Text>
      <WideButton
        buttonStyle={{
          marginTop: SPACER * 2,
        }}
        onPress={handleClose}
        text="OK"
      />
    </ModalWrap>
  );
}

export default memo(PINEnabledModal);
