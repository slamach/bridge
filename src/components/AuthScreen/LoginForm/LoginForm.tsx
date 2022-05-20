import { Text, TextInput } from 'react-native';
import React, { useRef } from 'react';
import AuthButton from '../AuthButton/AuthButton';
import AuthInput from '../AuthInput/AuthInput';
import { styles } from '../AuthScreenStyles';

const LoginForm = () => {
  const secondInput = useRef<TextInput>(null);

  return (
    <>
      <Text style={styles.authText}>Log Into an Existing Account</Text>
      <AuthInput
        inputProps={{
          placeholder: 'Username',
          autoCapitalize: 'none',
          autoComplete: 'username',
          autoCorrect: false,
          blurOnSubmit: false,
          returnKeyType: 'next',
          textContentType: 'username',
          onSubmitEditing: () => {
            secondInput.current?.focus();
          },
        }}
        topRadius
        style={{ marginBottom: 5 }}
      />
      <AuthInput
        ref={secondInput}
        inputProps={{
          placeholder: 'Password',
          autoCapitalize: 'none',
          autoComplete: 'password',
          autoCorrect: false,
          returnKeyType: 'go',
          secureTextEntry: true,
          textContentType: 'password',
        }}
        bottomRadius
        style={{ marginBottom: 15 }}
      />
      <AuthButton
        content="Log In"
        highlight
        style={styles.buttonMarginBottom}
        onPress={() => console.log('Log In Button Pressed')}
      />
      <AuthButton
        content="Create New Account"
        onPress={() => console.log('Move to Registration Button Pressed')}
      />
    </>
  );
};

export default LoginForm;
