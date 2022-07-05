import { StyleSheet } from 'react-native';

import {
  COLORS,
  SPACER,
  SPACER_HALF,
} from '../../constants';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  modalText: {
    color: COLORS.textInverted,
    fontSize: SPACER + SPACER_HALF / 2,
    textAlign: 'center',
    width: '80%',
  },
  switchRow: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});
