import React, {
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';

import AccountRecoveryLayout from './components/AccountRecoveryLayout';
import { RootStackParamList, RootStackScreenProps } from '../../types/navigation';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

function AccountRecovery(
  { navigation }: RootStackScreenProps<'AccountRecovery'>,
) {
  const dispatch = useAppDispatch();

  const [formError, setFormError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [loginInput, setLoginInput] = useState<string>('');
  const [stage, setStage] = useState<number>(1);

  const {
    login,
    token,
    userId,
  } = useAppSelector((state) => state.user);

  useEffect(
    (): void => {
      if (login && token && userId) {
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
  };

  const handleNavigation = (
    destination: keyof RootStackParamList,
  ): void => navigation.replace(destination);

  const handleStageOne = useCallback(
    async (): Promise<void> => {
      console.log('stage 1', loginInput);
    },
    [loginInput],
  );

  return (
    <AccountRecoveryLayout
      formError={formError}
      handleInput={handleInput}
      handleNavigation={handleNavigation}
      handleStageOne={handleStageOne}
      loading={loading}
      login={loginInput}
      stage={stage}
    />
  );
}

export default memo(AccountRecovery);
