import { heroesApi } from '../Api/apiSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {[heroesApi.reducerPath]: heroesApi.reducer},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(heroesApi.middleware),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;