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

interface KeyLayoutProps {
  disableBackspace: boolean;
  disableKeyboard: boolean;
  onPress: (value: string) => void;
  value: string;
}

function KeyLayout(props: KeyLayoutProps): React.ReactElement {
  const {
    disableBackspace,
    disableKeyboard,
    onPress,
    value,
  } = props;

  return (
    <View style={styles.digitContainer}>
      { value !== KEYBOARD.empty && (
        <Pressable
          disabled={
            value === KEYBOARD.backspace
              ? disableBackspace
              : disableKeyboard
          }
          onPress={(): void => onPress(value)}
          style={[
            styles.keyboardKeyLayout,
          ]}
        >
          { value !== KEYBOARD.backspace && (
            <Text
              style={{
                ...styles.keyboardKeyText,
                color: disableKeyboard
                  ? COLORS.muted
                  : COLORS.text,
              }}
            >
              { value }
            </Text>
          ) }
          { value === KEYBOARD.backspace && (
            <Ionicons
              color={
                disableBackspace
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

export default memo(KeyLayout);
