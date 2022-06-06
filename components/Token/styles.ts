import { StyleSheet } from 'react-native';

import { COLORS, SPACER, SPACER_HALF } from '../../constants';

export default StyleSheet.create({
  wrap: {
    backgroundColor: COLORS.background,
    display: 'flex',
    flexDirection: 'column',
    height: SPACER * 7,
    justifyContent: 'space-between',
  },
  accountName: {
    color: COLORS.mutedDark,
    fontSize: SPACER,
    fontWeight: '200',
    marginTop: SPACER_HALF / 2,
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
