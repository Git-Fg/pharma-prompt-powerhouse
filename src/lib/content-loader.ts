import { allConcepts } from '@/content/concepts';
import { allGuides } from '@/content/guides';
import { allPrompts } from '@/content/prompts';
import { allExternalTools } from '@/content/external-tools';
import { allObjectifs } from '@/content/objectifs';
import type {
  Concept, EnrichedGuide, EnrichedConcept
} from './content-schema';

export function loadContent() {
  const concepts = allConcepts;
  const guides = allGuides;
  const prompts = allPrompts;
  const externalTools = allExternalTools;
  const objectifs = allObjectifs;
  const workflows: unknown[] = []; // TODO: Add workflows when available

  // --- Data Enrichment ---

  const conceptMap = new Map<string, Concept>(concepts.map(c => [c.slug, c]));

  const enrichedGuides: EnrichedGuide[] = guides.map(guide => ({
    ...guide,
    concepts: guide.conceptSlugs?.map(slug => conceptMap.get(slug)).filter((c): c is Concept => c !== undefined) || [],
  }));

  const guideMap = new Map<string, EnrichedGuide>(enrichedGuides.map(g => [g.slug, g]));

  const enrichedConcepts: EnrichedConcept[] = concepts.map(concept => ({
    ...concept,
    guide: concept.mainGuideSlug ? guideMap.get(concept.mainGuideSlug) : undefined,
  }));

  return {
    guides: enrichedGuides,
    concepts: enrichedConcepts,
    prompts,
    externalTools,
    objectifs,
    workflows,
  };
}

export const content = loadContent();

// --- Data Accessor Functions ---

export const getGuideBySlug = (slug: string) => content.guides.find(g => g.slug === slug);
export const getConceptBySlug = (slug: string) => content.concepts.find(c => c.slug === slug);
export const getPromptBySlug = (slug: string) => content.prompts.find(p => p.slug === slug);
export const getToolBySlug = (slug: string) => content.externalTools.find(t => t.slug === slug);
export const getObjectifBySlug = (slug: string) => content.objectifs.find(o => o.slug === slug);
