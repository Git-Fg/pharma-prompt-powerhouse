'use client';
import { useState, useEffect, useCallback } from 'react';

export const useFavorites = (storageKey: string) => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Charger les favoris depuis localStorage au montage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setFavorites(new Set(JSON.parse(stored)));
      }
    } catch (error) {
      console.error('Failed to load favorites from localStorage', error);
    }
  }, [storageKey]);

  // Écouter les changements de localStorage (pour la synchronisation entre onglets)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue !== null) {
        try {
          setFavorites(new Set(JSON.parse(e.newValue)));
        } catch (error) {
          console.error('Failed to parse favorites from storage event', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [storageKey]);

  const toggleFavorite = useCallback(
    (id: string) => {
      setFavorites(prevFavorites => {
        const newFavorites = new Set(prevFavorites);
        if (newFavorites.has(id)) {
          newFavorites.delete(id);
        } else {
          newFavorites.add(id);
        }

        // Sauvegarder dans localStorage
        try {
          localStorage.setItem(
            storageKey,
            JSON.stringify(Array.from(newFavorites))
          );
        } catch (error) {
          console.error('Failed to save favorites to localStorage', error);
        }

        return newFavorites;
      });
    },
    [storageKey]
  );

  const isFavorite = useCallback(
    (id: string) => favorites.has(id),
    [favorites]
  );

  return { toggleFavorite, isFavorite, favorites };
};
