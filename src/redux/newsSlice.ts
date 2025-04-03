import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface NewsArticle {
    link: string;
    title: string;
    pubDate: string; // Assuming pubDate is a string from the API
}

interface NewsApiResponse {
    results: NewsArticle[];
    // Add other potential fields from the API response if needed
}

export const fetchNews = createAsyncThunk<NewsArticle[]>('news/fetchNews', async () => {
    const apiKey = process.env.NEXT_PUBLIC_NEWSDATA_API_KEY;
    const response = await axios.get<NewsApiResponse>(`https://newsdata.io/api/1/news`, {
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
    articles: NewsArticle[];
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
                state.error = null; // Also reset error on pending
            })
            .addCase(fetchNews.fulfilled, (state, action: PayloadAction<NewsArticle[]>) => {
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
