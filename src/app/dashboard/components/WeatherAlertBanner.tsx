import { simulateWeatherAlerts } from '../utils/weatherSocketMock';
import { useEffect, useState } from 'react';

export default function WeatherAlertsBanner() {
    const [alert, setAlert] = useState('');

    useEffect(() => {
        const stop = simulateWeatherAlerts(setAlert);
        return () => stop();
    }, []);

    if (!alert) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full bg-yellow-500 text-black text-center py-2 z-50 font-semibold">
            {alert}
        </div>
    );
}
