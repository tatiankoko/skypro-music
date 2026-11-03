import { filter, TrackType } from '@/sharedTypes/sharedTypes';
import { yearFilter } from '@/utils/sortTracks';
import { toast } from 'react-toastify';

export function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const inputSeconds = Math.floor(time % 60);
  const outputSeconds = inputSeconds < 10 ? `0${inputSeconds}` : inputSeconds;

  return `${minutes}:${outputSeconds}`;
}

export function getTimePanel(
  currentTime: number,
  totalTime: number | undefined,
) {
  if (totalTime) {
    return `${formatTime(currentTime)} / ${formatTime(totalTime)}`;
  }
}

export function getUniqueValuesByKey(
  arr: TrackType[],
  key: keyof TrackType,
): string[] {
  const uniqueValues = new Set<string>();

  arr.forEach((item) => {
    const value = item[key];

    if (Array.isArray(value)) {
      value.forEach((itemValue) => {
        if (itemValue) {
          uniqueValues.add(itemValue);
        }
      });
    } else if (typeof value === 'string') {
      uniqueValues.add(value);
    }
  });

  return Array.from(uniqueValues);
}

export const isFiltersApplied = (filters: filter): boolean => {
  return (
    filters.authors.length > 0 ||
    filters.genres.length > 0 ||
    filters.years !== yearFilter[0] ||
    filters.search.length > 0
  );
};

export const emptyPlaylistWarning = (playlist: TrackType[]) => {
  if (playlist.length <= 0) {
    toast.warning('Нет подходящих треков');
  }
};
