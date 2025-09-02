/**
 * Point d'entrée pour les types de contenu.
 * C'est la source de vérité unique pour les types de données de notre contenu.
 * Types définis avec Zod dans content-schema.ts
 */
export type {
  Concept,
  Guide,
  Prompt,
  ExternalTool,
} from "@/lib/content-schema";

// Type global pour représenter n'importe quel élément de nos collections.
export type AnyContent = 
  | import("@/lib/content-schema").Concept 
  | import("@/lib/content-schema").Guide 
  | import("@/lib/content-schema").Prompt 
  | import("@/lib/content-schema").ExternalTool;