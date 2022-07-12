import React, { memo } from 'react';
import { Text, View } from 'react-native';

import { COLORS, SPACER } from '../../../constants';
import Input from '../../../components/Input';
import Loader from '../../../components/Loader';
import styles from '../styles';
import WideButton from '../../../components/WideButton';
import { RootStackParamList } from '../../../types/navigation';
import LinkButton from '../../../components/LinkButton';

interface AccountRecoveryLayoutProps {
  formError: string;
  handleInput: (name: string, value: string) => void;
  handleNavigation: (destination: keyof RootStackParamList) => void;
  handleStageOne: () => Promise<void>;
  loading: boolean;
  login: string;
  stage: number;
}

function AccountRecoveryLayout(props: AccountRecoveryLayoutProps): React.ReactElement {
  const {
    formError,
    handleInput,
    handleNavigation,
    handleStageOne,
    loading,
    login,
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
                  backgroundColor: COLORS.accent,
                  marginTop: SPACER,
                }}
                onPress={handleStageOne}
                text="Sign in"
              />
            </>
          ) }
          <LinkButton
            onPress={(): void => handleNavigation('SignIn')}
            text="Cancel"
          />
        </>
      ) }
    </View>
  );
}

export default memo(AccountRecoveryLayout);
