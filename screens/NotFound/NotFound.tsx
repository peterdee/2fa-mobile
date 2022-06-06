import React, { memo } from 'react';
import { Text, View } from 'react-native';

import { RootStackScreenProps } from '../../types/navigation';
import styles from './styles';
import WideButton from '../../components/WideButton';

function NotFound({ navigation }: RootStackScreenProps<'NotFound'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Not found!
      </Text>
      <WideButton
        buttonStyle={styles.button}
        onPress={(): void => navigation.replace('Root')}
        text="Back"
      />
    </View>
  );
}

export default memo(NotFound);
