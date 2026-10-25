'use client';

import styles from './search.module.css';
import { ChangeEvent, useState } from 'react';

export default function Search() {
  const [searchInput, setSearchInput] = useState('');

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
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
