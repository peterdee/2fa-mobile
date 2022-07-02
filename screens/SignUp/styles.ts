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
  textArea: {
    height: SPACER * 6,
    marginTop: SPACER_HALF,
    paddingBottom: SPACER,
    paddingTop: SPACER,
  },
  title: {
    color: COLORS.accent,
    fontSize: SPACER + SPACER_HALF,
    fontWeight: '300',
  },
});
