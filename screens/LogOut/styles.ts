import { StyleSheet } from 'react-native';

import {
  COLORS,
  SPACER,
  SPACER_HALF,
} from '../../constants';

export default StyleSheet.create({
  button: {
    backgroundColor: COLORS.negative,
    marginTop: SPACER * 2,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: COLORS.negative,
    fontSize: SPACER + SPACER_HALF / 2,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '80%',
  },
});
