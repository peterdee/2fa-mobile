import React, { memo } from 'react';
import { Pressable, Text, View } from 'react-native';

import { KEYBOARD } from '../../../constants';
import styles from '../styles';

interface KeyProps {
  disabled: boolean;
  onPress: (value: string) => void;
  value: string;
}

function Key(props: KeyProps): React.ReactElement {
  const {
    disabled,
    onPress,
    value,
  } = props;

  return (
    <View style={styles.digitContainer}>
      { !KEYBOARD.empty && (
        <Pressable
          disabled={disabled}
          onPress={(): void => onPress(value)}
          style={[
            styles.keyboardKeyLayout,
          ]}
        >
          <Text>
            { value }
          </Text>
        </Pressable>
      ) }
    </View>
  );
}

export default memo(Key);
