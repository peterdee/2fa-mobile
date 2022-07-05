import React, { memo } from 'react';

import { COLORS, SPACER } from '../../../constants';
import ModalWrap from '../../../components/ModalWrap';
import WideButton from '../../../components/WideButton';

interface ChangePasswordModalProps {
  handleChangePassword: () => Promise<void>;
  handleClose: () => void;
  showModal: boolean;
}

function ChangePasswordModal(props: ChangePasswordModalProps): React.ReactElement {
  const {
    handleChangePassword,
    handleClose,
    showModal,
  } = props;

  return (
    <ModalWrap isVisible={showModal}>
      <WideButton
        buttonStyle={{
          backgroundColor: COLORS.positive,
          marginTop: SPACER * 2,
        }}
        onPress={handleChangePassword}
        text="Change password"
      />
      <WideButton
        buttonStyle={{
          marginTop: SPACER * 2,
        }}
        onPress={handleClose}
        text="Cancel"
      />
    </ModalWrap>
  );
}

export default memo(ChangePasswordModal);
