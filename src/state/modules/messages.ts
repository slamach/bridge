import {
  AnyAction,
  createSlice,
  PayloadAction,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { string } from 'yup';
import messagesAPI from '../../api/messagesAPI';
import { RootState } from '../store';

export enum MessagesStatus {
  IDLE,
  LOADING,
  SUCCEEDED,
  FAILED,
}

type MessagesError = {
  status: number;
  data: any;
};

type MessagesState = {
  status: MessagesStatus;
  errorMessage: string | null;
  messages:
    | {
        id: string;
        content: string;
        time: string;
        sentByUser: boolean;
      }[]
    | null;
  activeChatId: string | null;
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    status: MessagesStatus.IDLE,
    errorMessage: null,
    messages: null,
    activeChatId: null,
  } as MessagesState,
  reducers: {
    messagesRequest: (state) => {
      if (
        state.status === MessagesStatus.IDLE ||
        state.status === MessagesStatus.SUCCEEDED
      ) {
        state.status = MessagesStatus.LOADING;
      }
    },
    messagesSuccess: (
      state,
      action: PayloadAction<MessagesState['messages']>
    ) => {
      state.messages = action.payload;
      if (state.status === MessagesStatus.LOADING) {
        state.status = MessagesStatus.SUCCEEDED;
      }
    },
    messagesFailure: (state, action: PayloadAction<MessagesError>) => {
      switch (action.payload.status) {
        case 0:
          state.errorMessage = 'Unexpected app error. Try again!';
          break;
        case 500:
          state.errorMessage = 'Unexpected server error. Try again!';
          break;
        default:
          state.errorMessage = 'Unexpected error. Try again!';
          break;
      }
      if (
        state.status === MessagesStatus.LOADING ||
        state.status === MessagesStatus.SUCCEEDED
      ) {
        state.status = MessagesStatus.FAILED;
      }
    },
    changeActiveChatId: (state, action: PayloadAction<string>) => {
      state.activeChatId = action.payload;
    },
    clearActiveChatId: (state) => {
      state.activeChatId = null;
      state.messages = null;
    },
    establishWebSocketConnection: (state) => {
      if (
        state.status === MessagesStatus.IDLE ||
        state.status === MessagesStatus.SUCCEEDED
      ) {
        state.status = MessagesStatus.LOADING;
      }
    },
    webSocketConnectionEstablished: (state) => {
      if (state.status === MessagesStatus.LOADING) {
        state.status = MessagesStatus.SUCCEEDED;
      }
    },
    initiateMessageRecieving: (
      state,
      action: PayloadAction<{
        id: string;
        content: string;
        time: string;
        sentByUser: boolean;
      }>
    ) => {
      state.messages?.unshift(action.payload);
    },
    initiateMessageSending: (
      state,
      action: PayloadAction<{
        chatId: string;
        message: string;
      }>
    ) => {},
  },
});

export default messagesSlice.reducer;
export const {
  messagesRequest,
  messagesSuccess,
  messagesFailure,
  changeActiveChatId,
  clearActiveChatId,
  establishWebSocketConnection,
  webSocketConnectionEstablished,
  initiateMessageRecieving,
  initiateMessageSending,
} = messagesSlice.actions;

export const getMessages =
  (chatId: string) =>
  async (
    dispatch: ThunkDispatch<RootState, unknown, AnyAction>,
    getState: () => RootState
  ) => {
    dispatch(messagesRequest());
    try {
      const response = await messagesAPI.getMessages(
        chatId,
        getState().auth.user!.token
      );
      const messages = response.data.payload.content.map((item) => ({
        id: item.id,
        content: item.text,
        time: item.date,
        sentByUser: item.sentByUser,
      }));

      dispatch(messagesSuccess(messages));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(
          messagesFailure({
            status: error.response!.status,
            data: error.response!.data,
          })
        );
      } else {
        dispatch(
          messagesFailure({
            status: 0,
            data: null,
          })
        );
      }
    }
  };

export const sendMessage =
  (chatId: string, text: string) =>
  async (
    dispatch: ThunkDispatch<RootState, unknown, AnyAction>,
    getState: () => RootState
  ) => {
    try {
      await messagesAPI.sendMessage(
        getState().auth.user!.id,
        chatId,
        text,
        getState().auth.user!.token
      );
    } catch (error) {}
  };
