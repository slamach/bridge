import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Avatar from '../../Avatar/Avatar';
import { styles } from './ChatsItemStyles';

type ChatsItemProps = {
  name: string;
  lastMessage: string;
  time: string;
  sentByUser: boolean;
};

const ChatsItem = (props: ChatsItemProps) => {
  const MAX_CHARACTERS = 35;

  return (
    // TODO: To do swipes I can use react-native-gesture-handler
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => console.log('Chat Item Pressed')}
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

export default ChatsItem;
