"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes';

// Keep the context interface for backwards compatibility if any old components still rely on it
interface ThemeContextType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    systemTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
            <LegacyThemeAdapter>
                {children}
            </LegacyThemeAdapter>
        </NextThemesProvider>
    );
};

// This adapter preserves the old useTheme hook API so we don't break existing components 
// that might be using toggleTheme() directly.
const LegacyThemeAdapter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { theme, setTheme, systemTheme } = useNextTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const value: ThemeContextType = {
        theme: mounted ? (theme as 'light' | 'dark') || 'dark' : 'dark',
        toggleTheme,
        systemTheme: mounted ? (systemTheme as 'light' | 'dark') || 'dark' : 'dark',
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
