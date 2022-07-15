import React, {
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';

import AccountRecoveryLayout from './components/AccountRecoveryLayout';
import {
  RootStackParamList,
  RootStackScreenProps,
} from '../../types/navigation';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ERROR_MESSAGES } from '../../constants';
import request, { ENDPOINTS } from '../../utilities/api';

interface RecoveryCheckPayload {
  recoveryQuestion: string;
  userId: number;
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

        // TODO: error handling

        return console.log(error);
      }
    },
    [loginInput],
  );

  const handleStageTwo = useCallback(
    async (): Promise<void> => {
      console.log('handle stage 2', newPasswordInput, recoveryAnswerInput);
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
