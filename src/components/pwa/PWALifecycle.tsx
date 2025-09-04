'use client';

import { useEffect } from 'react';
import { Workbox } from 'workbox-window';

declare global {
  interface Window {
    workbox: Workbox;
  }
}

export function PWALifecycle() {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      window.workbox !== undefined
    ) {
      const wb = window.workbox;
      
      // Add event listeners to handle PWA lifecycle events
      wb.addEventListener('controlling', () => {
        window.location.reload();
      });

      wb.addEventListener('waiting', () => {
        // Show notification to user about update availability
        // You can implement a custom notification here
        console.log('New version available! Please refresh to update.');
      });

      wb.addEventListener('activated', () => {
        console.log('Service Worker activated');
      });

      // Register the service worker
      wb.register();
    }
  }, []);

  return null;
}