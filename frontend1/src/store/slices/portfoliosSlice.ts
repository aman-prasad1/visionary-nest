import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StudentData } from '../../components/BrowsePortfolio';

interface PortfoliosState {
  items: StudentData[];
  loading: boolean;
  error: string | null;
}

const initialState: PortfoliosState = {
  items: [],
  loading: false,
  error: null,
};

const portfoliosSlice = createSlice({
  name: 'portfolios',
  initialState,
  reducers: {
    addPortfolio: (state, action: PayloadAction<StudentData>) => {
      state.items.push(action.payload);
    },
    setPortfolios: (state, action: PayloadAction<StudentData[]>) => {
      state.items = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { addPortfolio, setPortfolios, setLoading, setError } = portfoliosSlice.actions;
export default portfoliosSlice.reducer;