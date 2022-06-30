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
import {
  getValue,
  KEYS,
  storeValue,
} from '../../utilities/storage';
import request, {
  ENDPOINTS,
  ResponsePayload,
} from '../../utilities/api';
import { RootStackScreenProps } from '../../types/navigation';
import SignInLayout from './components/SignInLayout';

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
  const [formError, setFormError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(
    (): void => {
      async function getValues(): Promise<void> {
        const [existingLogin, existingToken, existingUserId] = await Promise.all([
          getValue<string>(KEYS.login),
          getValue<string>(KEYS.token),
          getValue<number>(KEYS.userId),
        ]);
        if (existingLogin && existingToken && existingUserId) {
          navigation.replace('Root');
        }
      }
      getValues();
    },
    [],
  );

  const handleAction = (action: string): void => {
    if (action === 'cancel') {
      return navigation.replace('Root');
    }
    return navigation.replace('SignUp');
  };

  const handleInput = (name: string, value: string): void => {
    if (name === 'login') {
      setLogin(value);
    }
    if (name === 'password') {
      setPassword(value);
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
            login,
            password,
          },
        });

        const { data: { token, user } = {} } = data;
        if (!(token && user)) {
          return setFormError(ERROR_MESSAGES.generic);
        }

        await Promise.all([
          storeValue<number>(KEYS.userId, user.id),
          storeValue<string>(KEYS.login, user.login),
          storeValue<string>(KEYS.token, token),
        ]);

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
      login,
      password,
    ],
  );

  return (
    <SignInLayout
      formError={formError}
      handleAction={handleAction}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      loading={loading}
      login={login}
      password={password}
    />
  );
}

export default memo(SignIn);
