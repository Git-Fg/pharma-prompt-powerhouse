// src/lib/content-loader.ts
import { Guide, Concept, Prompt, ExternalTool } from '@/lib/content-schema';
import { allGuides as newGuides } from '@/content/guides';
import { allConcepts as newConcepts } from '@/content/concepts';
import { allPrompts as newPrompts } from '@/content/prompts';
import { allExternalTools as newExternalTools } from '@/content/external-tools';

// Collections - now fully migrated to TypeScript
const allGuides: Guide[] = [...newGuides];
const allConcepts: Concept[] = [...newConcepts];
const allPrompts: Prompt[] = [...newPrompts];
const allExternalTools: ExternalTool[] = [...newExternalTools];

// Crée des Maps pour des recherches ultra-rapides O(1)
const conceptsMap = new Map(allConcepts.map(c => [c.slug, c]));
const guidesMap = new Map(allGuides.map(g => [g.slug, g]));
const promptsMap = new Map(allPrompts.map(p => [p.slug, p]));
const toolsMap = new Map(allExternalTools.map(t => [t.slug, t]));

// Enrichir chaque élément avec ses relations au moment du chargement
const enrichedGuides = allGuides.map(guide => ({
  ...guide,
  relatedConcepts: guide.conceptSlugs
    .map(slug => conceptsMap.get(slug))
    .filter((concept): concept is Concept => concept !== undefined),
}));

const enrichedConcepts = allConcepts.map(concept => ({
  ...concept,
  mainGuide: concept.mainGuideSlug ? guidesMap.get(concept.mainGuideSlug) : undefined,
  relatedGuides: allGuides.filter(g => g.conceptSlugs.includes(concept.slug)),
  relatedPrompts: allPrompts.filter(p => p.conceptSlugs.includes(concept.slug)),
}));

const enrichedPrompts = allPrompts.map(prompt => ({
  ...prompt,
  relatedConcepts: prompt.conceptSlugs
    .map(slug => conceptsMap.get(slug))
    .filter((concept): concept is Concept => concept !== undefined),
}));

const enrichedExternalTools = allExternalTools.map(tool => ({
  ...tool,
  relatedConcepts: tool.conceptSlugs
    .map(slug => conceptsMap.get(slug))
    .filter((concept): concept is Concept => concept !== undefined),
}));

export const content = {
  guides: enrichedGuides,
  concepts: enrichedConcepts,
  prompts: enrichedPrompts,
  tools: enrichedExternalTools,
};

// Fonctions d'accès typées et performantes pour les pages
export const getGuideBySlug = (slug: string) => guidesMap.get(slug);
export const getConceptBySlug = (slug: string) => conceptsMap.get(slug);
export const getPromptBySlug = (slug: string) => promptsMap.get(slug);
export const getToolBySlug = (slug: string) => toolsMap.get(slug);

// Types enrichis pour une meilleure expérience de développement
export type EnrichedGuide = typeof enrichedGuides[0];
export type EnrichedConcept = typeof enrichedConcepts[0];
export type EnrichedPrompt = typeof enrichedPrompts[0];
export type EnrichedExternalTool = typeof enrichedExternalTools[0];