'use client'
import { useCallback, useEffect, useState } from 'react'
import { useConsentStorage } from './useConsent'

export function useFavorites(storageKey: string) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const { getItem, setItem } = useConsentStorage()

  // Charger les favoris depuis le stockage avec consentement au montage
  useEffect(() => {
    try {
      const stored = getItem(storageKey)
      if (stored) {
        setFavorites(new Set(JSON.parse(stored)))
      }
    }
    catch (error) {
      console.error('Failed to load favorites from storage', error)
    }
  }, [storageKey, getItem])

  // Écouter les changements de localStorage (pour la synchronisation entre onglets)
  // Note: Seulement si le consentement est accordé
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue !== null) {
        try {
          setFavorites(new Set(JSON.parse(e.newValue)))
        }
        catch (error) {
          console.error('Failed to parse favorites from storage event', error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [storageKey])

  const toggleFavorite = useCallback(
    (id: string) => {
      setFavorites((prevFavorites) => {
        const newFavorites = new Set(prevFavorites)
        if (newFavorites.has(id)) {
          newFavorites.delete(id)
        }
        else {
          newFavorites.add(id)
        }

        // Sauvegarder avec respect du consentement
        try {
          setItem(
            storageKey,
            JSON.stringify(Array.from(newFavorites)),
          )
        }
        catch (error) {
          console.error('Failed to save favorites to storage', error)
        }

        return newFavorites
      })
    },
    [storageKey, setItem],
  )

  const isFavorite = useCallback(
    (id: string) => favorites.has(id),
    [favorites],
  )

  return { toggleFavorite, isFavorite, favorites }
}
