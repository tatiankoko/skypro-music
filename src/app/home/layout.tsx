'use client';

import { ReactNode } from 'react';
import styles from './home.module.css';
import Nav from '@/components/nav/Nav';
import Sidebar from '@/components/sidebar/Sidebar';
import Bar from '@/components/bar/Bar';
import FetchingTracks from '@/components/fetchingTracks/FetchingTracks';
import { useInitAuth } from '@/hooks/useInitAuth';
import { useFavoriteTracks } from '@/hooks/useFavoriteTracks';

interface HomeLayoutProps {
  children: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  useInitAuth();
  useFavoriteTracks();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <FetchingTracks />
          <Nav />
          {children}
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
