import { allGuides, allPrompts, allExternalTools } from "content-collections";

/**
 * Récupère un guide par son slug
 */
export const getGuideBySlug = (slug: string) => {
  return allGuides.find((g) => g.slug === slug);
};

/**
 * Récupère un prompt par son titre
 */
export const getPromptByTitle = (title: string) => {
  return allPrompts.find((p) => p.title === title);
};

/**
 * Récupère un outil externe par son titre
 */
export const getExternalToolByTitle = (title: string) => {
  return allExternalTools.find((t) => t.title === title);
};

/**
 * Récupère tous les guides d'une catégorie spécifique
 */
export const getGuidesByCategory = (category: string) => {
  return allGuides.filter((g) => g.category === category);
};

/**
 * Récupère tous les prompts d'une catégorie spécifique
 */
export const getPromptsByCategory = (category: string) => {
  return allPrompts.filter((p) => p.category === category);
};

/**
 * Récupère tous les prompts pour un outil spécifique
 */
export const getPromptsByTool = (tool: string) => {
  return allPrompts.filter((p) => p.targetTool === tool);
};

/**
 * Récupère un guide par son guideSlug (pour les outils externes)
 */
export const getGuideByGuideSlug = (guideSlug: string) => {
  return allGuides.find((g) => g.slug === guideSlug);
};

/**
 * Extrait un slug propre à partir du chemin d'un fichier MDX.
 * @param filePath Le chemin du fichier (ex: "principes-context-engineering.mdx")
 * @returns Le slug (ex: "principes-context-engineering")
 */
export function extractSlug(filePath: string): string {
  // On peut simplifier pour juste enlever l'extension
  return filePath.replace(/\.mdx$/, "");
}
