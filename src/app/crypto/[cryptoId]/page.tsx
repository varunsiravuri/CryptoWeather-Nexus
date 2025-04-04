"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'; // 🆕 added router for back
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { fetchCryptoChartData } from '../../../redux/crytpoSlice';
import { toggleFavoriteCrypto } from '../../../redux/slices/userPreferencesSlice';
import CryptoGraph from '../../components/CryptoChart';
import { Poppins } from 'next/font/google';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const poppins = Poppins({
    weight: ['400', '700'],
    subsets: ['latin'],
});

export default function CryptoDetail() {
    const router = useRouter(); // ✅ added
    const params = useParams();
    const cryptoId = params.cryptoId as string;
    const dispatch = useAppDispatch();
    const [selectedDays, setSelectedDays] = useState(7);

    const { chartData, chartLoading, chartError } = useAppSelector((state) => state.crypto);
    const { favoriteCryptos } = useAppSelector((state) => state.userPreferences);

    useEffect(() => {
        if (cryptoId) {
            dispatch(fetchCryptoChartData({ coinId: cryptoId, days: selectedDays }));
        }
    }, [dispatch, cryptoId, selectedDays]);

    const displayName = cryptoId ? cryptoId.charAt(0).toUpperCase() + cryptoId.slice(1) : 'Crypto';
    const isFavorite = cryptoId ? favoriteCryptos.includes(cryptoId) : false;

    const timeRangeOptions = [
        { label: '1D', days: 1 },
        { label: '1W', days: 7 },
        { label: '1M', days: 30 },
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8 pt-20">
            <div className="flex items-center space-x-4 mb-4 w-full max-w-4xl">
                <button
                    onClick={() => router.push('/')} // 👈 send directly to Main Page
                    className="flex items-center text-white hover:text-gray-300 text-sm"
                >
                    <ArrowLeftIcon className="h-5 w-5 mr-1" />
                    Back to Home
                </button>

                <h1 className={`text-4xl font-bold ${poppins.className}`}>{displayName} Details</h1>
                {cryptoId && (
                    <button
                        onClick={() => dispatch(toggleFavoriteCrypto(cryptoId))}
                        className={`ml-auto px-3 py-1 text-sm rounded transition-colors ${isFavorite ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : 'bg-gray-700 hover:bg-gray-600'}`}
                    >
                        {isFavorite ? '★ Favorited' : '☆ Favorite'}
                    </button>
                )}
            </div>

            <div className="flex space-x-2 mb-6">
                {timeRangeOptions.map((option) => (
                    <button
                        key={option.days}
                        onClick={() => setSelectedDays(option.days)}
                        className={`px-4 py-1 rounded ${selectedDays === option.days ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'} transition-colors`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            <div className="mt-2 w-full max-w-4xl">
                {chartLoading && <p className="text-center py-10">Loading chart data...</p>}
                {chartError && <p className="text-red-500 text-center py-10">Error loading chart: {chartError}</p>}
                {chartData && !chartLoading && !chartError ? (
                    <CryptoGraph data={chartData} selectedDays={selectedDays} cryptoId={cryptoId} />
                ) : (
                    !chartLoading && !chartError && <p className="text-center">No chart data available.</p>
                )}
            </div>
        </div>
    );
}
