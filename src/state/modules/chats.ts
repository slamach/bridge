import {
  AnyAction,
  createSlice,
  PayloadAction,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { string } from 'yup';
import chatsAPI from '../../api/chatsAPI';
import { RootState } from '../store';

export enum ChatsStatus {
  IDLE,
  LOADING,
  SUCCEEDED,
  FAILED,
}

type ChatsError = {
  status: number;
  data: any;
};

type ChatsState = {
  status: ChatsStatus;
  errorMessage: string | null;
  chats:
    | {
        id: string;
        name: string;
        lastMessage: string | null;
        time: string | null;
        sentByUser: boolean | null;
      }[]
    | null;
  activeChatId: string | null;
};

const chatsSlice = createSlice({
  name: 'chats',
  initialState: {
    status: ChatsStatus.IDLE,
    errorMessage: null,
    chats: null,
  } as ChatsState,
  reducers: {
    chatsRequest: (state) => {
      if (state.status === ChatsStatus.IDLE) {
        state.status = ChatsStatus.LOADING;
      }
    },
    chatsSuccess: (state, action: PayloadAction<ChatsState['chats']>) => {
      state.chats = action.payload;
      if (state.status === ChatsStatus.LOADING) {
        state.status = ChatsStatus.SUCCEEDED;
      }
    },
    chatsFailure: (state, action: PayloadAction<ChatsError>) => {
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
      if (state.status === ChatsStatus.LOADING) {
        state.status = ChatsStatus.FAILED;
      }
    },
    updateLastMessage: (
      state,
      action: PayloadAction<{
        id: string;
        lastMessage: string;
        time: string;
        sentByUser: boolean;
      }>
    ) => {
      const foundIndex = state.chats?.findIndex(
        (chat) => chat.id === action.payload.id
      );
      if (foundIndex !== undefined && foundIndex >= 0) {
        const foundObj = state.chats![foundIndex];
        foundObj.lastMessage = action.payload.lastMessage;
        foundObj.time = action.payload.time;
        foundObj.sentByUser = action.payload.sentByUser;
        state.chats!.splice(foundIndex, 1);
        state.chats!.unshift(foundObj);
      }
    },
  },
});

export default chatsSlice.reducer;
export const { chatsRequest, chatsSuccess, chatsFailure, updateLastMessage } =
  chatsSlice.actions;

export const getChats =
  () =>
  async (
    dispatch: ThunkDispatch<RootState, unknown, AnyAction>,
    getState: () => RootState
  ) => {
    dispatch(chatsRequest());
    try {
      const response = await chatsAPI.getChats(getState().auth.user!.token);
      const chats = response.data.payload.map((item) => ({
        id: item.id,
        name: item.participantDtoList[0].name,
        lastMessage: item.lastMessage ? item.lastMessage.text : null,
        time: item.lastMessage ? item.lastMessage.date : null,
        sentByUser: item.lastMessage ? item.lastMessage.sentByUser : null,
      }));

      dispatch(
        chatsSuccess(
          chats.sort((a, b) => {
            if (!a.time) {
              return -1;
            } else if (!b.time) {
              return 1;
            }

            const aDate = new Date(a.time);
            const bDate = new Date(b.time);

            if (aDate === bDate) {
              return 0;
            } else if (aDate > bDate) {
              return -1;
            } else {
              return 1;
            }
          })
        )
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(
          chatsFailure({
            status: error.response!.status,
            data: error.response!.data,
          })
        );
      } else {
        dispatch(
          chatsFailure({
            status: 0,
            data: null,
          })
        );
      }
    }
  };
