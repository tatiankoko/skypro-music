import styles from './like.module.css';
import classNames from 'classnames';
import React from 'react';

type likeProps = {
  isLike: boolean;
  onToggleLike: (event: React.MouseEvent<HTMLOrSVGElement, MouseEvent>) => void;
};

export default function Like({ isLike, onToggleLike }: likeProps) {
  return (
    <svg className={styles.track__timeSvg} onClick={onToggleLike}>
      <use
        className={classNames(styles.state_default, {
          [styles.state_filled]: isLike,
        })}
        xlinkHref={'/img/icon/sprite.svg#icon-like'}
      ></use>
      <use
        className={classNames(styles.state_hover)}
        xlinkHref={`/img/icon/sprite.svg#${isLike ? 'icon-dislike' : 'icon-like'}`}
      ></use>
    </svg>
  );
}
