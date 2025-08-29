export interface UnifiedPrompt {
  id: string;
  title: string;
  description: string;
  content: string;
  category: PromptCategory;
  difficulty: DifficultyLevel;
  variables: PromptVariable[];
  targetTool: TargetTool;
  xmlStructure?: XmlStructureLevel;
  metadata: PromptMetadata;
  estimatedTime: string;
  tags: string[];
  domain?: PromptDomain;
  useCase?: string;
  example?: string;
}

export interface PromptVariable {
  name: string;
  type: "text" | "number" | "select" | "boolean";
  description: string;
  required: boolean;
  defaultValue?: string | number | boolean;
  options?: string[]; // for select type
  example?: string;
}

export interface PromptMetadata {
  createdAt: string;
  updatedAt: string;
  author?: string;
  readingTime?: string;
  isFavorite?: boolean;
  progress?: number;
  relatedPrompts?: string[];
  relatedTools?: string[];
}

export type PromptCategory =
  | "technical"
  | "analysis"
  | "creative"
  | "documentation"
  | "research"
  | "pharmacologie"
  | "cas-cliniques"
  | "revision"
  | "diagnostic";

export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export type TargetTool =
  | "chatgpt"
  | "claude"
  | "perplexity"
  | "ai.dev"
  | "z.ai"
  | "gemini"
  | "gemini-deep-research"
  | "vertex-ai"
  | "notebooklm"
  | "glass-ai";

export type XmlStructureLevel = "none" | "basic" | "detailed" | "complete";

export type PromptDomain =
  | "general"
  | "pharmacologie"
  | "chimie-medicinale"
  | "pharmacie-hospitaliere"
  | "officine"
  | "recherche";

// Legacy interface for backward compatibility
export interface PromptTemplate
  extends Omit<UnifiedPrompt, "xmlStructure" | "metadata"> {
  createdAt: string;
  updatedAt: string;
}
