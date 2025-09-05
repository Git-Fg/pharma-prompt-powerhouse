import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Normalise un slug en supprimant les accents et caractères spéciaux
 * pour une compatibilité URL optimale
 */
export function normalizeSlug(slug: string): string {
  return slug
    .normalize('NFD') // Décompose les caractères accentués
    .replace(/[\u0300-\u036F]/g, '') // Supprime les marques diacritiques
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-') // Remplace les caractères non alphanumériques par des tirets
    .replace(/-+/g, '-') // Évite les tirets multiples
    .replace(/^-|-$/g, '') // Supprime les tirets en début/fin
}
