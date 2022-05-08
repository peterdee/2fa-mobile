import React, {
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  deleteValue,
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
  const [showResetPINModal, setShowResetPINModal] = useState<boolean>(false);
  const [showPINSetModal, setShowPINSetModal] = useState<boolean>(false);
  const [showSkipPINModal, setShowSkipPINModal] = useState<boolean>(false);

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
        if (pinValue && pinRequired === PIN_REQUIRED.isRequired) {
          setHasPIN(true);
          setPIN(`${pinValue}`);
        }
        return setLoading(false);
      }

      checkPin();
    },
    [],
  );

  const handleCancelReset = (): void => setShowResetPINModal(false);

  const handleCloseSetPINModal = (): void => navigation.replace('Root');

  const handlePress = useCallback(
    async (value: string): Promise<void> => {
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
      if (newPIN.length === 4 && hasPIN) {
        setDisableKeyboard(true);
        if (Number(PIN) === Number(newPIN)) {
          return navigation.replace('Root');
        }
        setDisableBackspace(true);
        setDisableKeyboard(false);
        setInput('');
        return setPINError('Entered PIN code is invalid!');
      }
      return setInput(newPIN);
    },
    [input, PIN],
  );

  const handleReset = async (): Promise<void> => {
    await Promise.all(
      Object.keys(KEYS).map(
        (key: string): Promise<void> => deleteValue(key as keyof typeof KEYS),
      ),
    );
    setHasPIN(false);
    setInput('');
    setPIN('');
    return setShowResetPINModal(false);
  };

  const handleResetPIN = (): void => setShowResetPINModal(true);

  const handleSetPIN = useCallback(
    async (): Promise<void> => {
      await Promise.all([
        storeValue<number>(KEYS.pin, Number(input)),
        storeValue<PINRequired>(
          KEYS.pinRequired,
          PIN_REQUIRED.isRequired,
        ),
      ]);

      return setShowPINSetModal(true);
    },
    [input],
  );

  const handleSkipPIN = async (): Promise<void> => {
    await storeValue<PINRequired>(
      KEYS.pinRequired,
      PIN_REQUIRED.isNotRequired,
    );

    return setShowSkipPINModal(true);
  };

  return (
    <PINCodeLayout
      disableBackspace={disableBackspace}
      disableKeyboard={disableKeyboard}
      handleCloseSetPINModal={handleCloseSetPINModal}
      handleCancelReset={handleCancelReset}
      handlePress={handlePress}
      handleReset={handleReset}
      handleResetPIN={handleResetPIN}
      handleSetPIN={handleSetPIN}
      handleSkipPIN={handleSkipPIN}
      hasPIN={hasPIN}
      loading={loading}
      PIN={input}
      PINError={PINError}
      showPINSetModal={showPINSetModal}
      showResetPINModal={showResetPINModal}
      showSkipPINModal={showSkipPINModal}
    />
  );
}

export default memo(PINCode);
