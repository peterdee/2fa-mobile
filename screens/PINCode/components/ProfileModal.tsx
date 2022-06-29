import React, { memo } from 'react';
import { Text } from 'react-native';

import {
  COLORS,
  PROFILE_MODAL_ACTIONS,
  SPACER,
} from '../../../constants';
import ModalWrap from '../../../components/ModalWrap';
import styles from '../styles';
import WideButton from '../../../components/WideButton';

interface ProfileModalProps {
  handleClose: (action: keyof typeof PROFILE_MODAL_ACTIONS) => void;
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
        2FA Mobile allows you to store secret entries in the cloud and
        access them on multiple devices using a single account
      </Text>
      <WideButton
        buttonStyle={{
          marginTop: SPACER,
        }}
        onPress={(): void => handleClose(
          PROFILE_MODAL_ACTIONS.signIn as keyof typeof PROFILE_MODAL_ACTIONS,
        )}
        text="I have an account"
      />
      <WideButton
        buttonStyle={{
          marginTop: SPACER * 2,
        }}
        onPress={(): void => handleClose(
          PROFILE_MODAL_ACTIONS.signUp as keyof typeof PROFILE_MODAL_ACTIONS,
        )}
        text="Create account"
      />
      <WideButton
        buttonStyle={{
          backgroundColor: COLORS.negative,
          marginTop: SPACER * 2,
        }}
        onPress={(): void => handleClose(
          PROFILE_MODAL_ACTIONS.skip as keyof typeof PROFILE_MODAL_ACTIONS,
        )}
        text="Skip"
      />
    </ModalWrap>
  );
}

export default memo(ProfileModal);
