import React, {
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  getValue,
  KEYS,
  storeValue,
} from '../../utilities/storage';
import { KEYBOARD } from '../../constants';
import PINCodeLayout from './components/PINCodeLayout';
import { RootStackScreenProps } from '../../types';

function PINCode({ navigation }: RootStackScreenProps<'PINCode'>): React.ReactElement {
  const [disableBackspace, setDisableBackspace] = useState<boolean>(true);
  const [disableKeyboard, setDisableKeyboard] = useState<boolean>(false);
  const [hasPIN, setHasPIN] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [PIN, setPIN] = useState<string>('');

  useEffect(
    (): void => {
      async function checkPin() {
        const pinValue = await getValue<number>(KEYS.pin);
        if (pinValue) {
          setHasPIN(true);
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

  const handleSetPIN = useCallback(
    async (): Promise<void> => {
      await storeValue<number>(KEYS.pin, Number(PIN));

      // TODO: show a notification that PIN is set
      return navigation.replace('Root');
    },
    [PIN],
  );

  return (
    <PINCodeLayout
      disableBackspace={disableBackspace}
      disableKeyboard={disableKeyboard}
      handlePress={handlePress}
      handleSetPIN={handleSetPIN}
      hasPIN={hasPIN}
      loading={loading}
      PIN={PIN}
    />
  );
}

export default memo(PINCode);
