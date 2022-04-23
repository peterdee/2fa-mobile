import { StyleSheet } from 'react-native';

import { SPACER } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  digitContainer: {
    alignItems: 'center',
    display: 'flex',
    height: SPACER * 3,
    justifyContent: 'center',
    width: SPACER * 3,
  },
});
