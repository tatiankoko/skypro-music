'use client';

import styles from './user.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setLogout } from '@/store/features/authSlice';
import Link from 'next/link';
import { clearLiked } from '@/store/features/trackSlice';

export default function User() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const isAuth = useAppSelector((state) => state.user.isAuth);

  const onLogoutClick = () => {
    if (isAuth) {
      dispatch(setLogout());
      dispatch(clearLiked());
    }
  };

  return (
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
  );
}
