/**
 * Point d'entrée pour les types de contenu générés par Content Collections.
 * C'est la source de vérité unique pour les types de données de notre contenu.
 * NE PAS AJOUTER DE TYPES MANUELS ICI. La logique est dans `content-collections.ts`.
 */
export type {
  Concept,
  Guide,
  Prompt,
  ExternalTool,
} from "content-collections";

// Type global pour représenter n'importe quel élément de nos collections.
export type AnyContent = 
  | import("content-collections").Concept 
  | import("content-collections").Guide 
  | import("content-collections").Prompt 
  | import("content-collections").ExternalTool;