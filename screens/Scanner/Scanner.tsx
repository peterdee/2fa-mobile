import React, { memo } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

function Scanner(): React.ReactElement {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Scanner
      </Text>
    </View>
  );
}

export default memo(Scanner);
