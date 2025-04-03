'use client';

import React, { useEffect, useState } from 'react';

export function connectWebSocket(callback: (data: any) => void) {
    // Implementation for connecting to WebSocket
}

export function disconnectWebSocket() {
    // Implementation for disconnecting from WebSocket
}

interface CryptoData {
    [key: string]: string;
}

const RealTimeCryptobar: React.FC = () => {
    const [cryptoData, setCryptoData] = useState<CryptoData>({});

    useEffect(() => {
        const handleData = (data: CryptoData) => {
            setCryptoData(prevData => ({ ...prevData, ...data }));
        };

        connectWebSocket(handleData);

        return () => {
            disconnectWebSocket();
        };
    }, []);

    return (
        <div className="bg-gray-800 text-white p-2 overflow-hidden whitespace-nowrap">
            <div className="animate-marquee inline-block">
                {Object.entries(cryptoData).map(([key, value]) => (
                    <span key={key} className="mx-4">
                        {key.charAt(0).toUpperCase() + key.slice(1)}: ${value}
                    </span>
                ))}
                {Object.keys(cryptoData).length === 0 && <span>Loading real-time crypto data...</span>}
            </div>
            {/* Duplicate for seamless scroll effect */}
            <div className="animate-marquee inline-block">
                {Object.entries(cryptoData).map(([key, value]) => (
                    <span key={`${key}-dup`} className="mx-4">
                        {key.charAt(0).toUpperCase() + key.slice(1)}: ${value}
                    </span>
                ))}
                {Object.keys(cryptoData).length === 0 && <span>Loading real-time crypto data...</span>}
            </div>
        </div>
    );
};

export default RealTimeCryptobar;

<style jsx>{`
.animate-marquee {
  animation: marquee 20s linear infinite;
  will-change: transform;
}
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
`}</style>
