'use client';

import React, { useEffect, useState } from 'react';
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
  // Removed theme state, useEffect, and toggleTheme function

  return (
    // Removed data-theme={theme}
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-black via-[#1a0d00] to-[#0f0f0f] text-white">
      {/* Removed theme toggle button */}

      <main className="flex-grow">
        <h2 className={`text-4xl text-center font-bold mt-12 mb-6 ${poppins.className}`}>
          Storm Chain
        </h2>

        {/* Explore Insights Button */}
        <div className="mb-6 flex justify-center">
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-2 text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition duration-300"
          >
            👉 <span className="text-lg">Explore Insights</span>
          </a>
        </div>

        {/* Centered Bitcoin Image */}

        <div className="flex justify-center items-center my-10">
          <div className="relative before:absolute before:inset-0 before:rounded-full before:bg-[radial-gradient(ellipse_at_center,_rgba(255,150,0,0.35)_0%,_transparent_70%)] before:blur-2xl before:z-0">
            <img
              src="/bitcoin.webp"
              alt="Glowing Bitcoin"
              className="relative z-10 w-64 h-auto rounded-xl shadow-[0_0_60px_rgba(255,150,0,0.3)] hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>



        {/* Highlight Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 px-6">
          <div className="bg-[#1c1c1c] p-6 rounded-xl hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold mb-4">Live Weather Data</h3>
            <p>Get real-time weather updates for major cities around the world.</p>
          </div>
          <div className="bg-[#1c1c1c] p-6 rounded-xl hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold mb-4">Cryptocurrency Tracker</h3>
            <p>Get real-time price updates and market trends of top cryptocurrencies.</p>
          </div>
          <div className="bg-[#1c1c1c] p-6 rounded-xl hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold mb-4">Top Crypto News</h3>
            <p>Stay up to date with the latest cryptocurrency news and trends.</p>
          </div>
        </div>
      </main>

      {/* Sticky Footer */}
      <footer className="bg-[#111111] p-4 text-center mt-auto">
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
