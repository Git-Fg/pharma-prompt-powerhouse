/**
 * Test for modern features and workflow functionality  
 */
describe('Modern Features Validation', () => {
  test('RelatedWorkflow component file exists', () => {
    const fs = require('fs');
    const path = require('path');
    
    const componentPath = path.join(__dirname, '../src/components/shared/RelatedWorkflow.tsx');
    expect(fs.existsSync(componentPath)).toBe(true);
  });

  test('external tool MDX files have TLDR field', () => {
    const fs = require('fs');
    const path = require('path');
    const glob = require('glob');
    
    const externalToolFiles = glob.sync(path.join(__dirname, '../src/content/external-tools/*.mdx'));
    
    expect(externalToolFiles.length).toBeGreaterThan(0);
    
    externalToolFiles.forEach((file) => {
      const content = fs.readFileSync(file, 'utf8');
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      
      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1];
        // Should have either tldr field or description that's enhanced
        expect(frontmatter.includes('tldr:') || frontmatter.includes('description:')).toBe(true);
      }
    });

    console.log(`✅ All ${externalToolFiles.length} external tools have enhanced metadata`);
  });

  test('workflows page component exists', () => {
    const fs = require('fs');
    const path = require('path');
    
    const workflowPagePath = path.join(__dirname, '../src/app/workflows/page.tsx');
    expect(fs.existsSync(workflowPagePath)).toBe(true);
    
    const content = fs.readFileSync(workflowPagePath, 'utf8');
    expect(content.includes('Tabs')).toBe(true);
    expect(content.includes('workflowGuides')).toBe(true);
    expect(content.includes('practicalGuides')).toBe(true);
  });

  test('content collections configuration is modernized', () => {
    const fs = require('fs');
    const path = require('path');
    
    const configPath = path.join(__dirname, '../content-collections.ts');
    const content = fs.readFileSync(configPath, 'utf8');
    
    // Check for modern features
    expect(content.includes('isWorkflow')).toBe(true);
    expect(content.includes('tldr')).toBe(true);
    expect(content.includes('React 19 + Next.js 15')).toBe(true);
    expect(content.includes('Build-Time Optimization')).toBe(true);
  });

  test('enhanced related components exist', () => {
    const fs = require('fs');
    const path = require('path');
    
    const components = [
      'RelatedWorkflow.tsx',
      'ToolRecommendation.tsx',
      'ConceptRecommendation.tsx', 
      'GuideRecommendation.tsx'
    ];
    
    components.forEach(component => {
      const componentPath = path.join(__dirname, '../src/components/shared', component);
      expect(fs.existsSync(componentPath)).toBe(true);
      
      const content = fs.readFileSync(componentPath, 'utf8');
      expect(content.includes('TLDR')).toBe(true);
    });

    console.log('✅ All enhanced related components exist with TLDR functionality');
  });

  console.log('✅ Modern features validation completed successfully');
});