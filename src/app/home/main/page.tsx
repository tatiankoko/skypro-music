'use client';

import CenterBlock from '@/components/centerblock/Centerblock';
import React, { useEffect, useState } from 'react';
import { getTracks } from '@/services/tracks/tracksApi';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';
import { setCurrentTrack, setIsPlaying } from '@/store/features/trackSlice';
import { useAppDispatch } from '@/store/store';

export default function Home() {
  const dispatch = useAppDispatch();
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(setCurrentTrack(null as unknown as TrackType));
    dispatch(setIsPlaying(false));

    getTracks()
      .then((result) => {
        setTracks(result);
        setLoading(false);
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            setError(error.response.data);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            setError('Что-то с интернетом');
          } else {
            // Something happened in setting up the request that triggered an Error
            setError(error.message); // Неизвестная ошибка
          }
        }
      });
  }, []);

  return (
    <CenterBlock
      title={'Треки'}
      loading={loading}
      playlist={tracks}
      errorMessage={String(error)}
    />
  );
}
