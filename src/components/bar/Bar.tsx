'use client';

import Link from 'next/link';
import styles from './bar.module.css';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useRef, useState } from 'react';
import { setIsPlaying } from '@/store/features/trackSlice';

export default function Bar() {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const dispatch = useAppDispatch();
  const isPlaying = useAppSelector((state) => state.tracks.isPlaying);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);

  if (audioRef && audioRef.current) {
    if (isPlaying) audioRef.current.play();
    else audioRef.current.pause();
  }

  const togglePlay = () => {
    if (!audioRef.current) {
      return;
    }

    if (audioRef.current.paused) {
      audioRef.current
        .play()
        .then(() => dispatch(setIsPlaying(true)))
        .catch(() => dispatch(setIsPlaying(false)));
    } else {
      audioRef.current.pause();
      dispatch(setIsPlaying(false));
    }
  };

  const onEnded = () => dispatch(setIsPlaying(false));

  const handleTimeUpdate = () => {
    const audio: HTMLAudioElement | null = audioRef.current;

    if (!audio) return;

    const currentProgress = audio.duration
      ? (audio.currentTime / audio.duration) * 100
      : 0;

    setProgress(currentProgress);
  };

  if (!currentTrack) return <></>;
  /*style={{ display: 'none' }}*/

  return (
    <div className={styles.bar}>
      <audio
        ref={audioRef}
        src={currentTrack?.track_file}
        onTimeUpdate={handleTimeUpdate}
        style={{ display: 'none' }}
        onEnded={onEnded}
      ></audio>
      <div className={styles.bar__content}>
        <progress
          className={styles.bar__playerProgress}
          value={progress}
          max={100}
        ></progress>
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div className={styles.player__btnPrev}>
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div
                className={classNames(styles.player__btnPlay, styles.btn)}
                onClick={togglePlay}
              >
                <svg className={styles.player__btnPlaySvg}>
                  {isPlaying ? (
                    <use xlinkHref="/img/icon/sprite.svg#icon-pause"></use>
                  ) : (
                    <use xlinkHref="/img/icon/sprite.svg#icon-play"></use>
                  )}
                </svg>
              </div>
              <div className={styles.player__btnNext}>
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div
                className={classNames(styles.player__btnRepeat, styles.btnIcon)}
              >
                <svg className={styles.player__btnRepeatSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div
                className={classNames(
                  styles.player__btnShuffle,
                  styles.btnIcon,
                )}
              >
                <svg className={styles.player__btnShuffleSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlay__author}>
                  <Link className={styles.trackPlay__authorLink} href="">
                    {currentTrack.name}
                  </Link>
                </div>
                <div className={styles.trackPlay__album}>
                  <Link className={styles.trackPlay__albumLink} href="">
                    {currentTrack.author}
                  </Link>
                </div>
              </div>

              <div className={styles.trackPlay__dislike}>
                <div
                  className={classNames(
                    styles.player__btnShuffle,
                    styles.btnIcon,
                  )}
                >
                  <svg className={styles.trackPlay__likeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>
                {/*<div
                  className={classNames(
                    styles.trackPlay__dislike,
                    styles.btnIcon,
                  )}
                >
                  <svg className={styles.trackPlay__dislikeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div>*/}
              </div>
            </div>
          </div>
          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <svg className={styles.volume__svg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={classNames(styles.volume__progress, styles.btn)}>
                <input
                  className={classNames(
                    styles.volume__progressLine,
                    styles.btn,
                  )}
                  type="range"
                  name="range"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
