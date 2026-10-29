'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { getTracksById } from '@/services/tracks/tracksApi';
import { AxiosError } from 'axios';
import CenterBlock from '@/components/centerblock/Centerblock';
import { defaultTitles } from '@/app/home/constants';
import { setCurrentTrack } from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

export default function CategoryPage() {
  const dispatch = useAppDispatch();
  const { allTracks, fetchIsLoading, fetchError } = useAppSelector(
    (state) => state.tracks,
  );

  const params = useParams<{ id: string }>();
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState<string>(defaultTitles[+params.id]);

  useEffect(() => {
    dispatch(setCurrentTrack(null as unknown as TrackType));

    setLoading(true);

    if (!fetchIsLoading && allTracks.length) {
      getTracksById(Number(params.id) + 1)
        .then((result) => {
          setTitle(result.name);

          const categoryTracks: TrackType[] = allTracks.filter((track) =>
            result.items.includes(track._id),
          );

          setTracks(categoryTracks);
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response) {
              setError(error.response.data);
            } else if (error.request) {
              setError('Произошла ошибка. Попробуйте позже'); // что-то с интернетом
            } else {
              setError('Неизвестная ошибка');
            }
          }
        })
        .finally(() => setLoading(false));
    }
  }, [fetchIsLoading]);

  return (
    <CenterBlock
      title={title}
      loading={loading}
      playlist={tracks}
      errorMessage={error || fetchError}
    />
  );
}
