import React, {
  memo,
  useEffect,
  useState,
} from 'react';
import { Platform, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import ConfirmationModal from './components/ConfirmationModal';
import {
  deleteValue,
  getValue,
  KEYS,
  storeValue,
} from '../../utilities/storage';
import { PIN_REQUIRED } from '../../constants';
import PINEnabledModal from './components/PINEnabledModal';
import { RootStackScreenProps } from '../../types/navigation';
import { SecretEntry } from '../../types/models';
import styles from './styles';
import Switch from '../../components/Switch';
import WideButton from '../../components/WideButton';

function ListOptionsModal({ navigation }: RootStackScreenProps<'Modal'>): React.ReactElement {
  const [list, setList] = useState<SecretEntry[]>([]);
  const [PINStatus, setPINStatus] = useState<boolean>(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
  const [showPINModal, setShowPINModal] = useState<boolean>(false);

  useEffect(
    (): void => {
      async function getData(): Promise<void> {
        const [items, PINRequired] = await Promise.all([
          getValue<SecretEntry[]>(KEYS.secrets),
          getValue<string | null>(KEYS.pinRequired),
        ]);
        if (items) {
          setList(items);
        }
        if (!PINRequired) {
          setPINStatus(false);
        } else {
          setPINStatus(PINRequired === PIN_REQUIRED.isRequired);
        }
      }
      getData();
    },
    [],
  );

  const handleDelete = async (): Promise<void> => {
    await deleteValue(KEYS.secrets);
    return navigation.replace('Root');
  };

  const handlePINModalClose = (): void => setShowPINModal(false);

  const handlePINStatus = async (value: boolean): Promise<void> => {
    await Promise.all([
      deleteValue(KEYS.pin),
      storeValue<string>(
        KEYS.pinRequired,
        value ? PIN_REQUIRED.isRequired : PIN_REQUIRED.isNotRequired,
      ),
    ]);
    if (value) {
      setShowPINModal(true);
    }
    return setPINStatus(value);
  };

  const toggleModal = (): void => setShowConfirmationModal(
    (state: boolean): boolean => !state,
  );

  return (
    <View style={styles.container}>
      <ConfirmationModal
        handleClose={toggleModal}
        handleDelete={handleDelete}
        showModal={showConfirmationModal}
      />
      <PINEnabledModal
        handleClose={handlePINModalClose}
        showModal={showPINModal}
      />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <View style={styles.switchRow}>
        <Text style={styles.text}>
          Require PIN
        </Text>
        <Switch
          handleChange={handlePINStatus}
          value={PINStatus}
        />
      </View>
      <WideButton
        buttonStyle={styles.deleteAllButton}
        disabled={list.length === 0}
        disabledButtonStyle={{
          ...styles.deleteAllButton,
          ...styles.deleteAllButtonDisabled,
        }}
        onPress={toggleModal}
        text={`Delete all entries (${list.length})`}
      />
    </View>
  );
}

export default memo(ListOptionsModal);
