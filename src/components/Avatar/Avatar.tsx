import { View, Text } from 'react-native';
import React from 'react';
import { styles } from './AvatarStyles';

type AvatarProps = {
  size?: number;
  name: string;
  style?: {};
};

const Avatar = (props: AvatarProps) => {
  return (
    <View
      style={[
        styles.avatarContainer,
        ...(props.size
          ? [
              {
                width: props.size,
                height: props.size,
                borderRadius: props.size / 2,
              },
            ]
          : []),
        ...(props.style ? [props.style] : []),
      ]}
    >
      <Text
        style={[
          styles.avatarContent,
          ...(props.size
            ? [
                {
                  fontSize: props.size / 2.5,
                },
              ]
            : []),
        ]}
      >
        {props.name.toUpperCase()[0]}
      </Text>
    </View>
  );
};

export default Avatar;
