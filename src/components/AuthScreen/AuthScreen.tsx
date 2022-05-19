import React from 'react';
import { View, Text } from 'react-native';
import Logo from '../../assets/images/logo.svg';
import { styles } from './AuthScreenStyles';
import AuthButton from './AuthButton/AuthButton';

const AuthScreen = () => {
  return (
    <View style={styles.authContainer}>
      <Logo style={styles.logo} width="221" height="59" />
      <Text style={styles.authText}>Log Into an Existing Account</Text>
      <AuthButton
        content="Log In"
        highlight
        style={styles.buttonMarginBottom}
      />
      <AuthButton content="Create New Account" />
    </View>
  );
};

export default AuthScreen;
