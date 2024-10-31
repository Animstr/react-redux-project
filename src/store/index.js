import reducer from '../reducers';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;