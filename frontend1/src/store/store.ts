import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './slices/filtersSlice';
import portfoliosReducer from './slices/portfoliosSlice';

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    portfolios: portfoliosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
