import React, {
  memo,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Text, View } from 'react-native';

import { COLORS } from '../../constants';
import { generateToken, getTimeLeft } from '../../utilities/otp';
import { KeyURIData, SecretEntry } from '../../types/models';
import styles from './styles';

interface TokenProps {
  accountNameStyles?: object;
  issuerStyles?: object;
  showDetails?: boolean;
  secretEntry: KeyURIData | SecretEntry;
  timeStyles?: object;
  tokenStyles?: object;
  wrapStyles?: object;
}

function Token(props: TokenProps): React.ReactElement {
  const {
    accountNameStyles,
    issuerStyles,
    showDetails,
    secretEntry,
    timeStyles,
    tokenStyles,
    wrapStyles,
  } = props;

  const [timeLeft, setTimeLeft] = useState<number>(getTimeLeft());
  const [token, setToken] = useState<number>(Number(generateToken(secretEntry)));

  useEffect(
    (): (() => void) => {
      const interval = setInterval(
        (): void => {
          const newTimeLeft = timeLeft - 1;
          if (newTimeLeft < 0) {
            setToken(Number(generateToken(secretEntry)));
            return setTimeLeft(getTimeLeft());
          }
          return setTimeLeft(newTimeLeft);
        },
        1000,
      );

      return (): void => clearInterval(interval);
    },
    [timeLeft],
  );

  const timeLeftColor = useMemo(
    (): object => {
      const style = {
        ...styles.text,
        ...timeStyles,
      };
      if (timeLeft < 10) {
        style.color = COLORS.negative;
      }
      return style;
    },
    [timeLeft],
  );

  return (
    <View
      style={{
        ...styles.wrap,
        ...wrapStyles,
      }}
    >
      { showDetails && (
        <>
          <Text
            style={{
              ...styles.issuer,
              ...issuerStyles,
            }}
          >
            { secretEntry.issuer }
          </Text>
          <Text
            style={{
              ...styles.accountName,
              ...accountNameStyles,
            }}
          >
            { secretEntry.accountName }
          </Text>
        </>
      ) }
      <View style={styles.tokenRow}>
        <Text
          style={{
            ...styles.text,
            ...tokenStyles,
          }}
        >
          { `${token}` }
        </Text>
        <Text
          style={timeLeftColor}
        >
          { timeLeft }
        </Text>
      </View>
    </View>
  );
}

Token.defaultProps = {
  accountNameStyles: {},
  issuerStyles: {},
  showDetails: true,
  timeStyles: {},
  tokenStyles: {},
  wrapStyles: {},
};

export default memo(Token);
