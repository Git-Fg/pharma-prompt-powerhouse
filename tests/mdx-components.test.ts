import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

/**
 * MDX Component Integration Tests
 * Verify that MDX components are properly configured and working
 */

describe('MDX Components Integration', () => {
  test('MDX components file exists', () => {
    const mdxComponentsPath = join(process.cwd(), 'src', 'components', 'mdx-components.tsx');
    expect(existsSync(mdxComponentsPath)).toBe(true);
    
    const content = readFileSync(mdxComponentsPath, 'utf-8');
    expect(content).toContain('useMDXComponents');
    expect(content).toContain('Alert');
    expect(content).toContain('Card');
    expect(content).toContain('Tabs');
    expect(content).toContain('KeyTakeaways');
  });

  test('required UI component imports exist', () => {
    const mdxComponentsPath = join(process.cwd(), 'src', 'components', 'mdx-components.tsx');
    const content = readFileSync(mdxComponentsPath, 'utf-8');
    
    // Check for essential imports
    expect(content).toContain('Alert');
    expect(content).toContain('Card');
    expect(content).toContain('Tabs');
    expect(content).toContain('Badge');
  });

  test('MDX components handle HTML elements', () => {
    const mdxComponentsPath = join(process.cwd(), 'src', 'components', 'mdx-components.tsx');
    const content = readFileSync(mdxComponentsPath, 'utf-8');
    
    // Check that basic HTML elements are mapped
    const htmlElements = ['h1:', 'h2:', 'h3:', 'h4:', 'p:', 'code:', 'pre:', 'ul:', 'ol:', 'li:', 'a:', 'blockquote:'];
    
    for (const element of htmlElements) {
      expect(content).toContain(element);
    }
  });
});