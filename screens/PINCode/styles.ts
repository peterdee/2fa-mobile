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
  keyboardLayout: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
  keyboardRowLayout: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  keyboardKeyLayout: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
