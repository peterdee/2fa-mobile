import React, { memo } from 'react';
import { TextInput } from 'react-native';

import styles from './styles';

interface InputProps {
  customStyles?: object;
  handleChange: (value: string) => void;
  isPassword?: boolean;
  maxLength?: number;
  multiline?: boolean;
  placeholder?: string;
  value: string;
}

function Input(props: InputProps): React.ReactElement {
  const {
    customStyles,
    handleChange,
    isPassword,
    maxLength,
    multiline,
    placeholder,
    value,
  } = props;

  return (
    <TextInput
      maxLength={maxLength}
      multiline={multiline}
      onChangeText={handleChange}
      placeholder={placeholder}
      style={{
        ...styles.input,
        ...customStyles,
      }}
      secureTextEntry={isPassword}
      value={value}
    />
  );
}

Input.defaultProps = {
  customStyles: {},
  isPassword: false,
  maxLength: undefined,
  multiline: false,
  placeholder: '',
};

export default memo(Input);
