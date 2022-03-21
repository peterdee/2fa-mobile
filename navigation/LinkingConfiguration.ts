import * as Linking from 'expo-linking';
import { LinkingOptions } from '@react-navigation/native';

import { RootStackParamList } from '../types/navigation';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Modal: 'modal',
      NotFound: '*',
      PINCode: 'pin',
      Root: {
        screens: {
          List: {
            screens: {
              ListScreen: 'list',
            },
          },
          CodeScanner: {
            screens: {
              CodeScannerScreen: 'codescanner',
            },
          },
        },
      },
    },
  },
};

export default linking;
