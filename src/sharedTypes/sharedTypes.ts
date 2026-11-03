export type TrackType = {
  _id: number;
  name: string;
  author: string;
  release_date: string;
  genre: [string];
  duration_in_seconds: number;
  album: string;
  logo: null | string;
  track_file: string;
  stared_user: [];
};

export type filter = {
  authors: string[];
  genres: string[];
  years: string;
  search: string;
};

export type initialStateType = {
  currentTrack: TrackType | null;
  isPlaying: boolean;
  isShuffle: boolean;
  playlist: TrackType[];
  shuffledPlaylist: TrackType[];
  allTracks: TrackType[];
  favoriteTracks: TrackType[];
  pagePlaylist: TrackType[];
  filteredTracks: TrackType[];
  fetchError: null | string;
  fetchIsLoading: boolean;
  filters: filter;
};

export type userType = {
  email: string;
  username: string;
  _id: number;
};
