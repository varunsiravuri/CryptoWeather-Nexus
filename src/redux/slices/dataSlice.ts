import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
    weather: any;
    crypto: any;
    news: any[];
    loading: boolean;
    error: string | null;
}

const initialState: DataState = {
    weather: {},
    crypto: {},
    news: [],
    loading: false,
    error: null,
};

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setWeather: (state, action: PayloadAction<any>) => {
            state.weather = action.payload;
        },
        setCrypto: (state, action: PayloadAction<any>) => {
            state.crypto = action.payload;
        },
        setNews: (state, action: PayloadAction<any[]>) => {
            state.news = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { setWeather, setCrypto, setNews, setLoading, setError } = dataSlice.actions;
export default dataSlice.reducer;
