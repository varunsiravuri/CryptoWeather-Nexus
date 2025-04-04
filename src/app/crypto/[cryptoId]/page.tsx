"use client"; // Make it a client component

import React, { useEffect, useState } from 'react'; // Import useState
import { useParams } from 'next/navigation'; // Use useParams hook
// Removed local hook definitions
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'; // Import hooks
import { fetchCryptoChartData } from '../../../redux/crytpoSlice'; // Corrected import path
import { toggleFavoriteCrypto } from '../../../redux/slices/userPreferencesSlice'; // Import action
import CryptoGraph from '../../components/CryptoChart';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    weight: ['400', '700'],
    subsets: ['latin'],
});

// Removed Props interface and fetchHistoricalData function

export default function CryptoDetail() {
    const params = useParams();
    const cryptoId = params.cryptoId as string; // Get cryptoId from params
    const dispatch = useAppDispatch();
    const [selectedDays, setSelectedDays] = useState(7); // State for selected time range (default 1 week)

    // Select chart data from Redux store
    const { chartData, chartLoading, chartError } = useAppSelector((state) => state.crypto); // Removed RootState type, inferred by hook
    // Select favorite cryptos
    const { favoriteCryptos } = useAppSelector((state) => state.userPreferences);

    useEffect(() => {
        if (cryptoId) {
            // Dispatch with coinId and selectedDays
            dispatch(fetchCryptoChartData({ coinId: cryptoId, days: selectedDays }));
        }
    }, [dispatch, cryptoId, selectedDays]); // Add selectedDays to dependency array

    // Capitalize the first letter of cryptoId for display
    const displayName = cryptoId ? cryptoId.charAt(0).toUpperCase() + cryptoId.slice(1) : 'Crypto';

    const timeRangeOptions = [
        { label: '1D', days: 1 },
        { label: '1W', days: 7 },
        { label: '1M', days: 30 },
    ];

    const isFavorite = cryptoId ? favoriteCryptos.includes(cryptoId) : false;

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8 pt-20"> {/* Adjusted padding */}
            <div className="flex items-center space-x-4 mb-4"> {/* Wrapper for title and button */}
                <h1 className={`text-4xl font-bold ${poppins.className}`}>{displayName} Details</h1>
                {cryptoId && ( // Only show button if cryptoId is valid
                    <button
                        onClick={() => dispatch(toggleFavoriteCrypto(cryptoId))}
                        className={`px-3 py-1 text-sm rounded transition-colors ${isFavorite ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : 'bg-gray-700 hover:bg-gray-600'}`}
                    >
                        {isFavorite ? '★ Favorited' : '☆ Favorite'}
                    </button>
                )}
            </div>

            {/* Time Range Buttons */}
            <div className="flex space-x-2 mb-6">
                {timeRangeOptions.map(option => (
                    <button
                        key={option.days}
                        onClick={() => setSelectedDays(option.days)}
                        className={`px-4 py-1 rounded ${selectedDays === option.days ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'} transition-colors`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            {/* Chart Section */}
            <div className="mt-2 w-full max-w-4xl"> {/* Reduced top margin */}
                {chartLoading && <p className="text-center py-10">Loading chart data...</p>} {/* Added padding */}
                {chartError && <p className="text-red-500 text-center py-10">Error loading chart: {chartError}</p>} {/* Added padding */}
                {chartData && !chartLoading && !chartError ? (
                    <CryptoGraph data={chartData} selectedDays={selectedDays} cryptoId={cryptoId} />
                ) : (
                    !chartLoading && !chartError && <p className="text-center">No chart data available.</p> // Handle case where data is null but no error/loading
                )}
            </div>
        </div >
    );
}
