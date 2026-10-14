"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { apiClient } from '../services/api';

export function useAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    const trackPageView = async () => {
      // Don't track admin pages
      if (pathname.startsWith('/admin')) return;

      // Generate a simple session ID if not exists
      let sessionId = sessionStorage.getItem('analytics_session_id');
      if (!sessionId) {
        sessionId = Math.random().toString(36).substring(2, 15);
        sessionStorage.setItem('analytics_session_id', sessionId);
      }

      try {
        await apiClient.post('/track', {
          path: pathname,
          session_id: sessionId,
        });
      } catch (err) {
        // Silently fail for analytics
        console.error('Analytics tracking failed', err);
      }
    };

    trackPageView();
  }, [pathname]);
}
