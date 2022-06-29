import { StyleSheet } from 'react-native';

import { COLORS, SPACER, SPACER_HALF } from '../../constants';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    height: '100%',
  },
  input: {
    backgroundColor: COLORS.mutedLight,
    marginTop: SPACER,
  },
  title: {
    color: COLORS.accent,
    fontSize: SPACER + SPACER_HALF,
    fontWeight: '300',
  },
});
