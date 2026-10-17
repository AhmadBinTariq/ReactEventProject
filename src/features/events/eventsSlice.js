import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    list: [],
    loading: false,
    error: null,
    search: '',
    page: 0,
    pages: 0,
    current: null,
};

const slice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true;
            state.error = null;
        },

        setEvents: (state, action) => {
            state.list = action.payload.events;
            state.pages = action.payload.totalPages;
            state.loading = false;
        },

        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        setSearch: (state, action) => {
            state.search = action.payload;
            state.page = 0;
        },

        setPage: (state, action) => {
            state.page = action.payload;
        },

        setCurrent: (state, action) => {
            state.current = action.payload;
            state.loading = false;
        },
    },
});

export const {
    setLoading,
    setEvents,
    setError,
    setSearch,
    setPage,
    setCurrent,
} = slice.actions;

export const getEvents = (state) => state.events.list;
export const getLoading = (state) => state.events.loading;
export const getError = (state) => state.events.error;
export const getSearch = (state) => state.events.search;
export const getPage = (state) => state.events.page;
export const getPages = (state) => state.events.pages;
export const getCurrent = (state) => state.events.current;

export default slice.reducer;
