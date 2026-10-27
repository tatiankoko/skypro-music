import classNames from 'classnames';
import styles from './centerblock.module.css';
import Search from '@/components/search/Search';
import Track from '@/components/track/Track';
import Filter from '@/components/filter/Filter';
import { TrackType } from '@/sharedTypes/sharedTypes';
import Skeleton from 'react-loading-skeleton';

type centerBlockProps = {
  title: string;
  loading: boolean;
  playlist: TrackType[];
};

export default function CenterBlock({
  title,
  loading,
  playlist,
}: centerBlockProps) {
  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>{title}</h2>
      <Filter tracks={playlist} />
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
                <Skeleton
                  baseColor={'#313131'}
                  width={51}
                  height={51}
                  borderRadius={0}
                />
                <Skeleton
                  baseColor={'#313131'}
                  width={126}
                  height={19}
                  borderRadius={0}
                />
              </div>
              <Skeleton
                baseColor={'#313131'}
                width={321}
                height={19}
                borderRadius={0}
                className={styles.skeleton__item}
              />
              <Skeleton
                baseColor={'#313131'}
                width={245}
                height={19}
                borderRadius={0}
                className={styles.skeleton__item}
              />
              <Skeleton
                baseColor={'#313131'}
                width={60}
                height={19}
                borderRadius={0}
                className={styles.skeleton__item}
              />
            </div>
          </div>
        ) : (
          <div className={styles.content__playlist}>
            {playlist.map((trackItem) => (
              <Track
                key={trackItem._id}
                track={trackItem}
                playlist={playlist}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
