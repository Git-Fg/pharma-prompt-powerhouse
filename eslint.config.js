// eslint.config.js
import antfu from '@antfu/eslint-config'
import nextPlugin from '@next/eslint-plugin-next'
import reactCompilerPlugin from 'eslint-plugin-react-compiler'
import pharmaPlugin from './tools/eslint-plugin-pharma/index.js'

export default antfu(
  // 1. Configuration de base @antfu
  {
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
      '**/*.md',
      '.claude/**',
      '.claude*',
    ],
  },
  // 2. Intégration fine de Next.js (règles recommandées)
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  // 3. Intégration du Compilateur React 19
  {
    plugins: {
      'react-compiler': reactCompilerPlugin,
    },
    rules: {
      'react-compiler/react-compiler': 'error',
    },
  },
  // 4. Règles personnalisées pour la gouvernance du projet
  {
    plugins: {
      pharma: pharmaPlugin,
    },
    rules: {
      'pharma/no-prohibited-tailwind-classes': 'error',
      'pharma/no-tailwind-v4-workaround': 'error',
      'pharma/no-hardcoded-values': 'warn',
      'pharma/prefer-design-system-tokens': 'warn',
      'pharma/no-multiple-variant-libraries': 'error',
      'pharma/no-inconsistent-typography': 'warn',
      // 'pharma/no-typographic-characters': 'error', // Temporarily disabled due to existing content issues
    },
  },
  // 5. Overrides globaux pour le projet
  {
    rules: {
      'react/no-unescaped-entities': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'antfu/no-top-level-await': 'off',
      'node/prefer-global/process': 'off',
      'ts/no-explicit-any': 'error',
      'eslint-comments/require-description': 'error',
    },
  },
  // 6. Stratégie de "Selective Enforcement" pour shadcn/ui
  {
    files: ['src/components/ui/**/*.tsx'],
    name: 'project:shadcn-ui-overrides',
    rules: {
      // Rationale: shadcn/ui utilise ce pattern pour créer des props extensibles.
      // C'est une pratique délibérée pour l'ergonomie de l'API.
      'ts/no-empty-interface': ['error', { allowSingleExtends: true }],

      // Rationale: Le code généré ne suit pas nos conventions stylistiques.
      // Forcer la conformité est contre-productif.
      'style/quotes': 'off',
      'style/semi': 'off',
      'style/comma-dangle': 'off',
      'style/max-len': 'off', // Les définitions cva sont longues par nature.

      // Rationale: Forcer 'import type' sur du code généré a peu de valeur.
      'ts/consistent-type-imports': 'off',

      // Règle existante conservée
      'react-refresh/only-export-components': 'off',
    },
  },
  // 7. Configuration assouplie pour les fichiers de test
  {
    files: ['**/*.test.ts', '**/*.test.tsx', 'tests/**/*'],
    rules: {
      'ts/no-explicit-any': 'off',
      'unused-imports/no-unused-vars': 'off',
      'eslint-comments/require-description': 'off',
    },
  },
)
