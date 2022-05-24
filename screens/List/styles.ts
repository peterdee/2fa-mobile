import { StyleSheet } from 'react-native';

import { COLORS, SPACER, SPACER_HALF } from '../../constants';

export default StyleSheet.create({
  container: {
    backgroundColor: 'yellow',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: SPACER,
  },
  nothingToDisplay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nothingToDisplayText: {
    color: COLORS.textInverted,
    fontSize: SPACER + SPACER_HALF,
    fontWeight: '200',
  },
});
