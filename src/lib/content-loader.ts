import { allConcepts } from '@/content/concepts';
import { allGuides } from '@/content/guides';
import { allExternalTools } from '@/content/external-tools';
import { allWorkflows } from '@/content/workflows';
import type { Concept, Guide, Workflow, ExternalTool, EnrichedGuide, EnrichedConcept, EnrichedWorkflow } from './content-schema';

type ContentItem = Guide | Workflow;

export function loadContent() {
  const concepts: Concept[] = allConcepts;
  const guides: Guide[] = allGuides;
  const workflows: Workflow[] = allWorkflows;
  const externalTools: ExternalTool[] = allExternalTools;

  const conceptMap = new Map<string, Concept>(concepts.map(c => [c.slug, c]));
  const guideMap = new Map<string, Guide>(guides.map(g => [g.slug, g]));
  const workflowMap = new Map<string, Workflow>(workflows.map(w => [w.slug, w]));
  const allContent: ContentItem[] = [...guides, ...workflows];

  // Enrich workflows
  const enrichedWorkflows: EnrichedWorkflow[] = workflows.map(workflow => {
    const conceptsForWorkflow = workflow.conceptSlugs?.map(slug => conceptMap.get(slug)).filter((c): c is Concept => c !== undefined) || [];
    const relatedWorkflows: EnrichedWorkflow['relatedWorkflows'] = [];
    
    // Find related workflows based on shared concepts
    if (workflow.conceptSlugs) {
      const relatedContent = allContent.filter(item => 
        item.slug !== workflow.slug &&
        item.conceptSlugs?.some(slug => workflow.conceptSlugs!.includes(slug))
      );
      
      relatedContent.forEach(item => {
        if (workflowMap.has(item.slug) && !relatedWorkflows.some(w => w.slug === item.slug)) {
          const { content: _content, concepts: _concepts, relatedWorkflows: _rw, ...workflowWithoutContent } = item as EnrichedWorkflow;
          relatedWorkflows.push(workflowWithoutContent);
        }
      });
    }

    return {
      ...workflow,
      concepts: conceptsForWorkflow,
      relatedWorkflows: relatedWorkflows.slice(0, 3),
    };
  });

  // Enrich guides
  const enrichedGuides: EnrichedGuide[] = guides.map(guide => {
    const conceptsForGuide = guide.conceptSlugs?.map(slug => conceptMap.get(slug)).filter((c): c is Concept => c !== undefined) || [];
    const relatedGuides: EnrichedGuide['relatedGuides'] = [];
    
    if (guide.conceptSlugs) {
      const relatedContent = allContent.filter(item => 
        item.slug !== guide.slug &&
        item.conceptSlugs?.some(slug => guide.conceptSlugs!.includes(slug))
      );
      
      relatedContent.forEach(item => {
        if (guideMap.has(item.slug) && !relatedGuides.some(g => g.slug === item.slug)) {
          const { content: _content, concepts: _concepts, relatedGuides: _rg, ...guideWithoutContent } = item as EnrichedGuide;
          relatedGuides.push(guideWithoutContent);
        }
      });
    }

    return {
      ...guide,
      concepts: conceptsForGuide,
      relatedGuides: relatedGuides.slice(0, 3),
    };
  });
  
  const enrichedConcepts: EnrichedConcept[] = concepts;

  return { 
    guides: enrichedGuides, 
    workflows: enrichedWorkflows,
    concepts: enrichedConcepts, 
    externalTools 
  };
}

export const content = loadContent();

export const getGuideBySlug = (slug: string) => content.guides.find(g => g.slug === slug);
export const getWorkflowBySlug = (slug: string) => content.workflows.find(w => w.slug === slug);
export const getConceptBySlug = (slug: string) => content.concepts.find(c => c.slug === slug);
export const getExternalToolBySlug = (slug: string) => content.externalTools.find(t => t.slug === slug);