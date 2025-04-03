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
        <a href="/dashboard" className={`hover:text-gray-300 ${poppins.className}`}>
          📡<span className="text-xl font-semibold bg-gray-700 rounded-md px-2 py-1">Trending Insights</span>
        </a>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 p-4 text-center">
        <div className="flex justify-center">
          <a href="/about" className={`hover:underline hover:text-gray-300 ${poppins.className}`}>
            About Us
          </a>
          <span className="mx-2">|</span>
          <a href="/contact" className={`hover:underline hover:text-gray-300 ${poppins.className}`}>
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
}
