// @ts-check
import antfu from '@antfu/eslint-config'
import reactCompilerPlugin from 'eslint-plugin-react-compiler'

export default antfu(
  {
    // Configuration de base antfu avec TypeScript et React
    typescript: true,
    react: true,
    formatters: {
      css: true,
      html: true,
      markdown: 'prettier', // Use prettier for markdown
    },

    // Fichiers à ignorer
    ignores: [
      'node_modules/**',
      '.next/**',
      '.content-collections/**',
      'out/**',
      'build/**',
      'components.json',
      'postcss.config.mjs',
      'tailwind.config.ts',
      '**/*.d.ts',
      'coverage/**',
      'playwright-report/**',
      'test-results/**',
      '**/*.min.js',
      'next-env.d.ts',
      // Documentation files that contain code examples
      'docs/**/*.md',
      '**/README.md',
      '.github/**',
    ],
  },

  // Configuration spécifique React Compiler
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-compiler': reactCompilerPlugin,
    },
    rules: {
      'react-compiler/react-compiler': 'error',
    },
  },

  // Configuration pour les composants UI shadcn
  {
    files: ['src/components/ui/**/*.{ts,tsx}'],
    rules: {
      'react/display-name': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },

  // Configuration pour les fichiers de configuration et scripts
  {
    files: [
      '**/*.config.{js,mjs,ts}',
      '**/*.config.*.{js,mjs,ts}',
      'scripts/**/*',
      'server.ts',
      'content-collections.ts',
      'src/lib/env.ts',
    ],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      'node/prefer-global/process': 'off',
    },
  },

  // Configuration pour les tests
  {
    files: ['tests/**/*', '**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    rules: {
      'react-hooks-extra/no-unnecessary-use-prefix': 'off',
      'test/prefer-lowercase-title': 'off',
      'no-restricted-globals': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // Configuration pour les PWA et hooks qui utilisent des patterns spéciaux
  {
    files: [
      'src/components/pwa/**/*.{ts,tsx}',
      'src/hooks/**/*.{ts,tsx}',
      'src/lib/content-schema.ts',
    ],
    rules: {
      'node/prefer-global/process': 'off',
      'no-console': 'warn',
      'react-hooks-extra/no-direct-set-state-in-use-effect': 'warn',
      'react-web-api/no-leaked-event-listener': 'warn',
      'react-web-api/no-leaked-timeout': 'warn',
      'react/no-unstable-context-value': 'warn',
      'react-refresh/only-export-components': 'warn',
      'react-hooks-extra/prefer-use-state-lazy-initialization': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      'ts/no-explicit-any': 'warn',
    },
  },

  // Règles globales personnalisées
  {
    rules: {
      // Maintenir la compatibilité avec les entités non échappées de React
      'react/no-unescaped-entities': 'off',

      // Configuration optimisée pour les variables non utilisées
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      // Style antfu mais adapté au projet
      'style/max-statements-per-line': 'off',
      'curly': ['error', 'multi-line', 'consistent'],

      // Relaxer certaines règles de perfectionist pour le projet
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
          newlinesBetween: 'ignore',
        },
      ],

      // Désactiver les règles JSON trop strictes
      'jsonc/sort-keys': 'off',
      
      // Permettre l'utilisation des index de tableau comme clés dans certains cas
      'react/no-array-index-key': 'warn',
      
      // Permettre des ternaires simples sur une ligne
      'style/multiline-ternary': ['error', 'always-multiline'],
      
      // Permettre certaines définitions avant usage pour les schémas Zod
      'ts/no-use-before-define': ['error', { functions: false, variables: false }],
    },
  },
)
