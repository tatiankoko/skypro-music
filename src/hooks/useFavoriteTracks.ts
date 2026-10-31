import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect } from 'react';
import { withReAuth } from '@/utils/withReAuth';
import { getFavoriteTracks } from '@/services/tracks/tracksApi';
import { AxiosError } from 'axios';
import {
  setFavoriteTracks,
  setFetchError,
  setFetchIsLoading,
} from '@/store/features/trackSlice';

export const useFavoriteTracks = () => {
  const dispatch = useAppDispatch();
  const { isAuth, accessToken, refreshToken } = useAppSelector(
    (state) => state.user,
  );

  /*  useEffect(() => {}, [favoriteTracks]);*/

  useEffect(() => {
    if (!isAuth || !accessToken || !refreshToken) {
      return;
    }

    dispatch(setFetchIsLoading(true));
    /*dispatch(setFetchError(null));*/

    withReAuth(
      (newToken) => getFavoriteTracks(newToken || accessToken),
      refreshToken,
      dispatch,
    )
      .then((data) => {
        dispatch(setFavoriteTracks(data));
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            dispatch(setFetchError(error.response.data.message));
          } else if (error.request) {
            dispatch(setFetchError('Произошла ошибка. Попробуйте позже'));
          } else {
            dispatch(setFetchError('Неизвестная ошибка'));
          }
        }
      })
      .finally(() => {
        dispatch(setFetchIsLoading(false));
      });
  }, [dispatch, accessToken, refreshToken]);
};
