import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
  clickedCategory: string;
}

const initialState: CategoryState = {
  clickedCategory: '',
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setClickedCategory(state, action: PayloadAction<string>) {
      state.clickedCategory = action.payload;
    },
  },
});

export const { setClickedCategory } = categorySlice.actions;
export default categorySlice.reducer;
