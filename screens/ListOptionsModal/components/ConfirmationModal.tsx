import React, { memo } from 'react';
import { Text } from 'react-native';

import { COLORS, SPACER } from '../../../constants';
import ModalWrap from '../../../components/ModalWrap';
import styles from '../styles';
import WideButton from '../../../components/WideButton';

interface ConfirmationModalProps {
  handleClose: () => void;
  handleDelete: () => Promise<void>;
  showModal: boolean;
}

function ConfirmationModal(props: ConfirmationModalProps): React.ReactElement {
  const {
    handleClose,
    handleDelete,
    showModal,
  } = props;

  return (
    <ModalWrap isVisible={showModal}>
      <Text style={styles.confirmationModalText}>
        Are you sure you want to delete all of the entries?
      </Text>
      <Text style={styles.confirmationModalText}>
        You will not be able to restore the data once it is deleted!
      </Text>
      <WideButton
        buttonStyle={{
          backgroundColor: COLORS.negative,
          marginTop: SPACER,
        }}
        onPress={handleDelete}
        text="Delete"
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

export default memo(ConfirmationModal);
