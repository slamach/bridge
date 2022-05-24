import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppState = {
  user: {
    id: number;
    name: string;
    username: string;
    token: string;
  } | null;
  chats: {
    id: number;
    name: string;
    lastMessage: string;
    time: string;
    sentByUser: boolean;
  }[];
};

const appSlice = createSlice({
  name: 'app',
  initialState: {
    user: null,
    chats: [
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
    ],
  } as AppState,
  reducers: {
    setUser: (state, action: PayloadAction<AppState['user']>) => {
      state.user = action.payload;
    },
    setChats: (state, action: PayloadAction<AppState['chats']>) => {
      state.chats = action.payload;
    },
  },
});

export default appSlice.reducer;
export const { setUser, setChats } = appSlice.actions;
