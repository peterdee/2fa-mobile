import React, {
  memo,
  useEffect,
  useState,
} from 'react';
import { Text, View } from 'react-native';

import { getValue, KEYS } from '../../utilities/storage';
import Loader from '../../components/Loader';
import styles from './styles';

function PINCode(): React.ReactElement {
  const [loading, setLoading] = useState<boolean>(true);
  const [PIN, setPIN] = useState<number>();

  useEffect(
    (): void => {
      async function checkPin() {
        const pinValue = await getValue<number>(KEYS.pin);
        if (pinValue) {
          setPIN(pinValue);
        }
        setLoading(false);
      }

      checkPin();
    },
    [],
  );

  return (
    <View style={styles.container}>
      { loading && (
        <Loader />
      ) }
      { !loading && (
        <Text style={styles.title}>
          { `${PIN ? 'Has PIN' : 'Set up PIN'}` }
        </Text>
      ) }
    </View>
  );
}

export default memo(PINCode);
