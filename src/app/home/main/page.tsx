'use client';

import CenterBlock from '@/components/centerblock/Centerblock';
import React from 'react';
import { useAppSelector } from '@/store/store';

export default function Home() {
  const { fetchError, fetchIsLoading, allTracks } = useAppSelector(
    (state) => state.tracks,
  );

  return (
    <CenterBlock
      title={'Треки'}
      loading={fetchIsLoading}
      playlist={allTracks}
      errorMessage={fetchError}
    />
  );
}
