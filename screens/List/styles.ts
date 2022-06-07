import { StyleSheet } from 'react-native';

import { COLORS, SPACER, SPACER_HALF } from '../../constants';

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: SPACER,
  },
  nothingToDisplayText: {
    color: COLORS.text,
    fontSize: SPACER + SPACER_HALF,
    marginTop: SPACER * 3,
    textAlign: 'center',
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
  deleteEntryModalAccountName: {
    color: COLORS.muted,
    fontSize: SPACER + SPACER_HALF / 2,
    marginBottom: SPACER,
    textAlign: 'center',
    width: '80%',
  },
  deleteEntryModalIssuer: {
    color: COLORS.textInverted,
    fontSize: SPACER + SPACER_HALF,
    marginBottom: SPACER,
    textAlign: 'center',
    width: '80%',
  },
  deleteEntryModalText: {
    color: COLORS.textInverted,
    fontSize: SPACER + SPACER_HALF / 2,
    marginBottom: SPACER,
    textAlign: 'center',
    width: '80%',
  },
  // edit entry modal
  contentRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  inputStyles: {
    color: COLORS.textInverted,
    marginTop: SPACER,
  },
  modalText: {
    color: COLORS.mutedLight,
    fontSize: SPACER,
    fontWeight: '200',
    marginTop: SPACER,
  },
});
