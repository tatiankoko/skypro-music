'use client';

import Link from 'next/link';
import styles from './bar.module.css';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  setIsPlaying,
  setNextTrack,
  setPrevTrack,
  toggleShuffle,
} from '@/store/features/trackSlice';
import ProgressBar from '@/components/progressBar/ProgressBar';
import { getTimePanel } from '@/utils/helper';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useLikeTrack } from '@/hooks/useLikeTracks';

export default function Bar() {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const dispatch = useAppDispatch();
  const isPlaying = useAppSelector((state) => state.tracks.isPlaying);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(
    audioRef?.current ? audioRef.current.volume : 0.5,
  );
  const [isLoop, setIsLoop] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const isShuffle = useAppSelector((state) => state.tracks.isShuffle);
  const { toggleLike, isLike } = useLikeTrack(currentTrack);

  useEffect(() => {
    setIsLoaded(false);
  }, [currentTrack]);

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

  const onEnded = () => {
    dispatch(setIsPlaying(false));
    onNextTrack();
  };

  const onTimeUpdate = () => {
    const audio: HTMLAudioElement | null = audioRef?.current;

    if (!audio) return;

    setProgress(audio.currentTime);
  };

  const onChangeProgress = (event: ChangeEvent<HTMLInputElement>) => {
    const audio: HTMLAudioElement | null = audioRef?.current;

    if (!audio) return;

    audio.currentTime = Number(event.target.value);
  };

  const onVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const v: number = parseFloat(event.target.value);

    setVolume(v);

    if (audioRef?.current) audioRef.current.volume = v;
  };

  const toggleLoop = () => {
    setIsLoop(!isLoop);
  };

  const onLoadedMetadata = () => {
    if (audioRef?.current) {
      setIsLoaded(true);
      audioRef.current.play();
      dispatch(setIsPlaying(true));
    }
  };

  const onNextTrack = () => {
    dispatch(setNextTrack());
  };

  const onPrevTrack = () => {
    dispatch(setPrevTrack());
  };

  const onToggleShuffle = () => {
    dispatch(toggleShuffle());
  };

  if (!currentTrack) return null;

  return (
    <div className={styles.bar}>
      <audio
        ref={audioRef}
        src={currentTrack?.track_file}
        onTimeUpdate={onTimeUpdate}
        style={{ display: 'none' }}
        onEnded={onEnded}
        onLoadedMetadata={onLoadedMetadata}
        loop={isLoop}
      ></audio>
      <div className={styles.bar__info}>
        <p>
          {getTimePanel(
            audioRef?.current ? audioRef.current.currentTime : 0,
            audioRef?.current ? audioRef.current.duration : 0,
          )}
        </p>
      </div>
      <div className={styles.bar__content}>
        <ProgressBar
          value={progress}
          max={audioRef?.current?.duration || 0}
          step={0.1}
          readOnly={!isLoaded}
          onChange={onChangeProgress}
        ></ProgressBar>
        {/*<progress
          className={styles.bar__playerProgress}
          value={progress}
          max={100}
        ></progress>*/}
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div className={styles.player__btnPrev} onClick={onPrevTrack}>
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div
                className={classNames(styles.player__btnPlay, styles.btn)}
                onClick={togglePlay}
              >
                <svg className={styles.player__btnPlaySvg}>
                  <use
                    xlinkHref={`/img/icon/sprite.svg#${isPlaying ? 'icon-pause' : 'icon-play'}`}
                  ></use>
                </svg>
              </div>
              <div className={styles.player__btnNext} onClick={onNextTrack}>
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div
                className={classNames(
                  styles.player__btnRepeat,
                  styles.btnIcon,
                  { [styles.btnIcon_active]: isLoop },
                )}
                onClick={toggleLoop}
              >
                <svg className={styles.player__btnRepeatSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div
                className={classNames(
                  styles.player__btnShuffle,
                  styles.btnIcon,
                  { [styles.btnIcon_active]: isShuffle },
                )}
                onClick={onToggleShuffle}
              >
                <svg className={styles.player__btnShuffleSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  {isLoaded ? (
                    <svg className={styles.trackPlay__svg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                    </svg>
                  ) : (
                    <Skeleton
                      baseColor={'#B672FF'}
                      highlightColor={'#B672FF'}
                    />
                  )}
                </div>
                <div className={styles.trackPlay__author}>
                  <Link className={styles.trackPlay__authorLink} href="">
                    {isLoaded ? (
                      currentTrack.name
                    ) : (
                      <Skeleton
                        baseColor={'#313131'}
                        width={59}
                        borderRadius={0}
                      />
                    )}
                  </Link>
                </div>
                <div className={styles.trackPlay__album}>
                  <Link className={styles.trackPlay__albumLink} href="">
                    {isLoaded ? (
                      currentTrack.author
                    ) : (
                      <Skeleton
                        baseColor={'#313131'}
                        width={59}
                        borderRadius={0}
                      />
                    )}
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
                  <svg
                    className={
                      isLike
                        ? styles.trackPlay__likeSvg
                        : styles.trackPlay__dislikeSvg
                    }
                    onClick={toggleLike}
                  >
                    <use
                      xlinkHref={`/img/icon/sprite.svg#${isLike ? 'icon-dislike' : 'icon-like'}`}
                    ></use>
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
                  min={0.0}
                  max={1.0}
                  step={0.1}
                  value={volume}
                  onChange={onVolumeChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
