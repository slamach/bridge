import {
  AnyAction,
  createSlice,
  PayloadAction,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import authAPI from '../../api/authAPI';
import { USER_STORAGE_KEY } from '../../constants/constants';
import { RootState } from '../store';

export enum AuthStatus {
  IDLE,
  LOADING,
  SUCCEEDED,
  FAILED,
}

type AuthError = {
  status: number;
  data: any;
};

export type AuthState = {
  status: AuthStatus;
  errorMessage: string | null;
  user: {
    id: string;
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
      if (state.status === AuthStatus.IDLE) {
        state.status = AuthStatus.LOADING;
      }
    },
    authSuccess: (state, action: PayloadAction<AuthState['user']>) => {
      state.user = action.payload;
      if (state.status === AuthStatus.LOADING) {
        state.status = AuthStatus.SUCCEEDED;
      }
    },
    authFailure: (state, action: PayloadAction<AuthError>) => {
      switch (action.payload.status) {
        case 400:
          switch (action.payload.data.code) {
            case 1:
              state.errorMessage = 'Invalid username or password.';
              break;
          }
          break;
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
      if (state.status === AuthStatus.LOADING) {
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
    try {
      const response = await authAPI.login(username, password);
      const user = {
        id: response.data.payload.user.id,
        name: response.data.payload.user.name,
        username: response.data.payload.user.username,
        token: response.data.payload.token,
      };
      dispatch(authSuccess(user));
      await SecureStore.setItemAsync(USER_STORAGE_KEY, JSON.stringify(user));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(
          authFailure({
            status: error.response!.status,
            data: error.response!.data,
          })
        );
      } else {
        dispatch(
          authFailure({
            status: 0,
            data: null,
          })
        );
      }
    }
  };

export const register =
  (name: string, username: string, password: string) =>
  async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
    dispatch(authRequest());
    try {
      const response = await authAPI.register(name, username, password);
      const user = {
        id: response.data.payload.user.id,
        name: response.data.payload.user.name,
        username: response.data.payload.user.username,
        token: response.data.payload.token,
      };
      dispatch(authSuccess(user));
      await SecureStore.setItemAsync(USER_STORAGE_KEY, JSON.stringify(user));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(
          authFailure({
            status: error.response!.status,
            data: error.response!.data,
          })
        );
      } else {
        dispatch(
          authFailure({
            status: 0,
            data: null,
          })
        );
      }
    }
  };

export const logout =
  () => async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
    dispatch(setLogout());
    await SecureStore.setItemAsync(USER_STORAGE_KEY, '');
  };
