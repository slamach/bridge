import {
  AnyAction,
  createSlice,
  PayloadAction,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum ChatsStatus {
  IDLE,
  LOADING,
  SUCCEEDED,
  FAILED,
}

type ChatsState = {
  status: ChatsStatus;
  chats:
    | {
        id: number;
        name: string;
        lastMessage: string;
        time: string;
        sentByUser: boolean;
      }[]
    | null;
};

const chatsSlice = createSlice({
  name: 'chats',
  initialState: {
    status: ChatsStatus.IDLE,
    chats: null,
  } as ChatsState,
  reducers: {
    chatsRequest: (state) => {
      if (state.status == ChatsStatus.IDLE) {
        state.status = ChatsStatus.LOADING;
      }
    },
    chatsSuccess: (
      state,
      action: PayloadAction<
        {
          // TODO: Chat DTO from API
          id: number;
          name: string;
          lastMessage: string;
          time: string;
          sentByUser: boolean;
        }[]
      >
    ) => {
      state.chats = action.payload;
      if (state.status == ChatsStatus.LOADING) {
        state.status = ChatsStatus.SUCCEEDED;
      }
    },
    chatsFailure: (state) => {
      if (state.status == ChatsStatus.LOADING) {
        state.status = ChatsStatus.FAILED;
      }
    },
  },
});

export default chatsSlice.reducer;
export const { chatsRequest, chatsSuccess, chatsFailure } = chatsSlice.actions;

export const getChats =
  () => async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
    dispatch(chatsRequest());
    const chats = [
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
    dispatch(chatsSuccess(chats));
  };
