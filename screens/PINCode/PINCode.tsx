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
import { KEYBOARD, PIN_REQUIRED } from '../../constants';
import PINCodeLayout from './components/PINCodeLayout';
import { PINRequired } from '../../types/models';
import { RootStackScreenProps } from '../../types';

function PINCode({ navigation }: RootStackScreenProps<'PINCode'>): React.ReactElement {
  const [disableBackspace, setDisableBackspace] = useState<boolean>(true);
  const [disableKeyboard, setDisableKeyboard] = useState<boolean>(false);
  const [hasPIN, setHasPIN] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [PIN, setPIN] = useState<string>('');
  const [PINError, setPINError] = useState<string>('');

  useEffect(
    (): void => {
      async function checkPin(): Promise<void> {
        const [pinRequired, pinValue] = await Promise.all([
          getValue<string>(KEYS.pinRequired),
          getValue<number>(KEYS.pin),
        ]);
        // redirect to the List tab if PIN is not required
        if (pinRequired && pinRequired === PIN_REQUIRED.isNotRequired) {
          return navigation.replace('Root');
        }
        if (pinValue) {
          setHasPIN(true);
          setPIN(`${pinValue}`);
        }
        return setLoading(false);
      }

      checkPin();
    },
    [],
  );

  const handlePress = useCallback(
    (value: string): void => {
      setDisableBackspace(false);
      setPINError('');

      if (value === KEYBOARD.backspace && input.length > 0) {
        const newPIN = input.slice(0, input.length - 1);
        if (newPIN.length === 0) {
          setDisableBackspace(true);
        }
        setDisableKeyboard(false);
        return setInput(newPIN);
      }
      const newPIN = `${input}${value}`;
      if (newPIN.length === 4) {
        setDisableKeyboard(true);
        if (Number(PIN) === Number(newPIN)) {
          return navigation.replace('Root');
        }
        setDisableBackspace(true);
        setDisableKeyboard(false);
        setInput('');
        return setPINError('Entered PIN code is invalid');
      }
      return setInput(newPIN);
    },
    [input, PIN],
  );

  const handleSetPIN = useCallback(
    async (): Promise<void> => {
      await Promise.all([
        storeValue<number>(KEYS.pin, Number(PIN)),
        storeValue<PINRequired>(
          KEYS.pinRequired,
          PIN_REQUIRED.isRequired,
        ),
      ]);

      // TODO: show a notification that PIN is set
      return navigation.replace('Root');
    },
    [input],
  );

  const handleSkipPIN = async (): Promise<void> => {
    await storeValue<PINRequired>(
      KEYS.pinRequired,
      PIN_REQUIRED.isNotRequired,
    );

    // TODO: show a notification that PIN can be set later
    return navigation.replace('Root');
  };

  return (
    <PINCodeLayout
      disableBackspace={disableBackspace}
      disableKeyboard={disableKeyboard}
      handlePress={handlePress}
      handleSetPIN={handleSetPIN}
      handleSkipPIN={handleSkipPIN}
      hasPIN={hasPIN}
      loading={loading}
      PIN={input}
      PINError={PINError}
    />
  );
}

export default memo(PINCode);
