import { StyleSheet } from 'react-native';

import { COLORS, SPACER } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    color: COLORS.textInverted,
    fontSize: SPACER,
  },
  timeText: {
    color: COLORS.textInverted,
  },
  tokenText: {
    color: COLORS.textInverted,
  },
  tokenWrap: {
    width: '80%',
  },
});
