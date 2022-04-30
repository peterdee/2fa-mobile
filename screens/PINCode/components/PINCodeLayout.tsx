import React, { memo } from 'react';
import { Text, View } from 'react-native';

import KeyboardLayout from './KeyboardLayout';
import Loader from '../../../components/Loader';
import PINBlockLayout from './PINBlockLayout';
import styles from '../styles';
import WideButton from '../../../components/WideButton';

interface PINCodeLayoutProps {
  disableBackspace: boolean;
  disableKeyboard: boolean;
  handlePress: (value: string) => void;
  hasPIN: boolean;
  loading: boolean;
  PIN: string;
}

function PINCodeLayout(props: PINCodeLayoutProps): React.ReactElement {
  const {
    disableBackspace,
    disableKeyboard,
    handlePress,
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
            <View style={styles.controls}>
              <WideButton
                buttonStyle={styles.setPINButton}
                disabled={PIN.length < 4}
                onPress={(): void => console.log('pressed')}
                text="Save"
              />
            </View>
          ) }
        </View>
      ) }
    </View>
  );
}

export default memo(PINCodeLayout);
