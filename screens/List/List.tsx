import React, {
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { getValue, KEYS, storeValue } from '../../utilities/storage';
import ListLayout from './components/ListLayout';
import { SecretEntry } from '../../types/models';

function List(): React.ReactElement {
  const [deleteEntry, setDeleteEntry] = useState<SecretEntry | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [editEntry, setEditEntry] = useState<SecretEntry | null>(null);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
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

  const handleCloseModal = (type: string): void => {
    if (type === 'delete') {
      setDeleteEntry(null);
      return setDeleteModalVisible(false);
    }
    setEditEntry(null);
    return setEditModalVisible(false);
  };

  const handleDeleteEntry = useCallback(
    (id: string): Promise<void> => {
      const updatedList = list.filter((entry: SecretEntry): boolean => entry.id !== id);
      setDeleteModalVisible(false);
      setList(updatedList);
      return storeValue<SecretEntry[]>(KEYS.secrets, updatedList);
    },
    [list],
  );

  const handleEditEntry = useCallback(
    (updatedEntry: SecretEntry): Promise<void> => {
      const updatedList = list.map((entry: SecretEntry): SecretEntry => {
        if (entry.id === updatedEntry.id) {
          return updatedEntry;
        }
        return entry;
      });
      setEditModalVisible(false);
      setList(updatedList);
      return storeValue<SecretEntry[]>(KEYS.secrets, updatedList);
    },
    [list],
  );

  const showDeleteModal = useCallback(
    (id: string): void => {
      const [entry] = list.filter((item: SecretEntry): boolean => item.id === id);
      setDeleteModalVisible(true);
      return setDeleteEntry(entry);
    },
    [list],
  );

  const showEditModal = useCallback(
    (id: string): void => {
      const [entry] = list.filter((item: SecretEntry): boolean => item.id === id);
      setEditModalVisible(true);
      return setEditEntry(entry);
    },
    [list],
  );

  return (
    <ListLayout
      deleteEntry={deleteEntry}
      deleteModalVisible={deleteModalVisible}
      editEntry={editEntry}
      editModalVisible={editModalVisible}
      handleCloseModal={handleCloseModal}
      handleDeleteEntry={handleDeleteEntry}
      handleEditEntry={handleEditEntry}
      list={list}
      loading={loading}
      showDeleteModal={showDeleteModal}
      showEditModal={showEditModal}
    />
  );
}

export default memo(List);
