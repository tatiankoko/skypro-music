'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './nav.module.css';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setLogout } from '@/store/features/authSlice';

export default function Nav() {
  const dispatch = useAppDispatch();
  const [showNav, setShowNav] = useState(false);
  const isAuth = useAppSelector((state) => state.user.isAuth);

  const onLogClick = () => {
    if (isAuth) {
      dispatch(setLogout());
    }
  };

  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo}>
        <Image
          width={250}
          height={170}
          className={styles.logo__image}
          src="/img/logo.png"
          alt={'logo'}
        />
      </div>
      <div className={styles.nav__burger} onClick={() => setShowNav(!showNav)}>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>
      <div className={styles.nav__menu}>
        {showNav ? (
          <ul className={styles.menu__list}>
            <li className={styles.menu__item}>
              <Link href="/" className={styles.menu__link}>
                Главное
              </Link>
            </li>
            {isAuth ? (
              <li className={styles.menu__item}>
                <Link href="#" className={styles.menu__link}>
                  Мой плейлист
                </Link>
              </li>
            ) : null}
            <li className={styles.menu__item}>
              <Link
                href="/auth/signin"
                className={styles.menu__link}
                onClick={onLogClick}
              >
                {isAuth ? 'Выйти' : 'Войти'}
              </Link>
            </li>
          </ul>
        ) : null}
      </div>
    </nav>
  );
}
