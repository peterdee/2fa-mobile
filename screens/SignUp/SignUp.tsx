import React, {
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { AxiosError } from 'axios';

import {
  CLIENT_TYPE,
  ERROR_MESSAGES,
  LOGIN_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  RESPONSE_MESSAGES,
} from '../../constants';
import isAlphanumeric from '../../utilities/alphanumeric';
import request, {
  ENDPOINTS,
  ResponsePayload,
} from '../../utilities/api';
import { RootStackScreenProps } from '../../types/navigation';
import { setUserData } from '../../features/user/user.slice';
import SignUpLayout from './components/SignUpLayout';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

interface SignUpResponseData {
  token: string;
  user: {
    id: number;
    login: string;
  };
}

function SignUp(
  { navigation }: RootStackScreenProps<'SignUp'>,
): React.ReactElement {
  const dispatch = useAppDispatch();

  const [formError, setFormError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [loginInput, setLoginInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [recoveryAnswerInput, setRecoveryAnswerInput] = useState<string>('');
  const [recoveryQuestionInput, setRecoveryQuestionInput] = useState<string>('');

  const {
    login,
    token,
    userId,
  } = useAppSelector((state) => state.user);

  useEffect(
    (): void => {
      if (login && token && userId) {
        navigation.replace('Root');
      }
    },
    [
      login,
      token,
      userId,
    ],
  );

  const handleAction = (action: string): void => {
    if (action === 'cancel') {
      return navigation.replace('Root');
    }
    return navigation.replace('SignIn');
  };

  const handleInput = (name: string, value: string): void => {
    if (name === 'login') {
      setLoginInput(value);
    }
    if (name === 'password') {
      setPasswordInput(value);
    }
    if (name === 'recoveryAnswer') {
      setRecoveryAnswerInput(value);
    }
    if (name === 'recoveryQuestion') {
      setRecoveryQuestionInput(value);
    }
    return setFormError('');
  };

  const handleSubmit = useCallback(
    async (): Promise<void> => {
      if (!(loginInput && passwordInput
        && recoveryAnswerInput && recoveryQuestionInput)) {
        return setFormError(ERROR_MESSAGES.pleaseProvideTheData);
      }

      if (passwordInput.includes(' ')) {
        return setFormError(ERROR_MESSAGES.passwordContainsSpaces);
      }

      const trimmedLogin = loginInput.trim();
      const trimmedPassword = passwordInput.trim();
      const trimmedRecoveryAnswer = recoveryAnswerInput.trim();
      const trimmedRecoveryQuestion = recoveryQuestionInput.trim();
      if (!(trimmedLogin && trimmedPassword
        && trimmedRecoveryAnswer && trimmedRecoveryQuestion)) {
        return setFormError(ERROR_MESSAGES.pleaseProvideTheData);
      }

      if (trimmedLogin.length > LOGIN_MAX_LENGTH) {
        return setFormError(ERROR_MESSAGES.loginIsTooLong);
      }
      if (!isAlphanumeric(trimmedLogin)) {
        return setFormError(ERROR_MESSAGES.loginShouldBeAlphanumeric);
      }
      if (trimmedPassword.length < PASSWORD_MIN_LENGTH) {
        return setFormError(ERROR_MESSAGES.passwordIsTooShort);
      }

      setLoading(true);

      try {
        // artificial delay to show the loader
        await new Promise((resolve): void => {
          setTimeout(resolve, 500);
        });

        const { data } = await request<SignUpResponseData>({
          ...ENDPOINTS.signUp,
          data: {
            clientType: CLIENT_TYPE,
            login: trimmedLogin,
            password: trimmedPassword,
            recoveryAnswer: trimmedRecoveryAnswer,
            recoveryQuestion: trimmedRecoveryQuestion,
          },
        });

        const { data: { token: tokenString, user } = {} } = data;
        if (!(tokenString && user)) {
          return setFormError(ERROR_MESSAGES.generic);
        }

        dispatch(setUserData({
          login: user.login,
          token: tokenString,
          userId: user.id,
        }));

        setLoading(false);
        return navigation.replace('Root');
      } catch (error) {
        setLoading(false);
        const typedError = error as AxiosError<ResponsePayload>;
        if (typedError.response && typedError.response.data) {
          const response = typedError.response.data;
          if (response.status === 400) {
            if (response.info === RESPONSE_MESSAGES.invalidData) {
              return setFormError(ERROR_MESSAGES.invalidData);
            }
            if (response.info === RESPONSE_MESSAGES.invalidLogin) {
              return setFormError(ERROR_MESSAGES.loginShouldBeAlphanumeric);
            }
            if (response.info === RESPONSE_MESSAGES.loginAlreadyInUse) {
              return setFormError(ERROR_MESSAGES.loginIsAlreadyInUse);
            }
            if (response.info === RESPONSE_MESSAGES.loginIsTooLong) {
              return setFormError(ERROR_MESSAGES.loginIsTooLong);
            }
            if (response.info === RESPONSE_MESSAGES.missingData) {
              return setFormError(ERROR_MESSAGES.missingData);
            }
            if (response.info === RESPONSE_MESSAGES.passwordContainsSpaces) {
              return setFormError(ERROR_MESSAGES.passwordContainsSpaces);
            }
            if (response.info === RESPONSE_MESSAGES.passwordIsTooShort) {
              return setFormError(ERROR_MESSAGES.passwordIsTooShort);
            }
          }
          if (response.status === 401) {
            return setFormError(ERROR_MESSAGES.accessDenied);
          }
        }
        return setFormError(ERROR_MESSAGES.generic);
      }
    },
    [
      loginInput,
      passwordInput,
      recoveryAnswerInput,
      recoveryQuestionInput,
    ],
  );

  return (
    <SignUpLayout
      formError={formError}
      handleAction={handleAction}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      loading={loading}
      login={loginInput}
      password={passwordInput}
      recoveryAnswer={recoveryAnswerInput}
      recoveryQuestion={recoveryQuestionInput}
    />
  );
}

export default memo(SignUp);
