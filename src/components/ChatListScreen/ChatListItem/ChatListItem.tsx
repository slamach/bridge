import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Avatar from '../../Avatar/Avatar';
import { styles } from './ChatListItemStyles';
import { ChatListScreenProps } from '../ChatListScreen';
import { useNavigation } from '@react-navigation/native';

type ChatListItemProps = {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  sentByUser: boolean;
};

const ChatListItem = (props: ChatListItemProps) => {
  const navigation = useNavigation<ChatListScreenProps['navigation']>();

  const MAX_CHARACTERS = 35;

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
            <Text style={styles.lastMessage}>
              {props.sentByUser ? 'You: ' : ''}
              {props.lastMessage.length >= MAX_CHARACTERS
                ? props.lastMessage.slice(
                    0,
                    MAX_CHARACTERS - 3 - (props.sentByUser ? 4 : 0)
                  ) + '...'
                : props.lastMessage}
            </Text>
          </View>
        </View>
        <Text style={styles.chatTime}>{props.time}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatListItem;
