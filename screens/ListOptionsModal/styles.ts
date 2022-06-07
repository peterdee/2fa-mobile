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
  infoText: {
    color: COLORS.text,
    fontSize: SPACER + SPACER_HALF / 2,
  },
});
