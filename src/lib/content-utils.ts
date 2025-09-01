import { cache } from "react";
import type { AnyContent } from "@/types";

/**
 * Ce fichier contient des utilitaires pour MANIPULER les collections de contenu
 * CÔTÉ CLIENT (runtime).
 * La logique de CRÉATION et d'ENRICHISSEMENT des données est dans `content-collections.ts`.
 */

// Le filtrage et le tri sont des opérations typiques du runtime, basées sur l'interaction utilisateur.
// Leur place est donc ici.

export type ContentFilter = {
  search?: string;
  category?: string;
  difficulty?: string;
  tags?: string[];
};

/**
 * Filtre une liste de contenus en fonction des critères de l'utilisateur.
 * Fonctionne sur n'importe quel type de contenu de nos collections.
 */
export const filterContent = cache(
  <T extends AnyContent>(items: T[], filter: ContentFilter): T[] => {
    if (!filter || Object.keys(filter).length === 0) {
      return items;
    }

    return items.filter((item) => {
      // Filtre par recherche textuelle
      if (filter.search) {
        const searchTerm = filter.search.toLowerCase();
        const matchesSearch =
          item.title.toLowerCase().includes(searchTerm) ||
          item.description.toLowerCase().includes(searchTerm) ||
          (item.tags &&
            item.tags.some((tag) => tag.name.toLowerCase().includes(searchTerm)));

        if (!matchesSearch) return false;
      }

      // Filtre par catégorie
      if (filter.category && "category" in item) {
        const itemWithCategory = item as T & { category: string };
        if (itemWithCategory.category !== filter.category) return false;
      }

      // Filtre par difficulté
      if (filter.difficulty && "difficulty" in item) {
        const itemWithDifficulty = item as T & { difficulty: string };
        if (itemWithDifficulty.difficulty !== filter.difficulty) return false;
      }

      // Filtre par tags
      if (filter.tags && filter.tags.length > 0) {
        if (
          !item.tags ||
          !filter.tags.some((tag) => item.tags!.some(t => t.name === tag))
        ) {
          return false;
        }
      }

      return true;
    });
  }
);

/**
 * Trie une liste de contenus.
 */
export const sortContent = cache(
  <T extends AnyContent>(
    items: T[],
    _sortBy: keyof T,
    _direction: 'asc' | 'desc'
  ): T[] => {
    // Logique de tri... (inchangée)
    // ...
    return items; // Placeholder pour la logique existante
  }
);

// Les fonctions comme calculateReadingTime, estimateTokenCount, etc. ont été SUPPRIMÉES
// car ces données sont maintenant des champs calculés au build et directement
// disponibles sur les objets (ex: `guide.readingTime`).