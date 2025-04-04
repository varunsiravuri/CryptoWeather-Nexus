'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

interface ChartData {
    prices: number[][];
    market_caps: number[][];
    total_volumes: number[][];
}

interface LineChartProps {
    data: ChartData;
    selectedDays: number;
    cryptoId: string;
}

const CryptoGraph = ({ data, selectedDays, cryptoId }: LineChartProps) => {
    let chartData = null;
    let title = '';

    const prices = data.prices;
    let labels: string[] = [];

    if (selectedDays === 1) {
        labels = prices.map((price: any) => new Date(price[0]).toLocaleTimeString());
        title = `1-Day ${cryptoId} Price Graph`;
    } else if (selectedDays === 7) {
        labels = prices.map((price: any) => new Date(price[0]).toLocaleDateString());
        title = `1-Week ${cryptoId} Price Graph`;
    } else if (selectedDays === 30) {
        labels = prices.map((price: any) => new Date(price[0]).toLocaleDateString());
        title = `1-Month ${cryptoId} Price Graph`;
    } else {
        return <p>Loading data...</p>;
    }

    const dataPoints = prices.map((price: any) => price[1]);

    chartData = {
        labels,
        datasets: [
            {
                label: 'Price',
                data: dataPoints,
                borderColor: '#32a852', // Customize the color of the line
                backgroundColor: 'rgba(50, 168, 82, 0.2)', // Add transparency
                fill: true, // This will fill the area under the line
            },
        ],
    };

    if (!chartData) {
        return <p>Loading data...</p>;
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    maxRotation: 0,
                    autoSkip: true,
                    maxTicksLimit: 10,
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
            },
            y: {
                ticks: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    callback: function (value: string | number) {
                        if (typeof value === 'number') {
                            return '$' + value.toLocaleString();
                        }
                        return value;
                    },
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                callbacks: {
                    label: function (context: any) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                        }
                        return label;
                    },
                },
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x' as const,
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: 'x' as const,
                },
            },
        },
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <h2 className="text-2xl text-center mb-4">{title}</h2>
            <Line data={chartData} options={options} style={{ maxWidth: '100%', maxHeight: '300px' }} />
        </div>
    );
};

export default CryptoGraph;
