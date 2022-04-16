import React, { memo } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

function List(): React.ReactElement {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        List
      </Text>
    </View>
  );
}

export default memo(List);
