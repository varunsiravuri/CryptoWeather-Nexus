import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
    favoriteCities: string[];
    favoriteCryptos: string[];
    favoriteNews: string[];
}

const initialState: FavoritesState = {
    favoriteCities: [],
    favoriteCryptos: [],
    favoriteNews: [],
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavoriteCity(state, action: PayloadAction<string>) {
            if (!state.favoriteCities.includes(action.payload)) {
                state.favoriteCities.push(action.payload);
            }
        },
        removeFavoriteCity(state, action: PayloadAction<string>) {
            state.favoriteCities = state.favoriteCities.filter(city => city !== action.payload);
        },
        addFavoriteCrypto(state, action: PayloadAction<string>) {
            if (!state.favoriteCryptos.includes(action.payload)) {
                state.favoriteCryptos.push(action.payload);
            }
        },
        removeFavoriteCrypto(state, action: PayloadAction<string>) {
            state.favoriteCryptos = state.favoriteCryptos.filter(crypto => crypto !== action.payload);
        },
        addFavoriteNews(state, action: PayloadAction<string>) {
            if (!state.favoriteNews.includes(action.payload)) {
                state.favoriteNews.push(action.payload);
            }
        },
        removeFavoriteNews(state, action: PayloadAction<string>) {
            state.favoriteNews = state.favoriteNews.filter(news => news !== action.payload);
        },
    },
});

export const {
    addFavoriteCity,
    removeFavoriteCity,
    addFavoriteCrypto,
    removeFavoriteCrypto,
    addFavoriteNews,
    removeFavoriteNews,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
