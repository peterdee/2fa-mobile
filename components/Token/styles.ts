import { Platform, StyleSheet } from 'react-native';

import { COLORS, SPACER, SPACER_HALF } from '../../constants';

export default StyleSheet.create({
  wrap: {
    backgroundColor: COLORS.background,
    display: 'flex',
    flexDirection: 'column',
    height: Platform.OS === 'ios'
      ? SPACER * 7
      : SPACER * 8,
    justifyContent: 'space-between',
    paddingTop: SPACER_HALF / 2,
  },
  accountName: {
    color: COLORS.mutedDark,
    fontSize: SPACER,
    fontWeight: '200',
    marginTop: SPACER_HALF / 2,
  },
  detailsColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  issuer: {
    color: COLORS.accent,
    fontSize: SPACER + (SPACER_HALF / 2),
  },
  text: {
    color: COLORS.text,
    fontSize: SPACER * 3,
    fontWeight: '200',
  },
  tokenRow: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
