import React, { memo } from 'react';
import { Text } from 'react-native';

import { COLORS, SPACER } from '../../../constants';
import ModalWrap from '../../../components/ModalWrap';
import { SecretEntry } from '../../../types/models';
import styles from '../styles';
import WideButton from '../../../components/WideButton';

interface DeleteEntryModalProps {
  handleClose: () => void;
  handleDelete: (id: string) => Promise<void>;
  secretEntry: SecretEntry;
  showDeleteEntryModal: boolean;
}

function DeleteEntryModal(props: DeleteEntryModalProps): React.ReactElement {
  const {
    handleClose,
    handleDelete,
    secretEntry,
    showDeleteEntryModal,
  } = props;

  return (
    <ModalWrap isVisible={showDeleteEntryModal}>
      <Text style={styles.deleteEntryModalIssuer}>
        { secretEntry.issuer }
      </Text>
      <Text style={styles.deleteEntryModalAccountName}>
        { secretEntry.accountName }
      </Text>
      <Text style={styles.deleteEntryModalText}>
        Are you sure you want to delete this entry?
      </Text>
      <Text style={styles.deleteEntryModalText}>
        You will not be able to restore the data once it is deleted!
      </Text>
      <WideButton
        buttonStyle={{
          backgroundColor: COLORS.negative,
          marginTop: SPACER,
        }}
        onPress={() => handleDelete(secretEntry.id)}
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

export default memo(DeleteEntryModal);
