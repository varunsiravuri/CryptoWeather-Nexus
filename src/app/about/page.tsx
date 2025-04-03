import React from 'react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    weight: ['400', '700'],
    subsets: ['latin'],
});

export default function About() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
            <h1 className={`text-4xl font-bold mb-4 ${poppins.className}`}>About Us</h1>
            <p className={`text-lg text-center ${poppins.className}`}>
                CryptoWeather Nexus is a modern dashboard that blends real-time cryptocurrency prices, live weather updates, and curated crypto news — giving users a powerful all-in-one data experience.
            </p>
            <p className={`text-lg text-center mt-4 ${poppins.className}`}>
                <a href="https://github.com/varunsiravuri/CryptoWeather-Nexus" className="hover:underline">🐱 GitHub</a>
            </p>
        </div>
    );
}
