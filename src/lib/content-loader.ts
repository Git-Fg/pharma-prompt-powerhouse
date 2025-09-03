import { allConcepts } from '@/content/concepts';
import { allGuides } from '@/content/guides';
import { allPrompts } from '@/content/prompts';
import { allExternalTools } from '@/content/external-tools';
import { allObjectifs } from '@/content/objectifs';
import type { Concept, Guide, Prompt, Objectif, EnrichedGuide, EnrichedConcept } from './content-schema';

type ContentItem = Guide | Prompt;

export function loadContent() {
  const concepts: Concept[] = allConcepts;
  const guides: Guide[] = allGuides;
  const prompts: Prompt[] = allPrompts;
  const externalTools = allExternalTools;
  const objectifs = allObjectifs;

  const conceptMap = new Map<string, Concept>(concepts.map(c => [c.slug, c]));
  const guideMap = new Map<string, Guide>(guides.map(g => [g.slug, g]));
  const promptMap = new Map<string, Prompt>(prompts.map(p => [p.slug, p]));
  const allContent: ContentItem[] = [...guides, ...prompts];

  const enrichedGuides: EnrichedGuide[] = guides.map(guide => {
    const conceptsForGuide = guide.conceptSlugs?.map(slug => conceptMap.get(slug)).filter((c): c is Concept => c !== undefined) || [];
    const relatedGuides: EnrichedGuide['relatedGuides'] = [];
    const relatedPrompts: EnrichedGuide['relatedPrompts'] = [];

    if (guide.conceptSlugs) {
      const relatedContent = allContent.filter(item => 
        item.slug !== guide.slug &&
        item.conceptSlugs?.some(slug => guide.conceptSlugs!.includes(slug))
      );
      
      relatedContent.forEach(item => {
        if (guideMap.has(item.slug) && !relatedGuides.some(g => g.slug === item.slug)) {
          const { content: _content, concepts: _concepts, relatedGuides: _rg, relatedPrompts: _rp, ...guideWithoutContent } = item as EnrichedGuide;
          relatedGuides.push(guideWithoutContent);
        }
        else if (promptMap.has(item.slug) && !relatedPrompts.some(p => p.slug === item.slug)) {
          const { content: _content, ...promptWithoutContent } = item as Prompt;
          relatedPrompts.push(promptWithoutContent);
        }
      });
    }

    return {
      ...guide,
      concepts: conceptsForGuide,
      relatedGuides: relatedGuides.slice(0, 3),
      relatedPrompts: relatedPrompts.slice(0, 3),
    };
  });
  
  const enrichedConcepts: EnrichedConcept[] = concepts.map(concept => ({
    ...concept,
    guide: concept.mainGuideSlug ? enrichedGuides.find(g => g.slug === concept.mainGuideSlug) : undefined,
  }));

  return { guides: enrichedGuides, concepts: enrichedConcepts, prompts, externalTools, objectifs };
}

export const content = loadContent();

// --- Data Accessor Functions ---

export const getGuideBySlug = (slug: string) => content.guides.find(g => g.slug === slug);
export const getConceptBySlug = (slug: string) => content.concepts.find(c => c.slug === slug);
export const getPromptBySlug = (slug: string) => content.prompts.find(p => p.slug === slug);
export const getToolBySlug = (slug: string) => content.externalTools.find(t => t.slug === slug);
export const getObjectifBySlug = (slug: string): Objectif | undefined => content.objectifs.find(o => o.slug === slug);
