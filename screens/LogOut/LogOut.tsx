import React, { memo, useEffect } from 'react';
import { Text, View } from 'react-native';

import { RootStackScreenProps } from '../../types/navigation';
import styles from './styles';
import WideButton from '../../components/WideButton';
import { deleteValue, KEYS } from '../../utilities/storage';

function LogOut({ navigation }: RootStackScreenProps<'LogOut'>): React.ReactElement {
  useEffect(
    (): void => {
      async function deleteValues(): Promise<void> {
        await Promise.all([
          deleteValue(KEYS.login),
          deleteValue(KEYS.pin),
          deleteValue(KEYS.token),
        ]);
      }
      deleteValues();
    },
    [],
  );

  const handleNavigation = (): void => navigation.replace('Root');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        You have been logged out from your account!
      </Text>
      <WideButton
        buttonStyle={styles.button}
        onPress={handleNavigation}
        text="OK"
      />
    </View>
  );
}

export default memo(LogOut);
