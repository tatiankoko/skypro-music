'use client';

import styles from './filter.module.css';
import { useState } from 'react';
import FilterItem from '@/components/filterItem/FilterItem';

export default function Filter() {
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
      />
      <FilterItem
        title={'жанру'}
        name={'genre'}
        expanded={activeFilter === 'жанру'}
        onClick={() =>
          setActiveFilter(activeFilter === 'жанру' ? null : 'жанру')
        }
      />
    </div>
  );
}
