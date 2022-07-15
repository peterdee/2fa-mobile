import React, { memo } from 'react';
import { Text, View } from 'react-native';

import { COLORS, SPACER } from '../../../constants';
import Input from '../../../components/Input';
import styles from '../styles';
import WideButton from '../../../components/WideButton';

interface StageOneProps {
  formError: string;
  handleInput: (name: string, value: string) => void;
  handleSubmit: () => Promise<void>;
  login: string;
}

function StageOne(props: StageOneProps): React.ReactElement {
  const {
    formError,
    handleInput,
    handleSubmit,
    login,
  } = props;

  return (
    <>
      <Text style={styles.inputLabel}>
        Login
      </Text>
      <Input
        customStyles={styles.input}
        handleChange={(value: string): void => handleInput('login', value)}
        value={login}
      />
      <View style={styles.formErrorContainer}>
        <Text style={styles.formErrorText}>
          { formError }
        </Text>
      </View>
      <WideButton
        buttonStyle={{
          backgroundColor: login && login.trim()
            ? COLORS.accent
            : COLORS.muted,
          marginTop: SPACER,
        }}
        disabled={!(login && login.trim())}
        onPress={handleSubmit}
        text="Proceed"
      />
    </>
  );
}

export default memo(StageOne);
