import React from 'react';
import { GestureResponderEvent, Text, TouchableOpacity } from 'react-native';
import { styles } from './AuthButtonStyles';

type AuthButtonProps = {
  onPress: (event?: GestureResponderEvent) => void;
  content: string;
  highlight?: boolean;
  style?: {};
};

const AuthButton = (props: AuthButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        ...(props.highlight ? [styles.highlightedButton] : []),
        ...(props.style ? [props.style] : []),
      ]}
      activeOpacity={0.85}
      onPress={props.onPress}
    >
      <Text style={styles.buttonText}>{props.content}</Text>
    </TouchableOpacity>
  );
};

export default AuthButton;
