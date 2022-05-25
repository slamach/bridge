import { AnyAction, createSlice, ThunkDispatch } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import { USER_STORAGE_KEY } from '../../constants/constants';
import { RootState } from '../store';
import { authInitSuccess } from './auth';

export enum AppStatus {
  IDLE,
  LOADING,
  SUCCEEDED,
  FAILED,
}

export type AppState = {
  status: AppStatus;
};

const appSlice = createSlice({
  name: 'app',
  initialState: {
    status: AppStatus.LOADING,
  } as AppState,
  reducers: {
    authInitLoading: (state) => {
      if (state.status == AppStatus.IDLE) {
        state.status = AppStatus.LOADING;
      }
    },
    authInitLoaded: (state) => {
      if (state.status == AppStatus.LOADING) {
        state.status = AppStatus.SUCCEEDED;
      }
    },
  },
});

export default appSlice.reducer;
export const { authInitLoading, authInitLoaded } = appSlice.actions;

export const initAuth =
  () => async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
    dispatch(authInitLoading());
    const userFromStorage = await SecureStore.getItemAsync(USER_STORAGE_KEY);
    if (userFromStorage) {
      dispatch(authInitSuccess(JSON.parse(userFromStorage)));
    }
    dispatch(authInitLoaded());
  };
