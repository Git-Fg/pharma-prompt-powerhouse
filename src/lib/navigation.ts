import type { LucideIcon } from 'lucide-react'
// src/lib/navigation.ts
import { BookOpen, Brain, ExternalLink, Home, Shield, Target } from 'lucide-react'

// Type-safe icon mapping for navigation
const navigationIcons: Record<string, LucideIcon> = {
  Home,
  Target,
  BookOpen,
  ExternalLink,
  Brain,
  Shield,
}

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
  showInMobileNav?: boolean // Optionnel, pour afficher dans la navigation mobile
  isActive?: boolean // Optionnel, pour indiquer si le lien est actif
  label?: string // Optionnel, pour l'accessibilité
}

export const navigationLinks: NavItem[] = [
  {
    name: 'Accueil',
    href: '/',
    icon: navigationIcons.Home!,
    section: 'main',
    description: 'Page d\'accueil du site',
    showInMobileNav: true,
  },
  {
    name: 'Par où commencer ?',
    href: '/par-ou-commencer',
    icon: navigationIcons.Target!,
    section: 'main',
    description: 'Guide de démarrage pour débuter avec l\'IA',
    showInMobileNav: true,
  },
  {
    name: 'Workflows Stratégiques',
    href: '/workflows',
    icon: navigationIcons.BookOpen!,
    section: 'main',
    description: 'Méthodes complètes pour vos cas d\'usage',
    showInMobileNav: true,
  },
  {
    name: 'L\'Arsenal IA',
    href: '/l-arsenal-ia',
    icon: navigationIcons.ExternalLink!,
    section: 'main',
    description: 'Comparaison d\'outils avec mon retour d\'expérience',
    showInMobileNav: true,
  },
  {
    name: 'Concepts',
    href: '/concepts',
    icon: navigationIcons.Brain!,
    section: 'main',
    description: 'Définitions claires pour comprendre l\'IA',
  },
  {
    name: 'Confidentialité',
    href: '/guides/confidentialite-securite',
    icon: navigationIcons.Shield!,
    section: 'legal',
    description: 'Guide de sécurité et confidentialité',
  },
]

// Fonctions utilitaires pour filtrer par section
export function getMainNavigationLinks(currentPath: string = '/') {
  return navigationLinks.filter(link => link.section === 'main').map(link => ({
    ...link,
    isActive: isActiveRoute(currentPath, link.href),
  }))
}
export const getLegalNavigationLinks = () => navigationLinks.filter(link => link.section === 'legal')
export const getNavigationLinksBySection = (section: NavItem['section']) => navigationLinks.filter(link => link.section === section)

// Fonction utilitaire pour obtenir les liens de navigation mobile
export function getMobileNavigationLinks(currentPath: string = '/') {
  return navigationLinks.filter(link => link.showInMobileNav).map(link => ({
    ...link,
    isActive: isActiveRoute(currentPath, link.href),
  }))
}

/**
 * Génère le fil d'Ariane pour une page donnée
 */
export function generateBreadcrumbs(pathname: string): Array<{
  path: string
  label: string
  isCurrent: boolean
}> {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs = []

  // Ajouter la page d'accueil
  breadcrumbs.push({
    path: '/',
    label: 'Accueil',
    isCurrent: segments.length === 0,
  })

  // Construire le chemin progressivement
  let currentPath = ''
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    currentPath += `/${segment}`
    const isCurrent = i === segments.length - 1

    const label: string = getRouteSegmentName(segment || '') || segment || ''
    breadcrumbs.push({
      path: currentPath,
      label,
      isCurrent,
    })
  }

  return breadcrumbs
}

/**
 * Détermine le type de contenu à partir d'un chemin
 */
export function getContentTypeFromPath(path: string): 'workflow' | 'guide' | 'concept' | 'tool' | null {
  const segments = path.split('/').filter(Boolean)

  if (segments.length !== 2) {
    return null
  }

  const [type, _] = segments

  switch (type) {
    case 'guides':
      return 'guide'
    case 'workflows':
      return 'workflow'
    case 'concepts':
      return 'concept'
    case 'l-arsenal-ia':
      return 'tool'
    default:
      return null
  }
}

/**
 * Construit le chemin pour un contenu donné
 */
export function buildContentPath(type: 'workflow' | 'guide' | 'concept' | 'tool', slug: string): string | null {
  if (!slug) {
    return null
  }

  switch (type) {
    case 'guide':
      return `/guides/${slug}`
    case 'workflow':
      return `/workflows/${slug}`
    case 'concept':
      return `/concepts/${slug}`
    case 'tool':
      return `/l-arsenal-ia/${slug}`
    default:
      return null
  }
}

/**
 * Alias pour getRouteSegmentName pour la compatibilité
 */
export function getDisplayNameForSegment(segment: string): string {
  return getRouteSegmentName(segment)
}

/**
 * Détermine si une route est active
 */
export function isActiveRoute(currentPath: string, targetPath: string): boolean {
  return currentPath === targetPath
}
