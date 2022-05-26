import { Middleware } from 'redux';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { RootState } from '../../state/store';
import {
  establishWebSocketConnection,
  initiateMessageRecieving,
  initiateMessageSending,
  webSocketConnectionEstablished,
} from '../../state/modules/messages';
import { updateLastMessage } from '../../state/modules/chats';

const webSocketMiddleware: Middleware = (store) => {
  let stompClient: Client;

  return (next) => (action) => {
    if (establishWebSocketConnection.match(action)) {
      stompClient = new Client({
        brokerURL: 'ws://130.61.181.245/ws',
        connectHeaders: {
          Authorization: 'Bearer ' + store.getState().auth.user!.token,
        },
        webSocketFactory() {
          return new SockJS('http://130.61.181.245/ws');
        },
        onConnect() {
          stompClient.subscribe(
            '/user/queue/messages',
            function (message) {
              const messageObj: {
                id: string;
                chatId: string;
                senderId: string;
                text: string;
                date: string;
              } = JSON.parse(message.body);
              store.dispatch(
                updateLastMessage({
                  id: messageObj.chatId,
                  lastMessage: messageObj.text,
                  time: messageObj.date,
                  sentByUser:
                    messageObj.senderId === store.getState().auth.user!.id,
                })
              );
              if (
                store.getState().messages.activeChatId === messageObj.chatId
              ) {
                store.dispatch(
                  initiateMessageRecieving({
                    id: messageObj.id,
                    content: messageObj.text,
                    time: messageObj.date,
                    sentByUser:
                      messageObj.senderId === store.getState().auth.user!.id,
                  })
                );
              }
            },
            {
              Authorization: 'Bearer ' + store.getState().auth.user!.token,
            }
          );
          store.dispatch(webSocketConnectionEstablished());
        },
      });
      stompClient.activate();
    }

    if (initiateMessageSending.match(action) && stompClient?.connected) {
      stompClient.publish({
        destination: '/chat/messages',
        body: JSON.stringify({
          senderId: store.getState().auth.user!.id,
          chatId: action.payload.chatId,
          text: action.payload.message,
        }),
        headers: {
          Authorization: 'Bearer ' + store.getState().auth.user!.token,
        },
      });
    }

    next(action);
  };
};

export default webSocketMiddleware;
