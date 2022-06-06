import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

const SpaceMono = require('../assets/fonts/SpaceMono-Regular.ttf');

export default function useCachedResources(): boolean {
  const [isLoadingComplete, setLoadingComplete] = useState<boolean>(false);

  useEffect(
    (): void => {
      async function asyncLoading() {
        SplashScreen.preventAutoHideAsync();

        await Font.loadAsync({
          ...FontAwesome.font,
          'space-mono': SpaceMono,
        });

        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }

      asyncLoading();
    },
    [],
  );

  return isLoadingComplete;
}
