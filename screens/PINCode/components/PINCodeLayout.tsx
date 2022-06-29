import React, { memo } from 'react';
import { Text, View } from 'react-native';

import {
  COLORS,
  PROFILE_MODAL_ACTIONS,
  SPACER,
} from '../../../constants';
import KeyboardLayout from './KeyboardLayout';
import Loader from '../../../components/Loader';
import PINBlockLayout from './PINBlockLayout';
import PINSetModal from './PINSetModal';
import ProfileModal from './ProfileModal';
import ResetPINModal from './ResetPINModal';
import SkipPINModal from './SkipPINModal';
import styles from '../styles';
import WideButton from '../../../components/WideButton';

interface PINCodeLayoutProps {
  disableBackspace: boolean;
  disableKeyboard: boolean;
  handleCancelReset: () => void;
  handleCloseProfileModal: (action: keyof typeof PROFILE_MODAL_ACTIONS) => void;
  handleCloseSetPINModal: () => void;
  handlePress: (value: string) => void;
  handleReset: () => Promise<void>;
  handleResetPIN: () => void;
  handleSetPIN: () => Promise<void>;
  handleSkipPIN: () => Promise<void>;
  hasPIN: boolean;
  loading: boolean;
  PIN: string;
  PINError: string;
  showPINSetModal: boolean;
  showProfileModal: boolean;
  showResetPINModal: boolean;
  showSkipPINModal: boolean;
}

function PINCodeLayout(props: PINCodeLayoutProps): React.ReactElement {
  const {
    disableBackspace,
    disableKeyboard,
    handleCancelReset,
    handleCloseProfileModal,
    handleCloseSetPINModal,
    handlePress,
    handleReset,
    handleResetPIN,
    handleSetPIN,
    handleSkipPIN,
    hasPIN,
    loading,
    PIN,
    PINError,
    showPINSetModal,
    showProfileModal,
    showResetPINModal,
    showSkipPINModal,
  } = props;

  const PINText = !hasPIN
    ? 'Please enter a PIN code that will be used to access the application'
    : 'Please enter your PIN code';

  return (
    <View style={styles.container}>
      { loading && (
        <Loader />
      ) }
      { !loading && (
        <View style={styles.content}>
          <PINSetModal
            handleClose={handleCloseSetPINModal}
            PIN={PIN}
            showPINSetModal={showPINSetModal}
          />
          <ProfileModal
            handleClose={handleCloseProfileModal}
            showProfileModal={showProfileModal}
          />
          <ResetPINModal
            handleCancel={handleCancelReset}
            handleReset={handleReset}
            showResetPINModal={showResetPINModal}
          />
          <SkipPINModal
            handleClose={handleCloseSetPINModal}
            showSkipPINModal={showSkipPINModal}
          />
          <Text style={styles.title}>
            { PINText }
          </Text>
          <PINBlockLayout
            PIN={PIN}
            showDigits={!hasPIN}
          />
          { hasPIN && (
            <View style={styles.PINError}>
              { !!PINError && (
                <Text style={styles.PINErrorText}>
                  { PINError }
                </Text>
              ) }
            </View>
          ) }
          <KeyboardLayout
            disableBackspace={disableBackspace}
            disableKeyboard={disableKeyboard}
            handlePress={handlePress}
          />
          { hasPIN && (
            <View style={styles.controls}>
              <WideButton
                buttonStyle={{
                  backgroundColor: COLORS.negative,
                  marginTop: SPACER,
                }}
                onPress={handleResetPIN}
                text="Reset PIN"
              />
            </View>
          ) }
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
