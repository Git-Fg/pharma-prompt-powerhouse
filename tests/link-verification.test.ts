import { content } from '@/lib/content-loader';

// Test to verify all internal links are working
describe('Link Verification', () => {
  const { concepts, guides, prompts, externalTools } = content;

  // Create a map of all valid routes
  const validSlugs = {
    concepts: new Set(concepts.map(c => c.slug)),
    guides: new Set(guides.map(g => g.slug)),
    prompts: new Set(prompts.map(p => p.slug)),
    'outils-externes': new Set(externalTools.map(t => t.slug)),
  };

  test('all conceptSlugs references are valid', () => {
    const itemsWithConceptSlugs = [
      ...guides,
      ...prompts,
      ...externalTools
    ];

    for (const item of itemsWithConceptSlugs) {
      if (item.conceptSlugs?.length > 0) {
        for (const conceptSlug of item.conceptSlugs) {
          expect(validSlugs.concepts.has(conceptSlug)).toBe(true);
        }
      }
    }
  });

  test('mainGuideSlug references are valid', () => {
    for (const concept of concepts) {
      if (concept.mainGuideSlug) {
        expect(validSlugs.guides.has(concept.mainGuideSlug)).toBe(true);
      }
    }
  });

  test('workflow guides should be properly identified', () => {
    const workflowGuides = guides.filter(guide => 
      guide.title.toLowerCase().includes('workflow') ||
      guide.title.toLowerCase().includes('méthode') ||
      guide.description.toLowerCase().includes('étape par étape') ||
      guide.tags?.some((tag: string) => ['workflow', 'processus', 'methodologie'].includes(tag?.toLowerCase?.() || ''))
    );

    // Should find some workflow guides
    expect(workflowGuides.length).toBeGreaterThan(0);
    console.log(`✅ Found ${workflowGuides.length} workflow guides:`);
    
    workflowGuides.forEach(workflow => {
      console.log(`  - ${workflow.title}`);
    });
  });

  test('content structure is valid', () => {
    console.log(`\n📊 Content Summary:`);
    console.log(`  - Concepts: ${concepts.length}`);
    console.log(`  - Guides: ${guides.length}`);
    console.log(`  - Prompts: ${prompts.length}`);
    console.log(`  - External Tools: ${externalTools.length}`);
    console.log(`  - Total: ${concepts.length + guides.length + prompts.length + externalTools.length}`);
    
    // All collections should have at least some content
    expect(concepts.length).toBeGreaterThan(0);
    expect(guides.length).toBeGreaterThan(0);
    expect(prompts.length).toBeGreaterThan(0);
    expect(externalTools.length).toBeGreaterThan(0);
  });
});