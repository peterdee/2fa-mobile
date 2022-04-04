import React, { memo } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

function Loader(): React.ReactElement {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Loading...
      </Text>
    </View>
  );
}

export default memo(Loader);
