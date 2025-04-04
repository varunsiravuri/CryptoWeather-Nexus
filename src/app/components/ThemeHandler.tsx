'use client';

import React, { useState, useEffect } from 'react';

export function ThemeHandler({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') as 'dark' | 'light' || 'dark';
        setTheme(storedTheme);
        document.documentElement.setAttribute('data-theme', storedTheme);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    return <>{children}</>;
}
