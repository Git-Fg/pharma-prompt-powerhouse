// src/hooks/useConsentUtils.ts
import { useCallback } from 'react'
import { useConsent } from './useConsent'

/**
 * Nettoie toutes les données stockées (thème, favoris, etc.)
 */
export function clearStoredData() {
  // Nettoyer toutes les clés de stockage utilisées par l'application
  const keysToRemove = [
    'theme', // thème utilisateur
    'favorites', // favoris
    'user-preferences', // autres préférences
  ]

  keysToRemove.forEach((key) => {
    localStorage.removeItem(key)
  })
}

/**
 * Hook utilitaire pour le stockage conditionnel
 * Permet de stocker des données seulement si l'utilisateur a consenti
 */
export function useConsentStorage() {
  const { status } = useConsent()

  const setItem = useCallback((key: string, value: string) => {
    if (status === 'accepted') {
      localStorage.setItem(key, value)
    }
    // Si décliné, on ne stocke rien
    // Les fonctionnalités marchent pour la session en cours
  }, [status])

  const getItem = useCallback((key: string): string | null => {
    if (status === 'accepted') {
      return localStorage.getItem(key)
    }
    // Si décliné, on ne lit pas depuis le stockage persistant
    return null
  }, [status])

  const removeItem = useCallback((key: string) => {
    localStorage.removeItem(key)
  }, [])

  return { setItem, getItem, removeItem }
}
