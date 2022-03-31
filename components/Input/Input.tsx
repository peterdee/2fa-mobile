import React, { memo } from 'react';
import { TextInput } from 'react-native';

import styles from './styles';

interface InputProps {
  handleChange: (value: string) => void;
  maxLength?: number;
  placeholder: string;
  value: string;
}

function Input(props: InputProps): React.ReactElement {
  const {
    handleChange,
    maxLength,
    placeholder,
    value,
  } = props;

  return (
    <TextInput
      maxLength={maxLength}
      onChangeText={handleChange}
      placeholder={placeholder}
      style={styles.input}
      value={value}
    />
  );
}

Input.defaultProps = {
  maxLength: undefined,
};

export default memo(Input);
