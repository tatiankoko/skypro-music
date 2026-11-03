import classNames from 'classnames';
import styles from './centerblock.module.css';
import Search from '@/components/search/Search';
import Track from '@/components/track/Track';
import Filter from '@/components/filter/Filter';
import { TrackType } from '@/sharedTypes/sharedTypes';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@/store/store';
import { setPagePlaylist } from '@/store/features/trackSlice';
import TrackSkeleton from '@/components/trackSkeleton/TrackSkeleton';

type centerBlockProps = {
  title: string;
  loading: boolean;
  playlist: TrackType[];
  pagePlaylist: TrackType[];
  errorMessage: string | null;
};

export default function CenterBlock({
  title,
  loading,
  playlist,
  pagePlaylist,
  errorMessage,
}: centerBlockProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (errorMessage) toast.error(errorMessage);

    if (!loading && !errorMessage) {
      dispatch(setPagePlaylist(pagePlaylist));
    }
  }, [loading, errorMessage]);

  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>{title}</h2>
      <Filter tracks={pagePlaylist} />
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={classNames(styles.playlistTitle__col, styles.col01)}>
            Трек
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col02)}>
            Исполнитель
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col03)}>
            Альбом
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col04)}>
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        {loading ? (
          <div className={styles.skeleton}>
            <div className={styles.skeleton__content}>
              <div className={styles.skeleton__block}>
                <TrackSkeleton width={51} height={51} />
                <TrackSkeleton width={126} height={19} />
              </div>
              <TrackSkeleton width={321} height={19} />
              <TrackSkeleton width={245} height={19} />
              <TrackSkeleton width={60} height={19} />
            </div>
          </div>
        ) : playlist.length > 0 ? (
          <div className={styles.content__playlist}>
            {playlist.map((trackItem) => (
              <Track
                key={trackItem._id}
                track={trackItem}
                playlist={playlist}
              />
            ))}
          </div>
        ) : (
          <div className={styles.notification__wrapper}>
            <div className={styles.notification__container}>
              Нет подходящих треков
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
