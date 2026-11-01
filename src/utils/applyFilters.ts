import { initialStateType } from '@/store/features/trackSlice';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { sortByYearFilter } from '@/utils/sortTracks';

export const applyFilters = (state: initialStateType): TrackType[] => {
  let filtered = sortByYearFilter(state.filters.years, state.pagePlaylist);

  if (state.filters.authors.length > 0) {
    filtered = filtered.filter((track) =>
      state.filters.authors.includes(track.author),
    );
  }

  if (state.filters.genres.length > 0) {
    filtered = filtered.filter((track) =>
      state.filters.genres.some((el) => track.genre.includes(el)),
    );
  }

  return filtered;
};
