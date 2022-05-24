import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import navigationTheme from '../styles/navigationTheme';
import AuthScreen from './AuthScreen/AuthScreenContainer';
import ChatListScreen from './ChatListScreen/ChatListScreenContainer';
import ChatScreen from './ChatScreen/ChatScreen';
import { Provider } from 'react-redux';
import { store } from '../state/store';
import { AppReduxProps } from './AppContainer';
import { InitialProps } from 'expo/build/launch/withExpoRoot.types';

export type AppStackParamList = {
  ChatList: undefined;
  Chat: {
    chatId: number;
  };
};

const AppStack = createNativeStackNavigator<AppStackParamList>();

type AppProps = AppReduxProps & InitialProps;

const App = (props: AppProps) => {
  return (
    <Provider store={store}>
      <NavigationContainer theme={navigationTheme}>
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
        <StatusBar style="light" />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
