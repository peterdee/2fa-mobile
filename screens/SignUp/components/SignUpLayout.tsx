import React, { memo, useMemo } from 'react';
import { Text, View } from 'react-native';

import { COLORS, SPACER } from '../../../constants';
import Input from '../../../components/Input';
import LinkButton from '../../../components/LinkButton';
import Loader from '../../../components/Loader';
import styles from '../styles';
import WideButton from '../../../components/WideButton';

interface SignUpLayoutProps {
  formError: string;
  handleAction: (action: string) => void;
  handleInput: (name: string, value: string) => void;
  handleSubmit: () => Promise<void>;
  loading: boolean;
  login: string;
  password: string;
  recoveryAnswer: string;
  recoveryQuestion: string;
}

function SignUpLayout(props: SignUpLayoutProps): React.ReactElement {
  const {
    formError,
    handleAction,
    handleInput,
    handleSubmit,
    loading,
    login,
    password,
    recoveryAnswer,
    recoveryQuestion,
  } = props;

  const submitDisabled = useMemo(
    (): boolean => !(
      login && login.trim() && password && password.trim()
        && recoveryAnswer && recoveryAnswer.trim()
        && recoveryQuestion && recoveryQuestion.trim()
    ),
    [
      login,
      password,
      recoveryAnswer,
      recoveryQuestion,
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
            SIGN UP
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
          <Text style={styles.inputLabel}>
            Profile recovery question
          </Text>
          <Input
            customStyles={styles.textArea}
            handleChange={(value: string): void => handleInput('recoveryQuestion', value)}
            multiline
            value={recoveryQuestion}
          />
          <Text style={styles.inputLabel}>
            Profile recovery answer
          </Text>
          <Input
            customStyles={styles.input}
            handleChange={(value: string): void => handleInput('recoveryAnswer', value)}
            value={recoveryAnswer}
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
                : COLORS.accent,
              marginTop: SPACER,
            }}
            disabled={submitDisabled}
            onPress={handleSubmit}
            text="Sign up"
          />
          <LinkButton
            buttonStyle={{
              marginTop: SPACER * 2,
            }}
            onPress={(): void => handleAction('sign-in')}
            text="I already have an account"
            textStyle={{
              color: COLORS.accent,
            }}
          />
          <LinkButton
            buttonStyle={{
              marginTop: SPACER * 2,
            }}
            onPress={(): void => handleAction('cancel')}
            text="Cancel"
            textStyle={{
              color: COLORS.accent,
            }}
          />
        </>
      ) }
    </View>
  );
}

export default memo(SignUpLayout);
