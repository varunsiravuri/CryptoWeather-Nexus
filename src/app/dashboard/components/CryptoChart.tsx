'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface ChartData {
    prices: number[][];
    market_caps: number[][];
    total_volumes: number[][];
}

interface LineChartProps {
    data: ChartData;
}

function LineChart({ data }: LineChartProps) {
    const chartData = {
        labels: data.prices.map((price) => new Date(price[0]).toLocaleTimeString()),
        datasets: [
            {
                label: 'Price (USD)',
                data: data.prices.map((price) => price[1]),
                borderColor: 'rgb(219, 230, 230)',
                stepped: true,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return <div style={{ width: '100%', height: '400px' }}><Line data={chartData} options={options} style={{ maxWidth: '100%', maxHeight: '100%' }} /></div>;
}

export default LineChart;
