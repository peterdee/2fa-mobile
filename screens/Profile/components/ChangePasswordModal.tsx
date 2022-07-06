import React, {
  memo,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { Text, View } from 'react-native';

import { COLORS, SPACER } from '../../../constants';
import Input from '../../../components/Input';
import Loader from '../../../components/Loader';
import ModalWrap from '../../../components/ModalWrap';
import styles from '../styles';
import WideButton from '../../../components/WideButton';

interface ChangePasswordModalProps {
  handleClose: () => void;
  showModal: boolean;
}

function ChangePasswordModal(props: ChangePasswordModalProps): React.ReactElement {
  const {
    handleClose,
    showModal,
  } = props;

  const [formError, setFormError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>('');
  const [oldPassword, setOldPassword] = useState<string>('');

  const disableForm = useMemo(
    (): boolean => !(newPassword && oldPassword),
    [
      newPassword,
      oldPassword,
    ],
  );

  const handleSubmit = useCallback(
    async (): Promise<void> => {
      // TODO: send request from the modal
      console.log('handle password change', oldPassword, newPassword);

      return handleClose();
    },
    [
      newPassword,
      oldPassword,
    ],
  );

  return (
    <ModalWrap isVisible={showModal}>
      <>
        { loading && (
          <Loader />
        ) }
        { !loading && (
          <>
            <Text
              style={{
                ...styles.modalText,
                marginTop: SPACER,
                textAlign: 'left',
              }}
            >
              Current password
            </Text>
            <Input
              customStyles={styles.modalInput}
              handleChange={setOldPassword}
              isPassword
              value={oldPassword}
            />
            <Text
              style={{
                ...styles.modalText,
                marginTop: SPACER,
                textAlign: 'left',
              }}
            >
              New password
            </Text>
            <Input
              customStyles={styles.modalInput}
              handleChange={setNewPassword}
              isPassword
              value={newPassword}
            />
            <View style={styles.formErrorContainer}>
              <Text style={styles.formErrorText}>
                { formError }
              </Text>
            </View>
            <WideButton
              buttonStyle={{
                backgroundColor: disableForm
                  ? COLORS.muted
                  : COLORS.positive,
                marginTop: SPACER * 2,
              }}
              disabled={disableForm}
              onPress={handleSubmit}
              text="Change password"
            />
            <WideButton
              buttonStyle={{
                marginTop: SPACER * 2,
              }}
              onPress={handleClose}
              text="Cancel"
            />
          </>
        ) }
      </>
    </ModalWrap>
  );
}

export default memo(ChangePasswordModal);
