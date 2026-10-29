'use client';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect } from 'react';
import {
  setAllTracks,
  setCurrentTrack,
  setFetchError,
  setFetchIsLoading,
} from '@/store/features/trackSlice';
import { getTracks } from '@/services/tracks/tracksApi';
import { AxiosError } from 'axios';
import { TrackType } from '@/sharedTypes/sharedTypes';

export default function FetchingTracks() {
  const dispatch = useAppDispatch();
  const { allTracks } = useAppSelector((state) => state.tracks);

  useEffect(() => {
    dispatch(setCurrentTrack(null as unknown as TrackType));

    if (allTracks.length > 0) {
      dispatch(setAllTracks(allTracks));
    } else {
      dispatch(setFetchIsLoading(true));

      getTracks()
        .then((tracks) => {
          dispatch(setAllTracks(tracks));
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response) {
              dispatch(setFetchError(error.response.data));
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
    }
    {
    }
  }, []);

  return <></>;
}
