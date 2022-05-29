import React, { memo } from 'react';

import Token from '../../../components/Token';
import { SecretEntry } from '../../../types/models';
import styles from '../styles';

interface ListItemProps {
  index: number;
  listLength: number;
  secretEntry: SecretEntry;
}

function ListItem(props: ListItemProps): React.ReactElement {
  const {
    index,
    listLength,
    secretEntry,
  } = props;

  return (
    <Token
      key={secretEntry.id}
      secretEntry={secretEntry}
      wrapStyles={{
        ...styles.tokenWrap,
        borderBottomWidth: index === listLength - 1
          ? 0
          : 1,
      }}
    />
  );
}

export default memo(ListItem);
