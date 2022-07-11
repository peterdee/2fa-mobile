import React, {
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import * as haptics from 'expo-haptics';

import { deleteAllSecrets } from '../../features/secrets/secrets.slice';
import { deleteUserData } from '../../features/user/user.slice';
import {
  KEYBOARD,
  PIN_REQUIRED,
  PROFILE_MODAL_ACTIONS,
} from '../../constants';
import PINCodeLayout from './components/PINCodeLayout';
import { RootStackScreenProps } from '../../types/navigation';
import {
  resetConfiguration,
  setPIN,
  setPINRequired,
  setProfileModalShown,
} from '../../features/configuration/configuration.slice';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';

function PINCode({ navigation }: RootStackScreenProps<'PINCode'>): React.ReactElement {
  const dispatch = useAppDispatch();

  const [disableBackspace, setDisableBackspace] = useState<boolean>(true);
  const [disableKeyboard, setDisableKeyboard] = useState<boolean>(false);
  const [hasPIN, setHasPIN] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [PINError, setPINError] = useState<string>('');
  const [showPINSetModal, setShowPINSetModal] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [showResetPINModal, setShowResetPINModal] = useState<boolean>(false);
  const [showSkipPINModal, setShowSkipPINModal] = useState<boolean>(false);

  const {
    pin,
    pinRequired,
    profileModalShown,
  } = useAppSelector(
    (state) => state.configuration,
  );

  useEffect(
    (): void => {
      async function checkPin(): Promise<void> {
        if (pinRequired === PIN_REQUIRED.isNotRequired) {
          return navigation.replace('Root');
        }
        if (pin && pinRequired === PIN_REQUIRED.isRequired) {
          setHasPIN(true);
        }

        // artificial delay to show the loader
        await new Promise((resolve): void => {
          setTimeout(resolve, 500);
        });
        return setLoading(false);
      }

      checkPin();
    },
    [],
  );

  const handleCancelReset = (): void => setShowResetPINModal(false);

  const handleCloseProfileModal = async (
    action: keyof typeof PROFILE_MODAL_ACTIONS,
  ): Promise<void> => {
    dispatch(setProfileModalShown(true));
    setShowProfileModal(false);
    if (action === PROFILE_MODAL_ACTIONS.signIn) {
      return navigation.replace('SignIn');
    }
    if (action === PROFILE_MODAL_ACTIONS.signUp) {
      return navigation.replace('SignUp');
    }
    return navigation.replace('Root');
  };

  const handleCloseSetPINModal = useCallback(
    (): void => {
      setShowPINSetModal(false);
      setShowSkipPINModal(false);

      if (!profileModalShown) {
        setShowProfileModal(true);
      } else {
        // this fixes the issue with PIN Set modal
        setTimeout((): void => navigation.replace('Root'), 0);
      }
    },
    [profileModalShown],
  );

  const handlePress = useCallback(
    async (value: string): Promise<void> => {
      setDisableBackspace(false);
      setPINError('');

      await haptics.impactAsync(haptics.ImpactFeedbackStyle.Medium);
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
        if (Number(pin) === Number(newPIN)) {
          if (!profileModalShown) {
            return setShowProfileModal(true);
          }
          return navigation.replace('Root');
        }
        setDisableBackspace(true);
        setDisableKeyboard(false);
        setInput('');
        return setPINError('Entered PIN code is invalid!');
      }
      return setInput(newPIN);
    },
    [
      input,
      pin,
    ],
  );

  const handleReset = (): void => {
    dispatch(deleteAllSecrets());
    dispatch(deleteUserData());
    dispatch(resetConfiguration());

    setHasPIN(false);
    setInput('');
    return setShowResetPINModal(false);
  };

  const handleResetPIN = (): void => setShowResetPINModal(true);

  const handleSetPIN = useCallback(
    (): void => {
      dispatch(setPIN(input));
      dispatch(
        setPINRequired(PIN_REQUIRED.isRequired as keyof typeof PIN_REQUIRED),
      );

      return setShowPINSetModal(true);
    },
    [input],
  );

  const handleSkipPIN = (): void => {
    dispatch(
      setPINRequired(PIN_REQUIRED.isNotRequired as keyof typeof PIN_REQUIRED),
    );

    return setShowSkipPINModal(true);
  };

  return (
    <PINCodeLayout
      disableBackspace={disableBackspace}
      disableKeyboard={disableKeyboard}
      handleCloseProfileModal={handleCloseProfileModal}
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
      profileModalShown={profileModalShown}
      showPINSetModal={showPINSetModal}
      showProfileModal={showProfileModal}
      showResetPINModal={showResetPINModal}
      showSkipPINModal={showSkipPINModal}
    />
  );
}

export default memo(PINCode);
