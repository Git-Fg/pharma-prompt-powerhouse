// eslint.config.js
import antfu from '@antfu/eslint-config'
import nextPlugin from '@next/eslint-plugin-next'
import reactCompilerPlugin from 'eslint-plugin-react-compiler'
import pharmaPlugin from './tools/eslint-plugin-pharma/index.js'

export default antfu(
  {
    // Configuration de base avec Next.js
    react: true,
    typescript: true,
    next: true,
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: false,
    },
    formatters: {
      css: true,
      html: true,
    },
    ignores: [
      '.next',
      '.content-collections',
      'out',
      'build',
      'coverage',
      'playwright-report',
      'test-results',
      'next-env.d.ts',
      '**/*.d.ts',
      'docs/**',
      '**/README.md',
      '.claude/**',
      '.claude*',
    ],
  },
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  {
    plugins: {
      'react-compiler': reactCompilerPlugin,
    },
    rules: {
      'react-compiler/react-compiler': 'error',
    },
  },
  {
    plugins: {
      pharma: pharmaPlugin,
    },
    rules: {
      'pharma/no-prohibited-tailwind-classes': 'error',
      // 'pharma/no-typographic-characters': 'error', // Temporarily disabled to fix circular dependency
    },
  },
  {
    // Override for specific project needs and soften rules for pharma app
    rules: {
      // Core React/JS rules (keep strict for stability)
      'react/no-unescaped-entities': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'antfu/no-top-level-await': 'off',
      'node/prefer-global/process': 'off',

      // React array index key control - warn to encourage better practices
      'react/no-array-index-key': 'warn', // Changed to warn - use index keys only with justification

      // React hooks useEffect setState control - warn to prevent side effects
      'react-hooks-extra/no-direct-set-state-in-use-effect': 'warn', // Changed to warn - justify exceptions

      // React event listener cleanup control - warn to prevent memory leaks
      'react-web-api/no-leaked-event-listener': 'warn', // Changed to warn - justify PWA lifecycle exceptions

      // Allow dangerouslySetInnerHTML in chart components (controlled use)
      'react-dom/no-dangerously-set-innerhtml': 'warn', // Changed from error to warn

      // Disable fast refresh warnings - development-only concern
      'react-refresh/only-export-components': 'off', // Disabled - over-engineering for dev experience

      // Allow React 19 context provider patterns
      'react/no-context-provider': 'off', // Disabled - React 19 supports both patterns

      // Allow hooks naming in test files
      'react-hooks-extra/no-unnecessary-use-prefix': 'off', // Disabled for test utilities

      // Tailwind v4 semantic utilities support
      // Note: eslint-plugin-tailwindcss doesn't support Tailwind v4 yet due to peer dependency conflicts
      // Our semantic utilities (prose-*, container-*, etc.) are implemented via @utility in globals.css
      'style/max-len': 'off', // Allow longer class strings for semantic utilities

      // TypeScript any type control - prohibit by default, require justification
      'ts/no-explicit-any': 'error',

      // Require description for eslint-disable-next-line comments to force justification
      'eslint-comments/require-description': 'error',
    },
  },
  {
    // Specific rules for shadcn/ui components
    files: ['src/components/ui/**/*.tsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
      'react-dom/no-dangerously-set-innerhtml': 'off',
      'react/no-context-provider': 'off',
    },
  },
  {
    // Specific rules for test files
    files: ['**/*.test.ts', '**/*.test.tsx', 'tests/**/*'],
    rules: {
      'react-hooks-extra/no-unnecessary-use-prefix': 'off',
      'no-console': 'off',
    },
  },
)
