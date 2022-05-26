import { View, Text } from 'react-native';
import React from 'react';
import { styles } from './MessageStyles';
import {
  getDayAndMonthFromDate,
  getTimeFromDate,
  isToday,
} from '../../ChatListScreen/ChatListItem/ChatListItem';

type MessageProps = {
  content: string;
  time: string;
  sentByUser: boolean;
};

const Message = (props: MessageProps) => {
  const messageTime = new Date(props.time);

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
      <Text style={styles.messageTime}>
        {isToday(messageTime)
          ? getTimeFromDate(messageTime)
          : getDayAndMonthFromDate(messageTime)}
      </Text>
    </View>
  );
};

export default Message;
