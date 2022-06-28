import React, { memo } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

function SignUp(): React.ReactElement {
  return (
    <View style={styles.container}>
      <Text>
        Sign Up
      </Text>
    </View>
  );
}

export default memo(SignUp);
