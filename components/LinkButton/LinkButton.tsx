import React, { memo, useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';

import styles from './styles';

interface LinkButtonProps {
  buttonStyle?: object,
  disabled?: boolean;
  onPress: () => void;
  text: string;
  textStyle?: object;
  upperCase?: boolean;
}

function LinkButton(props: LinkButtonProps): React.ReactElement {
  const {
    buttonStyle,
    disabled,
    onPress,
    text,
    textStyle,
    upperCase,
  } = props;

  const calculatedTextStyle = useMemo(
    (): object => ({
      ...styles.text,
      ...textStyle,
    }),
    [
      disabled,
      textStyle,
    ],
  );

  return (
    <View style={styles.container}>
      <Pressable
        disabled={disabled}
        onPress={onPress}
        style={{ ...buttonStyle }}
      >
        <Text style={calculatedTextStyle}>
          { upperCase ? text.toUpperCase() : text }
        </Text>
      </Pressable>
    </View>
  );
}

LinkButton.defaultProps = {
  buttonStyle: {},
  disabled: false,
  textStyle: {},
  upperCase: false,
};

export default memo(LinkButton);
