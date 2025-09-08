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

## **Agent-Driven Workflow Philosophy**

This project is supported by a team of three specialized AI agents. Your role as an orchestrator is to delegate tasks based on the **phase of development**. Encourage agents to **think deeply and sequentially** when planning and to **structure their plan using the native todo list tool**. Trust them to execute their tasks autonomously and report their results.

-   **Phase 1: Creation (Starting from Scratch) -> `project-architect`**
    When a request involves creating a new file from scratch (content or UI component), delegate to the **Project Architect**. It will analyze the project's existing patterns and schemas to build a correctly structured, intelligent boilerplate file.

-   **Phase 2: Improvement & Refinement -> `code-strategist`**
    When a request is about improving an existing file (for SEO, UX, or code structure), delegate to the **Code Strategist**. It will analyze, report, and then autonomously implement its own recommendations unless the initial request was for a report only.

-   **Phase 3: Final Validation & QA -> `qa-guardian`**
    Before finalizing major changes, delegate a final, holistic audit to the **QA Guardian**. It will perform both static code analysis and dynamic testing on the live application to ensure quality, consistency, and the absence of regressions.

---

## **Development Commands**

- **`npm run dev`**: Start development server.
- **`npm run build`**: Production build.
- **`npm run lint:fix`**: Run ESLint and auto-fix issues.
- **`npm run test`**: Run all tests in Vitest Browser Mode.
- **`npm run validate`**: Run all validation with auto-fix (lint:fix + typecheck + test).

---

## **Architecture & Stack**

- **Stack**: Next.js 15, React 19, TypeScript, Zod, Tailwind CSS v4, Vitest Browser Mode.
- **Content Architecture**: Zod-validated, type-safe, with smart interconnections and O(1) loading.
- **Component Architecture**: Based on shadcn/ui, with a unified, mobile-first, and type-safe approach.

---

## **Specialized Agent Capabilities (MCPs)**

Your team of agents is equipped with powerful tools to enhance their analysis and execution.

-   **`context7` (Documentation Access):**
    Provides agents with up-to-date documentation and code examples for any library version. Agents use this to ensure their generated code is modern, correct, and follows the latest best practices, reducing guesswork.

-   **`shadcn` (UI Component Registry Access):**
    Allows the `project-architect` to discover, analyze, and install UI components from the shadcn/ui registry. This accelerates UI development by intelligently reusing existing, high-quality primitives.

-   **`playwright` (Browser Automation):**
    Provides the `qa-guardian` with the ability to navigate, interact with, and inspect the live web application. It can check for console errors, perform accessibility scans, and validate UI interactions without relying on static analysis alone.

---

## **Technical Rules**

- **Next.js & React**: Exclusively use App Router, React 19 features (`useActionState`, `use()`), and **never use a custom server**.
- **TypeScript**: All content types are inferred from Zod schemas in `lib/content-schema.ts`. `strict` mode is enabled.
- **ESLint**: Exclusively use @antfu/eslint-config. All `eslint-disable` directives must be justified with a comment.
- **Testing**: Exclusively use Vitest Browser Mode with Playwright provider.

---

## **CSS & Content Guidelines**

- **CSS**: The entire design system is centralized in `app/globals.css`. Prefer creating semantic utilities (`@utility`) over repeating class chains. A critical Tailwind v4 `max-w-*` bug is handled with custom utilities.
- **Content**: The target audience is health students. Developer jargon is forbidden. The voice is personal ("I"). Disclaimers are handled centrally by the `DisclaimerBanner` component.

---

## **Critical Best Practices**

**DO:**
- **Orchestrate complex tasks using the native todo list tool**; encourage agents to outline their plan first.
- **Encourage deep, sequential thinking** when delegating analysis, planning, or auditing tasks.
- **Trust your agents' exploratory capabilities**; they can access external documentation (`context7`), UI registries (`shadcn`), and the live app (`playwright`).
- **Trust agents to handle and recover from non-critical errors autonomously.** Review their final reports for any reported failures.
- Write primarily in first person ("I").
- Create and use semantic utilities (`@utility`).
- Commit changes after each logical milestone.
- **Always run `npm run validate`** after making changes to ensure quality.

**DO NOT:**
- Repeat long utility class chains.
- Use the "we" voice.
- Use a custom server.
- Use Jest.
- Claim absolute truth; present conclusions as personal observations.
- **Expect agents to ask for confirmation.** They are designed to execute their assigned tasks autonomously and report the result. Your role is to orchestrate the sequence of their interventions.
