import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import colors from '../../constants/colors';
import Avatar from '../Avatar/Avatar';
import Message from './Message/Message';
import { styles } from './ChatScreenStyles';
import { styles as appStyles } from './../AppStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../App';
import { ChatScreenReduxProps } from './ChatScreenContainer';
import { MessagesStatus, sendMessage } from '../../state/modules/messages';

export type ChatScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'Chat'
> &
  ChatScreenReduxProps;

const ChatScreen = (props: ChatScreenProps) => {
  useEffect(() => {
    props.changeActiveChatId(props.route.params.chatId);
    props.getMessages(props.route.params.chatId);
    return () => {
      props.clearActiveChatId();
    };
  }, []);

  const [inputMessage, setInputMessage] = useState<string>('');

  const handleMessageSending = () => {
    if (inputMessage) {
      props.sendMessage(props.route.params.chatId, inputMessage);
      setInputMessage('');
    }
  };

  return (
    // TODO: Multiline input
    <SafeAreaView style={appStyles.appContainer}>
      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.chatHeader}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => props.navigation.goBack()}
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
          data={props.messages}
          extraData={props.messages}
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
          refreshControl={
            <RefreshControl
              onRefresh={() => props.getMessages(props.route.params.chatId)}
              refreshing={props.status == MessagesStatus.LOADING}
              tintColor={colors.text}
              colors={[colors.text]}
            />
          }
        />
        <View style={styles.chatFooter}>
          <TextInput
            style={styles.inputField}
            placeholder="Message..."
            placeholderTextColor="#8e8e93"
            blurOnSubmit={false}
            returnKeyType="send"
            value={inputMessage}
            onChangeText={(text) => setInputMessage(text)}
            onSubmitEditing={handleMessageSending}
          />
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.sendButton}
            onPress={handleMessageSending}
          >
            <Ionicons name="arrow-up" size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.chatFooterBackground}></View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
