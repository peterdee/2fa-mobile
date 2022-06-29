import React, { memo, useMemo } from 'react';
import { Pressable, Text } from 'react-native';

import styles from './styles';

interface WideButtonProps {
  buttonStyle?: object;
  disabled?: boolean;
  disabledButtonStyle?: object;
  onPress: () => void;
  text: string;
  textStyle?: object;
  upperCase?: boolean;
}

function WideButton(props: WideButtonProps): React.ReactElement {
  const {
    buttonStyle,
    disabled,
    disabledButtonStyle,
    onPress,
    text,
    textStyle,
    upperCase,
  } = props;

  const calculatedButtonStyle = useMemo(
    (): object => ({
      ...styles.pressable,
      ...buttonStyle,
      ...(disabled && disabledButtonStyle),
    }),
    [
      buttonStyle,
      disabled,
      disabledButtonStyle,
    ],
  );

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={calculatedButtonStyle}
    >
      <Text
        style={{
          ...styles.text,
          ...textStyle,
        }}
      >
        { upperCase ? text.toUpperCase() : text }
      </Text>
    </Pressable>
  );
}

WideButton.defaultProps = {
  buttonStyle: {},
  disabled: false,
  disabledButtonStyle: {},
  textStyle: {},
  upperCase: true,
};

export default memo(WideButton);
