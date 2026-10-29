import { useAppDispatch } from '@/store/store';
import { useEffect } from 'react';
import {
  setAccessToken,
  setRefreshToken,
  setUser,
  userType,
} from '@/store/features/authSlice';

export const useInitAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken') || '';
    const refreshToken = localStorage.getItem('refreshToken') || '';
    const user: userType =
      JSON.parse(<string>localStorage.getItem('user')) || null;

    dispatch(setUser(user));
    dispatch(setAccessToken(accessToken));
    dispatch(setRefreshToken(refreshToken));
  }, [dispatch]);
};
