import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  searchTerm: string;
  skills: string[];
}

const initialState: FiltersState = {
  searchTerm: '',
  skills: [],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    toggleSkill(state, action: PayloadAction<string>) {
      const skill = action.payload;
      if (state.skills.includes(skill)) {
        state.skills = state.skills.filter(s => s !== skill);
      } else {
        state.skills.push(skill);
      }
    },
  },
});

export const { setSearchTerm, toggleSkill } = filtersSlice.actions;
export default filtersSlice.reducer;
