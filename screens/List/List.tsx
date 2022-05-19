import React, { memo, useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { getValue, KEYS } from '../../utilities/storage';
import ListItem from './components/ListItem';
import Loader from '../../components/Loader';
import { SecretEntry } from '../../types/models';
import styles from './styles';

function List(): React.ReactElement {
  const [list, setList] = useState<SecretEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(
    (): void => {
      async function getSecrets(): Promise<void> {
        const entries = await getValue<SecretEntry[]>(KEYS.secrets);
        if (entries) {
          setList(entries);
        }
        setLoading(false);
      }

      getSecrets();
    },
    [],
  );

  return (
    <View style={styles.container}>
      { loading && (
        <Loader />
      ) }
      { !loading && list.length > 0 && list.map((item: SecretEntry): React.ReactElement => (
        <ListItem
          key={item.id}
          secretEntry={item}
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
