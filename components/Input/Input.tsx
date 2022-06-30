import React, { memo } from 'react';
import { TextInput } from 'react-native';

import styles from './styles';

interface InputProps {
  customStyles?: object;
  handleChange: (value: string) => void;
  isPassword?: boolean;
  maxLength?: number;
  placeholder?: string;
  value: string;
}

function Input(props: InputProps): React.ReactElement {
  const {
    customStyles,
    handleChange,
    isPassword,
    maxLength,
    placeholder,
    value,
  } = props;

  return (
    <TextInput
      maxLength={maxLength}
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
  placeholder: '',
};

export default memo(Input);
