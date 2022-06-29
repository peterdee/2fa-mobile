import React, { memo, useCallback, useState } from 'react';

import request, { ENDPOINTS } from '../../utilities/api';
import SignInLayout from './components/SignInLayout';

function SignIn(): React.ReactElement {
  const [loading, setLoading] = useState<boolean>(false);
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleInput = (name: string, value: string): void => {
    if (name === 'login') {
      return setLogin(value);
    }
    return setPassword(value);
  };

  const handleSubmit = useCallback(
    async (): Promise<void> => {
      setLoading(true);
      // TODO: check data

      try {
        const response = request({
          ...ENDPOINTS.signIn,
          data: {
            login,
            password,
          },
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    [
      login,
      password,
    ],
  );

  return (
    <SignInLayout
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      loading={loading}
      login={login}
      password={password}
    />
  );
}

export default memo(SignIn);
