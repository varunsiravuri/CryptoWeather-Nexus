import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
    const apiKey = process.env.NEXT_PUBLIC_NEWSDATA_API_KEY;
    const response = await axios.get(`https://newsdata.io/api/1/news`, {
        params: {
            apikey: apiKey,
            q: 'cryptocurrency',
            language: 'en',
            category: 'business',
        },
    });

    return response.data.results.slice(0, 5); // Get top 5
});

interface NewsState {
    articles: any[];
    loading: boolean;
    error: string | null;
}

const initialState: NewsState = {
    articles: [],
    loading: false,
    error: null,
};

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchNews.pending, state => {
                state.loading = true;
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.loading = false;
                state.articles = action.payload;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch news';
            });
    },
});

export default newsSlice.reducer;
