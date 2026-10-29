import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackType } from '@/sharedTypes/sharedTypes';

type initialStateType = {
  currentTrack: TrackType | null;
  isPlaying: boolean;
  isShuffle: boolean;
  playlist: TrackType[];
  shuffledPlaylist: TrackType[];
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlaying: false,
  isShuffle: false,
  playlist: [],
  shuffledPlaylist: [],
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
  },
});

export const {
  setCurrentTrack,
  setIsPlaying,
  toggleShuffle,
  setPlaylist,
  setNextTrack,
  setPrevTrack,
} = trackSlice.actions;

export const trackSliceReducer = trackSlice.reducer;
