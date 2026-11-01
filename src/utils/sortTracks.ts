import { TrackType } from '@/sharedTypes/sharedTypes';

export const yearFilter: string[] = [
  'По умолчанию',
  'Сначала новые',
  'Сначала старые',
];

export const sortByYearFilter = (
  filter: string,
  tracks: TrackType[],
): TrackType[] => {
  if (filter === yearFilter[0] || !yearFilter.includes(filter)) {
    return tracks;
  }

  return filter === yearFilter[1]
    ? [...tracks].sort(
        (a, b) =>
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime(),
      )
    : [...tracks].sort(
        (a, b) =>
          new Date(a.release_date).getTime() -
          new Date(b.release_date).getTime(),
      );
};
