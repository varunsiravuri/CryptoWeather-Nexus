// utils/cryptoSocket.ts
export function connectToCryptoWebSocket(
    onMessage: (data: { symbol: string; priceUsd: string }) => void
) {
    const ws = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum');

    ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        for (const [symbol, priceUsd] of Object.entries(data)) {
            onMessage({ symbol, priceUsd: priceUsd as string });
        }
    };

    ws.onerror = (err) => {
        console.error('WebSocket Error:', err);
    };

    return ws;
}
