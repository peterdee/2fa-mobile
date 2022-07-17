import React, { memo, useMemo } from 'react';
import { Text, View } from 'react-native';

import { COLORS, SPACER } from '../../../constants';
import Input from '../../../components/Input';
import LinkButton from '../../../components/LinkButton';
import styles from '../styles';
import WideButton from '../../../components/WideButton';

interface StageTwoProps {
  formError: string;
  handleInput: (name: string, value: string) => void;
  handleStage: () => void;
  handleSubmit: () => Promise<void>;
  newPassword: string;
  recoveryAnswer: string;
  recoveryQuestion: string;
}

function StageTwo(props: StageTwoProps): React.ReactElement {
  const {
    formError,
    handleInput,
    handleStage,
    handleSubmit,
    newPassword,
    recoveryAnswer,
    recoveryQuestion,
  } = props;

  const submitDisabled = useMemo(
    (): boolean => !(newPassword && newPassword.trim()
      && recoveryAnswer && recoveryAnswer.trim()),
    [
      newPassword,
      recoveryAnswer,
    ],
  );

  return (
    <>
      <Text style={styles.subtitle}>
        Please provide the answer to the following question:
      </Text>
      <Text style={styles.recoveryQuestion}>
        { recoveryQuestion }
      </Text>
      <Text style={styles.inputLabel}>
        Answer
      </Text>
      <Input
        customStyles={styles.input}
        handleChange={(value: string): void => handleInput('recoveryAnswer', value)}
        value={recoveryAnswer}
      />
      <Text style={styles.inputLabel}>
        New password
      </Text>
      <Input
        customStyles={styles.input}
        handleChange={(value: string): void => handleInput('newPassword', value)}
        isPassword
        value={newPassword}
      />
      <View style={styles.formErrorContainer}>
        <Text style={styles.formErrorText}>
          { formError }
        </Text>
      </View>
      <WideButton
        buttonStyle={{
          backgroundColor: !submitDisabled
            ? COLORS.accent
            : COLORS.muted,
          marginTop: SPACER,
        }}
        disabled={submitDisabled}
        onPress={handleSubmit}
        text="Submit"
      />
      <LinkButton
        buttonStyle={{
          marginTop: SPACER * 2,
        }}
        onPress={handleStage}
        text="Back"
        textStyle={{
          color: COLORS.accent,
        }}
      />
    </>
  );
}

export default memo(StageTwo);
