import React, {
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Text, View } from 'react-native';

import { getValue, KEYS } from '../../utilities/storage';
import KeyboardLayout from './components/KeyboardLayout';
import Loader from '../../components/Loader';
import styles from './styles';
import { KEYBOARD } from '../../constants';

function PINCode(): React.ReactElement {
  // TODO: this should be disabled at the start
  const [disableBackspace, setDisableBackspace] = useState<boolean>(true);
  const [disableKeyboard, setDisableKeyboard] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [PIN, setPIN] = useState<string>('');

  useEffect(
    (): void => {
      async function checkPin() {
        const pinValue = await getValue<number>(KEYS.pin);
        if (pinValue) {
          setPIN(`${pinValue}`);
        }
        setLoading(false);
      }

      checkPin();
    },
    [],
  );

  const handlePress = useCallback(
    (value: string): void => {
      if (value === KEYBOARD.backspace && PIN.length > 0) {
        return setPIN(PIN.slice(0, PIN.length - 1));
      }
      setPIN(`${PIN}${value}`);
      return console.log('entered', PIN);
    },
    [PIN],
  );

  return (
    <View style={styles.container}>
      { loading && (
        <Loader />
      ) }
      { !loading && (
        <>
          <Text style={styles.title}>
            { `${PIN ? 'Has PIN' : 'Set up PIN Code'}` }
          </Text>
          <KeyboardLayout
            disableBackspace={disableBackspace}
            disableKeyboard={disableKeyboard}
            handlePress={handlePress}
          />
        </>
      ) }
    </View>
  );
}

export default memo(PINCode);
