// eslint.config.js
import antfu from '@antfu/eslint-config'
import nextPlugin from '@next/eslint-plugin-next'
import reactCompilerPlugin from 'eslint-plugin-react-compiler'

export default antfu(
  {
    // Configuration de base
    react: true,
    typescript: true,
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
    // Override for specific project needs
    rules: {
      'react/no-unescaped-entities': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'antfu/no-top-level-await': 'off',
      'node/prefer-global/process': 'off',
    },
  },
)
