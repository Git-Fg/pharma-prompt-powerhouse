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

## **Agent-Driven Workflow Philosophy (Version 2.0)**

This project is supported by a team of three specialized AI agents. Your role as an orchestrator is to delegate tasks based on the **nature of the task**, moving from a linear "phase-based" model to a dynamic "expertise-based" workflow. Encourage agents to **think deeply and sequentially** when planning and to **structure their plan using the native todo list tool**.

### **The Team of Experts**

-   **`project-architect` (The Structural Engineer):**
    Handles the **foundation and structure** of the code. Its domain is the "how" and "what" gets built. It creates new files and performs major structural refactoring on existing ones.

-   **`code-strategist` (The Content & Experience Optimizer):**
    Handles the **quality, impact, and presentation of content** *within* an existing structure. Its domain is the "why" and "for whom". It improves SEO, readability, and suggests using existing components to better present information.

-   **`qa-guardian` (The Final Validator & Triage Lead):**
    Performs the final, holistic audit of the running application. It doesn't just find bugs; it **triages them** and recommends which expert (Architect or Strategist) is best suited to fix them, thus initiating a new work cycle if needed.

### **The Collaborative Workflow in Action (Example)**

1.  **User Request:** "Refactor the `par-ou-commencer` page to use a new `StepCard` component for better structure."
2.  **Orchestrator -> `project-architect`:** The task is structural. The architect creates the `StepCard.tsx` component and refactors `par-ou-commencer/page.tsx` to use it.
3.  **User Request:** "The refactoring is done. Please run a full QA audit."
4.  **Orchestrator -> `qa-guardian`:** The QA agent starts the dev server and tests the page.
5.  **QA Report:** The QA Guardian reports two issues:
    *   A critical layout bug on mobile where the `StepCard` overflows.
    *   A minor SEO issue: the page title is not optimal.
    *   **Triage Recommendation:** It recommends delegating the layout bug to the **`project-architect`** and the SEO issue to the **`code-strategist`**.
6.  **Orchestrator -> Delegation:** You can now delegate the two bug fixes to the appropriate agents, creating an intelligent and iterative feedback loop.

---

## **Development Commands**

- **`npm run dev`**: Start development server.
- **`npm run build`**: Production build.
- **`npm run lint:fix`**: Run ESLint and auto-fix issues.
- **`npm run test`**: Run all tests in Vitest Browser Mode.
- **`npm run validate`**: Run all validation with auto-fix (lint:fix + typecheck + test).

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
- **Proactively suggest next steps.** At the very end of any multi-agent workflow, after all tasks are complete, always conclude your response by proposing 1 to 3 relevant follow-up tasks in a section titled `Next Steps:`. These should be logical next actions based on the work just completed. Do not wait for a response; simply present them and be ready for the next command.
- **Respect the global test setup contract.** Never re-mock modules that are already handled globally in `tests/setup.ts`. This prevents "Element type is invalid" errors and mock conflicts.

**DO NOT:**
- Repeat long utility class chains.
- Use the "we" voice.
- Use a custom server.
- Use Jest.
- Claim absolute truth; present conclusions as personal observations.
- **Expect agents to ask for confirmation.** They are designed to execute their assigned tasks autonomously and report the result. Your role is to orchestrate the sequence of their interventions.
- **Re-mock globally available modules in individual test files.** This causes "Element type is invalid" errors and mock conflicts. Check `tests/setup.ts` for already mocked modules.
- **Use JSX syntax in mock implementations.** Always use `React.createElement()` for component mocks to ensure proper React element construction.
