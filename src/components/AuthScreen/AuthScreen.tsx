import React from 'react';
import { View } from 'react-native';
import Logo from '../../assets/images/logo.svg';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';
import { styles } from './AuthScreenStyles';

const AuthScreen = () => {
  return (
    <View style={styles.authContainer}>
      <Logo style={styles.logo} width="221" height="59" />
      <RegisterForm />
    </View>
  );
};

export default AuthScreen;
