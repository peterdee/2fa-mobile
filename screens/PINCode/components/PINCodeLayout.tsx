import React, { memo } from 'react';
import { Text, View } from 'react-native';

import { COLORS } from '../../../constants';
import KeyboardLayout from './KeyboardLayout';
import Loader from '../../../components/Loader';
import PINBlockLayout from './PINBlockLayout';
import styles from '../styles';
import WideButton from '../../../components/WideButton';

interface PINCodeLayoutProps {
  disableBackspace: boolean;
  disableKeyboard: boolean;
  handlePress: (value: string) => void;
  handleSetPIN: () => Promise<void>;
  handleSkipPIN: () => Promise<void>;
  hasPIN: boolean;
  loading: boolean;
  PIN: string;
}

function PINCodeLayout(props: PINCodeLayoutProps): React.ReactElement {
  const {
    disableBackspace,
    disableKeyboard,
    handlePress,
    handleSetPIN,
    handleSkipPIN,
    hasPIN,
    loading,
    PIN,
  } = props;

  return (
    <View style={styles.container}>
      { loading && (
        <Loader />
      ) }
      { !loading && (
        <View style={styles.content}>
          { !hasPIN && (
            <Text style={styles.title}>
              Please enter a PIN code that will be used to access the application
            </Text>
          ) }
          { hasPIN && (
            <Text style={styles.title}>
              Please enter a PIN code
            </Text>
          ) }
          <PINBlockLayout
            PIN={PIN}
            showDigits={!hasPIN}
          />
          <KeyboardLayout
            disableBackspace={disableBackspace}
            disableKeyboard={disableKeyboard}
            handlePress={handlePress}
          />
          { !hasPIN && (
            <>
              <View style={styles.controls}>
                <WideButton
                  buttonStyle={{
                    ...styles.setPINButton,
                    backgroundColor: PIN.length < 4
                      ? COLORS.muted
                      : COLORS.positive,
                  }}
                  disabled={PIN.length < 4}
                  onPress={handleSetPIN}
                  text="SET PIN"
                  textStyle={{
                    color: PIN.length < 4
                      ? COLORS.mutedLight
                      : COLORS.textInverted,
                  }}
                />
              </View>
              <View style={styles.controls}>
                <WideButton
                  buttonStyle={{
                    backgroundColor: COLORS.negative,
                  }}
                  onPress={handleSkipPIN}
                  text="SKIP"
                />
              </View>
            </>
          ) }
        </View>
      ) }
    </View>
  );
}

export default memo(PINCodeLayout);
