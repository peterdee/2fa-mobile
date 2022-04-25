import React, { memo } from 'react';
import { TextInput } from 'react-native';

import styles from './styles';

interface InputProps {
  handleChange: (value: string) => void;
  placeholder: string;
  value: string;
}

function Input(props: InputProps): React.ReactElement {
  const {
    handleChange,
    placeholder,
    value,
  } = props;

  return (
    <TextInput
      maxLength={32}
      onChangeText={handleChange}
      placeholder={placeholder}
      style={styles.input}
      value={value}
    />
  );
}

export default memo(Input);
