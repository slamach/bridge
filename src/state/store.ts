import { configureStore } from '@reduxjs/toolkit';
import appReducer from './modules/app';
import authReducer from './modules/auth';
import chatsReducer from './modules/chats';
import messagesReducer from './modules/messages';

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    chats: chatsReducer,
    messages: messagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
