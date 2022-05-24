import { configureStore } from '@reduxjs/toolkit';
import appReducer from './modules/app';

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
