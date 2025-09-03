import { allConcepts } from '@/content/concepts';
import { allGuides } from '@/content/guides';
import { allPrompts } from '@/content/prompts';
import { allExternalTools } from '@/content/external-tools';
import { allObjectifs } from '@/content/objectifs';
import type {
  Concept, Guide, Prompt, EnrichedGuide, EnrichedConcept
} from './content-schema';

type ContentItem = Guide | Prompt;

export function loadContent() {
  const concepts: Concept[] = allConcepts;
  const guides: Guide[] = allGuides;
  const prompts: Prompt[] = allPrompts;
  const externalTools = allExternalTools;
  const objectifs = allObjectifs;
  const workflows: unknown[] = []; // TODO: Add workflows when available

  // --- Data Enrichment ---

  const conceptMap = new Map<string, Concept>(concepts.map(c => [c.slug, c]));

  // 1. Enrich guides with their concept objects
  const guidesWithConcepts: (Guide & { concepts: Concept[] })[] = guides.map(guide => ({
    ...guide,
    concepts: guide.conceptSlugs?.map(slug => conceptMap.get(slug)).filter((c): c is Concept => c !== undefined) || [],
  }));

  // Create maps for efficient lookup
  const guideMap = new Map<string, Guide>(guides.map(g => [g.slug, g]));
  const promptMap = new Map<string, Prompt>(prompts.map(p => [p.slug, p]));
  const allContent: ContentItem[] = [...guides, ...prompts];

  // 2. Enrich guides with related content
  const enrichedGuides: EnrichedGuide[] = guidesWithConcepts.map(guide => {
    const relatedGuides: EnrichedGuide['relatedGuides'] = [];
    const relatedPrompts: EnrichedGuide['relatedPrompts'] = [];

    if (guide.conceptSlugs) {
      const relatedContent = allContent.filter(item =>
        item.slug !== guide.slug &&
        item.conceptSlugs?.some(slug => guide.conceptSlugs!.includes(slug))
      );
      
      relatedContent.forEach(item => {
        // Check if it's a guide
        if (guideMap.has(item.slug)) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { content, ...guideWithoutContent } = item as Guide;
          relatedGuides.push(guideWithoutContent);
        }
        // Check if it's a prompt
        else if (promptMap.has(item.slug)) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { content, ...promptWithoutContent } = item as Prompt;
          relatedPrompts.push(promptWithoutContent);
        }
      });
    }

    return {
      ...guide,
      relatedGuides: relatedGuides.slice(0, 3), // Limit to 3 for performance
      relatedPrompts: relatedPrompts.slice(0, 3),
    };
  });
  
  const enrichedConcepts: EnrichedConcept[] = concepts.map(concept => ({
    ...concept,
    guide: concept.mainGuideSlug ? enrichedGuides.find(g => g.slug === concept.mainGuideSlug) : undefined,
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
