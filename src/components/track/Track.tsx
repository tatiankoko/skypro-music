'use client';

import styles from './track.module.css';
import Link from 'next/link';
import { formatTime } from '@/utils/helper';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setCurrentTrack, setPlaylist } from '@/store/features/trackSlice';
import classNames from 'classnames';

type TrackTypeProp = {
  track: TrackType;
  playlist: TrackType[];
};

export default function Track({ track, playlist }: TrackTypeProp) {
  const dispatch = useAppDispatch();
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlaying = useAppSelector((state) => state.tracks.isPlaying);

  const onClickTrack = () => {
    if (track._id !== currentTrack?._id) {
      dispatch(setCurrentTrack(track));
      dispatch(setPlaylist(playlist));
    }
  };

  return (
    <div className={styles.playlist__item} onClick={onClickTrack}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            <svg
              className={classNames(styles.track__titleSvg, {
                [styles.active]: track._id === currentTrack?._id,
                [styles.playing]: isPlaying && track._id === currentTrack?._id,
              })}
            >
              {track._id === currentTrack?._id ? null : (
                <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
              )}
            </svg>
          </div>
          <div className="track__title-text">
            <Link className={styles.track__titleLink} href="">
              {track.name} <span className={styles.track__titleSpan}></span>
            </Link>
          </div>
        </div>
        <div className={styles.track__author}>
          <Link className={styles.track__authorLink} href="">
            {track.author}
          </Link>
        </div>
        <div className={styles.track__album}>
          <Link className={styles.track__albumLink} href="">
            {track.album}
          </Link>
        </div>
        <div className="track__time">
          <svg className={styles.track__timeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={styles.track__timeText}>
            {formatTime(track.duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
