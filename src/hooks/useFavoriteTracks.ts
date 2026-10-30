import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect, useState } from 'react';
import { withReAuth } from '@/utils/withReAuth';
import { getFavoriteTracks } from '@/services/tracks/tracksApi';
import { AxiosError } from 'axios';
import { setFavoriteTracks } from '@/store/features/trackSlice';

export const useFavoriteTracks = () => {
  const dispatch = useAppDispatch();
  const { favoriteTracks, fetchIsLoading, fetchError } = useAppSelector(
    (state) => state.tracks,
  );
  const { accessToken, refreshToken } = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const favorites = useAppSelector((state) => state.tracks.favoriteTracks);

  /*  useEffect(() => {}, [favoriteTracks]);*/

  useEffect(() => {
    if (!accessToken || !refreshToken) {
      return setErrorMsg('Нет авторизации');
    }

    setIsLoading(true); // TODO enable set like while loading
    setErrorMsg(null);

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
            setErrorMsg(error.response.data.message);
          } else if (error.request) {
            setErrorMsg('Произошла ошибка. Попробуйте позже');
          } else {
            setErrorMsg('Неизвестная ошибка');
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, accessToken, refreshToken]);

  return {
    isLoading,
    errorMsg,
    favorites,
  };
};
