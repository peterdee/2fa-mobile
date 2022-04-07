import React, { memo } from 'react';
import { Text, View } from 'react-native';

import styles from '../styles';
import { TokenEntry } from '../../../types/models';

interface ListItemProps {
  timeLeft: number;
  tokenEntry: TokenEntry;
}

function ListItem(props: ListItemProps): React.ReactElement {
  const {
    timeLeft,
    tokenEntry,
  } = props;

  return (
    <View style={styles.listItemContainer}>
      <Text>
        { tokenEntry.token }
      </Text>
      <Text>
        { timeLeft }
      </Text>
    </View>
  );
}

export default memo(ListItem);
