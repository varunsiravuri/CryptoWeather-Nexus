import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch weather data
export const fetchWeather = createAsyncThunk(
    'weather/fetchWeather',
    async (city: string) => {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
        );
        return { city, data: response.data };
    }
);

interface WeatherState {
    data: Record<string, any>;
    loading: boolean;
    error: string | null;
}

const initialState: WeatherState = {
    data: {},
    loading: false,
    error: null,
};

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchWeather.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.loading = false;
                state.data[action.payload.city] = action.payload.data;
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error fetching weather';
            });
    },
});


export default weatherSlice.reducer;
