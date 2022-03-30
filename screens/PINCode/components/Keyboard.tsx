import React, { memo } from 'react';
import { View } from 'react-native';

import Key from './Key';
import { KEYBOARD } from '../../../constants';
import styles from '../styles';

interface KeyboardProps {
  disableBackspace: boolean;
  disableKeyboard: boolean;
  handlePress: (value: string) => void;
}

const rows: string[][] = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  [KEYBOARD.empty, '0', KEYBOARD.backspace],
];

function Keyboard(props: KeyboardProps): React.ReactElement {
  const {
    disableBackspace,
    disableKeyboard,
    handlePress,
  } = props;

  return (
    <View style={styles.keyboardLayout}>
      { rows.map((row: string[]): React.ReactElement => (
        <View style={styles.keyboardRowLayout}>
          { row.map((key: string): React.ReactElement => (
            <Key
              disabled={
                key === KEYBOARD.backspace
                  ? (disableBackspace || disableKeyboard)
                  : disableKeyboard
              }
              key={key}
              onPress={handlePress}
              value={key}
            />
          )) }
        </View>
      )) }
    </View>
  );
}

export default memo(Keyboard);
