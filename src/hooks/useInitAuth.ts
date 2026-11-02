import { useAppDispatch } from '@/store/store';
import { useEffect } from 'react';
import {
  setAccessToken,
  setRefreshToken,
  setUser,
  setIsAuth,
} from '@/store/features/authSlice';
import { userType } from '@/sharedTypes/sharedTypes';

export const useInitAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken') || '';
    const refreshToken = localStorage.getItem('refreshToken') || '';
    const user: userType =
      JSON.parse(<string>localStorage.getItem('user')) || null;

    if (user) dispatch(setUser(user));

    dispatch(setAccessToken(accessToken));
    dispatch(setRefreshToken(refreshToken));
    dispatch(setIsAuth());
  }, [dispatch]);
};
