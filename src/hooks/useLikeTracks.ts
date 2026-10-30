import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { withReAuth } from '@/utils/withReAuth';
import { addLike, removeLike } from '@/services/tracks/tracksApi';
import { addLikedTracks, removeLikedTracks } from '@/store/features/trackSlice';

type returnTypeHook = {
  isLoading: boolean;
  errorMsg: string | null;
  toggleLike: () => void;
  isLike: boolean;
};

export const useLikeTrack = (track: TrackType | null): returnTypeHook => {
  const { favoriteTracks } = useAppSelector((state) => state.tracks);
  const { accessToken, refreshToken } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const isLike = favoriteTracks.some((t) => t._id === track?._id);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toggleLike = () => {
    if (!accessToken || !refreshToken) {
      return setErrorMsg('Нет авторизации');
    }

    const actionApi = isLike ? removeLike : addLike;
    const actionSlice = isLike ? removeLikedTracks : addLikedTracks;

    setIsLoading(true); // TODO enable set like while loading
    setErrorMsg(null);

    if (track) {
      withReAuth(
        (newToken) => actionApi(newToken || accessToken, track._id),
        refreshToken,
        dispatch,
      )
        .then(() => {
          dispatch(actionSlice(track));
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
    }
  };

  return {
    isLoading,
    errorMsg,
    toggleLike,
    isLike,
  };
};
