import React, { memo } from 'react';
import { Text, View } from 'react-native';

import { COLORS, SPACER } from '../../../constants';
import LinkButton from '../../../components/LinkButton';
import Loader from '../../../components/Loader';
import { RootStackParamList } from '../../../types/navigation';
import styles from '../styles';
import StageOne from './StageOne';
import StageTwo from './StageTwo';

interface AccountRecoveryLayoutProps {
  formError: string;
  handleInput: (name: string, value: string) => void;
  handleNavigation: (destination: keyof RootStackParamList) => void;
  handleStageOne: () => Promise<void>;
  handleStageTwo: () => Promise<void>;
  loading: boolean;
  login: string;
  newPassword: string;
  recoveryAnswer: string;
  recoveryQuestion: string;
  stage: number;
}

function AccountRecoveryLayout(props: AccountRecoveryLayoutProps): React.ReactElement {
  const {
    formError,
    handleInput,
    handleNavigation,
    handleStageOne,
    handleStageTwo,
    loading,
    login,
    newPassword,
    recoveryAnswer,
    recoveryQuestion,
    stage,
  } = props;

  return (
    <View style={styles.container}>
      { loading && (
        <Loader />
      ) }
      { !loading && (
        <>
          <Text style={styles.title}>
            ACCOUNT RECOVERY
          </Text>
          { stage === 1 && (
            <StageOne
              formError={formError}
              handleInput={handleInput}
              handleSubmit={handleStageOne}
              login={login}
            />
          ) }
          { stage === 2 && (
            <StageTwo
              formError={formError}
              handleInput={handleInput}
              handleSubmit={handleStageTwo}
              newPassword={newPassword}
              recoveryAnswer={recoveryAnswer}
              recoveryQuestion={recoveryQuestion}
            />
          ) }
          <LinkButton
            buttonStyle={{
              marginTop: SPACER * 2,
            }}
            onPress={(): void => handleNavigation('SignIn')}
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

export default memo(AccountRecoveryLayout);
