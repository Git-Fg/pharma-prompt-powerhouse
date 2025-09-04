# GEMINI.md - Pharma Prompt Powerhouse

This document provides a comprehensive overview of the Pharma Prompt Powerhouse project, its architecture, and development practices to be used as instructional context for future interactions.

## Project Overview

Pharma Prompt Powerhouse is a Next.js application that serves as a reference platform for pharmacy students and professionals to master the use of AI in their field. It provides an interconnected ecosystem of knowledge, tools, and best practices.

**Key Features:**

*   **Interconnected Content:** The platform features a rich content structure with concepts, guides, interactive workflows, and evaluated external tools. The content is interconnected to provide a cohesive and contextual learning experience.
*   **Modern Tech Stack:** The project is built with Next.js 15, React 19, and TypeScript, ensuring a high-performance and type-safe application.
*   **Comprehensive Design System:** It utilizes Tailwind CSS v4, shadcn/ui, and tailwind-variants to create a modern and consistent user interface.
*   **Interactive Learning Tools:** The platform includes an advanced prompt editor and an AI flashcard generator to facilitate active learning.
*   **Performance Optimized:** The project is optimized for performance with features like the React Compiler, image optimization, and static site generation.

## Building and Running

The following commands are available to build, run, and test the project:

*   **Development:** `npm run dev` - Starts the development server with hot-reloading.
*   **Build:** `npm run build` - Creates a production-ready build of the application.
*   **Start:** `npm run start` - Starts the production server.
*   **Lint:** `npm run lint` - Lints the codebase using ESLint.
*   **Type Check:** `npm run typecheck` - Checks for TypeScript errors.
*   **Testing:**
    *   `npm run test` - Runs all tests using Vitest.
    *   `npm run test:e2e` - Runs end-to-end tests using Playwright.

## Development Conventions

*   **TypeScript:** The project is written entirely in TypeScript with strict mode enabled. All content is type-safe and validated with Zod schemas.
*   **Styling:** Styling is done using Tailwind CSS with tailwind-variants for creating component-based styles.
*   **Components:** The project uses shadcn/ui for its component library, which provides a set of accessible and customizable components.
*   **State Management:** The project uses a combination of React state and custom hooks for managing state.
*   **Content:** All content is stored in the `src/content` directory as TypeScript modules. Each module exports a content object that conforms to a specific Zod schema.
*   **Testing:** The project has a comprehensive test suite that includes unit, integration, component, and end-to-end tests.

## Content Structure

The content of the platform is organized into the following categories:

*   **Concepts:** Fundamental concepts of prompt engineering applied to pharmacy.
*   **Guides:** Practical guides based on real-world experience.
*   **Workflows:** Interactive workflows that guide users through common tasks.
*   **External Tools:** A curated list of external AI tools with evaluations and recommendations.

Each piece of content is a TypeScript module that exports a content object. The content object has a `content` property, which is an array of objects that can be of the following types:

*   `markdown`: For rendering Markdown content.
*   `card`: For displaying content in a card format.
*   `codeBlock`: For displaying code snippets.
*   `toolRecommendation`: For recommending an external tool.
*   `guideRecommendation`: For recommending a guide.
