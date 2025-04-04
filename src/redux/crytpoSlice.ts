import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Interface for the historical chart data expected by CryptoChart
export interface CryptoChartData {
    prices: number[][];
    market_caps: number[][];
    total_volumes: number[][];
}

export interface CryptoCoin {
    id: string;
    name: string;
    current_price: number;
    price_change_percentage_24h: number;
    market_cap: number;
}

export const fetchCrypto = createAsyncThunk<CryptoCoin[]>(
    'crypto/fetchCrypto',
    async () => {
        const ids = ['bitcoin', 'ethereum', 'solana'];
        const response = await axios.get<CryptoCoin[]>(
            `https://api.coingecko.com/api/v3/coins/markets`,
            {
                params: {
                    vs_currency: 'usd',
                    ids: ids.join(','),
                    order: 'market_cap_desc',
                },
            }
        );
        return response.data;
    }
);

interface CryptoState {
    data: CryptoCoin[];
    loading: boolean;
    error: string | null;
    chartData: CryptoChartData | null; // Add state for chart data
    chartLoading: boolean;
    chartError: string | null;
}

const initialState: CryptoState = {
    data: [],
    loading: false,
    error: null,
    chartData: null, // Initialize chart data state
    chartLoading: false,
    chartError: null,
};

// Async thunk to fetch historical chart data for a specific coin and number of days
export const fetchCryptoChartData = createAsyncThunk<CryptoChartData, { coinId: string; days: number }>(
    'crypto/fetchCryptoChartData',
    async ({ coinId, days }) => {
        // Determine interval based on days for better granularity
        const interval = days <= 1 ? 'hourly' : 'daily';
        const response = await axios.get<CryptoChartData>(
            `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
            {
                params: {
                    vs_currency: 'usd',
                    days: days.toString(), // Use the provided days
                    interval: interval
                },
            }
        );
        return response.data;
    }
);

const cryptoSlice = createSlice({
    name: 'crypto',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchCrypto.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCrypto.fulfilled, (state, action: PayloadAction<CryptoCoin[]>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchCrypto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error fetching crypto';
            })
            // Handle chart data fetching states
            .addCase(fetchCryptoChartData.pending, state => {
                state.chartLoading = true;
                state.chartError = null;
            })
            .addCase(fetchCryptoChartData.fulfilled, (state, action: PayloadAction<CryptoChartData>) => {
                state.chartLoading = false;
                state.chartData = action.payload;
            })
            .addCase(fetchCryptoChartData.rejected, (state, action) => {
                state.chartLoading = false;
                state.chartError = action.error.message || 'Error fetching chart data';
            });
    },
});

export default cryptoSlice.reducer;
