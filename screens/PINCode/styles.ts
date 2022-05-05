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
  content: {
    display: 'flex',
    height: '100%',
    justifyContent: 'flex-end',
    paddingVertical: SPACER * 2,
    width: '100%',
  },
  controls: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    color: COLORS.text,
    fontSize: SPACER,
    fontWeight: 'bold',
    marginHorizontal: SPACER,
    textAlign: 'center',
  },
  digitContainer: {
    alignItems: 'center',
    display: 'flex',
    height: SPACER * 3,
    justifyContent: 'center',
    width: SPACER * 3,
  },
  // keyboard
  keyboardLayout: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: SPACER,
    width: '100%',
  },
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
  PINBlockTextEntry: {
    alignItems: 'center',
    borderRadius: SPACER + SPACER_HALF,
    display: 'flex',
    flexDirection: 'row',
    height: SPACER * 2,
    justifyContent: 'center',
    marginVertical: SPACER * 2,
    marginHorizontal: SPACER_HALF,
    width: SPACER * 2,
  },
  PINBlockText: {
    color: COLORS.accent,
    fontSize: SPACER + SPACER_HALF,
    fontWeight: 'bold',
  },
  PINError: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    height: SPACER * 2,
    justifyContent: 'center',
    marginBottom: SPACER,
  },
  PINErrorText: {
    color: COLORS.negative,
    fontSize: SPACER,
  },
  // set PIN button
  setPINButton: {
    marginBottom: SPACER,
    marginTop: SPACER * 4,
  },
});
