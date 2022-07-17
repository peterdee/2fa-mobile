import React, { memo } from 'react';
import { Text, View } from 'react-native';

import { COLORS, SPACER } from '../../../constants';
import LinkButton from '../../../components/LinkButton';
import Loader from '../../../components/Loader';
import { RootStackParamList } from '../../../types/navigation';
import styles from '../styles';
import StageOne from './StageOne';
import StageTwo from './StageTwo';
import SuccessModal from './SuccessModal';

interface AccountRecoveryLayoutProps {
  formError: string;
  handleCloseModal: () => void;
  handleInput: (name: string, value: string) => void;
  handleNavigation: (destination: keyof RootStackParamList) => void;
  handleStage: () => void;
  handleStageOne: () => Promise<void>;
  handleStageTwo: () => Promise<void>;
  loading: boolean;
  login: string;
  newPassword: string;
  recoveryAnswer: string;
  recoveryQuestion: string;
  showModal: boolean;
  stage: number;
}

function AccountRecoveryLayout(props: AccountRecoveryLayoutProps): React.ReactElement {
  const {
    formError,
    handleCloseModal,
    handleInput,
    handleNavigation,
    handleStage,
    handleStageOne,
    handleStageTwo,
    loading,
    login,
    newPassword,
    recoveryAnswer,
    recoveryQuestion,
    showModal,
    stage,
  } = props;

  return (
    <View style={styles.container}>
      { loading && (
        <Loader />
      ) }
      { !loading && (
        <>
          <SuccessModal
            handleClose={handleCloseModal}
            login={login}
            showModal={showModal}
          />
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
              handleStage={handleStage}
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
