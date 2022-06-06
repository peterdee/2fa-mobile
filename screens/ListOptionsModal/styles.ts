import { StyleSheet } from 'react-native';

import { SPACER, SPACER_HALF } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACER,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  title: {
    fontSize: SPACER + SPACER_HALF,
    fontWeight: 'bold',
  },
});
