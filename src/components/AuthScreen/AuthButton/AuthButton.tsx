import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './AuthButtonStyles';

type AuthButtonProps = {
  content: string;
  highlight?: boolean;
  marginBottom?: boolean;
};

const AuthButton = (props: AuthButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        ...(props.highlight ? [styles.highlightedButton] : []),
        ...(props.marginBottom ? [styles.marginBottom] : []),
      ]}
      activeOpacity={0.85}
      onPress={() => console.log('Button Pressed')}
    >
      <Text style={styles.buttonText}>{props.content}</Text>
    </TouchableOpacity>
  );
};

export default AuthButton;
