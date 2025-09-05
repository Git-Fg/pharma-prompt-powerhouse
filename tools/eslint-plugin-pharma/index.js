// tools/eslint-plugin-pharma/index.js
// Plugin ESLint personnalisé pour le projet Pharma Prompt Powerhouse

'use strict'

const noProhibitedTailwindClasses = require('./rules/no-prohibited-tailwind-classes')

module.exports = {
  rules: {
    'no-prohibited-tailwind-classes': noProhibitedTailwindClasses,
  },
}
