# Pharma Prompt Powerhouse - Project Context

## Project Overview

**Pharma Prompt Powerhouse** is a comprehensive educational platform designed for pharmacy students and professionals to master the use of AI in pharmacy. It serves as an interconnected ecosystem of knowledge, tools, and best practices that transforms AI from a simple tool into a true pharmaceutical assistant.

### Core Mission
Transform pharmacy students from "passengers" to "pilots" of AI by providing:
- Solid fundamentals of prompt engineering applied to pharmacy
- Proven methods with practical guides
- Powerful tools with interactive workflows
- A coherent ecosystem with intelligent content interconnections
- Always priorize elegance and simplicty over unrelevant complexity
- Always verify you're not duplicating a source of truth when implementing change, even when you're fixing lint/type issue.

### Technologies & Architecture

#### Modern Stack (2025)
- **Frontend**: React 19 + Next.js 15 with Server Components and App Router
- **Language**: TypeScript with strict type safety
- **Styling**: Tailwind CSS v4 with tailwind-variants for a complete design system
- **UI Components**: shadcn/ui components
- **Animations**: AutoAnimate for fluid transitions respecting accessibility preferences
- **Testing**: Vitest (5-10x faster than Jest) with jsdom environment
- **Validation**: Zod schemas for compile-time and runtime validation
- **Notifications**: Sonner unified notification system

#### Performance Optimizations
- Zero runtime content loading with O(1) performance using Maps
- Smart interconnection system with contextual recommendations
- Bundle size optimizations (up to 97% reduction in some pages)
- Static site generation with 51 pages
- Mobile-first UX design with bottom navigation bar

## Project Structure

```
src/
├── app/                       # Next.js 15 App Router with 54 static pages
│   ├── concepts/[slug]/       # 8 fundamental concepts with interconnections
│   ├── guides/[slug]/         # 14 practical guides with recommendations
│   ├── workflows/[slug]/      # 7 interactive workflows
│   ├── l-arsenal-ia/[slug]/   # 10 evaluated AI tools with detailed reviews
│   ├── boite-a-outils/        # Interactive editors and generators
│   └── design-system/         # Showcase of the modern design system
├── components/
│   ├── shared/                # Smart recommendation system components
│   │   ├── ConceptRecommendation.tsx
│   │   ├── ToolRecommendation.tsx
│   │   └── ResponsiveComparisonTable.tsx (TanStack Table)
│   ├── ui/                    # shadcn/ui + tailwind-variants
│   └── layout/                # Header, footer, navigation components
├── content/                   # TypeScript content with Zod validation
│   ├── concepts/              # 8 concepts with strict schemas
│   ├── guides/                # 14 guides validated at compile time
│   ├── workflows/             # 7 workflows with recommendations
│   └── external-tools/        # 10 tools with advanced scoring
├── lib/
│   ├── content-schema.ts      # Source of truth for all content types
│   ├── content-loader.ts      # Smart loading with O(1) performance
│   └── utils.ts               # Utilities with comprehensive tests
└── hooks/                     # Custom hooks for modern animations
```

## Content Architecture

### Types of Educational Content

1. **8 Fundamental Concepts**
   - Context Engineering, Prompt Chain, Hallucination, AI Memory, etc.
   - Each concept includes analogical + formal definition + practical importance
   - Smart interconnections with contextual recommendations to workflows and tools

2. **14 Strategic Guides**
   - 5 Pillars of Effective Prompting, XML Method, Iterative Optimization
   - Core Kit Student 2025: Mastering Z.AI + AI Studio without credit card
   - Local AI: 100% privacy guide with models like Qwen3-4B
   - All enhanced with contextual recommendation system

3. **7 Interactive Workflows**
   - Production Ready: Solve clinical cases, create revision sheets, bibliographic research
   - Smart Contextual Recommendations: Each step enriched with concept and tool suggestions
   - Structured approach with optimized prompts and multi-platform usage guide

4. **10 Evaluated External Tools**
   - TanStack Table Integration: High-performance comparative tables with sorting and search
   - Core Kit Recommended: Z.AI (reliable research) + AI Studio (advanced multimodal)
   - 360° Evaluations: Performance, privacy, use cases with star ratings
   - Responsive Design: Desktop tables + mobile cards with fluid animations

### Integrated Interactive Tools

1. **Advanced Prompt Editor**
   - Modern interface with real-time preview
   - Built-in templates and dynamic variables `{{variable_name}}`
   - Multi-platform optimized export

2. **AI Flashcard Generator**
   - Automatic creation of Anki cards from course materials
   - AutoAnimate Integration for premium UX
   - Direct integration with platform concepts

## Smart Interconnection System

The platform features an intelligent recommendation system that suggests contextually relevant content:
- **ConceptRecommendation**: Contextual recommendations with justifications
- **ToolRecommendation**: Tools suggested at the optimal moment in a workflow
- **GuideRecommendation**: Linked guides with precise utility reasons
- **Hover Cards + Mobile Sheets**: Non-intrusive UX for exploration

## Development Workflow

### Prerequisites
- Node.js 18+
- npm/pnpm for dependency management

### Available Scripts
```bash
# Development with hot-reload
npm run dev

# Production build
npm run build

# Run all tests
npm run test

# Run tests with GUI
npm run test:ui

# Code quality checks
npm run lint
npm run typecheck

# End-to-end tests
npm run test:e2e

# Full validation (lint, typecheck, tests)
npm run validate

# Clean reinstall
npm run cleanreinstall
```

### Testing Strategy
- **Unit Tests**: Vitest with jsdom environment
- **Integration Tests**: Content validation and interconnections
- **Component Tests**: UI component behavior
- **End-to-End Tests**: Playwright for browser testing
- **Coverage**: Text, JSON, and HTML reporters

### Quality Assurance
- 100% TypeScript strict mode with noUncheckedIndexedAccess
- Zod schema validation at compile-time and runtime
- ESLint with @antfu/eslint-config and React 19/Next.js 15 rules
- 49 passing tests with 100% success rate
- Zero security vulnerabilities
- Zero build errors

## Content Management

All content is structured as TypeScript files with Zod validation:
- **Content Schema**: Defined in `src/lib/content-schema.ts`
- **Content Loading**: Zero-runtime loading with O(1) performance in `src/lib/content-loader.ts`
- **Interconnections**: Smart linking between concepts, guides, workflows, and tools
- **Validation**: Automatic cross-reference validation through TypeScript and Zod

## Deployment
Optimized for deployment on:
- **Vercel** (recommended): Automatic configuration
- **Netlify**: Static build compatible
- **GitHub Pages**: Static export possible
- **Custom Server**: Node.js + static builds

## Philosophy

### Vision
This project aims to augment pharmaceutical expertise with AI rather than replace it:
- **Amplify Thinking**: AI as a brainstorming and analysis partner
- **Accelerate Tasks**: Automation of repetitive processes (summaries, sheets)
- **Enhance Safety**: Anti-hallucination methods and systematic verification
- **Personalize Learning**: Tools adapted to individual level and needs

### Pedagogical Approach
- **Natural Progression**: Concepts → Guides → Tools → Prompts with contextual recommendations
- **Active Learning**: Each content encourages experimentation and personal adaptation
- **Safety First**: Emphasis on validation, critical thinking, and AI limitations

## Contributing

### How to Contribute
1. **Fork & Clone**: Create your fork of the project
2. **Content Creation**: Add concepts/guides/prompts in `/src/content/`
3. **Validation**: Automated tests verify the quality of cross-references
4. **Pull Request**: Submit your improvements with detailed description

### Extensibility
- **New Content Types**: Easy extension via Content Collections + Zod schemas
- **Tool Integrations**: Modular API for new AI services
- **UI Customization**: Design system based on Tailwind/shadcn easily customizable

### Quality Standards
- **Required Tests**: 49 automated tests for continuous validation
- **Type Safety**: Strict TypeScript with automatic type generation
- **Content Validation**: Automatic verification of references and metadata
- **Performance Focus**: 51 static pages generated, optimized for speed
- **Security First**: Automatic security audit, zero vulnerabilities

## Important Notes

### Disclaimer
This platform is a learning tool and educational aid. Using AI in pharmaceutical practice requires:
- **Systematic Validation** of critical information by official sources
- **Appropriate Professional Supervision** based on usage context
- **Compliance with Local Regulations** on AI use in healthcare
- **Constant Critical Thinking** - AI can hallucinate and does not replace human expertise

### Current Status
- ✅ **Build**: Compilation without errors (Next.js 15 + React 19)
- ✅ **Tests**: 49/49 tests passing (Vitest)
- ✅ **TypeScript**: 100% type safe (strict mode)
- ✅ **Linting**: Zero errors (@antfu/eslint-config)
- ✅ **Security**: Zero vulnerabilities (resolved audit)
- ✅ **Performance**: Optimized bundle, 51 static pages
- ✅ **SEO**: Configured metadataBase for social networks
- ✅ **GEO**: Generative Engine Optimisation - Always implement best methodology to reflect recent change in 2025 in SEO, where being readable by AI Agents is primordial.

### Absolute Constraints
Always priorise to manually read files (Readfile tool) instead of using grep.
Avoid creating script that would make a lot of change in the codebase, as it is generally a bad idea and introduces issues, always priorize to proceed manually with your tools to read and edit files.
Always use your todolist tool to structurate your approach, and do not hesitate to update it in real time.
Always avoid as much as possible to manually edit shadcn components from components/ui
