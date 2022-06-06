import { StyleSheet } from 'react-native';

import { SPACER, SPACER_HALF } from '../../constants';

export default StyleSheet.create({
  button: {
    marginTop: SPACER * 2,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACER,
  },
  title: {
    fontSize: SPACER + SPACER_HALF,
    fontWeight: 'bold',
  },
});
