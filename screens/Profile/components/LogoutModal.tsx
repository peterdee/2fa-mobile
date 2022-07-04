import React, { memo } from 'react';
import { Text } from 'react-native';

import ModalWrap from '../../../components/ModalWrap';
import WideButton from '../../../components/WideButton';

interface LogoutModalProps {
  handleClose: () => void;
  handleLogout: (full?: boolean) => Promise<void>;
  showModal: boolean;
}

function LogoutModal(props: LogoutModalProps): React.ReactElement {
  const {
    handleClose,
    handleLogout,
    showModal,
  } = props;

  return (
    <ModalWrap isVisible={showModal}>
      <Text>
        Logout
      </Text>
      <WideButton
        onPress={handleLogout}
        text="Logout from this device"
      />
      <WideButton
        onPress={(): Promise<void> => handleLogout(true)}
        text="Logout on all devices"
      />
      <WideButton
        onPress={handleClose}
        text="Cancel"
      />
    </ModalWrap>
  );
}

export default memo(LogoutModal);
