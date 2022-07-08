import * as Linking from 'expo-linking';
import { LinkingOptions } from '@react-navigation/native';

import { RootStackParamList } from '../types/navigation';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      LogOut: 'log-out',
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
      SignIn: 'sign-in',
      SignUp: 'sign-up',
    },
  },
};

export default linking;
