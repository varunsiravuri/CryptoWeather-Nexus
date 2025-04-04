"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // ✅ Import for back button
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchWeather } from '../../redux/weatherSlice';
import { fetchCrypto, CryptoCoin } from '../../redux/crytpoSlice';
import { fetchNews, NewsArticle } from '../../redux/newsSlice';
import NewsCard from '../components/NewsCard';
import CryptoChart from '../components/CryptoChart';
import { toggleFavoriteCrypto, toggleFavoriteCity } from '../../redux/slices/userPreferencesSlice';

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const router = useRouter(); // ✅ Initialize router for back navigation

  const { favoriteCities: favCities, favoriteCryptos: favCryptos } = useAppSelector((state) => state.userPreferences);

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

  const isFavoriteCity = (city: string) => favCities?.includes(city) || false;
  const isFavoriteCrypto = (cryptoId: string) => favCryptos?.includes(cryptoId) || false;

  return (
    <div className="min-h-screen px-6 py-10 space-y-12 bg-gradient-to-b from-black via-[#1a0d00] to-[#0f0f0f] text-white">

      {/* 🔙 Back Button */}
      <button
        onClick={() => router.back()}
        className="text-sm px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-full w-fit mb-4"
      >
        ← Go Back
      </button>

      <h1 className="text-4xl font-bold text-center"> Storm Chain</h1>

      {/* Weather Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">🌦 Weather</h2>
        {weatherLoading && <p>Loading weather data...</p>}
        {weatherError && <p className="text-red-600">Error: {weatherError}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {Object.entries(weatherData).map(([city, data]: [string, any]) => (
            <div key={city} className="bg-[#1c1c1c] p-4 rounded-xl shadow text-white hover:scale-105 transition-transform duration-300 flex flex-col relative">
              <span
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(toggleFavoriteCity(city));
                }}
                className={`absolute top-2 right-2 text-lg cursor-pointer ${isFavoriteCity(city) ? 'text-yellow-500' : 'text-gray-400'}`}
              >
                {isFavoriteCity(city) ? '★' : '☆'}
              </span>

              <h3 className="text-xl font-semibold mb-2">
                {city}
              </h3>
              <p>Temperature: {data?.main?.temp}°C</p>
              <p>Humidity: {data?.main?.humidity}%</p>
              <p>Condition: {data?.weather?.[0]?.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Crypto Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">🪙 Crypto  </h2>
        {cryptoLoading && <p>Loading crypto data...</p>}
        {cryptoError && <p className="text-red-600">Error: {cryptoError}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {cryptoData.map((coin: CryptoCoin) => (
            <div
              key={coin.id}
              className="bg-[#1c1c1c] p-4 rounded-xl shadow text-white hover:scale-105 transition-transform duration-300 flex flex-col"
            >
              <span
                onClick={() => router.replace(`/crypto/${coin.id}`)}
                className="block cursor-pointer"
              >
                {/* Title + Favorite Icon */}
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{coin.name}</h3>
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(toggleFavoriteCrypto(coin.id));
                    }}
                    className={`text-lg cursor-pointer ${isFavoriteCrypto(coin.id) ? 'text-yellow-500' : 'text-gray-400'}`}
                  >
                    {isFavoriteCrypto(coin.id) ? '★' : '☆'}
                  </span>
                </div>

                {/* Price Info */}
                <p>Price: ${coin.current_price}</p>
                <p>24h Change: {coin.price_change_percentage_24h.toFixed(2)}%</p>

                {/* Market Cap + Chart Preview */}
                <div className="flex justify-between items-center mt-1">
                  <p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
                  <span className="text-xs text-gray-400 italic">📉  Chart Preview</span>
                </div>
              </span>
            </div>


          ))}
        </div>
      </section>

      {/* News Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">📰 News</h2>
        {newsLoading && <p>Loading news...</p>}
        {newsError && <p className="text-red-600">{newsError}</p>}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((article: NewsArticle, index: number) => (
            <div key={index} className="bg-[#1c1c1c] p-4 rounded-xl shadow text-white hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
              <p>Published on: {article.pubDate}</p>
              <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Read more
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
