'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './sidebar.module.css';
import { setLogout } from '@/store/features/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const isAuth = useAppSelector((state) => state.user.isAuth);

  const onLogoutClick = () => {
    if (isAuth) {
      dispatch(setLogout());
    }
  };

  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebar__personal}>
        <p className={styles.sidebar__personalName}>
          {user?.user?.username || ''}
        </p>
        <div className={styles.sidebar__icon} onClick={onLogoutClick}>
          {isAuth ? (
            <svg>
              <use xlinkHref="/img/icon/sprite.svg#logout"></use>
            </svg>
          ) : (
            <Link href={'/auth/signin'}>
              <svg>
                <use xlinkHref="/img/icon/sprite.svg#login"></use>
              </svg>
            </Link>
          )}
        </div>
      </div>
      <div className={styles.sidebar__block}>
        <div className={styles.sidebar__list}>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/home/category/1">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist01.png"
                alt="day's playlist"
                loading={'lazy'}
                width={250}
                height={150}
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/home/category/2">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist02.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/home/category/3">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist03.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
