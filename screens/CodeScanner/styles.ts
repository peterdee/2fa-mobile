import { StyleSheet } from 'react-native';

import { COLORS, SPACER } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    color: COLORS.mutedLight,
    fontSize: SPACER,
    fontWeight: '200',
    marginTop: SPACER,
    textAlign: 'left',
    width: '80%',
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
