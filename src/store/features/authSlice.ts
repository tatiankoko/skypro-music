import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type userType = {
  email: string;
  username: string;
  _id: number;
};

type authStateType = {
  user: userType | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuth: boolean;
};

const initialState: authStateType = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<userType>) {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
      localStorage.setItem('accessToken', action.payload);
    },
    setRefreshToken(state, action: PayloadAction<string>) {
      state.refreshToken = action.payload;
      localStorage.setItem('refreshToken', action.payload);
    },
    setIsAuth(state) {
      state.isAuth = true;
    },
    setLogout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuth = false;

      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
});

export const {
  setUser,
  setAccessToken,
  setRefreshToken,
  setIsAuth,
  setLogout,
} = authSlice.actions;

export const authSliceReducer = authSlice.reducer;
