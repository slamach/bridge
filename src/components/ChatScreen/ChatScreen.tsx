import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import colors from '../../styles/colors';
import Avatar from '../Avatar/Avatar';
import Message from './Message/Message';
import { styles } from './ChatScreenStyles';

const ChatScreen = () => {
  const messages = [
    {
      id: 1,
      content:
        "Hi! how are you? I'm doing great! Hi! how are you? I'm doing great! Hi! how are you? I'm doing great!",
      time: '19.05',
      sentByUser: false,
    },
    {
      id: 2,
      content: 'Hi! how are you?',
      time: '19:37',
      sentByUser: false,
    },
    {
      id: 3,
      content:
        "Hi! how are you? I'm doing great! Hi! how are you? I'm doing great! Hi! how are you? I'm doing great!",
      time: '19:48',
      sentByUser: true,
    },
    {
      id: 4,
      content: 'Hi! how are you?',
      time: '19:51',
      sentByUser: true,
    },
  ];

  return (
    // TODO: Multiline input
    <KeyboardAvoidingView
      style={styles.chatContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.chatHeader}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => console.log('Back Button Pressed')}
        >
          <Ionicons name="chevron-back" size={35} color={colors.highlight} />
        </TouchableOpacity>
        <Avatar name="Andrew Parker" />
        <View style={styles.chatTitleContainer}>
          <Text style={styles.chatTitle}>Andrew Parker</Text>
        </View>
        <View style={styles.chatHeaderBackground}></View>
      </View>
      <FlatList
        data={messages.reverse()}
        keyExtractor={(item) => item.id.toString()}
        style={styles.messageList}
        inverted
        renderItem={({ item }) => (
          <Message
            content={item.content}
            time={item.time}
            sentByUser={item.sentByUser}
          />
        )}
      />
      <View style={styles.chatFooter}>
        <TextInput
          style={styles.inputField}
          placeholder="Message..."
          placeholderTextColor="#8e8e93"
          blurOnSubmit={false}
          returnKeyType="send"
        />
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.sendButton}
          onPress={() => console.log('Send Button Pressed')}
        >
          <Ionicons name="arrow-up" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.chatFooterBackground}></View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
