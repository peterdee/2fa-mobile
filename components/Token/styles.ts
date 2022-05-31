import { StyleSheet } from 'react-native';

import { COLORS, SPACER, SPACER_HALF } from '../../constants';

export default StyleSheet.create({
  wrap: {
    backgroundColor: 'lime',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  accountName: {
    color: COLORS.mutedDark,
    fontSize: SPACER,
    fontWeight: '200',
    marginTop: SPACER_HALF / 2,
  },
  issuer: {
    color: COLORS.text,
    fontSize: SPACER + (SPACER_HALF / 2),
    fontWeight: 'normal',
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
