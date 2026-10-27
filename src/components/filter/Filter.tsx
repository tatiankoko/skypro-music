'use client';

import styles from './filter.module.css';
import { useState } from 'react';
import FilterItem from '@/components/filterItem/FilterItem';
import { TrackType } from '@/sharedTypes/sharedTypes';

type filterProps = {
  tracks: TrackType[];
};

export default function Filter({ tracks }: filterProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>
      <FilterItem
        title={'исполнителю'}
        name={'author'}
        expanded={activeFilter === 'исполнителю'}
        onClick={() =>
          setActiveFilter(activeFilter === 'исполнителю' ? null : 'исполнителю')
        }
        tracks={tracks}
      />
      <FilterItem
        title={'году выпуска'}
        name={'year'}
        expanded={activeFilter === 'году выпуска'}
        onClick={() =>
          setActiveFilter(
            activeFilter === 'году выпуска' ? null : 'году выпуска',
          )
        }
        tracks={tracks}
      />
      <FilterItem
        title={'жанру'}
        name={'genre'}
        expanded={activeFilter === 'жанру'}
        onClick={() =>
          setActiveFilter(activeFilter === 'жанру' ? null : 'жанру')
        }
        tracks={tracks}
      />
    </div>
  );
}
