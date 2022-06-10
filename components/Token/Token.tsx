import React, {
  memo,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  Pressable,
  Text,
  View,
} from 'react-native';

import { COLORS, SPACER, SPACER_HALF } from '../../constants';
import { generateToken, getTimeLeft } from '../../utilities/otp';
import { KeyURIData, SecretEntry } from '../../types/models';
import styles from './styles';

interface TokenProps {
  accountNameStyles?: object;
  handleOpenMenu?: null | (() => void);
  issuerStyles?: object;
  secretEntry: KeyURIData | SecretEntry;
  showDetails?: boolean;
  showMenu?: boolean;
  timeStyles?: object;
  tokenStyles?: object;
  wrapStyles?: object;
}

function Token(props: TokenProps): React.ReactElement {
  const {
    accountNameStyles,
    handleOpenMenu,
    issuerStyles,
    secretEntry,
    showDetails,
    showMenu,
    timeStyles,
    tokenStyles,
    wrapStyles,
  } = props;

  const [timeLeft, setTimeLeft] = useState<number>(getTimeLeft());
  const [token, setToken] = useState<number>();

  useEffect(
    (): void => {
      async function generateInitialToken() {
        const tokenValue = await generateToken(secretEntry);
        return setToken(Number(tokenValue));
      }

      generateInitialToken();
    },
    [],
  );

  useEffect(
    (): (() => void) => {
      const interval = setInterval(
        async (): Promise<void> => {
          const newTimeLeft = timeLeft - 1;
          if (newTimeLeft < 0) {
            const tokenValue = await generateToken(secretEntry);
            setToken(Number(tokenValue));
            return setTimeLeft(getTimeLeft(secretEntry.period));
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
        <View style={styles.tokenRow}>
          <View style={styles.detailsColumn}>
            <Text
              numberOfLines={1}
              style={{
                ...styles.issuer,
                ...issuerStyles,
              }}
            >
              { secretEntry.issuer }
            </Text>
            <Text
              numberOfLines={1}
              style={{
                ...styles.accountName,
                ...accountNameStyles,
              }}
            >
              { secretEntry.accountName }
            </Text>
          </View>
          { showMenu && handleOpenMenu && (
            <Pressable
              onPress={handleOpenMenu}
              style={styles.menuButton}
            >
              <Ionicons
                color={COLORS.text}
                name="ellipsis-vertical"
                size={SPACER + SPACER_HALF}
              />
            </Pressable>
          ) }
        </View>
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
  handleOpenMenu: null,
  issuerStyles: {},
  showDetails: true,
  showMenu: false,
  timeStyles: {},
  tokenStyles: {},
  wrapStyles: {},
};

export default memo(Token);
