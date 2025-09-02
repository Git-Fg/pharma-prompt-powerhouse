/**
 * Unit Tests for Content Loader
 * 
 * This suite tests the content loader's logic in isolation. It uses mocks
 * to simulate the file system, ensuring that the loader correctly processes,
 * enriches, and structures data without relying on actual content files.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sync as globSync } from 'glob';

// Type assertion to inform TypeScript about the mock implementation
type GlobSyncMock = vi.Mock<[string], string[]>;

// Mock the glob sync function BEFORE importing the loader
vi.mock('glob', () => ({
  sync: vi.fn(),
}));

// Now, cast the mocked function to our type
const mockedGlobSync = globSync as GlobSyncMock;

// Dynamically import the loader AFTER mocks are set up
const { loadContent } = await import('@/lib/content-loader');

// Mock data representing the exports of our content files
const mockConceptFile = {
  slug: 'mock-concept',
  title: 'Mock Concept',
  description: 'A concept for testing purposes which is definitely longer than 20 chars.',
  difficulty: 'débutant', 
  keyTakeaways: ['testing is good'],
  content: [{ type: 'markdown', content: '...' }]
};

const mockGuideFile = {
  slug: 'mock-guide',
  title: 'Mock Guide',
  description: 'A guide for testing which is definitely longer than 20 chars.',
  category: 'bonnes-pratiques',
  difficulty: 'intermédiaire',
  conceptSlugs: ['mock-concept'],
  content: [{ type: 'markdown', content: '...' }]
};

describe('Unit: Content Loader', () => {
  beforeEach(() => {
    // Reset mocks before each test to ensure isolation
    mockedGlobSync.mockClear();
    vi.resetModules(); // Necessary for dynamic imports
  });

  it('should correctly load and parse mocked content files', async () => {
    // Arrange: a mock file system where glob.sync returns paths
    // and we mock the dynamic import for those paths.
    mockedGlobSync.mockImplementation((pattern: string): string[] => {
      if (pattern.includes('concepts')) return ['/fake/path/concepts/mock-concept.ts'];
      if (pattern.includes('guides')) return ['/fake/path/guides/mock-guide.ts'];
      return [];
    });

    vi.doMock('/fake/path/concepts/mock-concept.ts', () => ({ default: mockConceptFile }));
    vi.doMock('/fake/path/guides/mock-guide.ts', () => ({ default: mockGuideFile }));

    const { loadContent: reloadedLoader } = await import('@/lib/content-loader');

    // Act: run the loader function
    const loaded = reloadedLoader();

    // Assert: check if the content is loaded and structured correctly
    expect(loaded.concepts).toHaveLength(1);
    expect(loaded.guides).toHaveLength(1);
    expect(loaded.concepts[0].title).toBe('Mock Concept');
    expect(loaded.guides[0].slug).toBe('mock-guide');
  });

  it('should correctly enrich guide data with concept objects', async () => {
    // Arrange: Set up mocks like before
    mockedGlobSync.mockImplementation((pattern: string): string[] => {
      if (pattern.includes('concepts')) return ['/fake/path/concepts/mock-concept.ts'];
      if (pattern.includes('guides')) return ['/fake/path/guides/mock-guide.ts'];
      return [];
    });
    vi.doMock('/fake/path/concepts/mock-concept.ts', () => ({ default: mockConceptFile }));
    vi.doMock('/fake/path/guides/mock-guide.ts', () => ({ default: mockGuideFile }));

    const { loadContent: reloadedLoader } = await import('@/lib/content-loader');

    // Act: run the loader
    const loaded = reloadedLoader();

    // Assert: Check the enrichment logic
    const guide = loaded.guides[0];
    expect(guide.concepts).toBeDefined();
    expect(guide.concepts).toHaveLength(1);
    expect(guide.concepts[0].title).toBe('Mock Concept');
    expect(guide.concepts[0].slug).toBe('mock-concept');
  });

  it('should handle guides with no matching concepts gracefully', async () => {
     // Arrange: Mock a guide that references a non-existent concept
    const guideWithBadLink = { ...mockGuideFile, conceptSlugs: ['non-existent-slug'] };
    mockedGlobSync.mockImplementation((pattern: string): string[] => {
      if (pattern.includes('concepts')) return ['/fake/path/concepts/mock-concept.ts'];
      if (pattern.includes('guides')) return ['/fake/path/guides/guide-with-bad-link.ts'];
      return [];
    });
    vi.doMock('/fake/path/concepts/mock-concept.ts', () => ({ default: mockConceptFile }));
    vi.doMock('/fake/path/guides/guide-with-bad-link.ts', () => ({ default: guideWithBadLink }));

    const { loadContent: reloadedLoader } = await import('@/lib/content-loader');

    // Act
    const loaded = reloadedLoader();

    // Assert: The enrichment should result in an empty array for `concepts`
    const guide = loaded.guides[0];
    expect(guide.concepts).toBeDefined();
    expect(guide.concepts).toHaveLength(0);
  });
});
