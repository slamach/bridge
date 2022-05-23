import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import { styles } from './ChatListScreenStyles';
import { styles as appStyles } from './../AppStyles';
import Avatar from '../Avatar/Avatar';
import ChatListItem from './ChatListItem/ChatListItem';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../App';

export type ChatListScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'ChatList'
>;

const ChatListScreen = (props: ChatListScreenProps) => {
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
    <SafeAreaView style={appStyles.appContainer}>
      <View style={styles.chatsContainer}>
        <View style={styles.chatsHeader}>
          <Text style={styles.chatsTitle}>Chats</Text>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => console.log('Logout Button Pressed')}
          >
            <Avatar size={40} name="slamach" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.id.toString()}
          style={styles.chatList}
          renderItem={({ item }) => (
            <ChatListItem
              id={item.id}
              name={item.name}
              lastMessage={item.lastMessage}
              time={item.time}
              sentByUser={item.sentByUser}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChatListScreen;
