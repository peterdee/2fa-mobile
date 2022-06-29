import React, { memo, useMemo } from 'react';
import { Text, View } from 'react-native';

import { COLORS, SPACER } from '../../../constants';
import Input from '../../../components/Input';
import Loader from '../../../components/Loader';
import styles from '../styles';
import WideButton from '../../../components/WideButton';

interface SignInLayoutProps {
  handleInput: (name: string, value: string) => void;
  handleSubmit: () => Promise<void>;
  loading: boolean;
  login: string;
  password: string;
}

function SignInLayout(props: SignInLayoutProps): React.ReactElement {
  const {
    handleInput,
    handleSubmit,
    loading,
    login,
    password,
  } = props;

  const submitDisabled = useMemo(
    (): boolean => !(login && login.trim() && password && password.trim()),
    [
      login,
      password,
    ],
  );

  return (
    <View style={styles.container}>
      { loading && (
        <Loader />
      ) }
      { !loading && (
        <>
          <Text style={styles.title}>
            SIGN IN
          </Text>
          <Input
            customStyles={styles.input}
            handleChange={(value: string): void => handleInput('login', value)}
            placeholder="Login"
            value={login}
          />
          <Input
            customStyles={styles.input}
            handleChange={(value: string): void => handleInput('password', value)}
            placeholder="Password"
            value={password}
          />
          <WideButton
            buttonStyle={{
              backgroundColor: submitDisabled
                ? COLORS.muted
                : COLORS.positive,
            }}
            disabled={submitDisabled}
            onPress={handleSubmit}
            text="Sign in"
          />
          <WideButton
            buttonStyle={{
              marginTop: SPACER,
            }}
            onPress={handleSubmit}
            text="Sign up"
          />
          <WideButton
            buttonStyle={{
              backgroundColor: COLORS.negative,
              marginTop: SPACER,
            }}
            onPress={handleSubmit}
            text="Skip"
          />
        </>
      ) }
    </View>
  );
}

export default memo(SignInLayout);
