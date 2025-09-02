import { glob } from 'glob';
import path from 'path';
import {
  guideSchema,
  conceptSchema,
  promptSchema,
  externalToolSchema,
  objectifSchema,
  workflowSchema
} from './content-schema';
import type {
  Guide, Concept, Prompt, ExternalTool, Objectif, Workflow, EnrichedGuide, EnrichedConcept
} from './content-schema';

const CONTENT_PATH = path.join(process.cwd(), 'src/content');

function loadCollection<T>(pattern: string, schema: Zod.Schema<T>): T[] {
  return glob.sync(`${CONTENT_PATH}/${pattern}/**/*.ts`).map(file => {
    const data = require(file).default;
    return schema.parse(data);
  });
}

export function loadContent() {
  const concepts = loadCollection('concepts', conceptSchema);
  const guides = loadCollection('guides', guideSchema);
  const prompts = loadCollection('prompts', promptSchema);
  const externalTools = loadCollection('external-tools', externalToolSchema);
  const objectives = loadCollection('objectifs', objectifSchema);
  const workflows = loadCollection('workflows', workflowSchema);

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
    objectives,
    workflows,
  };
}

export const content = loadContent();

// --- Data Accessor Functions ---

export const getGuideBySlug = (slug: string) => content.guides.find(g => g.slug === slug);
export const getConceptBySlug = (slug: string) => content.concepts.find(c => c.slug === slug);
export const getPromptBySlug = (slug: string) => content.prompts.find(p => p.slug === slug);
export const getToolBySlug = (slug: string) => content.externalTools.find(t => t.slug === slug);
export const getObjectifBySlug = (slug: string) => content.objectives.find(o => o.slug === slug);
