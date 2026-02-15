import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    systemTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Detect system theme
    const getSystemTheme = (): 'light' | 'dark' => {
        if (typeof window === 'undefined') return 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(getSystemTheme);
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        // Check localStorage or default to system theme
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme');
            return (saved as 'light' | 'dark') || getSystemTheme();
        }
        return 'dark';
    });

    // Listen to system theme changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            const newSystemTheme = e.matches ? 'dark' : 'light';
            setSystemTheme(newSystemTheme);
            // Only auto-switch if user hasn't manually set a preference
            if (!localStorage.getItem('theme')) {
                setTheme(newSystemTheme);
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Apply theme to document
    useEffect(() => {
        const root = document.documentElement;

        // Remove both classes first
        root.classList.remove('light', 'dark');

        // Add current theme class
        root.classList.add(theme);

        // Set data attribute for additional styling if needed
        root.setAttribute('data-theme', theme);

        // Save to localStorage
        localStorage.setItem('theme', theme);

        // Optional: Set color-scheme for native browser elements
        root.style.colorScheme = theme;
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, systemTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};
