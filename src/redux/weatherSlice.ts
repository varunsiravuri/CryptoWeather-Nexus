import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface WeatherAPIResponse {
    main: {
        temp: number;
        humidity: number;
    };
    weather: {
        description: string;
    }[];
}

export const fetchWeather = createAsyncThunk<
    { city: string; data: WeatherAPIResponse }, // ✅ Return type
    string                                      // ✅ Argument type
>(
    'weather/fetchWeather',
    async (city: string) => {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather`,
            {
                params: {
                    q: city,
                    appid: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
                    units: 'metric',
                },
            }
        );
        return { city, data: response.data };
    }
);

interface WeatherState {
    data: Record<string, WeatherAPIResponse>; // ✅ Replaced any
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
            .addCase(
                fetchWeather.fulfilled,
                (state, action: PayloadAction<{ city: string; data: WeatherAPIResponse }>) => {
                    const { city, data } = action.payload;
                    state.loading = false;
                    state.data[city] = data;
                }
            )
            .addCase(fetchWeather.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error fetching weather';
            });
    },
});

export default weatherSlice.reducer;
