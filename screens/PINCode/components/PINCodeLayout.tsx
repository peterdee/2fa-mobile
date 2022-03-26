import React, { memo } from 'react';
import { Text, View } from 'react-native';

import KeyboardLayout from './KeyboardLayout';
import Loader from '../../../components/Loader';
import PINBlockLayout from './PINBlockLayout';
import styles from '../styles';

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
        <View>
          <Text style={styles.title}>
            { `${hasPIN ? 'Has PIN' : 'Set up PIN Code'}` }
          </Text>
          <PINBlockLayout
            PIN={PIN}
            showDigits={!hasPIN}
          />
          <KeyboardLayout
            disableBackspace={disableBackspace}
            disableKeyboard={disableKeyboard}
            handlePress={handlePress}
          />
        </View>
      ) }
    </View>
  );
}

export default memo(PINCodeLayout);
