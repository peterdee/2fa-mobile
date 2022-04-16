import React, { memo } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

function PINCode(): React.ReactElement {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        PIN Code
      </Text>
    </View>
  );
}

export default memo(PINCode);
