import React from 'react';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AuthScreen from './AuthScreen/AuthScreen';
import { styles } from './AppStyles';

export const App = () => {
  return (
    <SafeAreaView style={styles.appContainer}>
      <AuthScreen />
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default App;
