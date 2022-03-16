import React, { memo } from 'react';
import { Text } from 'react-native';

import ModalWrap from '../../../components/ModalWrap';
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
      <Text>
        { `Your PIN code ${PIN} is saved!` }
      </Text>
      <WideButton
        onPress={handleClose}
        text="OK"
      />
    </ModalWrap>
  );
}

export default memo(PINSetModal);
