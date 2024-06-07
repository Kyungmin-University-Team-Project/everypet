import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
    input: string;
}

const initialState: SearchState = {
    input: '',
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchInput: (state, action: PayloadAction<string>) => {
            state.input = action.payload;
        },
    },
});

export const { setSearchInput } = searchSlice.actions;
export default searchSlice.reducer;
