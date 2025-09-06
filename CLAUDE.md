# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start development server with Next.js turbo mode
- `npm run build` - Production build with Next.js turbo mode
- `npm run start` - Start production server
- `npm run lint` - Run ESLint validation
- `npm run lint:fix` - Run ESLint and auto-fix issues
- `npm run typecheck` - Run TypeScript type checking

### Testing
- `npm run test` - Run all tests with Vitest
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ui` - Run tests with Vitest UI
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:unit` - Run unit tests only
- `npm run test:integration` - Run integration tests only
- `npm run test:component` - Run component tests only
- `npm run test:e2e` - Run Playwright E2E tests

### Content Management
- `npm run content:prepare` - Generate valid slugs for content
- `npm run content:validate-links` - Validate content links

### Validation
- `npm run validate` - Run all validation (lint + typecheck + test)

### Maintenance
- `npm run cleanreinstall` - Clean reinstall dependencies

## Project Architecture

### Modern Stack (2025)
- **Next.js 15** with App Router and React 19
- **TypeScript** with strict mode and Zod validation
- **Tailwind CSS v4** with @theme inline and recipes
- **Vitest** for testing (5-10x faster than Jest)
- **@antfu/eslint-config** with custom pharma rules

### Content Architecture
The project uses a custom TypeScript-based content system with:

- **Zod Schema Validation**: All content is validated at build time using `src/lib/content-schema.ts`
- **Smart Interconnections**: Content items are automatically linked through concept relationships
- **Performance Optimization**: O(1) content loading with Maps and caching system
- **Type-Safe Content**: 100% type safety with enriched content types

### Content Types
1. **Concepts** (`src/content/concepts/`) - 8 fundamental AI concepts
2. **Guides** (`src/content/guides/`) - 16 practical guides including Core Kit 2025
3. **Workflows** (`src/content/workflows/`) - 7 interactive workflows
4. **External Tools** (`src/content/external-tools/`) - 10 evaluated AI tools

### Component Architecture
- **shadcn/ui** components with tailwind-variants for styling
- **Smart Recommendation System**: Context-aware content suggestions
- **Mobile-First Design**: Bottom navigation and responsive layouts
- **Modern Animations**: AutoAnimate + Framer Motion hybrid system

### Key Systems

#### Content Loading System
- **Zero Runtime Loading**: All content loaded and validated at build time
- **Incremental Cache**: Content cached with SHA256 hash validation
- **Back-Relations**: Automatic reverse relationship mapping
- **Integrity Validation**: Build fails on broken content references

#### Recommendation Engine
- **ConceptRecommendation**: Suggests related concepts with justifications
- **ToolRecommendation**: Context-aware tool suggestions
- **GuideRecommendation**: Smart guide linking based on content

#### UI/UX Features
- **AutoAnimate Integration**: Smooth transitions respecting accessibility preferences
- **TanStack Table**: For responsive comparison tables
- **Modern Typography**: text-pretty, text-balance, and orphans/widows control
- **PWA Support**: Service worker with Serwist integration

## Custom ESLint Rules

The project includes custom ESLint rules in `tools/eslint-plugin-pharma/`:
- `pharma/no-prohibited-tailwind-classes` - Prevents use of deprecated Tailwind classes
- `pharma/no-typographic-characters` - Prevents direct use of typographic characters in content

## Content Development Guidelines

### Adding New Content
1. Create content files in appropriate `src/content/` directory
2. Follow the Zod schema structure in `content-schema.ts`
3. Use content blocks (markdown, alert, codeBlock, etc.) for structured content
4. Add `conceptSlugs` for automatic interconnections
5. Test with `npm run validate` before committing

### Content Block Types
- `markdown` - Basic markdown content
- `alert` - Alert messages with variants
- `codeBlock` - Syntax-highlighted code
- `toolRecommendation` - Tool suggestions
- `guideRecommendation` - Guide suggestions
- `conceptRecommendation` - Concept suggestions
- `multiFormatPrompt` - Multi-format prompt templates
- `keyTakeaways` - Key points summary
- `prerequisites` - Required knowledge
- `actionChecklist` - Interactive checklists

### Testing Philosophy
- **Unit Tests**: For utility functions and hooks
- **Component Tests**: For UI components
- **Integration Tests**: For content loading and validation
- **E2E Tests**: For critical user flows

## Performance Optimizations

### Build Optimizations
- **React Compiler**: Enabled for automatic optimizations
- **Package Import Optimization**: For lucide-react and Radix UI
- **Image Optimization**: WebP/AVIF support with security policies
- **Static Generation**: 51 static pages with SEO metadata

### Runtime Optimizations
- **Content Caching**: Incremental cache with hash validation
- **O(1) Lookups**: Map-based content access
- **Smart Preloading**: Related content preloading
- **Bundle Splitting**: Automatic code splitting

## Security Considerations

- **Content Security Policy**: Strict CSP headers
- **Type Safety**: 100% TypeScript coverage
- **Input Validation**: Zod schema validation for all content
- **XSS Protection**: Built-in Next.js security features
- **Dependency Security**: Regular audit and updates

## Mobile-First Development

- **Bottom Navigation**: Mobile-optimized navigation system
- **Responsive Tables**: TanStack Table with mobile cards fallback
- **Touch Interactions**: Optimized for mobile devices
- **PWA Features**: Offline support and installable app

## French Content Guidelines

This is a French-language pharmaceutical AI education platform. When adding content:
- Use proper French typography and spacing
- Follow pharmaceutical terminology standards
- Include both formal definitions and analogies
- Provide practical examples for pharmacy students
- Emphasize safety and validation in AI usage
