import React, { memo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  Pressable,
  Text,
  View,
} from 'react-native';

import {
  COLORS,
  KEYBOARD,
  SPACER,
  SPACER_HALF,
} from '../../../constants';
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
      { value !== KEYBOARD.empty && (
        <Pressable
          disabled={disabled}
          onPress={(): void => onPress(value)}
          style={[
            styles.keyboardKeyLayout,
          ]}
        >
          { value !== KEYBOARD.backspace && (
            <Text style={styles.keyboardKeyText}>
              { value }
            </Text>
          ) }
          { value === KEYBOARD.backspace && (
            <Ionicons
              color={
                disabled
                  ? COLORS.muted
                  : COLORS.text
              }
              name="backspace"
              size={SPACER + SPACER_HALF}
            />
          ) }
        </Pressable>
      ) }
    </View>
  );
}

export default memo(Key);
