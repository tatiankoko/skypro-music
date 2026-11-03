import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialStateType, TrackType } from '@/sharedTypes/sharedTypes';
import { applyFilters } from '@/utils/applyFilters';
import { yearFilter } from '@/utils/sortTracks';

const initialState: initialStateType = {
  currentTrack: null,
  isPlaying: false,
  isShuffle: false,
  playlist: [],
  shuffledPlaylist: [],
  allTracks: [],
  favoriteTracks: [],
  pagePlaylist: [],
  filteredTracks: [],
  fetchError: null,
  fetchIsLoading: true,
  filters: {
    authors: [],
    genres: [],
    years: yearFilter[0],
    search: '',
  },
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
    setPlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.playlist = action.payload;
      state.shuffledPlaylist = [...state.playlist].sort(
        () => Math.random() - 0.5,
      );
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.playlist;

      const currentIndex = playlist.findIndex(
        (track) => track._id === state.currentTrack?._id,
      );

      const nextIndex =
        currentIndex + 1 >= playlist.length ? 0 : currentIndex + 1;

      state.currentTrack = playlist[nextIndex];
    },
    setPrevTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.playlist;

      const currentIndex = playlist.findIndex(
        (track) => track._id === state.currentTrack?._id,
      );

      const prevIndex =
        currentIndex - 1 < 0 ? playlist.length - 1 : currentIndex - 1;

      state.currentTrack = playlist[prevIndex];
    },
    setAllTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.allTracks = action.payload;
    },
    setFavoriteTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.favoriteTracks = action.payload;
    },
    addLikedTracks: (state, action: PayloadAction<TrackType>) => {
      state.favoriteTracks = [...state.favoriteTracks, action.payload];
    },
    removeLikedTracks: (state, action: PayloadAction<TrackType>) => {
      state.favoriteTracks = [...state.favoriteTracks].filter(
        (item) => item._id !== action.payload._id,
      );
    },
    setFetchError: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
    },
    setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload;
    },
    clearLiked: (state) => {
      state.favoriteTracks = [];
    },
    setPagePlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.pagePlaylist = action.payload;
    },
    setFilterAuthors: (state, action: PayloadAction<string>) => {
      const author = action.payload;

      if (state.filters.authors.includes(author)) {
        state.filters.authors = state.filters.authors.filter(
          (elem) => elem !== author,
        );
      } else {
        state.filters.authors = [...state.filters.authors, author];
      }

      state.filteredTracks = applyFilters(state);
    },
    setFilterGenres: (state, action: PayloadAction<string>) => {
      const genre = action.payload;

      if (state.filters.genres.includes(genre)) {
        state.filters.genres = state.filters.genres.filter(
          (elem) => elem !== genre,
        );
      } else {
        state.filters.genres = [...state.filters.genres, genre];
      }

      state.filteredTracks = applyFilters(state);
    },
    setFilterYears: (state, action: PayloadAction<string>) => {
      state.filters.years = action.payload;
      state.filteredTracks = applyFilters(state);
    },
    setSearchString: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
      state.filteredTracks = applyFilters(state);
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.filteredTracks = initialState.filteredTracks;
    },
  },
});

export const {
  setCurrentTrack,
  setIsPlaying,
  toggleShuffle,
  setPlaylist,
  setNextTrack,
  setPrevTrack,
  setAllTracks,
  setFavoriteTracks,
  setPagePlaylist,
  addLikedTracks,
  removeLikedTracks,
  setFetchError,
  setFetchIsLoading,
  clearLiked,
  setFilterAuthors,
  setFilterGenres,
  setFilterYears,
  setSearchString,
  clearFilters,
} = trackSlice.actions;

export const trackSliceReducer = trackSlice.reducer;
