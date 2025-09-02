// src/lib/icon-constants.ts
import * as LucideIcons from 'lucide-react';

// Ceci crée un tableau de toutes les clés d'icônes valides
export const lucideIconNames = Object.keys(LucideIcons).filter(
  key => key !== 'createLucideIcon' && key !== 'LucideIcon'
) as (keyof typeof LucideIcons)[];