import React from 'react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    weight: ['400', '700'],
    subsets: ['latin'],
});

export default function Contact() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
            <h1 className={`text-4xl font-bold mb-4 ${poppins.className}`}>Contact Us</h1>
            <p className={`text-lg text-center ${poppins.className}`}>
                varunsiravuri@gmail.com
            </p>
        </div>
    );
}
