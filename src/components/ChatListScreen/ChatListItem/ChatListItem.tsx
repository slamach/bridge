import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Avatar from '../../Avatar/Avatar';
import { styles } from './ChatListItemStyles';
import { ChatListScreenProps } from '../ChatListScreen';
import { useNavigation } from '@react-navigation/native';

type ChatListItemProps = {
  id: string;
  name: string;
  lastMessage: string | null;
  time: string | null;
  sentByUser: boolean | null;
};

const ChatListItem = (props: ChatListItemProps) => {
  const navigation = useNavigation<ChatListScreenProps['navigation']>();

  const MAX_CHARACTERS = 35;

  const isToday = (targetDate: Date) => {
    const today = new Date();
    return (
      targetDate.getDate() == today.getDate() &&
      targetDate.getMonth() == today.getMonth() &&
      targetDate.getFullYear() == today.getFullYear()
    );
  };

  const getTimeFromDate = (targetDate: Date) => {
    const hours = targetDate.getHours();
    const minutes = targetDate.getMinutes();

    return `${hours.toString().length == 1 ? '0' + hours : hours}:${
      minutes.toString().length == 1 ? '0' + minutes : minutes
    }`;
  };

  let lastMessageTime: Date | null = null;
  if (props.time) {
    lastMessageTime = new Date(props.time);
  }

  const getDayAndMonthFromDate = (targetDate: Date) => {
    const day = targetDate.getDate();
    const month = targetDate.getMonth() + 1;

    return `${day.toString().length == 1 ? '0' + day : day}.${
      month.toString().length == 1 ? '0' + month : month
    }`;
  };

  return (
    // TODO: To do swipes I can use react-native-gesture-handler
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => navigation.navigate('Chat', { chatId: props.id })}
    >
      <View>
        <View style={styles.chatContainer}>
          <Avatar
            size={62}
            name={props.name}
            style={styles.avatarMarginRight}
          />
          <View>
            <Text style={styles.chatName}>{props.name}</Text>
            {props.lastMessage && (
              <Text style={styles.lastMessage}>
                {props.sentByUser ? 'You: ' : ''}
                {props.lastMessage.length >= MAX_CHARACTERS
                  ? props.lastMessage.slice(
                      0,
                      MAX_CHARACTERS - 3 - (props.sentByUser ? 4 : 0)
                    ) + '...'
                  : props.lastMessage}
              </Text>
            )}
          </View>
        </View>
        {lastMessageTime && (
          <Text style={styles.chatTime}>
            {isToday(lastMessageTime)
              ? getTimeFromDate(lastMessageTime)
              : getDayAndMonthFromDate(lastMessageTime)}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ChatListItem;
