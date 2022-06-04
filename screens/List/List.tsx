import React, {
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { getValue, KEYS } from '../../utilities/storage';
import ListLayout from './components/ListLayout';
import { SecretEntry } from '../../types/models';

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

  const handleDelete = useCallback(
    async (id: string): Promise<void> => {
      const [item] = list.filter((value: SecretEntry): boolean => value.id === id);
      return console.log('deleting', item.issuer, id);
    },
    [list],
  );

  return (
    <ListLayout
      handleDelete={handleDelete}
      list={list}
      loading={loading}
    />
  );
}

export default memo(List);
