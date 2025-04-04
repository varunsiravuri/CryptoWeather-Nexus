import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../redux/weatherSlice';
import cryptoReducer from '../redux/crytpoSlice';
import newsReducer from '../redux/newsSlice';
import favoritesReducer from './favoritesSlice';
import userPreferencesReducer from '../redux/slices/userPreferencesSlice';

export const store = configureStore({
    reducer: {
        weather: weatherReducer,
        crypto: cryptoReducer,
        news: newsReducer,
        favorites: favoritesReducer,
        userPreferences: userPreferencesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
