'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchWeather } from '../../redux/weatherSlice';
import { fetchCrypto } from '../../redux/crytpoSlice';
import { fetchNews } from '../../redux/newsSlice';


export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const fullState = useAppSelector((state) => state);
  console.log('🔍 FULL REDUX STATE:', fullState);





  const weatherData = useAppSelector((state) => state.weather.data);
  const weatherLoading = useAppSelector((state) => state.weather.loading);
  const weatherError = useAppSelector((state) => state.weather.error);

  const cryptoData = useAppSelector((state) => state.crypto.data);
  const cryptoLoading = useAppSelector((state) => state.crypto.loading);
  const cryptoError = useAppSelector((state) => state.crypto.error);

  const news = useAppSelector((state) => state.news.articles);
  const newsLoading = useAppSelector((state) => state.news.loading);
  const newsError = useAppSelector((state) => state.news.error);





  useEffect(() => {
    ['New York', 'London', 'Tokyo'].forEach((city) => {
      dispatch(fetchWeather(city));
    });

    dispatch(fetchCrypto());
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <div className="min-h-screen px-6 py-10 space-y-12">
      <h1 className="text-4xl font-bold text-center">CryptoWeather Nexus</h1>

      {/* 🌦 Weather Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">🌦 Weather</h2>
        {weatherLoading && <p>Loading weather data...</p>}
        {weatherError && <p className="text-red-600">Error: {weatherError}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {Object.entries(weatherData).map(([city, data]: any) => (
            <div key={city} className="bg-white p-4 rounded shadow text-black">
              <h3 className="text-xl font-semibold mb-2">{city}</h3>
              <p>Temperature: {data.main.temp}°C</p>
              <p>Humidity: {data.main.humidity}%</p>
              <p>Condition: {data.weather[0].description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🪙 Crypto Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">🪙 Crypto</h2>
        {cryptoLoading && <p>Loading crypto data...</p>}
        {cryptoError && <p className="text-red-600">Error: {cryptoError}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {cryptoData.map((coin: any) => (
            <div key={coin.id} className="bg-white p-4 rounded shadow text-black">
              <h3 className="text-xl font-semibold mb-2">{coin.name}</h3>
              <p>Price: ${coin.current_price}</p>
              <p>24h Change: {coin.price_change_percentage_24h.toFixed(2)}%</p>
              <p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 📰 News Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">📰 News</h2>
        {newsLoading && <p>Loading news...</p>}
        {newsError && <p className="text-red-600">{newsError}</p>}
        <div className="space-y-4">
          {news.map((article: any, index: number) => (
            <a
              key={index}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white text-black p-4 rounded shadow hover:bg-gray-100 transition"
            >
              <h3 className="text-lg font-semibold">{article.title}</h3>
              <p className="text-sm text-gray-600">{article.pubDate}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
