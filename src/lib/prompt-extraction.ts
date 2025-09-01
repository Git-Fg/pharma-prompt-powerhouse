/**
 * Advanced prompt extraction utilities for MDX content
 */

export interface ExtractedPrompt {
  title: string;
  content: string;
  language: string;
  variables: ExtractedVariable[];
  metadata?: Record<string, unknown>;
}

export interface ExtractedVariable {
  name: string;
  description?: string;
  type: 'text' | 'number' | 'boolean' | 'list';
  required: boolean;
  example?: string;
  options?: string[];
}

/**
 * Extract prompt content from MDX text
 */
export function extractPromptsFromMDX(mdxContent: string): ExtractedPrompt[] {
  const prompts: ExtractedPrompt[] = [];
  
  // Match code blocks with language indicators
  const codeBlockRegex = /```(\w+)\n([\s\S]*?)```/g;
  let match;
  
  while ((match = codeBlockRegex.exec(mdxContent)) !== null) {
    const [, language, content] = match;
    
    // Skip non-prompt languages
    if (!language || !content || !isPromptLanguage(language)) {
      continue;
    }
    
    const variables = extractVariablesFromContent(content);
    
    prompts.push({
      title: extractTitleFromContext(mdxContent, match.index),
      content: content.trim(),
      language,
      variables,
      metadata: extractMetadataFromContext(mdxContent, match.index)
    });
  }
  
  // Also look for plain text prompts in sections
  const sectionPrompts = extractSectionPrompts(mdxContent);
  prompts.push(...sectionPrompts);
  
  return prompts;
}

/**
 * Check if language indicates a prompt
 */
function isPromptLanguage(language: string): boolean {
  const promptLanguages = ['xml', 'markdown', 'text', 'prompt'];
  return promptLanguages.includes(language.toLowerCase());
}

/**
 * Extract variables from prompt content
 */
function extractVariablesFromContent(content: string): ExtractedVariable[] {
  const variables: ExtractedVariable[] = [];
  
  // Match {variable_name} patterns
  const variableRegex = /\{([^}]+)\}/g;
  let match;
  
  while ((match = variableRegex.exec(content)) !== null) {
    const variableName = match[1];
    
    // Avoid duplicates and ensure variable name exists
    if (variableName && !variables.some(v => v.name === variableName)) {
      variables.push({
        name: variableName,
        type: inferVariableType(variableName, content),
        required: true,
        description: generateVariableDescription(variableName)
      });
    }
  }
  
  return variables;
}

/**
 * Infer variable type from name and context
 */
function inferVariableType(variableName: string, _content: string): ExtractedVariable['type'] {
  const name = variableName.toLowerCase();
  
  if (name.includes('count') || name.includes('number') || name.includes('age')) {
    return 'number';
  }
  
  if (name.includes('is_') || name.includes('has_') || name.includes('enable')) {
    return 'boolean';
  }
  
  if (name.includes('list') || name.includes('items') || name.includes('options')) {
    return 'list';
  }
  
  return 'text';
}

/**
 * Generate a helpful description for a variable
 */
function generateVariableDescription(variableName: string): string {
  const name = variableName.toLowerCase().replace(/_/g, ' ');
  
  const descriptions: Record<string, string> = {
    'document_content': 'Le contenu du document à analyser',
    'user_question': 'La question de l\'utilisateur',
    'patient_age': 'L\'âge du patient en années',
    'medication': 'Le nom du médicament',
    'dose': 'La posologie recommandée',
    'symptoms': 'Les symptômes observés',
    'context': 'Le contexte clinique',
    'specialty': 'La spécialité médicale concernée'
  };
  
  return descriptions[variableName.toLowerCase()] || `Valeur pour ${name}`;
}

/**
 * Extract title from surrounding context
 */
function extractTitleFromContext(mdxContent: string, codeBlockIndex: number): string {
  // Look for the nearest heading before the code block
  const beforeContent = mdxContent.substring(0, codeBlockIndex);
  const headingRegex = /#{1,6}\s+(.+?)(?:\n|$)/g;
  
  let lastHeading = '';
  let match;
  
  while ((match = headingRegex.exec(beforeContent)) !== null) {
    if (match[1]) {
      lastHeading = match[1].trim();
    }
  }
  
  return lastHeading || 'Prompt extrait';
}

/**
 * Extract metadata from context
 */
function extractMetadataFromContext(mdxContent: string, codeBlockIndex: number): Record<string, unknown> {
  const metadata: Record<string, unknown> = {};
  
  // Look for recommended tool mentions
  const beforeContent = mdxContent.substring(Math.max(0, codeBlockIndex - 500), codeBlockIndex);
  const toolRegex = /\*\*([^*]+)\*\*.*(?:Claude|ChatGPT|Gemini|Perplexity)/gi;
  const toolMatch = toolRegex.exec(beforeContent);
  
  if (toolMatch && toolMatch[1]) {
    metadata.recommendedTool = toolMatch[1];
  }
  
  return metadata;
}

/**
 * Extract prompts from markdown sections (non-code blocks)
 */
function extractSectionPrompts(mdxContent: string): ExtractedPrompt[] {
  const prompts: ExtractedPrompt[] = [];
  
  // Look for sections with specific prompt indicators
  const sections = mdxContent.split(/#{2,6}\s+/);
  
  for (const section of sections) {
    if (isPromptSection(section)) {
      const variables = extractVariablesFromContent(section);
      const title = extractSectionTitle(section);
      
      prompts.push({
        title,
        content: cleanSectionContent(section),
        language: 'text',
        variables
      });
    }
  }
  
  return prompts;
}

/**
 * Check if a section contains a prompt
 */
function isPromptSection(section: string): boolean {
  const promptIndicators = [
    'prompt',
    'instruction',
    'template',
    '{',
    'utilisez',
    'copiez',
    'collez'
  ];
  
  const lowerSection = section.toLowerCase();
  return promptIndicators.some(indicator => lowerSection.includes(indicator));
}

/**
 * Extract title from section
 */
function extractSectionTitle(section: string): string {
  const lines = section.split('\n');
  const firstLine = lines[0]?.trim();
  
  if (firstLine && firstLine.length > 0 && firstLine.length < 100) {
    return firstLine;
  }
  
  return 'Prompt de section';
}

/**
 * Clean section content for prompt extraction
 */
function cleanSectionContent(section: string): string {
  const lines = section.split('\n');
  
  // Remove title line and empty lines
  const contentLines = lines.slice(1).filter(line => {
    const trimmed = line.trim();
    return trimmed.length > 0 && !trimmed.startsWith('#');
  });
  
  return contentLines.join('\n').trim();
}

/**
 * Extract all prompts from a content-collections document
 */
export function extractPromptsFromDocument(document: Record<string, unknown>): ExtractedPrompt[] {
  const prompts = extractPromptsFromMDX((document.content as string) || '');
  
  // Add document metadata to all extracted prompts
  return prompts.map(prompt => ({
    ...prompt,
    metadata: {
      ...prompt.metadata,
      sourceDocument: document.slug,
      sourceTitle: document.title,
      sourceCategory: document.category,
      sourceDescription: document.description
    }
  }));
}

/**
 * Convert extracted prompt to PromptTemplate format
 */
export function convertToPromptTemplate(extracted: ExtractedPrompt, document?: Record<string, unknown>) {
  return {
    id: `extracted_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    title: extracted.title,
    description: extracted.metadata?.sourceDescription as string || '',
    category: extracted.metadata?.sourceCategory as string || 'technical',
    difficulty: (document?.difficulty as string) || 'intermédiaire',
    targetTool: extracted.metadata?.recommendedTool as string || '',
    content: extracted.content,
    variables: extracted.variables.map(v => ({
      name: v.name,
      description: v.description || '',
      type: v.type,
      required: v.required,
      example: v.example || '',
      options: v.options || []
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}