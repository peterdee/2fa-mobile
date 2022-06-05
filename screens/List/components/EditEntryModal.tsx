import React, { memo } from 'react';
import { Text } from 'react-native';

import { COLORS, SPACER } from '../../../constants';
import Input from '../../../components/Input';
import ModalWrap from '../../../components/ModalWrap';
import { SecretEntry } from '../../../types/models';
import styles from '../styles';
import WideButton from '../../../components/WideButton';

interface EditEntryModalProps {
  accountName: string;
  handleClose: () => void;
  handleEdit: (id: string) => Promise<void>;
  handleInput: (name: string, value: string) => void;
  issuer: string;
  secretEntry: SecretEntry;
  showEditEntryModal: boolean;
}

function EditEntryModal(props: EditEntryModalProps): React.ReactElement {
  const {
    accountName,
    handleClose,
    handleEdit,
    handleInput,
    issuer,
    secretEntry,
    showEditEntryModal,
  } = props;

  return (
    <ModalWrap isVisible={showEditEntryModal}>
      <Text style={styles.modalText}>
        Service name
      </Text>
      <Input
        customStyles={styles.inputStyles}
        handleChange={(value: string) => handleInput('issuer', value)}
        value={issuer}
      />
      <Text style={styles.modalText}>
        Account name
      </Text>
      <Input
        customStyles={styles.inputStyles}
        handleChange={(value: string) => handleInput('accountName', value)}
        value={accountName}
      />
      <WideButton
        buttonStyle={{
          backgroundColor: COLORS.positive,
          marginTop: SPACER,
        }}
        onPress={() => handleEdit(secretEntry.id)}
        text="Save"
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

export default memo(EditEntryModal);
