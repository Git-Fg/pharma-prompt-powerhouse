// src/lib/navigation.ts
import { Target, BookOpen, ExternalLink, Brain, Home, Shield } from "lucide-react";
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  description?: string; // Optionnel, pour plus de contexte
  section: 'main' | 'legal' | 'ressources'; // Pour organiser le footer
}

export const navigationLinks: NavItem[] = [
  { 
    name: "Accueil", 
    href: "/", 
    icon: Home, 
    section: 'main',
    description: "Page d'accueil du site"
  },
  { 
    name: "Par où commencer ?", 
    href: "/par-ou-commencer", 
    icon: Target, 
    section: 'main',
    description: "Guide de démarrage pour débuter avec l'IA"
  },
  { 
    name: "Workflows Stratégiques", 
    href: "/workflows", 
    icon: BookOpen, 
    section: 'main',
    description: "Méthodes complètes pour vos cas d'usage"
  },
  { 
    name: "L'Arsenal IA", 
    href: "/l-arsenal-ia", 
    icon: ExternalLink, 
    section: 'main',
    description: "Comparaison d'outils avec mon retour d'expérience"
  },
  { 
    name: "Concepts", 
    href: "/concepts", 
    icon: Brain, 
    section: 'main',
    description: "Définitions claires pour comprendre l'IA"
  },
  {
    name: "Confidentialité",
    href: "/guides/confidentialite-securite",
    icon: Shield,
    section: 'legal',
    description: "Guide de sécurité et confidentialité"
  },
];

// Fonctions utilitaires pour filtrer par section
export const getMainNavigationLinks = () => navigationLinks.filter(link => link.section === 'main');
export const getLegalNavigationLinks = () => navigationLinks.filter(link => link.section === 'legal');
export const getNavigationLinksBySection = (section: NavItem['section']) => navigationLinks.filter(link => link.section === section);