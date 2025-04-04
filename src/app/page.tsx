'use client';

import React from 'react';
import { Poppins } from 'next/font/google';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addFavoriteCity, removeFavoriteCity, addFavoriteCrypto, removeFavoriteCrypto } from '../store/favoritesSlice';

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
});

const Home = () => {
  const dispatch = useAppDispatch();
  const { favoriteCities, favoriteCryptos } = useAppSelector((state) => state.favorites);

  const handleAddFavoriteCity = (city: string) => {
    dispatch(addFavoriteCity(city));
  };

  const handleRemoveFavoriteCity = (city: string) => {
    dispatch(removeFavoriteCity(city));
  };

  const handleAddFavoriteCrypto = (crypto: string) => {
    dispatch(addFavoriteCrypto(crypto));
  };

  const handleRemoveFavoriteCrypto = (crypto: string) => {
    dispatch(removeFavoriteCrypto(crypto));
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      {/* Project Name */}
      <h1 className={`text-6xl font-bold mb-8 ${poppins.className} border-b border-gray-700 pb-2`}>
        CryptoWeather-Nexus
      </h1>

      {/* Features */}
      <div className="mb-8">
        <a
          href="/dashboard"
          className={`text-xl font-semibold bg-gray-700 rounded-md px-2 py-1 hover:bg-gray-600 transition-all ${poppins.className}`}
        >
          📡 Trending Insights
        </a>
      </div>

      {/* Favorite Cities */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Favorite Cities</h2>
        <ul className="flex flex-wrap gap-2">
          {favoriteCities.map((city: string) => (
            <li key={city} className="bg-gray-800 px-4 py-2 rounded-md">
              {city}
              <button onClick={() => handleRemoveFavoriteCity(city)} className="ml-2 text-red-500">
                Remove
              </button>
            </li>
          ))}
        </ul>
        <button onClick={() => handleAddFavoriteCity('London')} className="bg-gray-700 px-4 py-2 rounded-md mt-2">
          Add London
        </button>
      </div>

      {/* Favorite Cryptos */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Favorite Cryptos</h2>
        <ul className="flex flex-wrap gap-2">
          {favoriteCryptos.map((crypto: string, index: number) => (
            <li key={`${crypto}-${index}`} className="bg-gray-800 px-4 py-2 rounded-md">
              {crypto}
              <button onClick={() => handleRemoveFavoriteCrypto(crypto)} className="ml-2 text-red-500">
                Remove
              </button>
            </li>
          ))}
        </ul>
        <button onClick={() => handleAddFavoriteCrypto('Bitcoin')} className="bg-gray-700 px-4 py-2 rounded-md mt-2">
          Add Bitcoin
        </button>
      </div>

      {/* Highlight Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-xl hover:scale-105 transition-transform duration-300">
          <h3 className="text-2xl font-bold mb-4">Live Weather Data</h3>
          <p>Get real-time weather updates for major cities around the world.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl hover:scale-105 transition-transform duration-300">
          <h3 className="text-2xl font-bold mb-4">Cryptocurrency Tracker</h3>
          <p>Monitor live price updates and market trends of top cryptocurrencies.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl hover:scale-105 transition-transform duration-300">
          <h3 className="text-2xl font-bold mb-4">Top Crypto News</h3>
          <p>Stay up to date with the latest cryptocurrency news and trends.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 p-4 text-center w-full">
        <div className="flex justify-center space-x-4">
          <a href="/about" className={`hover:underline hover:text-gray-300 ${poppins.className}`}>
            About Us
          </a>
          <span className="text-gray-500">|</span>
          <a href="/contact" className={`hover:underline hover:text-gray-300 ${poppins.className}`}>
            Contact
          </a>
        </div>
        <div className="mt-4">
          <span className="text-sm">CryptoWeather Nexus &copy; {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
