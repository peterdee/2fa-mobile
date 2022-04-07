import React, { memo, useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { getValue, KEYS } from '../../utilities/storage';
import ListItem from './components/ListItem';
import Loader from '../../components/Loader';
import styles from './styles';
import { TokenEntry } from '../../types/models';

function List(): React.ReactElement {
  const [list, setList] = useState<TokenEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(
    (): void => {
      async function getTokens(): Promise<void> {
        const entries = await getValue<TokenEntry[]>(KEYS.tokens);
        if (entries) {
          setList(entries);
        }
        setLoading(false);
      }

      getTokens();
    },
    [],
  );

  return (
    <View style={styles.container}>
      { loading && (
        <Loader />
      ) }
      { !loading && list.length > 0 && list.map((item: TokenEntry): React.ReactElement => (
        <ListItem
          key={item.token}
          timeLeft={30}
          tokenEntry={item}
        />
      )) }
      { !loading && list.length === 0 && (
        <Text style={styles.title}>
          Nothing to display
        </Text>
      ) }
    </View>
  );
}

export default memo(List);
