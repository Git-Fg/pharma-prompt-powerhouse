# 🔄 Migration Guide - MDX to TypeScript Content System

## Overview

This guide documents the migration from MDX-based content to a structured TypeScript content system with Zod validation. This migration provides type safety, runtime validation, and O(1) content loading performance.

## Architecture

### Content Schema (`src/lib/content-schema.ts`)
**Single Source of Truth** for all content definitions:

```typescript
import { z } from 'zod';

// Base schemas
const ContentBlock = z.discriminatedUnion('type', [
  z.object({ type: z.literal('paragraph'), content: z.string() }),
  z.object({ type: z.literal('heading'), level: z.number().min(1).max(6), content: z.string() }),
  z.object({ type: z.literal('list'), items: z.array(z.string()) }),
  z.object({ type: z.literal('code'), language: z.string(), content: z.string() }),
  z.object({ type: z.literal('callout'), variant: z.enum(['info', 'warning', 'success', 'error']), content: z.string() }),
]);

// Collection schemas
export const Guide = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  difficulty: z.enum(['débutant', 'intermédiaire', 'avancé']),
  duration: z.string(),
  tags: z.array(z.string()),
  conceptSlugs: z.array(z.string()),
  keyTakeaways: z.array(z.string()),
  lastUpdated: z.string(),
  content: z.array(ContentBlock),
  isWorkflow: z.boolean().default(false),
});

export type Guide = z.infer<typeof Guide>;
```

### Content Loader (`src/lib/content-loader.ts`)
**Optimized Loading** with relationship enrichment:

```typescript
// O(1) Maps for fast lookups
const conceptsMap = new Map(allConcepts.map(c => [c.slug, c]));
const guidesMap = new Map(allGuides.map(g => [g.slug, g]));

// Enrich content with relations at load time
const enrichedGuides = allGuides.map(guide => ({
  ...guide,
  relatedConcepts: guide.conceptSlugs
    .map(slug => conceptsMap.get(slug))
    .filter((concept): concept is Concept => concept !== undefined),
}));
```

## Content File Structure

### TypeScript Content File Example

```typescript
// src/content/guides-new/exemple-guide.ts
import { Guide } from '@/lib/content-schema';

const guide: Guide = {
  slug: 'exemple-guide',
  title: 'Exemple de Guide Migré',
  description: 'Description du guide...',
  difficulty: 'débutant',
  duration: '10 min',
  tags: ['prompt-engineering', 'débutant'],
  conceptSlugs: ['concept1', 'concept2'],
  keyTakeaways: [
    'Point clé 1',
    'Point clé 2',
  ],
  lastUpdated: '2025-01-02',
  isWorkflow: false,
  content: [
    {
      type: 'heading',
      level: 2,
      content: 'Introduction'
    },
    {
      type: 'paragraph',
      content: 'Contenu du paragraphe...'
    },
    {
      type: 'callout',
      variant: 'info',
      content: 'Information importante'
    },
    {
      type: 'code',
      language: 'prompt',
      content: 'Votre prompt ici'
    }
  ]
};

// Validation at export time
export default guide;
```

### Collection Index File

```typescript
// src/content/guides-new/index.ts
import { Guide } from '@/lib/content-schema';

import exempleGuide from './exemple-guide';
import autreGuide from './autre-guide';

export const allGuides: Guide[] = [
  exempleGuide,
  autreGuide,
];
```

## Migration Process

### Automated Migration Script

The migration from MDX to TypeScript is handled by `scripts/migrate-mdx-to-ts.mjs`:

```javascript
// Extract frontmatter and content from MDX
const { data, content } = matter(fs.readFileSync(filePath, 'utf8'));

// Convert to TypeScript structure
const tsContent = generateTSGuide(data, content, filename);

// Write TypeScript file
fs.writeFileSync(outputPath, tsContent, 'utf8');
```

### Content Block Conversion

The script automatically converts MDX content to structured blocks:

| MDX Element | TypeScript Block |
|-------------|------------------|
| `## Heading` | `{ type: 'heading', level: 2, content: 'Heading' }` |
| Regular text | `{ type: 'paragraph', content: 'Text content' }` |
| ``` code ``` | `{ type: 'code', language: 'prompt', content: 'Code' }` |
| Lists | `{ type: 'list', items: ['Item 1', 'Item 2'] }` |

## Component Integration

### ContentRenderer Component

Universal renderer for structured content:

```typescript
// src/components/content/ContentRenderer.tsx
interface ContentRendererProps {
  content: ContentBlock[];
}

export function ContentRenderer({ content }: ContentRendererProps) {
  return (
    <div className="prose prose-lg max-w-none">
      {content.map((block, index) => {
        switch (block.type) {
          case 'heading':
            const HeadingComponent = `h${block.level}` as keyof JSX.IntrinsicElements;
            return <HeadingComponent key={index}>{block.content}</HeadingComponent>;
          
          case 'paragraph':
            return <p key={index}>{block.content}</p>;
          
          case 'callout':
            return <Callout key={index} variant={block.variant}>{block.content}</Callout>;
          
          case 'code':
            return <CodeBlock key={index} language={block.language} code={block.content} />;
          
          default:
            return null;
        }
      })}
    </div>
  );
}
```

### Page Integration

Server components use the content loader:

```typescript
// src/app/guides/[id]/page.tsx
import { getGuideBySlug } from '@/lib/content-loader';
import { ContentRenderer } from '@/components/content/ContentRenderer';

export default async function GuidePage({ params }: { params: { id: string } }) {
  const guide = await getGuideBySlug(params.id);
  
  if (!guide) {
    notFound();
  }

  return (
    <article>
      <h1>{guide.title}</h1>
      <ContentRenderer content={guide.content} />
    </article>
  );
}
```

## Benefits of Migration

### 1. Type Safety
```typescript
// Compile-time error prevention
const guide: Guide = {
  slug: 'example',
  title: 'Example',
  difficulty: 'invalid-difficulty', // ❌ TypeScript error
  // Missing required fields also caught at compile time
};
```

### 2. Runtime Validation
```typescript
// Zod validation catches runtime errors
try {
  const validatedGuide = Guide.parse(userInput);
} catch (error) {
  // Handle validation errors gracefully
}
```

### 3. Performance Optimization
```typescript
// O(1) lookups instead of O(n) searches
const relatedConcept = conceptsMap.get(conceptSlug); // Fast!
// vs
const relatedConcept = allConcepts.find(c => c.slug === conceptSlug); // Slow!
```

### 4. Enhanced Developer Experience
- **IntelliSense**: Full autocomplete for all content properties
- **Refactoring**: Safe renames across the entire codebase
- **Validation**: Immediate feedback on invalid content
- **Documentation**: Self-documenting content structure

## Migration Status

### Completed Collections ✅
- **Guides**: 14/14 migrated to TypeScript
  - All content converted to structured blocks
  - Enhanced metadata with workflow detection
  - Type-safe relationships with concepts

### Pending Collections
- **Concepts**: 8 files ready for migration
- **Prompts**: 5 files ready for migration  
- **External Tools**: 10 files ready for migration

### Migration Commands

```bash
# Run migration script for a collection
node scripts/migrate-mdx-to-ts.mjs

# Validate migrated content
npm run build  # Zod validation runs at build time

# Test content integrity
npm run test   # Comprehensive link and structure validation
```

## Content Quality Assurance

### Build-Time Validation
```typescript
// content-collections.ts
export default defineConfig({
  collections: [concepts, guides, prompts, externalTools],
  onSuccess: async (allDocuments) => {
    // Comprehensive validation reporting
    const errors = validationErrors.filter(e => e.severity === 'error');
    if (errors.length > 0) {
      console.error(`❌ ${errors.length} erreurs de validation`);
      process.exit(1);
    }
  },
});
```

### Test Suite Integration
```typescript
// tests/content-quality.test.ts
test('all content follows schema', () => {
  allGuides.forEach(guide => {
    expect(() => Guide.parse(guide)).not.toThrow();
  });
});

test('no dead concept links', () => {
  allGuides.forEach(guide => {
    guide.conceptSlugs.forEach(slug => {
      expect(validConceptSlugs.has(slug)).toBe(true);
    });
  });
});
```

## Best Practices

### 1. Content Structure
- Use semantic block types for better accessibility
- Keep content blocks focused and atomic
- Leverage callouts for important information
- Structure headings hierarchically

### 2. Schema Design
- Use discriminated unions for type safety
- Provide sensible defaults where possible
- Validate relationships at schema level
- Keep schemas focused and cohesive

### 3. Performance
- Pre-compute relationships at build time
- Use Maps for O(1) lookups
- Minimize runtime transformations
- Cache enriched content appropriately

### 4. Validation
- Validate early and fail fast
- Provide helpful error messages
- Test all content transformations
- Monitor content quality metrics

## Future Enhancements

1. **Rich Content Blocks**: Support for images, videos, interactive elements
2. **Content Versioning**: Track changes and maintain history
3. **Multi-language**: I18n support with shared content structure
4. **Dynamic Content**: API-driven content updates
5. **Analytics Integration**: Content performance tracking

This migration provides a solid foundation for scalable, maintainable, and performant content management while preserving all existing functionality.