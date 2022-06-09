import React, { memo } from 'react';
import { Switch as RNSwitch } from 'react-native';

import { COLORS } from '../../constants';

interface SwitchProps {
  handleChange: (value: boolean) => void;
  value: boolean;
}

function Switch(props: SwitchProps) {
  const {
    handleChange,
    value,
  } = props;

  return (
    <RNSwitch
      ios_backgroundColor={COLORS.muted}
      onValueChange={handleChange}
      thumbColor={COLORS.textInverted}
      trackColor={{
        false: COLORS.muted,
        true: COLORS.accent,
      }}
      value={value}
    />
  );
}

export default memo(Switch);
