import React, { memo } from 'react';
import { View } from 'react-native';
import { COLORS } from '../../../constants';

import styles from '../styles';

interface PINBlockLayoutProps {
  PIN: string;
  showDigits: boolean;
}

function PINBlockLayout(props: PINBlockLayoutProps): React.ReactElement {
  const {
    PIN,
    showDigits,
  } = props;

  return (
    <View style={styles.PINBlockContainer}>
      <View
        style={{
          ...styles.PINBlockEntry,
          backgroundColor: PIN.length > 0
            ? COLORS.text
            : COLORS.mutedLight,
        }}
      />
      <View
        style={{
          ...styles.PINBlockEntry,
          backgroundColor: PIN.length > 1
            ? COLORS.text
            : COLORS.mutedLight,
        }}
      />
      <View
        style={{
          ...styles.PINBlockEntry,
          backgroundColor: PIN.length > 2
            ? COLORS.text
            : COLORS.mutedLight,
        }}
      />
      <View
        style={{
          ...styles.PINBlockEntry,
          backgroundColor: PIN.length > 3
            ? COLORS.text
            : COLORS.mutedLight,
        }}
      />
    </View>
  );
}

export default memo(PINBlockLayout);
