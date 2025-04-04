"use client"; // Make it a client component

import React, { useEffect, useState } from 'react'; // Import useState
import { useParams } from 'next/navigation'; // Use useParams hook
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'; // Corrected import path
import { fetchCryptoChartData } from '../../../redux/crytpoSlice'; // Corrected import path
import { RootState } from '../../../redux/store'; // Import RootState for typing
import LineChart from '../../components/CryptoChart';
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

    // Select chart data from Redux store with type annotation
    const { chartData, chartLoading, chartError } = useAppSelector((state: RootState) => state.crypto);

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

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8 pt-20"> {/* Adjusted padding */}
            <h1 className={`text-4xl font-bold mb-4 ${poppins.className}`}>{displayName} Details</h1>

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
                    <LineChart data={chartData} />
                ) : (
                    !chartLoading && !chartError && <p className="text-center">No chart data available.</p> // Handle case where data is null but no error/loading
                )}
            </div>
        </div>
    );
}
