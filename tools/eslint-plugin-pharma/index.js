// tools/eslint-plugin-pharma/index.js
// Plugin ESLint personnalisé pour le projet Pharma Prompt Powerhouse

'use strict'

const noProhibitedTailwindClasses = require('./rules/no-prohibited-tailwind-classes')
const noTailwindV4Workaround = require('./rules/no-tailwind-v4-workaround')
const noTypographicCharacters = require('./rules/no-typographic-characters')

module.exports = {
  rules: {
    'no-prohibited-tailwind-classes': noProhibitedTailwindClasses,
    'no-typographic-characters': noTypographicCharacters,
    'no-tailwind-v4-workaround': noTailwindV4Workaround,
  },
}
