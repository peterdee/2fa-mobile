import React, { memo } from 'react';
import { Text } from 'react-native';

import { COLORS, SPACER } from '../../../constants';
import ModalWrap from '../../../components/ModalWrap';
import styles from '../styles';
import WideButton from '../../../components/WideButton';

interface DeleteProfileModalProps {
  handleClose: () => void;
  handleDeleteProfile: () => Promise<void>;
  showModal: boolean;
}

function DeleteProfileModal(props: DeleteProfileModalProps): React.ReactElement {
  const {
    handleClose,
    handleDeleteProfile,
    showModal,
  } = props;

  return (
    <ModalWrap isVisible={showModal}>
      <Text style={styles.modalText}>
        All of the secret entries stored on the server, as well as all of the
        synchronized secret entries stored on this device are going to be deleted!
      </Text>
      <WideButton
        buttonStyle={{
          backgroundColor: COLORS.negative,
          marginTop: SPACER * 2,
        }}
        onPress={handleDeleteProfile}
        text="I understand, delete my profile"
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

export default memo(DeleteProfileModal);
