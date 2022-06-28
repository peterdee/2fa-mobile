import React, { memo } from 'react';
import { Text } from 'react-native';

import ModalWrap from '../../../components/ModalWrap';
import styles from '../styles';
import WideButton from '../../../components/WideButton';

interface ProfileModalProps {
  handleClose: (action: string) => void;
  showProfileModal: boolean;
}

function ProfileModal(props: ProfileModalProps): React.ReactElement {
  const {
    handleClose,
    showProfileModal,
  } = props;

  return (
    <ModalWrap isVisible={showProfileModal}>
      <Text style={styles.PINModalText}>
        Profile modal
      </Text>
      <WideButton
        onPress={(): void => handleClose('skip')}
        text="Skip"
      />
    </ModalWrap>
  );
}

export default memo(ProfileModal);
