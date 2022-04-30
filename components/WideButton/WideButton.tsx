import React, { memo } from 'react';
import { Pressable, Text } from 'react-native';

import styles from './styles';

interface WideButtonProps {
  buttonStyle?: object,
  disabled?: boolean;
  onPress: () => void;
  text: string;
  textStyle?: object,
}

function WideButton(props: WideButtonProps): React.ReactElement {
  const {
    buttonStyle,
    disabled,
    onPress,
    text,
    textStyle,
  } = props;

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={{
        ...styles.pressable,
        ...buttonStyle,
      }}
    >
      <Text
        style={{
          ...styles.text,
          ...textStyle,
        }}
      >
        { text }
      </Text>
    </Pressable>
  );
}

WideButton.defaultProps = {
  buttonStyle: {},
  disabled: false,
  textStyle: {},
};

export default memo(WideButton);
