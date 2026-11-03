'use client';

import styles from './filter.module.css';
import { useState } from 'react';
import FilterItem from '@/components/filterItem/FilterItem';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppDispatch } from '@/store/store';
import {
  setFilterAuthors,
  setFilterGenres,
  setFilterYears,
} from '@/store/features/trackSlice';

type filterProps = {
  tracks: TrackType[];
};

export default function Filter({ tracks }: filterProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const changeActiveFilter = (name: string) => {
    setActiveFilter(activeFilter === name ? null : name);
  };

  const selectAuthor = (author: string) => {
    dispatch(setFilterAuthors(author));
  };

  const selectGenre = (genre: string) => {
    dispatch(setFilterGenres(genre));
  };

  const selectYear = (year: string) => {
    dispatch(setFilterYears(year));
  };

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>
      <FilterItem
        title={'исполнителю'}
        name={'author'}
        expanded={activeFilter === 'исполнителю'}
        onClick={changeActiveFilter}
        tracks={tracks}
        onSelect={selectAuthor}
      />
      <FilterItem
        title={'году выпуска'}
        name={'year'}
        expanded={activeFilter === 'году выпуска'}
        onClick={changeActiveFilter}
        tracks={tracks}
        onSelect={selectYear}
      />
      <FilterItem
        title={'жанру'}
        name={'genre'}
        expanded={activeFilter === 'жанру'}
        onClick={changeActiveFilter}
        tracks={tracks}
        onSelect={selectGenre}
      />
    </div>
  );
}
