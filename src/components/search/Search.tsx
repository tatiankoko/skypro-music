'use client';

import styles from './search.module.css';
import { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '@/store/store';
import { setSearchString } from '@/store/features/trackSlice';

export default function Search() {
  const dispatch = useAppDispatch();
  const [searchInput, setSearchInput] = useState('');

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
    dispatch(setSearchString(event.target.value));
  };

  return (
    <div className={styles.centerblock__search}>
      <svg className={styles.search__svg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
      </svg>
      <input
        className={styles.search__text}
        type="search"
        placeholder="Поиск"
        name="search"
        value={searchInput}
        onChange={onSearchChange}
      />
    </div>
  );
}
