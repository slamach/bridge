import { registerRootComponent } from 'expo';
import React from 'react';
import { Provider } from 'react-redux';
import App from './components/AppContainer';
import { store } from './state/store';

registerRootComponent(() => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
});
