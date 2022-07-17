import { StyleSheet } from 'react-native';

import { COLORS, SPACER, SPACER_HALF } from '../../constants';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    height: '100%',
  },
  formErrorContainer: {
    alignItems: 'center',
    display: 'flex',
    height: SPACER + SPACER_HALF,
    justifyContent: 'center',
    marginTop: SPACER,
  },
  formErrorText: {
    color: COLORS.negative,
    fontSize: SPACER,
  },
  input: {
    marginTop: SPACER_HALF,
  },
  inputLabel: {
    color: COLORS.text,
    fontSize: SPACER,
    fontWeight: '200',
    marginTop: SPACER,
    textAlign: 'left',
    width: '80%',
  },
  modalText: {
    color: COLORS.textInverted,
    fontSize: SPACER + SPACER_HALF / 4,
    marginTop: SPACER * 2,
    textAlign: 'center',
    width: '80%',
  },
  recoveryQuestion: {
    color: COLORS.accent,
    fontSize: SPACER + SPACER_HALF / 4,
    marginTop: SPACER,
    textAlign: 'center',
    width: '80%',
  },
  title: {
    color: COLORS.accent,
    fontSize: SPACER + SPACER_HALF,
    fontWeight: '300',
  },
  subtitle: {
    color: COLORS.text,
    fontSize: SPACER + SPACER_HALF / 4,
    marginTop: SPACER,
    textAlign: 'center',
    width: '80%',
  },
});
