import React, {
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { AxiosError } from 'axios';

import AccountRecoveryLayout from './components/AccountRecoveryLayout';
import { CLIENT_TYPE, ERROR_MESSAGES, RESPONSE_MESSAGES } from '../../constants';
import request, { ENDPOINTS, ResponsePayload } from '../../utilities/api';
import {
  RootStackParamList,
  RootStackScreenProps,
} from '../../types/navigation';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

interface RecoveryCheckPayload {
  recoveryQuestion: string;
  userId: number;
}

interface RecoveryUpdatePayload {
  token: string;
  user: {
    id: number;
    login: string;
  };
}

function AccountRecovery(
  { navigation }: RootStackScreenProps<'AccountRecovery'>,
) {
  const dispatch = useAppDispatch();

  const [formError, setFormError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [loginInput, setLoginInput] = useState<string>('');
  const [newPasswordInput, setNewPasswordInput] = useState<string>('');
  const [recoveryAnswerInput, setRecoveryAnswerInput] = useState<string>('');
  const [recoveryQuestion, setRecoveryQuestion] = useState<string>('');
  const [stage, setStage] = useState<number>(1);
  const [userId, setUserId] = useState<number | null>(null);

  const {
    login,
    token,
    userId: existingUserId,
  } = useAppSelector((state) => state.user);

  useEffect(
    (): void => {
      if (login && token && existingUserId) {
        // TODO: uncomment
        // navigation.replace('Root');
      }
    },
    [
      login,
      token,
      userId,
    ],
  );

  const handleInput = (name: string, value: string): void => {
    if (name === 'login') {
      setLoginInput(value);
    }
    if (name === 'newPassword') {
      setNewPasswordInput(value);
    }
    if (name === 'recoveryAnswer') {
      setRecoveryAnswerInput(value);
    }
    return setFormError('');
  };

  const handleNavigation = (
    destination: keyof RootStackParamList,
  ): void => navigation.replace(destination);

  const handleStage = (): void => setStage(1);

  const handleStageOne = useCallback(
    async (): Promise<void> => {
      if (!(loginInput && loginInput.trim())) {
        return setFormError(ERROR_MESSAGES.pleaseProvideTheData);
      }

      setLoading(true);

      try {
        // artificial delay to show the loader
        await new Promise((resolve): void => {
          setTimeout(resolve, 500);
        });

        const { data } = await request<RecoveryCheckPayload>({
          ...ENDPOINTS.recoveryCheck,
          data: { login: loginInput.trim() },
        });
        const {
          data: {
            recoveryQuestion: receivedRecoveryQuestion,
            userId: receivedUserId,
          } = {},
        } = data;
        if (!(receivedRecoveryQuestion && receivedUserId)) {
          return setFormError(ERROR_MESSAGES.generic);
        }

        setLoading(false);
        setRecoveryQuestion(receivedRecoveryQuestion);
        setUserId(receivedUserId);

        return setStage(2);
      } catch (error) {
        setLoading(false);
        const typedError = error as AxiosError<ResponsePayload>;
        if (typedError.response && typedError.response.data) {
          const response = typedError.response.data;
          if (response.status === 400) {
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
    [loginInput],
  );

  const handleStageTwo = useCallback(
    async (): Promise<void> => {
      setLoading(true);
      try {
        const { data } = await request<RecoveryUpdatePayload>({
          ...ENDPOINTS.recoveryUpdate,
          data: {
            clientType: CLIENT_TYPE,
            newPassword: newPasswordInput,
            recoveryAnswer: recoveryAnswerInput,
            userId,
          },
        });
        setLoading(false);
        return console.log(data);
      } catch (error) {
        setLoading(false);
        const typedError = error as AxiosError<ResponsePayload>;
        if (typedError.response && typedError.response.data) {
          const response = typedError.response.data;
          if (response.status === 400) {
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
      newPasswordInput,
      recoveryAnswerInput,
      userId,
    ],
  );

  return (
    <AccountRecoveryLayout
      formError={formError}
      handleInput={handleInput}
      handleNavigation={handleNavigation}
      handleStage={handleStage}
      handleStageOne={handleStageOne}
      handleStageTwo={handleStageTwo}
      loading={loading}
      login={loginInput}
      newPassword={newPasswordInput}
      recoveryAnswer={recoveryAnswerInput}
      recoveryQuestion={recoveryQuestion}
      stage={stage}
    />
  );
}

export default memo(AccountRecovery);
