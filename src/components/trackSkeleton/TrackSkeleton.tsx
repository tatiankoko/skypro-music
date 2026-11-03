import Skeleton from 'react-loading-skeleton';
import React from 'react';

type trackSkeletonProps = {
  width: number;
  height: number;
};

export default function TrackSkeleton({ width, height }: trackSkeletonProps) {
  return (
    <Skeleton
      baseColor={'#313131'}
      width={width}
      height={height}
      borderRadius={0}
    />
  );
}
