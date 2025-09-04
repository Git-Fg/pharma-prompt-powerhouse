'use client'

import { useEffect } from 'react'

export function PWALifecycle() {
  useEffect(() => {
    if (
      typeof window !== 'undefined'
      && 'serviceWorker' in navigator
    ) {
      // Register the service worker
      navigator.serviceWorker.register('/sw.js').then((registration) => {
        // Service worker registered successfully
        if (process.env.NODE_ENV === 'development') {
          console.warn('Service Worker registered:', registration)
        }

        // Listen for service worker updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // In production, you might want to show a toast notification here
                if (process.env.NODE_ENV === 'development') {
                  console.warn('New version available! Please refresh to update.')
                }
              }
            })
          }
        })
      }).catch((error) => {
        // Service worker registration failed - only log in development
        if (process.env.NODE_ENV === 'development') {
          console.warn('Service Worker registration failed:', error)
        }
      })

      // Listen for service worker messages
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'SKIP_WAITING') {
          window.location.reload()
        }
      })
    }
  }, [])

  return null
}
