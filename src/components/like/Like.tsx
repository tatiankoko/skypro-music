import styles from './like.module.css';
import classNames from 'classnames';
import React from 'react';

type likeProps = {
  isLike: boolean;
  onToggleLike: (event: React.MouseEvent<HTMLOrSVGElement, MouseEvent>) => void;
  disabled: boolean;
};

export default function Like({ isLike, onToggleLike, disabled }: likeProps) {
  return (
    <svg
      className={classNames(styles.like__svg, {
        [styles.disabled]: disabled,
      })}
      onClick={onToggleLike}
    >
      <use
        className={classNames(styles.state__default, {
          [styles.filled]: isLike,
        })}
        xlinkHref={'/img/icon/sprite.svg#icon-like'}
      ></use>
      <use
        className={classNames(styles.state__hover)}
        xlinkHref={`/img/icon/sprite.svg#${isLike ? 'icon-dislike' : 'icon-like'}`}
      ></use>
    </svg>
  );
}
