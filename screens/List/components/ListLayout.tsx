import React, { memo } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Platform,
  Text,
  View,
} from 'react-native';

import DeleteEntryModal from './DeleteEntryModal';
import EditEntryModal from './EditEntryModal';
import ListItem from './ListItem';
import Loader from '../../../components/Loader';
import { SecretEntry } from '../../../types/models';
import { SPACER_HALF } from '../../../constants';
import styles from '../styles';

interface ListLayoutProps {
  deleteEntry: SecretEntry | null;
  deleteModalVisible: boolean;
  editEntry: SecretEntry | null;
  editModalVisible: boolean;
  handleCloseModal: (type: string) => void;
  handleDeleteEntry: (id: string) => Promise<void>;
  handleEditEntry: (updatedEntry: SecretEntry) => Promise<void>;
  list: SecretEntry[];
  loading: boolean;
  showDeleteModal: (id: string) => void;
  showEditModal: (id: string) => void;
}

function ListLayout(props: ListLayoutProps): React.ReactElement {
  const {
    deleteEntry,
    deleteModalVisible,
    editEntry,
    editModalVisible,
    handleCloseModal,
    handleDeleteEntry,
    handleEditEntry,
    list,
    loading,
    showDeleteModal,
    showEditModal,
  } = props;

  return (
    <View style={styles.container}>
      { loading && (
        <Loader />
      ) }
      { !loading && deleteModalVisible && (
        <DeleteEntryModal
          handleClose={(): void => handleCloseModal('delete')}
          handleDelete={handleDeleteEntry}
          secretEntry={deleteEntry as SecretEntry}
          showDeleteEntryModal={deleteModalVisible}
        />
      ) }
      { !loading && editModalVisible && (
        <EditEntryModal
          handleClose={(): void => handleCloseModal('edit')}
          handleDelete={showDeleteModal}
          handleSave={handleEditEntry}
          secretEntry={editEntry as SecretEntry}
          showEditEntryModal={editModalVisible}
        />
      ) }
      { !loading && list.length > 0 && (
        <FlatList
          contentContainerStyle={
            Platform.OS === 'ios'
              ? ({
                height: '100%',
                marginVertical: SPACER_HALF,
              })
              : null
          }
          data={list}
          keyExtractor={(item: SecretEntry): string => item.id}
          renderItem={
            ({ item }: ListRenderItemInfo<SecretEntry>): React.ReactElement => (
              <ListItem
                secretEntry={item}
                showDeleteModal={showDeleteModal}
                showEditModal={showEditModal}
              />
            )
          }
        />
      ) }
      { !loading && list.length === 0 && (
        <Text style={styles.nothingToDisplayText}>
          No entries found!
        </Text>
      ) }
    </View>
  );
}

export default memo(ListLayout);
