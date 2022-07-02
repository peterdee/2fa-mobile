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
import SignUpLayout from './components/SignUpLayout';

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
  const [formError, setFormError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [recoveryAnswer, setRecoveryAnswer] = useState<string>('');
  const [recoveryQuestion, setRecoveryQuestion] = useState<string>('');

  useEffect(
    (): void => {
      async function getValues(): Promise<void> {
        const [existingLogin, existingToken, existingUserId] = await Promise.all([
          getValue<string>(KEYS.login),
          getValue<string>(KEYS.token),
          getValue<number>(KEYS.userId),
        ]);
        if (existingLogin && existingToken && existingUserId) {
          // TODO: uncomment
          // navigation.replace('Root');
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
    return navigation.replace('SignIn');
  };

  const handleInput = (name: string, value: string): void => {
    if (name === 'login') {
      setLogin(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
    if (name === 'recoveryAnswer') {
      setRecoveryAnswer(value);
    }
    if (name === 'recoveryQuestion') {
      setRecoveryQuestion(value);
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
        const { data } = await request<SignUpResponseData>({
          ...ENDPOINTS.signUp,
          data: {
            clientType: CLIENT_TYPE,
            login,
            password,
            recoveryAnswer,
            recoveryQuestion,
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
    <SignUpLayout
      formError={formError}
      handleAction={handleAction}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      loading={loading}
      login={login}
      password={password}
      recoveryAnswer={recoveryAnswer}
      recoveryQuestion={recoveryQuestion}
    />
  );
}

export default memo(SignUp);
