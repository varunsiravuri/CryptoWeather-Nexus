import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "../redux/providers";
import React from 'react';
// Removed ThemeHandler import

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Welcome to Storm Chain",
  description: "All about Crypto , Weather and News ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Removed useState and useEffect for theme handling

  return (
    <html lang="en">{/* Removed data-theme={theme} */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers> {/* Removed ThemeHandler wrapper */}
      </body>
    </html>
  );
}
