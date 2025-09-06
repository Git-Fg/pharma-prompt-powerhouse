# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## **Project Philosophy**

**Pharma Prompt Powerhouse: A Student's Practical Guide to AI**
- **Core Mission**: A practical AI guide, created by a student for students.
- **Author's Posture**: I'm a student, just like you. This site is my exploration journal. I share my methods, discoveries, doubts, and even failures to save you time.
- **Intellectual Humility**: I don't claim absolute truth. Recommendations and analyses are based on personal experience. I systematically encourage testing for yourself.
- **No Marketing**: This is a purely informative and educational resource. There's nothing to sell, no newsletter, no community building (Discord, forums, etc.).
- **YAGNI Principle**: Build only what's strictly necessary for current functionality.
- **Semantic & Maintainable Code**: Prefer abstractions (semantic utilities, components) that describe intention ("what it is") over implementation ("what it looks like").
- **Final User Goal**: Leave with a methodology, critical thinking, and confidence to experiment to make AI a real lever for studies, with autonomy and awareness.
- **Mobile-First Approach**: Responsiveness, UI, and UX must be impeccable for mobile usage. Mobile experience isn't an adaptation—it's the starting point of all design.

---

## **Development Commands**

### Core Development
- `npm run dev` - Start development server with Next.js turbo mode
- `npm run build` - Production build with Next.js turbo mode
- `npm run start` - Start production server
- `npm run lint` - Run ESLint validation
- `npm run lint:fix` - Run ESLint and auto-fix issues
- `npm run typecheck` - Run TypeScript type checking

### Testing
- `npm run test` - Run all tests with Vitest
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

---

## **Architecture & Stack**

### Architectural Principles
- **Declarative Architecture**: Components declare what they need, not how to implement it
- **Single Source of Truth**: Each functionality has one canonical implementation
- **Type-First Development**: TypeScript types drive component design and validation
- **Zero Duplication**: Shared functionality extracted into reusable, type-safe components
- **Progressive Enhancement**: Core functionality works everywhere, enhancements where supported

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
- **Unified Architecture**: Single components for multiple use cases (FilterableContentGrid, SmartRecommendationsSection, ContentHeader)
- **Mobile-First Design**: Bottom navigation and responsive layouts
- **Modern Animations**: AutoAnimate + Framer Motion hybrid system
- **Type Safety**: 100% TypeScript coverage with generic constraints and strict mode

---

## **Key Systems**

### Content Loading System
- **Zero Runtime Loading**: All content loaded and validated at build time
- **Incremental Cache**: Content cached with SHA256 hash validation
- **Back-Relations**: Automatic reverse relationship mapping
- **Integrity Validation**: Build fails on broken content references

### Unified Recommendation System
- **SmartRecommendationsSection**: Single intelligent recommendation component for all content types
- **Combined Scoring Algorithm**: Tag similarity (40%) + concept similarity (60%) for relevant suggestions
- **Multi-type Recommendations**: Supports guides, workflows, concepts, and external tools
- **Context-aware**: Automatically adapts recommendations based on current content type

### Unified Listing System
- **FilterableContentGrid**: Generic component for all content listing pages
- **TypeScript Generics**: Full type safety with flexible content type constraints
- **Smart Filtering**: Search, category, and difficulty filtering with centralized state management
- **Consistent UX**: Unified empty states, loading states, and animations across all listing pages

### Unified Filter System
- **ContentFilterControls**: Single component for all filter UI across listing pages
- **Declarative Configuration**: Props control which filters to show (category, difficulty, etc.)
- **Consistent Behavior**: Unified reset button, responsive layout, and interaction patterns
- **useContentFilter Integration**: Clean separation between filter logic and presentation

### Unified Table System
- **ResponsiveDataTable**: Generic component for responsive tables with TanStack Table
- **Mobile-First Design**: Automatic switching between desktop table and mobile card views
- **Type-Safe**: Full TypeScript generics support for any data type
- **ContentTable**: Specialized bridge component for ContentRenderer markdown tables
- **Single Source of Truth**: All responsive table logic centralized in one component

### UI/UX Features
- **AutoAnimate Integration**: Smooth transitions respecting accessibility preferences
- **TanStack Table**: For responsive comparison tables
- **Modern Typography**: text-pretty, text-balance, and orphans/widows control
- **PWA Support**: Service worker with Serwist integration

---

## **Technical Rules**

### React 19
- **Compiler & Optimization**: Write simple, readable code for React Compiler. Avoid manual `useMemo`/`useCallback`.
- **Actions & Forms**: Use **`useActionState`** as standard for forms. Prefer `useState` and `useTransition` for complex client-side interactivity.
- **Data Management**: Use `use()` with Suspense for asynchronous code.

### Next.js 15
- **App Router**: Exclusively use App Router. `"use client"` only for interactivity.
- **Cache (IMPORTANT)**: Nothing is cached by default. Use `export dynamic = 'force-static'` to enable cache when needed.
- **Async APIs**: `cookies()`, `headers()`, etc., are now asynchronous. Use `await`.
- **Custom Server**: **NEVER use custom server** (`server.ts`). It disables critical performance optimizations.

### TypeScript
- **Single Source of Truth**: All content types are inferred from Zod schemas. No manual types.
- **ContentRenderer Synchronization**: Use discriminated union and `assertNever` function in switch to ensure all content block types are handled, or compilation fails.
- **Configuration**: Maintain `strict` mode enabled in `tsconfig.json`.

### Content Structure (Zod)
- **Philosophy**: Zod Schema is the **Single Source of Truth** in `src/lib/content-schema.ts`.
- **Build-time Validation**: Each content file (`.ts`) uses `satisfies` operator to validate structure. Build will fail if content is invalid.
- **Data Enrichment**: `src/lib/content-loader.ts` centralizes loading and data binding.

### ESLint (@antfu/eslint-config)
- **Modern Configuration**: Exclusively standardize on @antfu/eslint-config for simplified, optimal configuration.
- **Plugin Management**: @antfu/eslint-config automatically manages all necessary ESLint plugins (React, TypeScript, Next.js).
- **Tailwind v4 Support**: Official `eslint-plugin-tailwindcss` not yet fully compatible with v4's fileless configuration. Recommend disabling or configuring `no-custom-classname` rule with `allow` list for custom semantic utilities (ex: `prose-*`, `container-*`).
- **Philosophy**: Declarative configuration with opinionated but sensible rules, avoiding manual complexity.
- **Style**: 2 spaces, single quotes, no semicolons (modern 2025 style)
- **Performance**: Rules optimized for React 19 Compiler and modern best practices

### Testing (Vitest)
- **Test Framework**: Exclusively standardize on Vitest. Completely remove Jest.
- **Configuration**: Use standard configuration for Next.js with aliases and `globals` mode.
- **Test Scripts**: Configure scripts: `"test": "vitest"`, `"test:watch": "vitest"`.
- **Best Practices**: Test behavior, not implementation. Use `@testing-library/react`.

### shadcn/ui
- **Notification System**: Exclusively standardize on Sonner for toast notifications. Remove any other systems.
- **Component Usage**: Use components as-is. Prefer simple composition over overloading.
- **Forms**: Use shadcn/ui form components integrated with `useActionState` (React 19).

---

## **CSS Architecture & Design System**

### Centralized Design System (Tailwind v4 + Shadcn Canary)
- **Single File**: `src/app/globals.css` centralizes entire design system.
- **@theme inline**: All design tokens (spacing, colors, typography, breakpoints, shadows, z-index) defined centrally.

> ⚠️ **Critical Tailwind v4 Bug - "One Word Per Line" Display**: As of current state (Q3 2024), Tailwind v4 contains a major bug where `max-w-*` classes (ex: `max-w-xs`, `max-w-md`, `max-w-lg`) incorrectly use spacing variables (`--spacing-*`) instead of container variables (`--container-*`). **Symptom**: Text displays one word per line on mobile, making content unreadable. **Implemented Solutions:**
> 1. Explicit redefinition of `--container-*` variables in `@theme`
> 2. Creation of custom semantic utilities (`footer-description-width`, `text-content-width`) with direct values
> 3. Complete documentation in `/docs/tailwind-v4-text-width-bug.md`

- **@utility (Semantic Utilities)**: In addition to base utilities (`container`, etc.), create semantic utilities for recurring styles (ex: `prose-slogan`, `prose-description`). This improves readability and maintainability by giving business meaning to styles, instead of repeating long class chains.
- **@layer components**: Reusable base components (buttons, cards, layouts) without duplication.
- **Mobile-First**: All CSS classes designed mobile-first with consistent responsive breakpoints.
- **Performance**: Optimized for React 19 Compiler with modern CSS patterns (custom properties, color-mix, etc.).

### Advanced Animation System (2025)
- **Framer Motion v12+**: Complete integration with lazy loading for optimal performance.
- **Modern Animations**: Natural easing curves (`spring`, `bounce`, `smooth`) following 2025 best practices.
- **Micro-interactions**: Magnetic effects, hover states, fluid transitions for premium UX.
- **Animated Components**: `ScrollAnimated`, `AnimatedList`, `StaggeredPage`, `MagneticCard`, `Interactive` for living interfaces.
- **Accessibility**: Automatic respect for `prefers-reduced-motion` for inclusive experience.
- **Performance**: LazyMotion, intelligent staggering, and GPU-optimized animations for constant 60fps fluidity.

---

## **Content Development Guidelines**

### Content Rules
- **Target Audience**: Health Students and Professionals. Technical jargon should be avoided. **Tolerance**: Concepts like `RAG` or `token` may be mentioned **only if explained simply**. Developer jargon (`API`, `endpoint`, etc.) is **strictly forbidden**.
- **"WebUI First" Approach**: All guides and "Workflows" must be based on accessible web interfaces. No guide should require writing any code.
- **Prompt Standardization**: Always use `{{variable_name}}` format for variables to ensure consistency and personalization.

### Persona and Tone
- **Main Voice ("I")**: "I" is the default voice to embody the student persona sharing experience. It reinforces authenticity and proximity.
- **Descriptive Voice ("He/She")**: Impersonal "he/she" is tolerated for describing objective facts or tool behavior. Example: "Claude is particularly good for this task. It tends to hallucinate less."
- **Voice to Prohibit ("We")**: "We" is forbidden. It creates distance and breaks the project's personal identity.
- **Authenticity**: Share doubts, failures, and iterations. The "My Initial Approach (and its limits)" section in workflows is essential to show that mastery comes from experimentation.

### Essential Disclaimers
- **Mandatory Integration**: These three warnings must be present and visible on every workflow and tool sheet.
- **On Performance**: *"Results presented here are examples. The AI landscape constantly evolves and model performance may change. The only way to find the optimal solution for *your* need is to experiment and compare."*
- **On Generated Content Reliability**: *"An AI, even the most advanced, can make errors, omit crucial information or 'hallucinate'. In healthcare, any AI-generated information must be systematically verified with reliable and validated sources. **Never use unverified information for important clinical or academic decisions.**"*
- **On Confidentiality**: *"The golden rule: if you wouldn't write it on a postcard, don't put it in a prompt. Never use **ever** personal, identifiable or patient data on an online platform. I specify the perceived risk level for each tool, but absolute caution remains your best protection."*

### Adding New Content
1. Create content files in appropriate `src/content/` directory
2. Follow Zod schema structure in `content-schema.ts`
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
- `table` - Responsive tables (automatically uses ContentTable component)

### Content Structure Guidelines
- **Workflow Structure**: Recommended to include 6 sections: The Problem, Initial Approach (and limits), Optimized Strategy, Tool Comparison, Final Prompt (to adapt), Key Takeaways
- **Tool Card Structure**: Should include tool name, brief opinion, strengths, vigilance points, free vs paid comparison, confidence score with justification
- **Concept Structure**: Ideally structured in 4 parts: Simple Analogy, Formal Definition, Why it matters to you, Going further (Advanced notions)

---

## **Performance Optimizations**

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

---

## **Security Considerations**

- **Content Security Policy**: Strict CSP headers
- **Type Safety**: 100% TypeScript coverage
- **Input Validation**: Zod schema validation for all content
- **XSS Protection**: Built-in Next.js security features
- **Dependency Security**: Regular audit and updates

---

## **Mobile-First Development**

- **Bottom Navigation**: Mobile-optimized navigation system
- **Responsive Tables**: TanStack Table with mobile cards fallback
- **Touch Interactions**: Optimized for mobile devices
- **PWA Features**: Offline support and installable app

---

## **Custom ESLint Rules**

The project includes custom ESLint rules in `tools/eslint-plugin-pharma/`:
- `pharma/no-prohibited-tailwind-classes` - Prevents use of deprecated Tailwind classes
- `pharma/no-typographic-characters` - Prevents direct use of typographic characters in content

---

## **Testing Philosophy**

- **Unit Tests**: For utility functions and hooks
- **Component Tests**: For UI components
- **Integration Tests**: For content loading and validation
- **E2E Tests**: For critical user flows

---

## **French Content Guidelines**

This is a French-language pharmaceutical AI education platform. When adding content:
- Use proper French typography and spacing
- Follow pharmaceutical terminology standards
- Include both formal definitions and analogies
- Provide practical examples for pharmacy students
- Emphasize safety and validation in AI usage

---

## **Critical Best Practices**

**DO:**
- Write primarily in first person ("I") to reinforce authenticity and proximity
- Create and use semantic utilities (`@utility`) for recurring styles to ensure consistency and maintainability
- Maintain sober, informative, humble tone, sharing failures as well as successes
- Systematically integrate 3 warnings (performance, reliability, confidentiality) in relevant content
- Follow YAGNI principle - build only what's necessary now for students
- Use Zod schemas as single source of truth for content structure
- Use `satisfies` operator in content files for build-time validation
- Systematically apply mobile-first approach with standardized breakpoints
- Use animation components (`ScrollAnimated`, `AnimatedList`, `MagneticCard`) for modern UX
- Respect modern easing curves (`easings.spring`, `easings.bounce`) for natural animations
- Use @antfu/eslint-config for simplified, modern ESLint configuration
- Comit after all milestones

**DO NOT:**
- Repeat long utility class chains; prefer creating semantic utility
- Use "we" voice
- Use custom server
- Use Jest - exclusively standardize on Vitest
- Configure ESLint manually - use @antfu/eslint-config with minimal overrides
- Include commercial calls-to-action, newsletters, or community links
- Claim absolute truth; present conclusions as personal observations and encourage experimentation
- Perform data binding logic at runtime in components; that's content-loader's role
- Create redundant manual types for content

In case of doubt, refer to official documentation for React 19, Next.js 15, Zod, Vitest, @antfu/eslint-config, and shadcn/ui.
