import type { Prompt as BasePrompt } from './content';

/**
 * Types partagés spécifiques à l'application
 * Ces types étendent ou complètent les types de contenu générés
 */

// On étend le type de base avec des propriétés spécifiques à l'UI
export type AppPrompt = BasePrompt & {
  isFavorite?: boolean;
  userProgress?: number;
};

// Types pour la recherche et le filtrage
export interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'prompt' | 'guide' | 'philosophy' | 'principle';
  relevance: number;
}

export interface FilterOptions {
  category?: string;
  difficulty?: string;
  targetTool?: string;
  searchQuery?: string;
}

// Types pour la génération de prompts
export interface PromptVariable {
  name: string;
  description: string;
  type: 'string' | 'number' | 'boolean' | 'select';
  required: boolean;
  defaultValue?: string | number | boolean;
  options?: string[];
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
