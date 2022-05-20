import React from 'react';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AuthScreen from './AuthScreen/AuthScreen';
import ChatListScreen from './ChatListScreen/ChatListScreen';
import ChatScreen from './ChatScreen/ChatScreen';
import { styles } from './AppStyles';

export const App = () => {
  return (
    <SafeAreaView style={styles.appContainer}>
      <ChatScreen />
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default App;
