import {
  AnyAction,
  createSlice,
  PayloadAction,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import axios from 'axios';
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
      if (state.status == ChatsStatus.IDLE) {
        state.status = ChatsStatus.LOADING;
      }
    },
    chatsSuccess: (state, action: PayloadAction<ChatsState['chats']>) => {
      state.chats = action.payload;
      if (state.status == ChatsStatus.LOADING) {
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
      if (state.status == ChatsStatus.LOADING) {
        state.status = ChatsStatus.FAILED;
      }
    },
  },
});

export default chatsSlice.reducer;
export const { chatsRequest, chatsSuccess, chatsFailure } = chatsSlice.actions;

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

      dispatch(chatsSuccess(chats));
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
