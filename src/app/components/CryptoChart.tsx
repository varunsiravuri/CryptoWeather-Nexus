'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom'; // Import the zoom plugin

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    zoomPlugin // Register the zoom plugin
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
    // Determine label format based on the range (approximated by number of data points)
    const numDataPoints = data.prices.length;
    const timeFormatOptions: Intl.DateTimeFormatOptions = (numDataPoints >= 7 && numDataPoints <= 30)
        ? { month: 'short', day: 'numeric' } // Show date for 1-week and 1-month charts
        : numDataPoints <= 24 * 2 // Roughly 2 days or less -> show time
            ? { hour: 'numeric', minute: 'numeric' }
            : { month: 'short', day: 'numeric' }; // More than 2 days -> show date

    const chartData = {
        labels: data.prices.map((price) => new Date(price[0]).toLocaleString(undefined, timeFormatOptions)),
        datasets: [
            {
                label: 'Price', // Simplified label (legend will be hidden anyway)
                data: data.prices.map((price) => price[1]),
                borderColor: 'rgba(59, 130, 246, 0.8)', // Blue color for the line
                backgroundColor: 'rgba(59, 130, 246, 0.1)', // Light blue fill under the line
                borderWidth: 2,
                pointRadius: 0, // Hide points
                tension: 0.1, // Slight curve to the line
                fill: true, // Fill area under the line
                // stepped: true, // Removed stepped line for a smoother look
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: { // Add scales configuration for styling
            x: {
                ticks: {
                    color: 'rgba(255, 255, 255, 0.7)', // Light color for x-axis labels
                    maxRotation: 0, // Prevent label rotation
                    autoSkip: true, // Automatically skip labels to prevent overlap
                    maxTicksLimit: 10 // Limit the number of visible ticks
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)', // Lighter grid lines
                },
            },
            y: {
                ticks: {
                    color: 'rgba(255, 255, 255, 0.7)', // Light color for y-axis labels
                    callback: function (value: string | number) { // Format y-axis ticks as currency
                        if (typeof value === 'number') {
                            return '$' + value.toLocaleString();
                        }
                        return value;
                    }
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)', // Lighter grid lines
                },
            },
        },
        plugins: {
            legend: {
                display: false, // Hide the legend (removes the 'Price (USD)' box)
            },
            tooltip: { // Customize tooltips
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
                    }
                }
            },
            zoom: {
                pan: {
                    enabled: true, // Enable panning
                    mode: 'x' as const, // Pan only on the x-axis
                },
                zoom: {
                    wheel: {
                        enabled: true, // Enable zooming with mouse wheel
                    },
                    pinch: {
                        enabled: true // Enable zooming with pinch gesture (for touch devices)
                    },
                    mode: 'x' as const, // Zoom only on the x-axis
                }
            }
        }
    };

    return <div style={{ width: '100%', height: '400px' }}><Line data={chartData} options={options} style={{ maxWidth: '100%', maxHeight: '100%' }} /></div>;
}

export default LineChart;
