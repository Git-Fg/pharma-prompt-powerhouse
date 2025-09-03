/**
 * Point d'entrée pour les types de contenu.
 * C'est la source de vérité unique pour les types de données de notre contenu.
 * Les types sont définis avec Zod et inférés depuis lib/content-schema.ts
 */
export type {
  Concept,
  Guide,
  Workflow,
  ExternalTool,
  EnhancedExternalTool,
  ContentBlock,
  EnrichedGuide,
  EnrichedConcept,
  EnrichedWorkflow,
} from "@/lib/content-schema";

// Type global pour représenter n'importe quel élément de nos collections.
export type AnyContent = 
  | import("@/lib/content-schema").Concept 
  | import("@/lib/content-schema").Guide 
  | import("@/lib/content-schema").Workflow
  | import("@/lib/content-schema").ExternalTool;