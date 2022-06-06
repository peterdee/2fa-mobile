import React, { memo } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Text,
  View,
} from 'react-native';

import ListItem from './ListItem';
import Loader from '../../../components/Loader';
import { SecretEntry } from '../../../types/models';
import styles from '../styles';

interface ListLayoutProps {
  handleDelete: (id: string) => Promise<void>;
  list: SecretEntry[];
  loading: boolean;
}

function ListLayout(props: ListLayoutProps): React.ReactElement {
  const {
    handleDelete,
    list,
    loading,
  } = props;

  return (
    <View style={styles.container}>
      { loading && (
        <Loader />
      ) }
      { !loading && list.length > 0 && (
        <FlatList
          data={list}
          keyExtractor={(item: SecretEntry): string => item.id}
          renderItem={
            ({ item }: ListRenderItemInfo<SecretEntry>): React.ReactElement => (
              <ListItem
                handleDelete={handleDelete}
                secretEntry={item}
              />
            )
          }
        />
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

export default memo(ListLayout);
