'use client';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect, useState } from 'react';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { defaultTitles } from '@/app/home/constants';
import { setCurrentTrack } from '@/store/features/trackSlice';
import { getFavoriteTracks } from '@/services/tracks/tracksApi';
import { AxiosError } from 'axios';
import CenterBlock from '@/components/centerblock/Centerblock';
import { useFavoriteTracks } from '@/hooks/useFavoriteTracks';
import { useRouter } from 'next/navigation';

export default function FavoritesPage() {
  const dispatch = useAppDispatch();
  const { allTracks, fetchIsLoading, fetchError } = useAppSelector(
    (state) => state.tracks,
  );
  const router = useRouter();
  const isAuth = useAppSelector((state) => state.user.isAuth);

  useEffect(() => {
    if (!isAuth) {
      router.push('/home/main');
    }
  }, []); // [isAuth]

  const { isLoading, errorMsg, favorites } = useFavoriteTracks();

  return (
    <CenterBlock
      title={defaultTitles[4]}
      loading={isLoading}
      playlist={favorites}
      errorMessage={errorMsg}
    />
  );
}
