import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import navigationTheme from '../styles/navigationTheme';
import AuthScreen from './AuthScreen/AuthScreen';
import ChatListScreen from './ChatListScreen/ChatListScreen';
import ChatScreen from './ChatScreen/ChatScreen';

export type AppStackParamList = {
  ChatList: undefined;
  Chat: {
    chatId: number;
  };
};

const AppStack = createNativeStackNavigator<AppStackParamList>();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return (
    <NavigationContainer theme={navigationTheme}>
      {isAuthenticated ? (
        <AppStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <AppStack.Screen name="ChatList" component={ChatListScreen} />
          <AppStack.Screen name="Chat" component={ChatScreen} />
        </AppStack.Navigator>
      ) : (
        <AuthScreen authenticate={() => setIsAuthenticated(true)} />
      )}
      <StatusBar style="light" />
    </NavigationContainer>
  );
};

export default App;
