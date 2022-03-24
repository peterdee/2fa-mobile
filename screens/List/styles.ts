import { StyleSheet } from 'react-native';

import { COLORS, SPACER } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  listItemLeft: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  listItemName: {
    color: COLORS.muted,
    fontSize: SPACER,
    fontWeight: '200',
  },
  listItemOTP: {
    color: COLORS.text,
    fontSize: SPACER * 2,
    fontWeight: '300',
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
