import React, { memo } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';

import Navigation from './navigation';
import useCachedResources from './hooks/useCachedResources';

function App(): null | React.ReactElement {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Navigation />
      <StatusBar />
    </SafeAreaProvider>
  );
}

export default memo(App);
