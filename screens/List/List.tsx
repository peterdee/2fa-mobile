import React, { memo, useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { getValue, KEYS } from '../../utilities/storage';
import Loader from '../../components/Loader';
import { SecretEntry } from '../../types/models';
import styles from './styles';
import Token from '../../components/Token';

function List(): React.ReactElement {
  const [list, setList] = useState<SecretEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(
    (): void => {
      async function getSecrets(): Promise<void> {
        const entries = await getValue<SecretEntry[]>(KEYS.secrets);
        if (Array.isArray(entries) && entries.length > 0) {
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
      { !loading && list.length > 0 && list.map(
        (item: SecretEntry, index: number): React.ReactElement => (
          <Token
            key={item.id}
            secretEntry={item}
            wrapStyles={{
              ...styles.tokenWrap,
              borderBottomWidth: index === list.length - 1
                ? 0
                : 1,
            }}
          />
        ),
      ) }
      { !loading && list.length === 0 && (
        <View style={styles.nothingToDisplay}>
          <Text style={styles.nothingToDisplayText}>
            Nothing to display
          </Text>
        </View>
      ) }
    </View>
  );
}

export default memo(List);
