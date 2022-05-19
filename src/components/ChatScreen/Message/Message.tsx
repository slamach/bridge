import { View, Text } from 'react-native';
import React from 'react';
import { styles } from './MessageStyles';

type MessageProps = {
  content: string;
  time: string;
  sentByUser: boolean;
};

const Message = (props: MessageProps) => {
  return (
    <View
      style={[
        styles.messageContainer,
        ...(props.sentByUser ? [styles.messageContainerSentByUser] : []),
      ]}
    >
      <View
        style={[
          styles.messageInsideContainer,
          ...(props.sentByUser
            ? [styles.messageInsideContainerSentByUser]
            : []),
        ]}
      >
        <Text style={styles.messageContent}>{props.content}</Text>
      </View>
      <Text style={styles.messageTime}>{props.time}</Text>
    </View>
  );
};

export default Message;
