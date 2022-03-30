import React, { memo } from 'react';
import { View } from 'react-native';

import cells from './cells';
import Digit from './Key';

function PINCodeLayout(props: PINCodeLayoutProps): React.ReactElement {
  return (
    <View>
      { cells.map((row) => row.map((digit) => (
        <Digit
          handlePress={(value: string): void => console.log('pressed', value)}
          key={digit.value}
          pressable={digit.pressable}
          value={digit.value}
        />
      )))}
    </View>
  );
}

export default memo(PINCodeLayout);
