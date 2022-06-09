import { StyleSheet } from 'react-native';

import { COLORS, SPACER, SPACER_HALF } from '../../constants';

export default StyleSheet.create({
  confirmationModalText: {
    color: COLORS.textInverted,
    fontSize: SPACER + SPACER_HALF / 2,
    marginBottom: SPACER,
    textAlign: 'center',
    width: '80%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACER,
  },
  deleteAllButton: {
    backgroundColor: COLORS.negative,
    marginTop: SPACER * 2,
  },
  deleteAllButtonDisabled: {
    backgroundColor: COLORS.muted,
  },
  // Switch row
  switchRow: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACER * 2,
    width: '80%',
  },
  text: {
    color: COLORS.text,
    fontSize: SPACER + SPACER_HALF / 2,
  },
});
