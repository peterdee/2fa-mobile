import React, {
  memo,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { Platform, Text, View } from 'react-native';

import { COLORS, SPACER } from '../../../constants';
import Input from '../../../components/Input';
import ModalWrap from '../../../components/ModalWrap';
import { SecretEntry } from '../../../types/models';
import styles from '../styles';
import WideButton from '../../../components/WideButton';

interface EditEntryModalProps {
  handleClose: () => void;
  handleDelete?: null | ((id: string) => void);
  handleSave: (updatedEntry: SecretEntry) => Promise<void>;
  secretEntry: SecretEntry;
  showEditEntryModal: boolean;
}

const INPUT_LENGTH = 32;

function EditEntryModal(props: EditEntryModalProps): React.ReactElement {
  const {
    handleClose,
    handleDelete,
    handleSave,
    secretEntry,
    showEditEntryModal,
  } = props;

  const [accountName, setAccountName] = useState<string>(secretEntry.accountName || '');
  const [issuer, setIssuer] = useState<string>(secretEntry.issuer || '');

  const accountNameLeft = useMemo(
    (): number => INPUT_LENGTH - accountName.length,
    [accountName],
  );

  const issuerLeft = useMemo(
    (): number => INPUT_LENGTH - issuer.length,
    [issuer],
  );

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
      <View style={styles.contentRow}>
        <Text
          style={{
            ...styles.modalText,
            color: issuerLeft === INPUT_LENGTH
              ? COLORS.negative
              : COLORS.textInverted,
          }}
        >
          Service name
        </Text>
        <Text
          style={{
            ...styles.modalText,
            color: issuerLeft < 10
              ? COLORS.negative
              : COLORS.textInverted,
          }}
        >
          { issuerLeft }
        </Text>
      </View>
      <Input
        customStyles={styles.inputStyles}
        handleChange={(value: string): void => handleInput('issuer', value)}
        maxLength={INPUT_LENGTH}
        value={issuer}
      />
      <View style={styles.contentRow}>
        <Text
          style={{
            ...styles.modalText,
            color: accountNameLeft === INPUT_LENGTH
              ? COLORS.negative
              : COLORS.textInverted,
          }}
        >
          Account name
        </Text>
        <Text
          style={{
            ...styles.modalText,
            color: accountNameLeft < 10
              ? COLORS.negative
              : COLORS.textInverted,
          }}
        >
          { accountNameLeft }
        </Text>
      </View>
      <Input
        customStyles={styles.inputStyles}
        handleChange={(value: string): void => handleInput('accountName', value)}
        maxLength={INPUT_LENGTH}
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
      { Platform.OS === 'android' && handleDelete && (
        <WideButton
          buttonStyle={{
            backgroundColor: COLORS.negative,
            marginTop: SPACER * 2,
          }}
          onPress={(): void => handleDelete(secretEntry.id)}
          text="Delete"
        />
      ) }
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

EditEntryModal.defaultProps = {
  handleDelete: null,
};

export default memo(EditEntryModal);
