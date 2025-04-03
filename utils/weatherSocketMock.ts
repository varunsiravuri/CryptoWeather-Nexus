export function simulateWeatherAlerts(callback: (message: string) => void) {
    const cities = ['New York', 'London', 'Tokyo'];
    const alerts = ['Storm warning', 'Heavy rain', 'High winds', 'Heatwave', 'Snow alert'];

    const interval = setInterval(() => {
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
        callback(`⚠️ Weather Alert in ${randomCity}: ${randomAlert}`);
    }, 15000);

    return () => clearInterval(interval);
}
