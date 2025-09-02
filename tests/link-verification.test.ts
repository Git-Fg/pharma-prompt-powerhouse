import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

const CONTENT_ROOT = path.join(process.cwd(), 'src', 'content');

// Get all MDX files from all content directories
function getAllContentFiles() {
  const collections = ['concepts', 'guides', 'prompts', 'external-tools'];
  const allFiles = [];

  for (const collection of collections) {
    const collectionDir = path.join(CONTENT_ROOT, collection);
    if (fs.existsSync(collectionDir)) {
      const files = fs.readdirSync(collectionDir)
        .filter(file => file.endsWith('.mdx'))
        .map(file => {
          const filePath = path.join(collectionDir, file);
          const slug = path.parse(file).name;
          const { data } = matter(fs.readFileSync(filePath, 'utf8'));
          
          return {
            type: collection,
            slug,
            title: data.title,
            conceptSlugs: data.conceptSlugs || [],
            mainGuideSlug: data.mainGuideSlug,
            ...data
          };
        });
      
      allFiles.push(...files.map(f => ({ ...f, type: collection === 'external-tools' ? 'outils-externes' : f.type })));
    }
  }

  return allFiles;
}

// Test to verify all internal links are working
describe('Link Verification', () => {
  const allContent = getAllContentFiles();
  const concepts = allContent.filter(c => c.type === 'concepts');
  const guides = allContent.filter(c => c.type === 'guides');
  const prompts = allContent.filter(c => c.type === 'prompts');
  const tools = allContent.filter(c => c.type === 'outils-externes');

  // Create a map of all valid routes
  const validSlugs = {
    concepts: new Set(concepts.map(c => c.slug)),
    guides: new Set(guides.map(g => g.slug)),
    prompts: new Set(prompts.map(p => p.slug)),
    'outils-externes': new Set(tools.map(t => t.slug)),
  };

  test('all concept slugs in guides should be valid', () => {
    let errorCount = 0;
    
    guides.forEach(guide => {
      if (guide.conceptSlugs && guide.conceptSlugs.length > 0) {
        guide.conceptSlugs.forEach(conceptSlug => {
          const conceptExists = validSlugs.concepts.has(conceptSlug);
          if (!conceptExists) {
            console.error(`❌ Dead concept link in guide "${guide.title}": concepts/${conceptSlug}`);
            errorCount++;
          }
        });
      }
    });

    expect(errorCount).toBe(0);
  });

  test('all concept slugs in prompts should be valid', () => {
    let errorCount = 0;
    
    prompts.forEach(prompt => {
      if (prompt.conceptSlugs && prompt.conceptSlugs.length > 0) {
        prompt.conceptSlugs.forEach(conceptSlug => {
          const conceptExists = validSlugs.concepts.has(conceptSlug);
          if (!conceptExists) {
            console.error(`❌ Dead concept link in prompt "${prompt.title}": concepts/${conceptSlug}`);
            errorCount++;
          }
        });
      }
    });

    expect(errorCount).toBe(0);
  });

  test('all concept slugs in external tools should be valid', () => {
    let errorCount = 0;
    
    tools.forEach(tool => {
      if (tool.conceptSlugs && tool.conceptSlugs.length > 0) {
        tool.conceptSlugs.forEach(conceptSlug => {
          const conceptExists = validSlugs.concepts.has(conceptSlug);
          if (!conceptExists) {
            console.error(`❌ Dead concept link in tool "${tool.title}": concepts/${conceptSlug}`);
            errorCount++;
          }
        });
      }
    });

    expect(errorCount).toBe(0);
  });

  test('all guide slugs referenced should be valid', () => {
    let errorCount = 0;
    
    // Check mainGuideSlug in concepts
    concepts.forEach(concept => {
      if (concept.mainGuideSlug) {
        const guideExists = validSlugs.guides.has(concept.mainGuideSlug);
        if (!guideExists) {
          console.error(`❌ Dead guide link in concept "${concept.title}": guides/${concept.mainGuideSlug}`);
          errorCount++;
        }
      }
    });

    expect(errorCount).toBe(0);
  });

  test('no duplicate slugs within collections', () => {
    // Check concepts
    const conceptSlugs = concepts.map(c => c.slug);
    expect(new Set(conceptSlugs).size).toBe(conceptSlugs.length);

    // Check guides  
    const guideSlugs = guides.map(g => g.slug);
    expect(new Set(guideSlugs).size).toBe(guideSlugs.length);

    // Check prompts
    const promptSlugs = prompts.map(p => p.slug);
    expect(new Set(promptSlugs).size).toBe(promptSlugs.length);

    // Check external tools
    const toolSlugs = tools.map(t => t.slug);
    expect(new Set(toolSlugs).size).toBe(toolSlugs.length);
  });

  test('workflow guides should be properly identified', () => {
    const workflowGuides = guides.filter(guide => 
      guide.title.toLowerCase().includes('workflow') ||
      guide.description.toLowerCase().includes('workflow') ||
      guide.description.toLowerCase().includes('étape par étape') ||
      guide.tags?.some(tag => ['workflow', 'processus', 'methodologie'].includes(tag?.toLowerCase?.() || ''))
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
    console.log(`  - External Tools: ${tools.length}`);
    console.log(`  - Total: ${allContent.length}`);
    
    // All collections should have at least some content
    expect(concepts.length).toBeGreaterThan(0);
    expect(guides.length).toBeGreaterThan(0);
    expect(prompts.length).toBeGreaterThan(0);
    expect(tools.length).toBeGreaterThan(0);
  });
});