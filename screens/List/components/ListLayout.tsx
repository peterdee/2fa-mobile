import React, { memo } from 'react';
import { FlatList, View } from 'react-native';

import Loader from '../../../components/Loader';
import Token from '../../../components/Token';
import { SecretEntry } from '../../../types/models';
import styles from '../styles';

interface ListLayoutProps {
  list: SecretEntry[];
  loading: boolean;
}

function ListLayout(props: ListLayoutProps): React.ReactElement {
  const {
    list,
    loading,
  } = props;

  const renderItem = (
    { index, item }: { index: number, item: SecretEntry },
  ): React.ReactElement => (
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
  );

  return (
    <View style={styles.container}>
      { loading && (
        <Loader />
      ) }
      { !loading && list.length > 0 && (
        <FlatList
          data={list}
          keyExtractor={(item: SecretEntry): string => item.id}
          renderItem={renderItem}
        />
      ) }
    </View>
  );
}

export default memo(ListLayout);
