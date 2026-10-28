'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { getTracks, getTracksById } from '@/services/tracks/tracksApi';
import { AxiosError } from 'axios';
import CenterBlock from '@/components/centerblock/Centerblock';
import { defaultTitles } from '@/app/home/constants';
import { setCurrentTrack, setIsPlaying } from '@/store/features/trackSlice';
import { useAppDispatch } from '@/store/store';

export default function CategoryPage() {
  const dispatch = useAppDispatch();
  const params = useParams<{ id: string }>();
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState<string>(defaultTitles[+params.id]);

  useEffect(() => {
    dispatch(setCurrentTrack(null as unknown as TrackType));
    dispatch(setIsPlaying(false));

    getTracksById(Number(params.id) + 1)
      .then((result) => {
        getTracks()
          .then((allTracks) => {
            setTitle(result.name);

            const categoryTracks: TrackType[] = allTracks.filter((track) =>
              result.items.includes(track._id),
            );

            setTracks(categoryTracks);
            setLoading(false);
          })
          .catch((error) => {
            if (error instanceof AxiosError) {
              if (error.response) {
                setError(error.response.data);
              } else if (error.request) {
                setError('Что-то с интернетом'); // что-то с интернетом
              } else {
                setError(`Неизвестная ошибка: ${error.message}`); // Неизвестная ошибка
              }
            }
          });
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
            setError(error.request); // что-то с интернетом
          } else {
            // Something happened in setting up the request that triggered an Error
            setError(error.message); // Неизвестная ошибка
          }
        }
      });
  }, []);

  return (
    <CenterBlock
      title={`${title}`}
      loading={loading}
      playlist={tracks}
      errorMessage={String(error)}
    />
  );
}
