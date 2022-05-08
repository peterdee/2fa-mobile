import React, { memo } from 'react';
import { Text } from 'react-native';

import { COLORS, SPACER } from '../../../constants';
import ModalWrap from '../../../components/ModalWrap';
import styles from '../styles';
import WideButton from '../../../components/WideButton';

interface ResetPINModalProps {
  handleCancel: () => void;
  handleReset: () => Promise<void>;
  showResetPINModal: boolean;
}

function ResetPINModal(props: ResetPINModalProps): React.ReactElement {
  const {
    handleCancel,
    handleReset,
    showResetPINModal,
  } = props;

  return (
    <ModalWrap isVisible={showResetPINModal}>
      <Text style={styles.PINModalText}>
        All of the data is going to be deleted!
      </Text>
      <WideButton
        buttonStyle={{
          backgroundColor: COLORS.negative,
          marginTop: SPACER,
        }}
        onPress={handleReset}
        text="Reset PIN"
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

export default memo(ResetPINModal);
