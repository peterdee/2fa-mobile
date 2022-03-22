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
});
