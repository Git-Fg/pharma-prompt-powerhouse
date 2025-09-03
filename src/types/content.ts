// src/types/content.ts
// Types pour les blocs de contenu avec unions discriminées

export type MarkdownBlock = { type: "markdown"; content: string };

export type AlertBlock = {
  type: "alert";
  variant?: "default" | "destructive";
  title?: string;
  content: string;
};

export type ToolRecommendationBlock = {
  type: "toolRecommendation";
 slug?: string;
  reason?: string;
};

export type GuideRecommendationBlock = {
  type: "guideRecommendation";
  slug?: string;
  reason?: string;
};

export type ConceptRecommendationBlock = {
  type: "conceptRecommendation";
  slug?: string;
  reason?: string;
};

export type CodeBlockBlock = {
  type: "codeBlock";
  language: string;
  filename?: string;
  showLineNumbers?: boolean;
  content: string;
};

export type CardBlock = {
  type: "card";
  title?: string;
  description?: string;
  content: string;
  variant?: "default" | "outline";
};

export type TabsBlock = {
  type: "tabs";
  defaultValue?: string;
  tabs: Array<{
    value: string;
    title: string;
    content: ContentBlock[];
  }>;
};

export type MultiFormatPromptBlock = {
  type: "multiFormatPrompt";
  alternativeVersions: Record<string, { systemPrompt?: string; userPrompt: string }>;
  recommendedTools: Record<string, string[]>;
  variables: string[];
};

export type ContentBlock =
  | MarkdownBlock
  | AlertBlock
  | ToolRecommendationBlock
  | GuideRecommendationBlock
  | ConceptRecommendationBlock
  | CodeBlockBlock
  | CardBlock
  | TabsBlock
  | MultiFormatPromptBlock;

// Types pour les collections de contenu
export type ConceptInput = {
  slug: string;
  title: string;
  description: string;
 icon?: string;
  category: string;
  difficulty: string;
  tags: string[];
  isFavorite: boolean;
  keyTakeaways: string[];
  mainGuideSlug?: string;
  conceptSlugs?: string[];
  content: ContentBlock[];
};

export type GuideInput = {
  slug: string;
  title: string;
  description: string;
  icon?: string;
  category: string;
  difficulty: string;
  tags: string[];
  isFavorite: boolean;
  estimatedTime?: string;
  keyTakeaways?: string[];
  isWorkflow?: boolean;
  conceptSlugs?: string[];
  content: ContentBlock[];
};

export type PromptInput = {
 slug: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  tags: string[];
  isFavorite: boolean;
  promptContent?: string;
  systemPromptContent?: string;
  variables?: string[];
  conceptSlugs?: string[];
  content: ContentBlock[];
};

export type ExternalToolInput = {
  slug: string;
  title: string;
  description: string;
  url: string;
  logo?: string;
  category: string;
  tags: string[];
  isFavorite: boolean;
};

export type ObjectifInput = {
  slug: string;
  title: string;
  description: string;
  icon?: string;
  tags: string[];
  isFavorite: boolean;
  masterPrompt: {
    description: string;
    prompt: PromptInput;
  };
  beforeAfter: {
    beforePrompt: string;
    afterPrompt: string;
    beforeImageSrc?: string;
    afterImageSrc?: string;
  };
  checklist: string[];
  relatedConcepts: string[];
  relatedGuides: string[];
  content?: ContentBlock[];
};

export type WorkflowInput = {
  slug: string;
  title: string;
  description: string;
  icon?: string;
  category: string;
  difficulty: string;
 tags: string[];
  isFavorite: boolean;
  steps: Array<{
    title: string;
    description: string;
    promptSlug?: string;
  }>;
};