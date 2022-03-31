import React, { memo } from 'react';
import { Pressable, Text, View } from 'react-native';

import styles from '../styles';

interface DigitProps {
  handlePress: (value: string) => void;
  pressable: boolean;
  value: string;
}

function Digit(props: DigitProps): React.ReactElement {
  const {
    handlePress,
    pressable,
    value,
  } = props;

  return (
    <View style={styles.digitContainer}>
      { pressable && (
        <Pressable onPress={(): void => handlePress(value)}>
          <Text>
            { value }
          </Text>
        </Pressable>
      ) }
    </View>
  );
}

export default memo(Digit);
