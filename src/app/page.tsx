import React from 'react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default function Home() {
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
}
