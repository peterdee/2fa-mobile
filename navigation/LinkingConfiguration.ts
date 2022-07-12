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
          CodeScanner: {
            screens: {
              CodeScannerScreen: 'codescanner',
            },
          },
          List: {
            screens: {
              ListScreen: 'list',
            },
          },
          Settings: {
            screens: {
              SettingsScreen: 'settings',
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
