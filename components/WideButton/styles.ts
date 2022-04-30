import { StyleSheet } from 'react-native';

import { COLORS, SPACER, SPACER_HALF } from '../../constants';

export default StyleSheet.create({
  pressable: {
    alignItems: 'center',
    backgroundColor: COLORS.accent,
    borderRadius: SPACER_HALF,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: SPACER,
    width: '80%',
  },
  text: {
    color: COLORS.textInverted,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
