import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect } from 'react';
import { styles } from './ChatListScreenStyles';
import { styles as appStyles } from './../AppStyles';
import Avatar from '../Avatar/Avatar';
import ChatListItem from './ChatListItem/ChatListItem';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../App';
import { ChatListScreenReduxProps } from './ChatListScreenContainer';
import colors from '../../constants/colors';
import { ChatsStatus } from '../../state/modules/chats';

export type ChatListScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'ChatList'
> &
  ChatListScreenReduxProps;

const ChatListScreen = (props: ChatListScreenProps) => {
  useEffect(() => {
    props.getChats();
  }, []);

  return (
    <SafeAreaView style={appStyles.appContainer}>
      <View style={styles.chatsContainer}>
        <View style={styles.chatsHeader}>
          <Text style={styles.chatsTitle}>Chats</Text>
          <TouchableOpacity activeOpacity={0.85} onPress={props.logout}>
            <Avatar size={40} name={props.user!.name} />
          </TouchableOpacity>
        </View>
        {props.chatsStatus == ChatsStatus.LOADING && (
          <ActivityIndicator color={colors.text} />
        )}
        <FlatList
          data={props.chats}
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
