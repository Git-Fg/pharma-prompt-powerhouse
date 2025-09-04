// eslint.config.js
import antfu from '@antfu/eslint-config'
import nextPlugin from '@next/eslint-plugin-next'
import reactCompilerPlugin from 'eslint-plugin-react-compiler'

export default antfu(
  {
    // Configuration de base
    type: 'app', // 'app' pour les applications

    // Activer TypeScript et React (détecté automatiquement mais explicite)
    typescript: true,
    react: true,

    // Options stylistiques (adaptées aux préférences du projet)
    stylistic: {
      indent: 2, // 2 espaces (standard moderne)
      quotes: 'single', // guillemets simples
      semi: false, // pas de point-virgule (style moderne)
    },

    // Formatters pour CSS et autres
    formatters: {
      css: true,
      html: true,
    },

    // Fichiers à ignorer (spécifique à Next.js)
    ignores: [
      'node_modules/**',
      '.next/**',
      '.content-collections/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'components.json',
      'postcss.config.mjs',
      'tailwind.config.ts',
      '**/*.d.ts',
      'coverage/**',
      'playwright-report/**',
      'test-results/**',
      '**/*.min.js',
      // Exclure les dossiers de documentation qui contiennent du code d'exemple
      'docs/**',
      '**/README.md',
    ],
  },

  // Configuration Next.js spécifique
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      // Règles recommandées Next.js
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,

      // Personnalisation des règles pour le projet
      'next/no-img-element': 'error', // Utiliser next/image
      'next/no-page-custom-font': 'warn', // Avertissement pour les polices custom
      'next/no-async-client-component': 'error', // Pas de composants clients async

      // Règles React importantes
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': 'error',
    },
  },

  // Configuration React Compiler
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-compiler': reactCompilerPlugin,
    },
    rules: {
      'react-compiler/react-compiler': 'error',
    },
  },

  // Configuration pour les fichiers de test
  {
    files: ['**/*.test.ts?(x)', '**/*.spec.ts?(x)'],
    rules: {
      'no-console': 'off', // Autoriser console.log dans les tests
      '@typescript-eslint/no-explicit-any': 'off', // Autoriser any dans les tests
    },
  },

  // Configuration pour les composants UI shadcn
  {
    files: ['src/components/ui/**/*.{ts,tsx}'],
    rules: {
      'react/display-name': 'off',
      'prefer-const': 'warn',
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
    ],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
  },

  // Configuration pour les hooks qui exportent des providers et des hooks
  {
    files: [
      'src/hooks/useConsent.tsx',
      'src/components/ui/navigation-menu.tsx',
      'src/components/ui/sidebar.tsx',
      'src/components/ui/toggle.tsx',
    ],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },

  // Règles globales personnalisées
  {
    rules: {
      // Règles spécifiques au projet
      'no-console': ['warn', { allow: ['warn', 'error'] }], // Autoriser console.warn/error
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Ignorer les variables commençant par _
      'prefer-const': 'error', // Préférer const quand possible
      'no-var': 'error', // Interdire var

      // Désactiver certaines règles d'antfu qui pourraient être trop strictes pour ce projet
      'antfu/no-top-level-await': 'off', // Autoriser top-level await (Next.js App Router)
      'node/prefer-global/process': 'off', // Autoriser process usage (Next.js)

      // Règles React spécifiques
      'react/no-unescaped-entities': 'off', // Autoriser les entités non échappées (conservé de l'ancienne config)
      'react/no-array-index-key': 'warn', // Réduire en warning (très commun dans ce projet)
      'react-hooks-extra/no-direct-set-state-in-use-effect': 'warn', // Réduire en warning
      'react-web-api/no-leaked-event-listener': 'warn', // Réduire en warning
      'react-web-api/no-leaked-timeout': 'warn', // Réduire en warning
      'react-hooks-extra/no-unnecessary-use-prefix': 'warn', // Réduire en warning
      'react-hooks-extra/prefer-use-state-lazy-initialization': 'warn', // Réduire en warning
      'react/no-unstable-context-value': 'warn', // Réduire en warning
      'react-dom/no-missing-button-type': 'warn', // Réduire en warning
      'react-dom/no-dangerously-set-innerhtml': 'warn', // Réduire en warning (utilisé pour le contenu markdown)
      'react/no-context-provider': 'warn', // Réduire en warning (React 19 suggestion)

      // Règles de style moins strictes
      'style/multiline-ternary': 'warn', // Réduire en warning

      // Sécurité
      'no-eval': 'error', // Interdire eval
      'no-implied-eval': 'error', // Interdire eval implicite
    },
  },
)
