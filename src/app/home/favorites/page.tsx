'use client';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { defaultTitles } from '@/app/home/constants';
import CenterBlock from '@/components/centerblock/Centerblock';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { clearFilters } from '@/store/features/trackSlice';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { isFiltersApplied } from '@/utils/helper';

export default function FavoritesPage() {
  const user = useAppSelector((state) => state.user.user);
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const {
    favoriteTracks,
    fetchIsLoading,
    fetchError,
    filters,
    filteredTracks,
  } = useAppSelector((state) => state.tracks);
  const [playlist, setPlaylist] = useState<TrackType[]>([]);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearFilters());
  }, []);

  useEffect(() => {
    if (isAuth && !user) {
      router.push('/home/main');
    }
  }, [isAuth, router, user]);

  useEffect(() => {
    const filtersApplied = isFiltersApplied(filters);
    const currentPlaylist = filtersApplied ? filteredTracks : favoriteTracks;

    setPlaylist(currentPlaylist);
  }, [filteredTracks, favoriteTracks, filters]);

  return (
    <CenterBlock
      title={defaultTitles[4]}
      loading={fetchIsLoading}
      playlist={playlist}
      pagePlaylist={favoriteTracks}
      errorMessage={fetchError}
    />
  );
}
