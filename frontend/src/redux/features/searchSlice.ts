import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
    input: string;
    recentSearches: string[];
    relatedSearches: string[];
}

const initialState: SearchState = {
    input: '',
    recentSearches: [],
    relatedSearches: [],
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchInput(state, action: PayloadAction<string>) {
            state.input = action.payload;
        },
        addRecentSearch(state, action: PayloadAction<string>) {
            if (!state.recentSearches.includes(action.payload)) {
                state.recentSearches.push(action.payload);
            }
        },
        setRelatedSearches(state, action: PayloadAction<string[]>) {
            state.relatedSearches = action.payload;
        },
    },
});

export const { setSearchInput, addRecentSearch, setRelatedSearches } = searchSlice.actions;
export default searchSlice.reducer;
