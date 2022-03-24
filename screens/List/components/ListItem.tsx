import React, { memo, useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import styles from '../styles';
import { TokenEntry } from '../../../types/models';
// import generateOTP from '../../../utilities/otp';

interface ListItemProps {
  tokenEntry: TokenEntry;
}

const PERIOD = 30;

function ListItem(props: ListItemProps): React.ReactElement {
  const {
    tokenEntry,
  } = props;

  const [timeLeft, setTimeLeft] = useState<number>(PERIOD);

  useEffect(
    () => {
      const currentSeconds = new Date().getSeconds();
      const adjustedSeconds = currentSeconds > PERIOD
        ? currentSeconds - PERIOD
        : currentSeconds;
      setTimeLeft(PERIOD - adjustedSeconds);
    },
    [],
  );

  return (
    <View style={styles.listItemContainer}>
      <View style={styles.listItemLeft}>
        <Text style={styles.listItemName}>
          { tokenEntry.name }
        </Text>
        <Text style={styles.listItemOTP}>
          { tokenEntry.token }
        </Text>
      </View>
      <Text>
        { timeLeft }
      </Text>
    </View>
  );
}

export default memo(ListItem);
