import React from 'react';
import type { Metadata } from 'next';
import { ThemeProvider } from '../contexts/ThemeContext';
import { AnalyticsProvider } from '../components/AnalyticsProvider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ErrorBoundary from '../components/ErrorBoundary';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'MediaBoss Africa | Global Talent & Influencer Ecosystem',
  description: 'The premier global talent ecosystem representing the leading voices in entertainment, digital storytelling, and brand influence.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground font-sans overflow-x-hidden transition-colors duration-300">
        <ErrorBoundary>
          <ThemeProvider>
            <AnalyticsProvider />
            <Navbar />
            
            <main className="relative z-10 min-h-screen" id="main-content">
              {children}
            </main>

            <Footer />
            
            <div className="fixed inset-0 pointer-events-none z-0">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(255,0,160,0.02)_0%,_transparent_60%)]" />
            </div>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
