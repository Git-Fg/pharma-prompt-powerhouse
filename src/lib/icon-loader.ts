// src/lib/icon-loader.ts
// Optimized icon loader for most frequently used icons
// Reduces bundle size by centralizing common icon imports

import * as LucideIcons from 'lucide-react'

// Most frequently used icons based on codebase analysis
export const commonIcons = {
  // Navigation & Actions (15+ uses)
  BookOpen: LucideIcons.BookOpen,
  ExternalLink: LucideIcons.ExternalLink,
  ArrowRight: LucideIcons.ArrowRight,

  // Core Concepts (8+ uses)
  Target: LucideIcons.Target,
  Lightbulb: LucideIcons.Lightbulb,
  Star: LucideIcons.Star,
  Shield: LucideIcons.Shield,
  Info: LucideIcons.Info,
  Clock: LucideIcons.Clock,
  Brain: LucideIcons.Brain,
  Zap: LucideIcons.Zap,

  // UI Elements (5+ uses)
  Check: LucideIcons.Check,
  CheckIcon: LucideIcons.CheckIcon,
  ArrowLeft: LucideIcons.ArrowLeft,
  X: LucideIcons.X,
  Settings: LucideIcons.Settings,
  Search: LucideIcons.Search,
  Copy: LucideIcons.Copy,
  ChevronDownIcon: LucideIcons.ChevronDownIcon,
  Globe: LucideIcons.Globe,
  RefreshCw: LucideIcons.RefreshCw,
  Home: LucideIcons.Home,
  AlertTriangle: LucideIcons.AlertTriangle,
  Activity: LucideIcons.Activity,
} as const

export type CommonIconName = keyof typeof commonIcons

// Helper function to get a common icon
export function getIcon(name: CommonIconName) {
  return commonIcons[name]
}

// For dynamic icon loading from content
export function getIconByName(name: string) {
  // eslint-disable-next-line ts/no-explicit-any -- Dynamic icon loading from content is necessary for icon resolution
  return (LucideIcons as any)[name]
}

// Type for any Lucide icon
export type LucideIcon = typeof LucideIcons.BookOpen
