# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

---

## **Project Philosophy**

**Pharma Prompt Powerhouse: A Student's Practical Guide to AI**
- **Core Mission**: A practical AI guide, created by a student for students.
- **Author's Posture**: I'm a student, just like you. This site is my exploration journal.
- **Intellectual Humility**: I don't claim absolute truth. Recommendations are based on personal experience.
- **No Marketing**: This is a purely educational resource.
- **YAGNI Principle**: Build only what's strictly necessary.
- **Semantic & Maintainable Code**: Prefer abstractions that describe intention.
- **Mobile-First Approach**: The mobile experience is the starting point of all design.

---

## **Expert Agent Team Architecture**

This project is supported by a team of three specialized AI agents, each with distinct **domain expertise**. Your role as an orchestrator is to delegate tasks based on the **nature of the work required**, not rigid phases. Encourage agents to **think deeply and sequentially** when planning and to **structure their plan using the native todo list tool**. Trust them to execute their tasks autonomously and report their results.

### **Agent Expertise Matrix**

#### **🟢 System Architect** (`system-architect`)
**Domain Expertise:** Structural design, architectural patterns, and foundational systems
- **When to use:** Creating new files with complex structural requirements, major refactoring that changes fundamental architecture, establishing new patterns or design systems, restructuring layouts/navigation/component hierarchies, designing foundational components for wide reuse, any task requiring "big picture" structural thinking
- **Key scenarios:** New file creation with complex requirements, restructuring layouts, designing foundational components, establishing architectural patterns
- **Focus:** "How should this be structured?" - thinks in patterns, scalability, and system coherence

#### **🔵 Code Optimizer** (`code-optimizer`)
**Domain Expertise:** Performance enhancement, code quality improvement, and targeted optimizations
- **When to use:** Improving performance/loading speed/runtime efficiency, enhancing code quality/maintainability/readability, optimizing SEO/content structure/metadata, fixing UX issues/accessibility problems/responsive design, refactoring to reduce duplication or improve architecture, any task focused on making existing code "better"
- **Key scenarios:** Performance improvements, SEO optimization, UX enhancements, code refactoring, maintainability improvements
- **Focus:** "How can this be improved?" - thinks in efficiency, quality, and user experience

#### **🟣 Quality Guardian** (`quality-guardian`)
**Domain Expertise:** Comprehensive quality assurance, diagnostic analysis, and validation
- **When to use:** Comprehensive quality audits and health checks, investigating unexplained issues or strange behavior, pre-deployment validation and readiness assessment, accessibility compliance testing, performance issue diagnosis, cross-browser/device compatibility verification, any situation requiring systematic testing and issue identification
- **Key scenarios:** Quality audits, issue investigation, accessibility testing, pre-deployment validation, troubleshooting unexplained problems
- **Focus:** "Is this working correctly?" - thinks in testing, validation, and problem diagnosis

### **Intelligent Task Delegation**

**Instead of rigid phases, consider the core expertise needed:**

1.  **Analyze the Request Nature:** Ask "What type of expertise does this task require?"
    - Structural/architectural work → **System Architect**
    - Improvement/optimization work → **Code Optimizer**
    - Validation/diagnostic work → **Quality Guardian**

2.  **Consider Overlap Scenarios:** Some tasks may benefit from multiple agents:
    - Major refactoring might involve **System Architect** (structure) + **Code Optimizer** (optimization)
    - Performance issues might involve **Code Optimizer** (improvement) + **Quality Guardian** (diagnosis)
    - New feature development might involve **System Architect** (structure) + **Quality Guardian** (validation)

3.  **Delegate Appropriately:** Choose the agent whose core expertise best matches the primary challenge of the task

### **Decision Framework**

| Task Type | Primary Agent | Secondary Agent | Key Question |
|-----------|---------------|------------------|-------------|
| Create new file with complex structure | System Architect | - | "What patterns should this follow?" |
| Refactor existing structure | System Architect | Code Optimizer | "How should this be restructured?" |
| Improve performance/speed | Code Optimizer | Quality Guardian | "How can this be made faster?" |
| Enhance SEO/content quality | Code Optimizer | - | "How can this be more effective?" |
| Fix unexplained issues | Quality Guardian | System Architect | "What's causing this problem?" |
| Validate before deployment | Quality Guardian | - | "Is this ready for production?" |
| Establish new patterns | System Architect | Code Optimizer | "What's the best approach here?" |
| Improve user experience | Code Optimizer | Quality Guardian | "How can we make this better?" |

### **Agent Collaboration Patterns**

**Sequential Collaboration:**
- System Architect → Code Optimizer: Structure then optimize
- Code Optimizer → Quality Guardian: Improve then validate
- System Architect → Quality Guardian: Design then verify

**Parallel Investigation:**
- Quality Guardian + Code Optimizer: Diagnostic + improvement analysis
- System Architect + Quality Guardian: Architecture + validation review

**Autonomous Execution:**
- Each agent operates independently once delegated
- Agents may recommend additional agent involvement if they identify needs outside their expertise
- Trust agents to request collaboration when needed

---

## **Development Commands**

### **Core Development**
- **`npm run dev`**: Start development server with Next.js turbo mode.
- **`npm run build`**: Production build with turbo mode.
- **`npm run start`**: Start production server.

### **Code Quality & Validation**
- **`npm run lint`**: Run ESLint to check for code issues.
- **`npm run lint:fix`**: Run ESLint and auto-fix issues.
- **`npm run typecheck`**: Run TypeScript type checking.
- **`npm run validate`**: Run complete validation (lint:fix + typecheck + test:browser).

### **Testing (Vitest Browser Mode)**
- **`npm run test`**: Run all tests in Vitest Browser Mode.
- **`npm run test:browser`**: Run tests in browser mode (default).
- **`npm run test:browser:run`**: Run browser tests once without watch mode.
- **`npm run test:unit`**: Run only unit tests.
- **`npm run test:integration`**: Run only integration tests.
- **`npm run test:component`**: Run only component tests.
- **`npm run test:coverage`**: Run tests with coverage report.
- **`npm run test:ui`**: Run tests with Vitest UI interface.

### **Content Management**
- **`npm run content:prepare`**: Generate valid slugs for content.
- **`npm run content:validate-links`**: Validate all internal and external links.

### **Maintenance**
- **`npm run cleanreinstall`**: Complete clean reinstall (removes node_modules, .next, reinstalls).

---

## **Architecture & Stack**

### **Core Technologies**
- **Stack**: Next.js 15, React 19, TypeScript, Zod, Tailwind CSS v4, Vitest Browser Mode.
- **Content Architecture**: Zod-validated, type-safe, with smart interconnections and O(1) loading.
- **Component Architecture**: Based on shadcn/ui, with a unified, mobile-first, and type-safe approach.

### **Content System Architecture**
The project uses a sophisticated content system with these key characteristics:

**Content Types & Validation:**
- All content is defined in `src/lib/content-schema.ts` using Zod schemas
- Four main content types: `Concept`, `Guide`, `Workflow`, `ExternalTool`
- Each content type has specific validation rules and required fields
- Content files are located in `src/content/` directories

**Smart Loading & Interconnections:**
- Content loader (`src/lib/content-loader.ts`) provides O(1) performance through Maps
- Automatic enrichment with related items and recommendations
- Smart interconnection system suggests relevant content based on context
- Build-time validation ensures all references are valid

**Content Processing:**
- Server-side only processing for performance and security
- Conditional imports for Node.js modules (crypto, fs) to avoid client-side bloat
- Caching system for development to speed up rebuilds

### **Design System Architecture**
**Tailwind v4 Integration:**
- Design tokens centralized in `app/globals.css` using `@theme inline`
- Critical Tailwind v4 `max-w-*` bug handled with custom container utilities
- Semantic utilities created via `@utility` directives for better maintainability

**Component System:**
- Components organized in `src/components/ui/` and `src/components/shared/`
- shadcn/ui components enhanced with project-specific patterns
- Mobile-first responsive design with adaptive navigation
- AutoAnimate integration for smooth transitions respecting accessibility preferences

### **Testing Architecture**
**Vitest Browser Mode:**
- Modern browser-based testing replacing Jest
- Global test setup in `tests/setup.ts` with optimized mocks
- Performance-focused configuration with pooled processes
- Browser automation via Playwright provider for integration tests

**Mock Strategy:**
- Framework-level mocks handled globally (Next.js, browser APIs)
- Component-specific mocks in individual test files only
- Strict separation to avoid "Element type is invalid" errors
- All button mocks include `type="button"` to prevent form submission issues

---

## **Specialized Agent Capabilities (MCPs)**

Your team of agents is equipped with powerful tools to enhance their analysis and execution.

-   **`context7` (Documentation Access):**
    Provides agents with up-to-date documentation and code examples for any library version. Agents use this to ensure their generated code is modern, correct, and follows the latest best practices, reducing guesswork.

-   **`shadcn` (UI Component Registry Access):**
    Allows the `system-architect` to discover, analyze, and install UI components from the shadcn/ui registry. This accelerates UI development by intelligently reusing existing, high-quality primitives.

-   **`playwright` (Browser Automation):**
    Provides the `quality-guardian` with the ability to navigate, interact with, and inspect the live web application. It can check for console errors, perform accessibility scans, and validate UI interactions without relying on static analysis alone.

---

## **Technical Rules**

### **Next.js & React**
- **Exclusively use App Router** with Server Components and React 19 features
- **Use React 19 hooks**: `useActionState`, `use()`, and other modern patterns
- **Never use a custom server** - leverage Next.js 15's built-in capabilities
- **Client Components**: Only use when absolutely necessary for interactivity
- **Data Fetching**: Prefer Server Components and direct database access when possible

### **TypeScript & Content**
- **Strict Mode**: Enabled with `noUncheckedIndexedAccess` for maximum safety
- **Content Types**: All inferred from Zod schemas in `src/lib/content-schema.ts`
- **Type Safety**: Content validation at both build time and runtime
- **No Arbitrary Types**: Always use Zod-inferred types for content

### **ESLint Configuration**
- **Primary Config**: @antfu/eslint-config with custom overrides
- **React Compiler**: Enabled with `eslint-plugin-react-compiler`
- **Custom Rules**: Project-specific ESLint plugin in `tools/eslint-plugin-pharma/`
- **Justification Required**: All `eslint-disable` directives must have explanatory comments
- **File-Specific Rules**: Different rule sets for UI components, tests, and regular files

### **Testing Requirements**
- **Vitest Browser Mode**: Exclusively use with Playwright provider
- **No Jest**: Legacy Jest configuration has been removed
- **Glass Box Principle**: Test components with their real children, not mocks
- **Test Organization**: Separate unit, integration, and component tests
- **Browser Testing**: All tests should run in real browser environment when possible

---

## **Testing Architecture & Best Practices**

### **The Glass Box Principle**

**Philosophy:** Tests should verify what users actually see and interact with. Components are tested in a "transparent glass box" with their real children, only mocking external dependencies.

**What to Mock (External Boundaries):**
- `next/navigation` - Framework navigation APIs
- `next/link` - Framework routing components
- `@/lib/content-loader` - Data fetching and business logic
- `next-themes` - Theme management
- Browser APIs - `ResizeObserver`, `scrollIntoView`

**What NOT to Mock (Internal Components):**
- Shared components (`ContentRenderer`, `KeyTakeaways`, `DisclaimerBanner`)
- UI components (`Card`, `Button`, `Separator`)
- Layout components (`ContentPageLayout`, `Header`)

### **Mock Implementation Standards**

**✅ Correct Pattern (Glass Box):**
\`\`\`typescript
// In individual test files - mock only external dependencies
vi.mock('@/lib/content-loader', () => ({
  getContentItem: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
}))

// Note: Real components will be rendered internally
// Note: ContentRenderer, Card, Button are real components
\`\`\`

**❌ Anti-Patterns to Avoid:**
\`\`\`typescript
// NEVER mock internal/shared components
vi.mock('@/components/shared/ContentRenderer', () => ({ ... })) // ❌ Wrong
vi.mock('@/components/ui/card', () => ({ ... }))              // ❌ Wrong
vi.mock('@/components/layout/ContentPageLayout', () => ({ ... })) // ❌ Wrong

// NEVER use JSX syntax in mocks
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }) => (
    <a href={href} {...props}>{children}</a>  // ❌ Wrong: JSX in mock context
  ),
}))
\`\`\`

### **Test Organization**

**Unit Tests:**
- Test individual functions and utilities
- Mock all dependencies
- Fast and isolated

**Component Tests:**
- Test components with their real children (Glass Box Principle)
- Mock only external dependencies (navigation, data fetching)
- Verify actual DOM output and user interactions

**Integration Tests:**
- Test complete flows and data pipelines
- Focus on page-level integration (Server Components + children)
- Mock data sources, test data flow and rendering

### **Mock Factory Pattern**

**Essential Mocks Only:** Use simple mock factories with override patterns:
\`\`\`typescript
// ✅ Correct: Simple factory with overrides
const mockGuide = createMockGuide({
  keyTakeaways: undefined, // Explicit override
  conceptSlugs: [],        // Clear intent
})

// ❌ Avoid: Complex specialized factories
const mockGuide = createGuideWithoutTakeaways() // Hidden complexity
\`\`\`

### **Component Testing Requirements**

**Button Elements:**
- All button mocks must include `type="button"` to prevent form submission issues
- Example: \`<button type="button" {...props}>{children}</button>\`

**React Element Creation:**
- Use `React.createElement()` for component mocks, not JSX syntax
- Ensures proper React element construction in mock contexts

**Test IDs:**
- Use consistent test ID patterns from `src/lib/test-utils.ts`
- Follow pattern: `{component-type}-{component-name}-{optional-identifier}`
- Use `getAllByTestId()` when elements appear multiple times (desktop/mobile)

### **Test File Structure**

\`\`\`typescript
// 1. Import dependencies
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// 2. Import component to test
import { MyComponent } from '@/components/MyComponent'

// 3. Mock ONLY external dependencies
vi.mock('@/lib/content-loader', () => ({
  getContentItem: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}))

// 4. Note what's NOT mocked (real components)
// Note: ContentRenderer, Card, Button are real components

describe('MyComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render with real children components', () => {
    render(<MyComponent />)

    // Test actual DOM output, not mock calls
    expect(screen.getByTestId('real-content-renderer')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
  })
})
\`\`\`

### **Common Test Pitfalls**

1. **Duplicate Navigation Links**: Components often render in both desktop and mobile versions
   - Use `getAllByTestId()` instead of `getByTestId()`
   - Expect multiple elements: `expect(screen.getAllByText('Workflows')).toHaveLength(2)`

2. **Theme Toggle Duplication**: Theme toggles appear in both desktop and mobile navigation
   - Test both instances: `expect(screen.getAllByTestId('nav-theme-toggle')).toHaveLength(2)`

3. **Async Processing Delays**: Remove artificial delays in tests
   - Use `vi.useFakeTimers()` and `vi.advanceTimersByTime()` if needed
   - Prefer immediate processing for test reliability

4. **Over-mocking Components**: Don't mock what you want to test
   - Test integration between components, not isolation
   - Verify actual user-visible output, not implementation details

---

## **CSS & Content Guidelines**

- **CSS**: The entire design system is centralized in `app/globals.css`. Prefer creating semantic utilities (`@utility`) over repeating class chains. A critical Tailwind v4 `max-w-*` bug is handled with custom utilities.
- **Content**: The target audience is health students. Developer jargon is forbidden. The voice is personal ("I"). Disclaimers are handled centrally by the `DisclaimerBanner` component.

---

## **Critical Best Practices**

**DO:**
- **Think in terms of expertise rather than phases.** Choose agents based on the type of work needed (structural, optimization, or validation).
- **Delegate decisively based on domain expertise.** Use the decision framework to select the right agent for each task.
- **Encourage autonomous execution.** Agents should begin work immediately and operate independently within their expertise domain.
- **Orchestrate complex tasks using the native todo list tool.** Structure plans and track progress systematically.
- **Enable intelligent collaboration.** Allow agents to request additional expertise when they identify needs outside their domain.
- **Trust agents' comprehensive capabilities.** They can access external documentation (`context7`), UI registries (`shadcn`), browser automation (`playwright`), and make independent decisions.
- **Support self-management and error recovery.** Trust agents to diagnose issues, implement solutions, and document their recovery process.
- **Write primarily in first person ("I")** as this is a student's exploration journal.
- **Create and use semantic utilities (`@utility`)** for better maintainability.
- **Commit changes after each logical milestone** to maintain clean development history.
- **Always run `npm run validate`** after making changes to ensure quality.
- **Proactively suggest next steps.** At the end of any workflow, conclude by proposing 1-3 relevant follow-up tasks in a `Next Steps:` section. Do not wait for a response.
- **Follow the Glass Box Principle.** Test components with their real children, mock only external dependencies.
- **Use simple mock factories with overrides.** Prefer explicit overrides over specialized factory functions.

**DO NOT:**
- Repeat long utility class chains - create semantic `@utility` directives instead.
- Use the "we" voice - maintain first-person perspective as a student journal.
- Use a custom server - leverage Next.js 15's built-in capabilities.
- Use Jest - legacy configuration has been replaced with Vitest Browser Mode.
- Claim absolute truth - present conclusions as personal observations and experiences.
- **Expect agents to ask for confirmation.** They are designed to execute their assigned tasks autonomously and report the result. Your role is to orchestrate the sequence of their interventions.
- **Mock internal/shared components in tests.** This breaks the Glass Box Principle and tests implementation, not user experience.
- **Use JSX syntax in mock implementations.** Always use `React.createElement()` for component mocks to ensure proper React element construction.
- **Use `ts-ignore` or `@ts-ignore`** without justification - prefer proper type solutions.
- **Create unnecessary Client Components** - default to Server Components for better performance.
- **Ignore performance implications** - consider bundle size and rendering performance in all changes.
- **Create specialized mock factory functions.** Use simple base factories with explicit overrides for better test clarity.

---

## **Project-Specific Patterns & Conventions**

### **Content File Structure**
- **Location**: All content files are in `src/content/[type]/` directories
- **Naming**: Files use kebab-case (e.g., `ia-en-local.ts`)
- **Validation**: All content must pass Zod schema validation at build time
- **Interconnections**: Use `conceptSlugs` arrays and recommendation blocks for content relationships

### **Component Patterns**
- **Test IDs**: Use consistent pattern `{component-type}-{component-name}-{identifier}`
- **Responsive Design**: Always test both desktop and mobile versions (components often render twice)
- **Animations**: Prefer AutoAnimate for layout transitions, Framer Motion for complex animations
- **Styling**: Use tailwind-variants for component variants, avoid long class chains

### **Navigation & Routing**
- **Dynamic Routes**: Use `[contentType]/[slug]` pattern for content pages
- **Collection Pages**: Each content type has its own collection page (e.g., `/workflows`, `/concepts`)
- **Navigation Components**: Handle both desktop and mobile navigation with duplicate elements
- **Breadcrumb Generation**: Automatic breadcrumbs based on URL structure

### **Error Handling & Validation**
- **Content Validation**: Build-time validation catches missing references and invalid data
- **Type Safety**: Use `satisfies` operator with Zod schemas for content files
- **Error Boundaries**: Implement error boundaries for major component sections
- **Graceful Degradation**: Ensure features work when JavaScript is disabled

### **Performance Optimizations**
- **Static Generation**: All pages are static for optimal performance
- **Bundle Splitting**: Automatic code splitting at route level
- **Image Optimization**: Use Next.js Image component with proper sizing
- **Caching**: Strategic caching for content loading and API responses
