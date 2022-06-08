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
} from '../../utilities/storage';
import { RootStackScreenProps } from '../../types/navigation';
import { SecretEntry } from '../../types/models';
import styles from './styles';
import WideButton from '../../components/WideButton';

function ListOptionsModal({ navigation }: RootStackScreenProps<'Modal'>): React.ReactElement {
  const [list, setList] = useState<SecretEntry[]>([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

  useEffect(
    (): void => {
      async function getList(): Promise<void> {
        const items = await getValue<SecretEntry[]>(KEYS.secrets);
        if (items) {
          setList(items);
        }
      }
      getList();
    },
    [],
  );

  const handleDelete = async (): Promise<void> => {
    await deleteValue(KEYS.secrets);
    return navigation.replace('Root');
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
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <Text style={styles.infoText}>
        { `Stored entries: ${list.length}` }
      </Text>
      <WideButton
        buttonStyle={styles.deleteAllButton}
        disabled={list.length === 0}
        disabledButtonStyle={{
          ...styles.deleteAllButton,
          ...styles.deleteAllButtonDisabled,
        }}
        onPress={toggleModal}
        text="Delete all entries"
      />
    </View>
  );
}

export default memo(ListOptionsModal);
