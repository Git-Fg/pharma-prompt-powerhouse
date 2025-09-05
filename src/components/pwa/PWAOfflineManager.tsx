'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { WifiOff, Wifi } from 'lucide-react'

/**
 * PWA Offline Status Manager
 * Provides modern offline experience with toast notifications
 * instead of full-page redirects
 */
export function PWAOfflineManager() {
  const [isOnline, setIsOnline] = useState(true)
  const [hasShownOfflineToast, setHasShownOfflineToast] = useState(false)

  useEffect(() => {
    // Initial online status
    setIsOnline(navigator.onLine)

    const handleOnline = () => {
      setIsOnline(true)
      setHasShownOfflineToast(false)
      
      // Welcome back toast
      toast.success('Connexion rétablie', {
        description: 'Toutes les fonctionnalités sont à nouveau disponibles',
        icon: <Wifi className="size-4" />,
        duration: 3000,
      })
    }

    const handleOffline = () => {
      setIsOnline(false)
      
      if (!hasShownOfflineToast) {
        setHasShownOfflineToast(true)
        
        // Offline notification with helpful message
        toast.error('Mode hors ligne activé', {
          description: 'Le contenu en cache reste accessible. La synchronisation reprendra automatiquement.',
          icon: <WifiOff className="size-4" />,
          duration: 8000, // Longer duration for important message
          action: {
            label: 'Réessayer',
            onClick: () => {
              // Force a network check
              fetch('/api/ping', { method: 'HEAD' })
                .then(() => {
                  if (navigator.onLine) {
                    handleOnline()
                  }
                })
                .catch(() => {
                  toast.error('Toujours hors ligne', {
                    description: 'Vérifiez votre connexion internet',
                    duration: 3000,
                  })
                })
            },
          },
        })
      }
    }

    // Listen for online/offline events
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Service Worker integration for cache-only responses
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data?.type === 'CACHE_ONLY_RESPONSE') {
          // Show notification when content is served from cache only
          toast.info('Contenu en cache', {
            description: 'Affichage de la version sauvegardée hors ligne',
            icon: <WifiOff className="size-4" />,
            duration: 4000,
          })
        }
      })
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [hasShownOfflineToast])

  // Visual indicator for offline status (could be used in UI)
  useEffect(() => {
    // Update document class for CSS-based offline styling
    document.documentElement.classList.toggle('offline', !isOnline)
  }, [isOnline])

  // This component doesn't render anything visible
  // It manages PWA offline experience through side effects
  return null
}

/**
 * Hook to get current online status
 * Useful for components that need to adapt their behavior
 */
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    setIsOnline(navigator.onLine)

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return isOnline
}