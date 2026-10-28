import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type userType = {
  email: string;
  username: string;
  _id: number;
};

type authStateType = {
  user: userType | null;
  isAuth: boolean;
};

const initialState: authStateType = {
  user: null,
  isAuth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<userType>) {
      state.user = action.payload;
      state.isAuth = true;
    },
    setLogout(state) {
      state.user = null;
      state.isAuth = false;
    },
  },
});

export const { setUser, setLogout } = authSlice.actions;

export const authSliceReducer = authSlice.reducer;
