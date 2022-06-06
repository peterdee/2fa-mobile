import React, {
  memo,
  useCallback,
  useState,
} from 'react';
import { Text } from 'react-native';

import { COLORS, SPACER } from '../../../constants';
import Input from '../../../components/Input';
import ModalWrap from '../../../components/ModalWrap';
import { SecretEntry } from '../../../types/models';
import styles from '../styles';
import WideButton from '../../../components/WideButton';

interface EditEntryModalProps {
  handleClose: () => void;
  handleSave: (updatedEntry: SecretEntry) => Promise<void>;
  secretEntry: SecretEntry;
  showEditEntryModal: boolean;
}

function EditEntryModal(props: EditEntryModalProps): React.ReactElement {
  const {
    handleClose,
    handleSave,
    secretEntry,
    showEditEntryModal,
  } = props;

  const [accountName, setAccountName] = useState<string>(secretEntry.accountName || '');
  const [issuer, setIssuer] = useState<string>(secretEntry.issuer || '');

  const handleInput = (name: string, value: string): void => {
    if (name === 'accountName') {
      return setAccountName(value);
    }
    return setIssuer(value);
  };

  const saveForm = useCallback(
    (): null | Promise<void> => {
      if (!(accountName && issuer)) {
        return null;
      }

      return handleSave({
        ...secretEntry,
        accountName,
        issuer,
      });
    },
    [
      accountName,
      issuer,
    ],
  );

  return (
    <ModalWrap isVisible={showEditEntryModal}>
      <Text style={styles.modalText}>
        Service name
      </Text>
      <Input
        customStyles={styles.inputStyles}
        handleChange={(value: string): void => handleInput('issuer', value)}
        value={issuer}
      />
      <Text style={styles.modalText}>
        Account name
      </Text>
      <Input
        customStyles={styles.inputStyles}
        handleChange={(value: string): void => handleInput('accountName', value)}
        value={accountName}
      />
      <WideButton
        buttonStyle={{
          backgroundColor: COLORS.positive,
          marginTop: SPACER * 2,
        }}
        disabled={!accountName || !issuer}
        disabledButtonStyle={{
          backgroundColor: COLORS.muted,
          marginTop: SPACER * 2,
        }}
        onPress={saveForm}
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
