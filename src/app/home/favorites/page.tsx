'use client';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { defaultTitles } from '@/app/home/constants';
import CenterBlock from '@/components/centerblock/Centerblock';

export default function FavoritesPage() {
  useAppDispatch();
  const { favoriteTracks, fetchIsLoading, fetchError } = useAppSelector(
    (state) => state.tracks,
  );

  return (
    <CenterBlock
      title={defaultTitles[4]}
      loading={fetchIsLoading}
      playlist={favoriteTracks}
      errorMessage={fetchError}
    />
  );
}
