'use client';

import { useAppSelector } from '@/store/store';
import { defaultTitles } from '@/app/home/constants';
import CenterBlock from '@/components/centerblock/Centerblock';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FavoritesPage() {
  const user = useAppSelector((state) => state.user.user);
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const { favoriteTracks, fetchIsLoading, fetchError } = useAppSelector(
    (state) => state.tracks,
  );
  const router = useRouter();

  useEffect(() => {
    if (isAuth && !user) {
      router.push('/home/main');
    }
  }, [isAuth, router, user]);

  return (
    <CenterBlock
      title={defaultTitles[4]}
      loading={fetchIsLoading}
      playlist={favoriteTracks}
      errorMessage={fetchError}
    />
  );
}
