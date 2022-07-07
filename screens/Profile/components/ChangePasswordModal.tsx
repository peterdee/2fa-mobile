import React, {
  memo,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { Text, View } from 'react-native';

import {
  COLORS,
  ERROR_MESSAGES,
  SPACER,
} from '../../../constants';
import Input from '../../../components/Input';
import Loader from '../../../components/Loader';
import ModalWrap from '../../../components/ModalWrap';
import request, { ENDPOINTS } from '../../../utilities/api';
import styles from '../styles';
import WideButton from '../../../components/WideButton';

interface ChangePasswordModalProps {
  handleClose: () => void;
  showModal: boolean;
}

interface ChangePasswordResponse {
  token: string;
}

const PASSWORD_MIN_LENGTH = 8;

function ChangePasswordModal(props: ChangePasswordModalProps): React.ReactElement {
  const {
    handleClose,
    showModal,
  } = props;

  const [formError, setFormError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>('');
  const [oldPassword, setOldPassword] = useState<string>('');

  const closeModal = (): void => {
    setFormError('');
    setNewPassword('');
    setOldPassword('');
    return handleClose();
  };

  const disableForm = useMemo(
    (): boolean => !(
      newPassword && newPassword.trim() && oldPassword && oldPassword.trim()
    ),
    [
      newPassword,
      oldPassword,
    ],
  );

  const handleInput = (name: string, value: string): void => {
    setFormError('');
    if (name === 'new') {
      return setNewPassword(value);
    }
    return setOldPassword(value);
  };

  const handleSubmit = useCallback(
    async (): Promise<void> => {
      const trimmedNewPassword = newPassword.trim();
      const trimmedOldPassword = oldPassword.trim();

      if (!(trimmedNewPassword && trimmedOldPassword)) {
        return setFormError(ERROR_MESSAGES.pleaseProvideTheData);
      }
      if (trimmedNewPassword.includes(' ')) {
        return setFormError(ERROR_MESSAGES.passwordContainsSpaces);
      }
      if (trimmedNewPassword.length < PASSWORD_MIN_LENGTH) {
        return setFormError(ERROR_MESSAGES.passwordIsTooShort);
      }

      setLoading(true);

      try {
        const { data: { data } = {} } = await request<ChangePasswordResponse>({
          ...ENDPOINTS.changePassword,
          data: {
            newPassword: trimmedNewPassword,
            oldPassword: trimmedOldPassword,
          },
          withToken: true,
        });
        if (!(data && data.token)) {
          return setFormError(ERROR_MESSAGES.generic);
        }
        setLoading(false);
        setNewPassword('');
        setOldPassword('');
        return handleClose();
      } catch (error) {
        return console.log(error);
      }
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
              handleChange={(value: string): void => handleInput('old', value)}
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
              handleChange={(value: string): void => handleInput('new', value)}
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
                marginTop: SPACER,
              }}
              disabled={disableForm}
              onPress={handleSubmit}
              text="Change password"
            />
            <WideButton
              buttonStyle={{
                marginTop: SPACER * 2,
              }}
              onPress={closeModal}
              text="Cancel"
            />
          </>
        ) }
      </>
    </ModalWrap>
  );
}

export default memo(ChangePasswordModal);
