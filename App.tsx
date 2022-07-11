import React, { memo } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';

import Loader from './components/Loader';
import Navigation from './navigation';
import { persistedStore, store } from './store';
import useCachedResources from './hooks/use-cached-resources';

function App(): null | React.ReactElement {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate
          loading={(<Loader />)}
          persistor={persistedStore}
        >
          <Navigation />
          <StatusBar />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default memo(App);
