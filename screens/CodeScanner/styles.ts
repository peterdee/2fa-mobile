import { StyleSheet } from 'react-native';

import { COLORS, SPACER } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  modalText: {
    color: COLORS.mutedLight,
    fontSize: SPACER,
    fontWeight: '200',
    marginTop: SPACER,
  },
  timeText: {
    color: COLORS.textInverted,
  },
  tokenText: {
    color: COLORS.textInverted,
  },
  tokenWrap: {
    backgroundColor: COLORS.text,
    marginTop: SPACER,
    width: '80%',
  },
  inputStyles: {
    color: COLORS.textInverted,
    marginTop: SPACER,
  },
  disabledButtonStyle: {
    backgroundColor: COLORS.muted,
  },
});
