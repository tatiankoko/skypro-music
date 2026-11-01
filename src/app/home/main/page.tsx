'use client';

import CenterBlock from '@/components/centerblock/Centerblock';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/store';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { yearFilter } from '@/utils/sortTracks';

export default function Home() {
  const { fetchError, fetchIsLoading, allTracks, filteredTracks, filters } =
    useAppSelector((state) => state.tracks);
  const [playlist, setPlaylist] = useState<TrackType[]>([]);

  useEffect(() => {
    const filtersApplied =
      filters.authors.length ||
      filters.genres.length ||
      filters.years !== yearFilter[0];

    const currentPlaylist = filtersApplied ? filteredTracks : allTracks;

    setPlaylist(currentPlaylist);
  }, [filteredTracks, allTracks]);

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
