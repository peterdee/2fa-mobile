import { StyleSheet } from 'react-native';

import { COLORS, SPACER } from '../../constants';

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
  },
  text: {
    color: COLORS.textInverted,
    fontSize: SPACER,
  },
});
