# Test Suite Documentation

This project uses a comprehensive testing strategy with **Vitest** for unit/integration tests and **Playwright** for E2E tests, following 2025 best practices and avoiding duplication with TypeScript type safety.

## Testing Philosophy

The project leverages **Zod schemas with TypeScript `satisfies`** for compile-time validation, so our tests focus on:

1. **Business logic** not covered by type safety
2. **Content relationships** and enrichment workflows
3. **Component behavior** and user interactions
4. **Edge cases** beyond basic type conformance

What we **DON'T** test (already covered by build-time validation):

- Basic schema structure (handled by `satisfies` operator)
- Type conformance (handled by TypeScript compilation)
- Content file structure validation (fails at build time if incorrect)

## Test Structure

```
tests/
├── unit/           # Unit tests for utilities and business logic
├── integration/    # Integration tests for content loading workflows
├── component/      # React component behavior tests
├── e2e/           # End-to-end Playwright tests
└── setup.ts       # Global test configuration
```

## Test Scripts

```bash
npm run test              # Run all tests
npm run test:watch        # Run tests in watch mode
npm run test:ui           # Open Vitest UI
npm run test:coverage     # Run tests with coverage report
npm run test:unit         # Run only unit tests
npm run test:integration  # Run only integration tests
npm run test:component    # Run only component tests
npm run test:e2e          # Run E2E tests with Playwright
```

## Test Coverage

### Unit Tests (`tests/unit/`)

- **`content-schema.test.ts`**: Tests edge cases in Zod schema validation
  - Validates complex content block types (tabs, alerts, code blocks)
  - Tests required field validation
  - Tests URL validation for external tools
  - Tests minimum constraints (e.g., non-empty checklists)

- **`utils.test.ts`**: Tests utility functions
  - Tests `cn()` class name utility with Tailwind CSS merging
  - Tests conditional class application
  - Tests array and object inputs

### Integration Tests (`tests/integration/`)

- **`content-loader.test.ts`**: Tests content loading and enrichment
  - Validates all content collections load properly
  - Tests content relationships and cross-references
  - Tests enrichment of guides with related concepts
  - Tests accessor functions for content retrieval
  - Verifies referential integrity
  - Performance characteristics testing

### Component Tests (`tests/component/`)

- **`ContentRenderer.test.tsx`**: Tests the core content rendering component
  - Renders different content block types correctly
  - Handles nested content (tabs with multiple blocks)
  - Tests error handling with malformed data
  - Validates proper component composition

- **`CommandPalette.test.tsx`**: Tests search functionality
  - Tests component initialization
  - Tests keyboard event handling
  - Tests event cleanup on unmount

### E2E Tests (`tests/e2e/`)

- **`app.spec.ts`**: Application-wide functionality tests
- **`navigation.spec.ts`**: Navigation and routing tests
- **`performance.spec.ts`**: Performance and accessibility tests
- **`mdx-components.spec.ts`**: MDX component rendering tests
- **`screenshot.spec.ts`**: Visual regression tests

## Configuration

### Vitest Configuration (`vitest.config.ts`)

- Uses React plugin for JSX support
- JSDOM environment for browser-like testing
- Global test APIs enabled
- Path aliases configured (`@/` -> `src/`)
- Coverage reports exclude content files (validated by TypeScript)

### Test Setup (`tests/setup.ts`)

- Imports `@testing-library/jest-dom` for DOM assertions
- Mocks Next.js navigation hooks
- Mocks UI dependencies (ResizeObserver, scrollIntoView)
- Mocks toast notifications (Sonner)

## Best Practices Followed

1. **Minimal Mocking**: Only mock external dependencies, not business logic
2. **Focused Testing**: Test behavior, not implementation details
3. **Efficient Coverage**: Leverage TypeScript + Zod for compile-time validation
4. **Performance Testing**: Include performance characteristics in integration tests
5. **Clean Setup**: Global mocks in setup file, specific mocks in test files

## Running Tests

All tests pass and provide meaningful coverage of the application logic not covered by the type system:

```bash
# Run all unit and integration tests
npm run test

# Run with coverage report
npm run test:coverage

# Run E2E tests (requires built app)
npm run test:e2e
```

The test suite ensures the project is production-ready with comprehensive validation of content relationships, component behavior, and user workflows.
