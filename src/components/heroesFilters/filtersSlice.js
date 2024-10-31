import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filters: [],
    activeFilter: 'all'
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersFetched: (state, action) => {state.filters = action.payload},
        filterHeroes: (state, action) => {state.activeFilter = action.payload}
    }
})
const {reducer, actions} = filtersSlice;

export default reducer;

export const {
    filterHeroes,
    filtersFetched
} = actions;