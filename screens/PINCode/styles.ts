import { StyleSheet } from 'react-native';

import {
  COLORS,
  SPACER,
  SPACER_HALF,
} from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: COLORS.text,
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
  // keyboard
  keyboardRowLayout: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: SPACER,
    width: '100%',
  },
  keyboardKeyLayout: {
    alignItems: 'center',
    backgroundColor: COLORS.mutedLight,
    borderRadius: SPACER + SPACER_HALF,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: SPACER * 3,
    width: SPACER * 3,
  },
  keyboardKeyText: {
    color: COLORS.text,
    fontSize: SPACER + (SPACER_HALF / 2),
  },
  // PIN block
  PINBlockContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  PINBlockEntry: {
    borderRadius: SPACER + SPACER_HALF,
    height: SPACER_HALF * 3,
    marginVertical: SPACER * 2,
    marginHorizontal: SPACER_HALF,
    width: SPACER_HALF * 3,
  },
  PINBlockText: {
    color: COLORS.accent,
    fontSize: SPACER + SPACER_HALF / 2,
  },
});
