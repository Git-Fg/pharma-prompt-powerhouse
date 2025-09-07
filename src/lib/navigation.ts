import type { LucideIcon } from 'lucide-react'
// src/lib/navigation.ts
import { BookOpen, Brain, ExternalLink, Home, Shield, Target } from 'lucide-react'

// =================================================================
// UTILITAIRES DE CHEMIN D'ACCÈS ET FIL D'ARIANE
// =================================================================

/**
 * Mapping des segments de chemin vers des noms d'affichage conviviaux
 * Source de vérité unique pour tous les libellés de navigation
 */
export const routeSegmentNames: Record<string, string> = {
  // Pages principales
  'concepts': 'Concepts',
  'guides': 'Guides',
  'workflows': 'Workflows',
  'l-arsenal-ia': 'L\'Arsenal IA',
  'par-ou-commencer': 'Par où commencer',
  'offline': 'Hors ligne',

  // Pages d'erreur
  'not-found': 'Page non trouvée',
  'error': 'Erreur',

  // Autres pages potentielles
  'search': 'Recherche',
  'favorites': 'Favoris',
  'settings': 'Paramètres',
  'profile': 'Profil',
} as const

/**
 * Obtient le nom d'affichage pour un segment de chemin
 * @param segment - Le segment de chemin (ex: 'l-arsenal-ia')
 * @returns Le nom d'affichage formaté (ex: "L'Arsenal IA")
 */
export function getRouteSegmentName(segment: string): string {
  return routeSegmentNames[segment] || segment.replace(/-/g, ' ')
}

/**
 * Formate un chemin complet en segments de navigation
 * @param pathname - Le chemin complet (ex: '/concepts/mon-concept')
 * @returns Tableau de segments formatés pour le fil d'Ariane
 */
export function formatBreadcrumbSegments(pathname: string): Array<{
  href: string
  name: string
  isLast: boolean
}> {
  const segments = pathname.split('/').filter(Boolean)

  return segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join('/')}`
    const isLast = index === segments.length - 1
    const name = getRouteSegmentName(segment)

    return { href, name, isLast }
  })
}

/**
 * Génère le titre de la page à partir du chemin
 * @param pathname - Le chemin complet
 * @returns Le titre de la page formaté
 */
export function generatePageTitle(pathname: string): string {
  if (pathname === '/') {
    return 'Accueil'
  }

  const segments = pathname.split('/').filter(Boolean)
  const lastSegment = segments[segments.length - 1]
  const segmentName = getRouteSegmentName(lastSegment || '')

  // Si c'est une page de détail, on utilise le format "Segment - Parent"
  if (segments.length > 1) {
    const parentSegment = segments[segments.length - 2]
    const parentName = getRouteSegmentName(parentSegment || '')
    return `${segmentName} - ${parentName}`
  }

  return segmentName
}

/**
 * Vérifie si un chemin correspond à une page de détail de contenu
 * @param pathname - Le chemin à vérifier
 * @returns true si c'est une page de détail
 */
export function isContentDetailPage(pathname: string): boolean {
  const contentBasePaths = ['/concepts/', '/guides/', '/workflows/', '/l-arsenal-ia/']
  return contentBasePaths.some(basePath => pathname.startsWith(basePath) && pathname !== basePath)
}

/**
 * Extrait le type de contenu depuis une URL
 * @param url - L'URL à analyser
 * @returns Le type de contenu ou null si non reconnu
 */
export function getContentTypeFromUrl(url: string): 'workflow' | 'guide' | 'concept' | 'tool' | null {
  if (url.startsWith('/workflows/'))
    return 'workflow'
  if (url.startsWith('/guides/'))
    return 'guide'
  if (url.startsWith('/concepts/'))
    return 'concept'
  if (url.startsWith('/l-arsenal-ia/'))
    return 'tool'
  return null
}

/**
 * Génère l'URL complète d'un élément de contenu
 * @param type - Le type de contenu
 * @param slug - Le slug de l'élément
 * @returns L'URL complète
 */
export function getContentUrl(type: 'workflow' | 'guide' | 'concept' | 'tool', slug: string): string {
  const basePaths = {
    workflow: '/workflows',
    guide: '/guides',
    concept: '/concepts',
    tool: '/l-arsenal-ia',
  }

  return `${basePaths[type]}/${slug}`
}

export interface NavItem {
  name: string
  href: string
  icon: LucideIcon
  description?: string // Optionnel, pour plus de contexte
  section: 'main' | 'legal' | 'ressources' // Pour organiser le footer
}

export const navigationLinks: NavItem[] = [
  {
    name: 'Accueil',
    href: '/',
    icon: Home,
    section: 'main',
    description: 'Page d\'accueil du site',
  },
  {
    name: 'Par où commencer ?',
    href: '/par-ou-commencer',
    icon: Target,
    section: 'main',
    description: 'Guide de démarrage pour débuter avec l\'IA',
  },
  {
    name: 'Workflows Stratégiques',
    href: '/workflows',
    icon: BookOpen,
    section: 'main',
    description: 'Méthodes complètes pour vos cas d\'usage',
  },
  {
    name: 'L\'Arsenal IA',
    href: '/l-arsenal-ia',
    icon: ExternalLink,
    section: 'main',
    description: 'Comparaison d\'outils avec mon retour d\'expérience',
  },
  {
    name: 'Concepts',
    href: '/concepts',
    icon: Brain,
    section: 'main',
    description: 'Définitions claires pour comprendre l\'IA',
  },
  {
    name: 'Confidentialité',
    href: '/guides/confidentialite-securite',
    icon: Shield,
    section: 'legal',
    description: 'Guide de sécurité et confidentialité',
  },
]

// Fonctions utilitaires pour filtrer par section
export const getMainNavigationLinks = () => navigationLinks.filter(link => link.section === 'main')
export const getLegalNavigationLinks = () => navigationLinks.filter(link => link.section === 'legal')
export const getNavigationLinksBySection = (section: NavItem['section']) => navigationLinks.filter(link => link.section === section)
