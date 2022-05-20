import { Text, TextInput } from 'react-native';
import React, { useRef } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AuthButton from '../AuthButton/AuthButton';
import AuthInput from '../AuthInput/AuthInput';
import { styles } from '../AuthScreenStyles';

const registerValidationSchema = Yup.object().shape({
  displayName: Yup.string().label('Display name').required(),
  username: Yup.string().label('Username').required().min(3),
  password: Yup.string().label('Password').required().min(8),
});

const RegisterForm = () => {
  const secondInput = useRef<TextInput>(null);
  const thirdInput = useRef<TextInput>(null);

  return (
    <>
      <Formik
        initialValues={{
          displayName: '',
          username: '',
          password: '',
        }}
        validationSchema={registerValidationSchema}
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
      >
        {({
          handleChange,
          handleSubmit,
          setFieldTouched,
          values,
          errors,
          touched,
        }) => (
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
                value: values.displayName,
                onChangeText: handleChange('displayName'),
                onBlur: () => setFieldTouched('displayName'),
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
                value: values.username,
                onChangeText: handleChange('username'),
                onBlur: () => setFieldTouched('username'),
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
                value: values.password,
                onChangeText: handleChange('password'),
                onBlur: () => setFieldTouched('password'),
                onSubmitEditing: () => handleSubmit(),
              }}
              bottomRadius
            />
            {errors.displayName && touched.displayName ? (
              <Text style={styles.errorMessage}>{errors.displayName}</Text>
            ) : errors.username && touched.username ? (
              <Text style={styles.errorMessage}>{errors.username}</Text>
            ) : errors.password && touched.password ? (
              <Text style={styles.errorMessage}>{errors.password}</Text>
            ) : null}
            <AuthButton
              content="Create Account"
              highlight
              style={{ marginTop: 15, marginBottom: 15 }}
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
      <AuthButton
        content="Log Into an Existing Account"
        onPress={() => console.log('Move to Login Button Pressed')}
      />
    </>
  );
};

export default RegisterForm;
