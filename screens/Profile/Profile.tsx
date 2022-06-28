import React, { memo } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

function Profile(): React.ReactElement {
  return (
    <View style={styles.container}>
      <Text>
        Profile
      </Text>
    </View>
  );
}

export default memo(Profile);
