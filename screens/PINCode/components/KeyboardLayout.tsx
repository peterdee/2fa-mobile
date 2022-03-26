import React, { memo } from 'react';
import { View } from 'react-native';

import { KEYBOARD } from '../../../constants';
import KeyLayout from './KeyLayout';
import styles from '../styles';

interface KeyboardLayoutProps {
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

function KeyboardLayout(props: KeyboardLayoutProps): React.ReactElement {
  const {
    disableBackspace,
    disableKeyboard,
    handlePress,
  } = props;

  return (
    <View style={styles.keyboardLayout}>
      { rows.map((row: string[]): React.ReactElement => (
        <View
          key={row[0]}
          style={styles.keyboardRowLayout}
        >
          { row.map((key: string): React.ReactElement => (
            <KeyLayout
              disableBackspace={disableBackspace}
              disableKeyboard={disableKeyboard}
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

export default memo(KeyboardLayout);
