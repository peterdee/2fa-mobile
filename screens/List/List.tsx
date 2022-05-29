import React, { memo, useEffect, useState } from 'react';

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

  return (
    <ListLayout
      list={list}
      loading={loading}
    />
  );
}

export default memo(List);
