import React from 'react';
import { Poppins } from 'next/font/google';
import LineChart from '@/components/CryptoChart';

const poppins = Poppins({
    weight: ['400', '700'],
    subsets: ['latin'],
});

interface Props {
    params: { cryptoId: string };
}

interface ChartData {
    prices: number[][];
    market_caps: number[][];
    total_volumes: number[][];
}

async function fetchHistoricalData(cryptoId: string): Promise<ChartData> {
    const apiKey = 'CG-jrwmj3UmPR27VWgvjss7Kthf'; // Use the provided API key
    const apiUrl = `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=1&x_cg_demo_api_key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data: ChartData = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching historical data:', error);
        return { prices: [], market_caps: [], total_volumes: [] };
    }
}

export default async function CryptoDetail({ params }: Props) {
    const { cryptoId } = params;
    const historicalData = await fetchHistoricalData(cryptoId);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
            <h1 className={`text-4xl font-bold mb-4 ${poppins.className}`}>Crypto Details</h1>
            <p className={`text-lg text-center ${poppins.className}`}>
                Details for {cryptoId}
            </p>
            {/* Chart Placeholder */}
            <div className="mt-8">
                {historicalData.prices.length > 0 ? (
                    <LineChart data={historicalData} />
                ) : (
                    <p>Loading chart data...</p>
                )}
            </div>
        </div>
    );
}
