import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore,
} from 'react-redux';
import { trackSliceReducer } from '@/store/features/trackSlice';

const initialState = {
  tracks: trackSliceReducer(undefined, { type: 'init' }),
};

const rootReducer = (
  state = initialState,
  action: Parameters<typeof trackSliceReducer>[1],
) => ({
  tracks: trackSliceReducer(state.tracks, action),
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });

  /*return configureStore({
    reducer: combineReducers({
      tracks: trackSliceReducer,
    }),
  });*/
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer the \`RootState\` and \`AppDispatch\` types from the store itself
type RootState = ReturnType<AppStore['getState']>;
type AppDispatch = AppStore['dispatch'];

// Для нового TS
// Use throughout your app instead of plain \`useDispatch\` and \`useSelector\`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
