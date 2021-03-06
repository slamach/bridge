import React, { useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import Logo from '../../assets/images/logo.svg';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';
import { styles } from './AuthScreenStyles';
import { styles as appStyles } from './../AppStyles';
import { AuthScreenReduxProps } from './AuthScreenContainer';

type AuthScreenProps = AuthScreenReduxProps;

const AuthScreen = (props: AuthScreenProps) => {
  const [isRegistrationActive, setIsRegistrationActive] =
    useState<boolean>(false);

  return (
    <SafeAreaView style={appStyles.appContainer}>
      <View style={styles.authContainer}>
        <Logo style={styles.logo} width="221" height="59" />
        {isRegistrationActive ? (
          <RegisterForm
            setLoginActive={() => setIsRegistrationActive(false)}
            register={props.register}
          />
        ) : (
          <LoginForm
            errorMessage={props.errorMessage}
            setRegistrationActive={() => setIsRegistrationActive(true)}
            login={props.login}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;
