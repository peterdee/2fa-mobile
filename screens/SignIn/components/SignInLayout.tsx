import React, { memo, useMemo } from 'react';
import { Text, View } from 'react-native';

import { COLORS, SPACER } from '../../../constants';
import Input from '../../../components/Input';
import LinkButton from '../../../components/LinkButton';
import Loader from '../../../components/Loader';
import styles from '../styles';
import WideButton from '../../../components/WideButton';

interface SignInLayoutProps {
  formError: string;
  handleAction: (action: string) => void;
  handleInput: (name: string, value: string) => void;
  handleSubmit: () => Promise<void>;
  loading: boolean;
  login: string;
  password: string;
}

function SignInLayout(props: SignInLayoutProps): React.ReactElement {
  const {
    formError,
    handleAction,
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
          <Text style={styles.inputLabel}>
            Login
          </Text>
          <Input
            customStyles={styles.input}
            handleChange={(value: string): void => handleInput('login', value)}
            value={login}
          />
          <Text style={styles.inputLabel}>
            Password
          </Text>
          <Input
            customStyles={styles.input}
            handleChange={(value: string): void => handleInput('password', value)}
            isPassword
            value={password}
          />
          <View style={styles.formErrorContainer}>
            <Text style={styles.formErrorText}>
              { formError }
            </Text>
          </View>
          <WideButton
            buttonStyle={{
              backgroundColor: submitDisabled
                ? COLORS.muted
                : COLORS.positive,
              marginTop: SPACER,
            }}
            disabled={submitDisabled}
            onPress={handleSubmit}
            text="Sign in"
          />
          <LinkButton
            buttonStyle={{
              marginTop: SPACER * 2,
            }}
            onPress={(): void => handleAction('sign-up')}
            text="Create a new account"
            textStyle={{
              color: loading
                ? COLORS.muted
                : COLORS.accent,
            }}
          />
          <LinkButton
            buttonStyle={{
              marginTop: SPACER * 2,
            }}
            onPress={(): void => handleAction('cancel')}
            text="Cancel"
            textStyle={{
              color: loading
                ? COLORS.muted
                : COLORS.negative,
            }}
          />
        </>
      ) }
    </View>
  );
}

export default memo(SignInLayout);
