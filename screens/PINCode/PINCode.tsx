import React, {
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Text, View } from 'react-native';

import { getValue, KEYS } from '../../utilities/storage';
import { KEYBOARD } from '../../constants';
import KeyboardLayout from './components/KeyboardLayout';
import Loader from '../../components/Loader';
import styles from './styles';

function PINCode(): React.ReactElement {
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
      setDisableBackspace(false);
      if (value === KEYBOARD.backspace && PIN.length > 0) {
        const newPIN = PIN.slice(0, PIN.length - 1);
        if (newPIN.length === 0) {
          setDisableBackspace(true);
        }
        setDisableKeyboard(false);
        return setPIN(newPIN);
      }
      const newPIN = `${PIN}${value}`;
      if (newPIN.length === 4) {
        setDisableKeyboard(true);
      }
      return setPIN(newPIN);
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
