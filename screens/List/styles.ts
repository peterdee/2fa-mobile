import { StyleSheet } from 'react-native';

import { COLORS, SPACER, SPACER_HALF } from '../../constants';

export default StyleSheet.create({
  container: {
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
    top: SPACER_HALF / 2,
    width: SPACER * 4,
  },
  editButton: {
    alignItems: 'center',
    backgroundColor: COLORS.mutedDark,
    display: 'flex',
    flexDirection: 'row',
    height: SPACER * 4,
    justifyContent: 'center',
    position: 'absolute',
    right: SPACER * 7,
    top: SPACER_HALF / 2,
    width: SPACER * 4,
  },
  itemControlText: {
    color: COLORS.textInverted,
  },
  // delete entry modal
  deleteEntryModalText: {
    color: COLORS.textInverted,
    fontSize: SPACER + SPACER_HALF / 2,
  },
  // edit entry modal
  inputStyles: {
    color: COLORS.textInverted,
    marginTop: SPACER,
  },
  modalText: {
    color: COLORS.mutedLight,
    fontSize: SPACER,
    fontWeight: '200',
    marginTop: SPACER,
    textAlign: 'left',
    width: '80%',
  },
});
