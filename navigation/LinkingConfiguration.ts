import * as Linking from 'expo-linking';
import { LinkingOptions } from '@react-navigation/native';

import { RootStackParamList } from '../types/navigation';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
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
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
