// ============================================================================
// EXPORTATIONS UNIFIÉES - Tous les types viennent de content-collections.ts
// ============================================================================

// Types principaux générés automatiquement par Zod
export type {
  Guide,
  Philosophy,
  Principle,
  Prompt,
  ExternalTool,
  // Types d'entrée
  GuideInput,
  PhilosophyInput,
  PrincipleInput,
  PromptInput,
  ExternalToolInput,
  // Types utilitaires
  DifficultyLevel,
  GuideCategory,
  PromptCategory,
  TargetTool,
} from "../../content-collections";

// ============================================================================
// TYPES SPÉCIFIQUES POUR L'INTERFACE UTILISATEUR
// ============================================================================

// Types pour les composants UI (non liés au contenu)
export interface ContentMetadata {
  id: string;
  slug: string;
  lastModified?: string;
  readingProgress?: number;
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: "guide" | "philosophy" | "principle" | "prompt" | "external-tool";
  relevance: number;
  tags: string[];
}

export interface FilterOptions {
  category?: string;
  difficulty?: string;
  tags?: string[];
  search?: string;
}

// ============================================================================
// TYPES POUR LES PROMPTS ET VARIABLES
// ============================================================================

export interface PromptVariable {
  name: string;
  description: string;
  type: "text" | "number" | "select" | "textarea" | "boolean";
  required: boolean;
  defaultValue?: string | number | boolean;
  options?: string[]; // pour le type 'select'
  placeholder?: string;
}

export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  template: string;
  variables: PromptVariable[];
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface VariableValue {
  name: string;
  value: string | number | boolean;
}

export interface PromptGenerationResult {
  filledTemplate: string;
  variableValues: VariableValue[];
  timestamp: string;
}

// ============================================================================
// TYPES POUR LES COMPOSANTS UI
// ============================================================================

export interface PromptCardProps {
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
  author?: string;
  isFavorite?: boolean;
  tags?: string[];
  category?: string;
  targetTool?: string;
  onUse?: () => void;
  onFavorite?: () => void;
}

export interface ContentCardProps {
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  category?: string;
  tags?: string[];
  progress?: number;
  onView?: () => void;
  onFavorite?: () => void;
}
