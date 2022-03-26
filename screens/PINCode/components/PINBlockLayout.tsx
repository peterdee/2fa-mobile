import React, { memo } from 'react';
import { Text, View } from 'react-native';

import { COLORS } from '../../../constants';
import styles from '../styles';

interface PINBlockLayoutProps {
  PIN: string;
  showDigits: boolean;
}

const entries = Object.keys(new Array(4).fill(0));

function PINBlockLayout(props: PINBlockLayoutProps): React.ReactElement {
  const {
    PIN,
    showDigits,
  } = props;

  return (
    <View style={styles.PINBlockContainer}>
      { entries.map((item: string): React.ReactElement => (
        <React.Fragment key={item}>
          { showDigits && (
            <Text
              style={styles.PINBlockText}
            >
              { PIN[Number(item)] }
            </Text>
          ) }
          { !showDigits && (
            <View
              style={{
                ...styles.PINBlockEntry,
                backgroundColor: PIN.length > Number(item)
                  ? COLORS.text
                  : COLORS.mutedLight,
              }}
            />
          ) }
        </React.Fragment>
      )) }
    </View>
  );
}

export default memo(PINBlockLayout);
