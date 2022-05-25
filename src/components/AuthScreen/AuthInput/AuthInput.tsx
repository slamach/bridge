import { View, TextInput, TextInputProps } from 'react-native';
import React, { ForwardedRef, forwardRef } from 'react';
import { styles } from './AuthInputStyles';
import colors from '../../../constants/colors';

type AuthInputProps = {
  inputProps?: TextInputProps;
  topRadius?: boolean;
  bottomRadius?: boolean;
  style?: {};
};

const AuthInput = forwardRef(
  (props: AuthInputProps, ref: ForwardedRef<TextInput>) => {
    return (
      <TextInput
        ref={ref}
        style={[
          styles.authInput,
          ...(props.topRadius ? [styles.authInputRadiusTop] : []),
          ...(props.bottomRadius ? [styles.authInputRadiusBottom] : []),
          ...(props.style ? [props.style] : []),
        ]}
        placeholderTextColor="#7b7b7b"
        {...props.inputProps}
        selectionColor={colors.highlight}
      />
    );
  }
);

export default AuthInput;
