import { StyleSheet } from 'react-native';

import { COLORS } from '../../constants';

export default StyleSheet.create({
  centered: {
    alignItems: 'center',
    backgroundColor: COLORS.text,
    flex: 1,
    justifyContent: 'center',
    opacity: 0.9,
    width: '100%',
  },
});
