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

    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Your main content here (Hero, Dashboard, etc.) */}
        <h2 className={`text-4xl text-center font-bold mt-12 mb-12 ${poppins.className} pb-2`}>
          Storm Chain
        </h2>

        {/* Features */}
        <div className="mb-8 flex justify-center">
          <a
            href="/insights"
            className="inline-flex items-center gap-2 px-5 py-2 mt-4 text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition transform duration-300"
          >
            <span className="text-lg">👉 Explore Insights</span>
          </a>


        </div>

        {/* Favorite Cities */}
        {/* <div className="mb-4">
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
      </div> */}

        {/* Favorite Cryptos */}
        {/* <div className="mb-8">
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
      </div> */}

      </main>

      <img src="/globe.svg" alt="Crypto Weather" className="w-32 h-32 mx-auto mb-4" />

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

      {/* Sticky Footer */}
      <footer className="bg-gray-900 p-4 text-center w-full mb-8">
        <div className="flex justify-center space-x-4">
          <a
            href="/about"
            className={`hover:underline hover:text-gray-300 ${poppins.className}`}
          >
            About Us
          </a>
          <span className="text-gray-500">|</span>
          <a
            href="/contact"
            className={`hover:underline hover:text-gray-300 ${poppins.className}`}
          >
            Contact
          </a>
        </div>
        <div className="mt-4">
          <span className="text-sm text-gray-400">
            Storm Chain © {new Date().getFullYear()}
          </span>
        </div>
      </footer>
    </div>

  );
};

export default Home;
