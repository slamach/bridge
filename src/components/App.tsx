import React, { useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import navigationTheme from '../constants/navigationTheme';
import AuthScreen from './AuthScreen/AuthScreenContainer';
import ChatListScreen from './ChatListScreen/ChatListScreenContainer';
import ChatScreen from './ChatScreen/ChatScreenContainer';
import { Provider } from 'react-redux';
import { store } from '../state/store';
import { AppReduxProps } from './AppContainer';
import { InitialProps } from 'expo/build/launch/withExpoRoot.types';
import { AppStatus } from '../state/modules/app';

export type AppStackParamList = {
  ChatList: undefined;
  Chat: {
    chatId: string;
    name: string;
  };
};

const AppStack = createNativeStackNavigator<AppStackParamList>();

type AppProps = AppReduxProps & InitialProps;

const App = (props: AppProps) => {
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      props.initAuth();
    }
    prepare();
  }, []);

  const onRootReady = useCallback(async () => {
    if (props.status !== AppStatus.LOADING) {
      await SplashScreen.hideAsync();
    }
  }, [props.status]);

  if (props.status === AppStatus.LOADING) {
    return null;
  }

  return (
    <>
      <Provider store={store}>
        <NavigationContainer theme={navigationTheme} onReady={onRootReady}>
          {props.user ? (
            <AppStack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <AppStack.Screen name="ChatList" component={ChatListScreen} />
              <AppStack.Screen name="Chat" component={ChatScreen} />
            </AppStack.Navigator>
          ) : (
            <AuthScreen />
          )}
        </NavigationContainer>
      </Provider>
      <StatusBar style="light" />
    </>
  );
};

export default App;
