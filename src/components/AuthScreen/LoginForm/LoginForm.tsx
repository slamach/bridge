import { Text, TextInput } from 'react-native';
import React, { useRef } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AuthButton from '../AuthButton/AuthButton';
import AuthInput from '../AuthInput/AuthInput';
import { styles } from '../AuthScreenStyles';

const loginValidationSchema = Yup.object().shape({
  username: Yup.string().label('Username').required(),
  password: Yup.string().label('Password').required(),
});

const LoginForm = () => {
  const secondInput = useRef<TextInput>(null);

  return (
    <>
      <Text style={styles.authText}>Log Into an Existing Account</Text>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={loginValidationSchema}
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
            <AuthInput
              inputProps={{
                placeholder: 'Username',
                autoCapitalize: 'none',
                autoComplete: 'username',
                autoCorrect: false,
                blurOnSubmit: false,
                returnKeyType: 'next',
                textContentType: 'username',
                value: values.username,
                onChangeText: handleChange('username'),
                onBlur: () => setFieldTouched('username'),
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
                value: values.password,
                onChangeText: handleChange('password'),
                onBlur: () => setFieldTouched('password'),
                onSubmitEditing: () => handleSubmit(),
              }}
              bottomRadius
            />
            {errors.username && touched.username ? (
              <Text style={styles.errorMessage}>{errors.username}</Text>
            ) : errors.password && touched.password ? (
              <Text style={styles.errorMessage}>{errors.password}</Text>
            ) : null}
            <AuthButton
              content="Log In"
              highlight
              style={{ marginTop: 15, marginBottom: 15 }}
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
      <AuthButton
        content="Create New Account"
        onPress={() => console.log('Move to Registration Button Pressed')}
      />
    </>
  );
};

export default LoginForm;
