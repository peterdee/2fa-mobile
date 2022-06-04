import { StyleSheet } from 'react-native';

import { COLORS, SPACER, SPACER_HALF } from '../../constants';

export default StyleSheet.create({
  container: {
    backgroundColor: 'yellow',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: SPACER,
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
  tokenWrap: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.muted,
    marginVertical: SPACER_HALF / 2,
    paddingHorizontal: SPACER,
  },
  deleteButton: {
    alignItems: 'center',
    backgroundColor: COLORS.negative,
    display: 'flex',
    flexDirection: 'row',
    height: SPACER * 4,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: SPACER_HALF,
    width: SPACER * 4,
  },
  // delete entry modal
  deleteEntryModalText: {
    color: COLORS.textInverted,
    fontSize: SPACER + SPACER_HALF / 2,
  },
});
