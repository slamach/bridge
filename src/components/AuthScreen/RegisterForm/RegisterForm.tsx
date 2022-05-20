import { Text, TextInput } from 'react-native';
import React, { useRef } from 'react';
import AuthButton from '../AuthButton/AuthButton';
import AuthInput from '../AuthInput/AuthInput';
import { styles } from '../AuthScreenStyles';

const RegisterForm = () => {
  const secondInput = useRef<TextInput>(null);
  const thirdInput = useRef<TextInput>(null);

  return (
    <>
      <Text style={styles.authText}>Create New Account</Text>
      <AuthInput
        inputProps={{
          placeholder: 'Display Name',
          autoCapitalize: 'words',
          autoComplete: 'name',
          blurOnSubmit: false,
          returnKeyType: 'next',
          textContentType: 'name',
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
          placeholder: 'Username',
          autoCapitalize: 'none',
          autoComplete: 'username-new',
          autoCorrect: false,
          blurOnSubmit: false,
          returnKeyType: 'next',
          textContentType: 'username',
          onSubmitEditing: () => {
            thirdInput.current?.focus();
          },
        }}
        style={{ marginBottom: 5 }}
      />
      <AuthInput
        ref={thirdInput}
        inputProps={{
          placeholder: 'Password',
          autoCapitalize: 'none',
          autoComplete: 'password-new',
          autoCorrect: false,
          returnKeyType: 'go',
          secureTextEntry: true,
          textContentType: 'oneTimeCode',
        }}
        bottomRadius
        style={{ marginBottom: 15 }}
      />
      <AuthButton
        content="Create Account"
        highlight
        style={styles.buttonMarginBottom}
        onPress={() => console.log('Create Account Button Pressed')}
      />
      <AuthButton
        content="Log Into an Existing Account"
        onPress={() => console.log('Move to Login Button Pressed')}
      />
    </>
  );
};

export default RegisterForm;
