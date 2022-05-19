import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { styles } from './ChatListScreenStyles';
import Avatar from '../Avatar/Avatar';
import ChatsItem from './ChatsItem/ChatsItem';

const ChatListScreen = () => {
  const conversations = [
    {
      id: 1,
      name: 'Dmitry Sviridov',
      lastMessage: "What's up man! How are you today? I wanna see you!",
      time: '21:03',
      sentByUser: false,
    },
    {
      id: 2,
      name: 'Vladislav Kuznetsov',
      lastMessage:
        "I'm testing this shit right now and seems like it doesn't work",
      time: '19.05',
      sentByUser: true,
    },
  ];

  return (
    <View style={styles.chatsContainer}>
      <View style={styles.chatsHeader}>
        <Text style={styles.chatsTitle}>Chats</Text>
        <Avatar size={40} name="slamach" />
      </View>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id.toString()}
        style={styles.chatList}
        renderItem={({ item }) => (
          <ChatsItem
            name={item.name}
            lastMessage={item.lastMessage}
            time={item.time}
            sentByUser={item.sentByUser}
          />
        )}
      />
    </View>
  );
};

export default ChatListScreen;
