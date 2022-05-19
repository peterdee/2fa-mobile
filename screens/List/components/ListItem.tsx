import React, { memo, useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { SecretEntry } from '../../../types/models';
import styles from '../styles';

interface ListItemProps {
  secretEntry: SecretEntry;
}

const PERIOD = 30;

function ListItem(props: ListItemProps): React.ReactElement {
  const {
    secretEntry,
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
          { secretEntry.issuer}
        </Text>
        <Text style={styles.listItemName}>
          { secretEntry?.accountName}
        </Text>
        <Text style={styles.listItemOTP}>
          { secretEntry.secret }
        </Text>
      </View>
      <Text>
        { timeLeft }
      </Text>
    </View>
  );
}

export default memo(ListItem);
