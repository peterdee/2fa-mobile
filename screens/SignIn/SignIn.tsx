import React, { memo } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

function SignIn(): React.ReactElement {
  return (
    <View style={styles.container}>
      <Text>
        Sign In
      </Text>
    </View>
  );
}

export default memo(SignIn);
