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
  RESPONSE_MESSAGES,
} from '../../constants';
import request, {
  ENDPOINTS,
  ResponsePayload,
} from '../../utilities/api';
import { RootStackScreenProps } from '../../types/navigation';
import { setUserData } from '../../features/user/user.slice';
import SignInLayout from './components/SignInLayout';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

interface SignInResponseData {
  token: string;
  user: {
    id: number;
    login: string;
  };
}

function SignIn(
  { navigation }: RootStackScreenProps<'SignIn'>,
): React.ReactElement {
  const dispatch = useAppDispatch();

  const [formError, setFormError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [loginInput, setLoginInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');

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
    return navigation.replace('SignUp');
  };

  const handleInput = (name: string, value: string): void => {
    if (name === 'login') {
      setLoginInput(value);
    }
    if (name === 'password') {
      setPasswordInput(value);
    }
    return setFormError('');
  };

  const handleSubmit = useCallback(
    async (): Promise<void> => {
      setLoading(true);

      // artificial delay to show the loader
      await new Promise((resolve): void => {
        setTimeout(resolve, 500);
      });

      try {
        const { data } = await request<SignInResponseData>({
          ...ENDPOINTS.signIn,
          data: {
            clientType: CLIENT_TYPE,
            login: loginInput,
            password: passwordInput,
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
            if (response.info === RESPONSE_MESSAGES.missingData) {
              return setFormError(ERROR_MESSAGES.missingData);
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
    ],
  );

  return (
    <SignInLayout
      formError={formError}
      handleAction={handleAction}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      loading={loading}
      login={loginInput}
      password={passwordInput}
    />
  );
}

export default memo(SignIn);
