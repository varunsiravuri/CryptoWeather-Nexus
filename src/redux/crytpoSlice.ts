import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCrypto = createAsyncThunk(
    'crypto/fetchCrypto',
    async () => {
        const ids = ['bitcoin', 'ethereum', 'solana'];
        const response = await axios.get(
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
    data: any[];
    loading: boolean;
    error: string | null;
}

const initialState: CryptoState = {
    data: [],
    loading: false,
    error: null,
};

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
            .addCase(fetchCrypto.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchCrypto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error fetching crypto';
            });
    },
});

export default cryptoSlice.reducer;
