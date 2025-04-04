'use client';

import { useAppSelector } from '../../hooks/reduxHooks'; // Adjusted path

export default function Favorites() {
    const { favoriteCities, favoriteCryptos } = useAppSelector(state => state.userPreferences);

    return (
        <div className="p-4 bg-white dark:bg-gray-900 shadow rounded-xl mt-6">
            <h2 className="text-xl font-semibold mb-2">🌟 Favorites</h2>

            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <h3 className="font-bold">Cities</h3>
                    {favoriteCities.length === 0 ? (
                        <p className="text-gray-500 italic">No favorite cities</p>
                    ) : (
                        <ul className="list-disc list-inside">
                            {favoriteCities.map(city => <li key={city}>{city}</li>)}
                        </ul>
                    )}
                </div>
                <div>
                    <h3 className="font-bold">Cryptos</h3>
                    {favoriteCryptos.length === 0 ? (
                        <p className="text-gray-500 italic">No favorite cryptos</p>
                    ) : (
                        <ul className="list-disc list-inside">
                            {favoriteCryptos.map(crypto => <li key={crypto}>{crypto}</li>)}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
