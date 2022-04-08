import React, { memo, useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { getValue, KEYS } from '../../utilities/storage';
import { TokenEntry } from '../../types/models';

import styles from './styles';

function List(): React.ReactElement {
  const [list, setList] = useState<TokenEntry[]>([]);

  useEffect(
    (): void => {
      async function getTokens(): Promise<void> {
        const entries = await getValue<TokenEntry[]>(KEYS.tokens);
        if (entries) {
          setList(entries);
        }
      }

      getTokens();
    },
    [],
  );

  return (
    <View style={styles.container}>
      { list.length > 0 && (
        <Text style={styles.title}>
          { `List: ${JSON.stringify(list)}` }
        </Text>
      ) }
      { list.length === 0 && (
        <Text style={styles.title}>
          Nothing to display
        </Text>
      ) }
    </View>
  );
}

export default memo(List);
