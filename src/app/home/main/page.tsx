'use client';

import CenterBlock from '@/components/centerblock/Centerblock';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { clearFilters } from '@/store/features/trackSlice';
import { emptyPlaylistWarning, isFiltersApplied } from '@/utils/helper';

export default function Home() {
  const { fetchError, fetchIsLoading, allTracks, filteredTracks, filters } =
    useAppSelector((state) => state.tracks);
  const [playlist, setPlaylist] = useState<TrackType[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearFilters());
  }, []);

  useEffect(() => {
    const filtersApplied = isFiltersApplied(filters);

    const currentPlaylist = filtersApplied ? filteredTracks : allTracks;

    if (filtersApplied) emptyPlaylistWarning(currentPlaylist);

    setPlaylist(currentPlaylist);
  }, [filteredTracks, allTracks, filters]);

  return (
    <CenterBlock
      title={'Треки'}
      loading={fetchIsLoading}
      pagePlaylist={allTracks}
      playlist={playlist}
      errorMessage={fetchError}
    />
  );
}
