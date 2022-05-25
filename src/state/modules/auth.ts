import {
  AnyAction,
  createSlice,
  PayloadAction,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import { USER_STORAGE_KEY } from '../../constants/constants';
import { RootState } from '../store';

export enum AuthStatus {
  IDLE,
  LOADING,
  SUCCEEDED,
  FAILED,
}

export type AuthState = {
  status: AuthStatus;
  errorMessage: string | null;
  user: {
    id: number;
    name: string;
    username: string;
    token: string;
  } | null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: AuthStatus.IDLE,
    errorMessage: null,
    user: null,
  } as AuthState,
  reducers: {
    authInitSuccess: (state, action: PayloadAction<AuthState['user']>) => {
      state.user = action.payload;
    },
    authRequest: (state) => {
      if (state.status == AuthStatus.IDLE) {
        state.status = AuthStatus.LOADING;
      }
    },
    authSuccess: (
      state,
      action: PayloadAction<{
        // TODO: User DTO from API
        id: number;
        name: string;
        username: string;
        token: string;
      }>
    ) => {
      state.user = action.payload;
      if (state.status == AuthStatus.LOADING) {
        state.status = AuthStatus.SUCCEEDED;
      }
    },
    authFailure: (
      state,
      action: PayloadAction<{
        // TODO: Error DTO from API
        message: string;
      }>
    ) => {
      state.errorMessage = action.payload.message;
      if (state.status == AuthStatus.LOADING) {
        state.status = AuthStatus.FAILED;
      }
    },
    setLogout: (state) => {
      state.errorMessage = null;
      state.user = null;
    },
  },
});

export default authSlice.reducer;
export const {
  authInitSuccess,
  authRequest,
  authSuccess,
  authFailure,
  setLogout,
} = authSlice.actions;

export const login =
  (username: string, password: string) =>
  async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
    dispatch(authRequest());
    const user = {
      id: 1,
      name: username,
      username: username,
      token: '',
    };
    dispatch(authSuccess(user));
    await SecureStore.setItemAsync(USER_STORAGE_KEY, JSON.stringify(user));
  };

export const register =
  (name: string, username: string, password: string) =>
  async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
    dispatch(authRequest());
    const user = {
      id: 1,
      name: name,
      username: username,
      token: '',
    };
    dispatch(authSuccess(user));
    await SecureStore.setItemAsync(USER_STORAGE_KEY, JSON.stringify(user));
  };

export const logout =
  () => async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
    dispatch(setLogout());
    await SecureStore.setItemAsync(USER_STORAGE_KEY, '');
  };
