// tools/eslint-plugin-pharma/index.js
// Plugin ESLint personnalisé pour le projet Pharma Prompt Powerhouse

'use strict'

const noHardcodedValues = require('./rules/no-hardcoded-values')
const noInconsistentTypography = require('./rules/no-inconsistent-typography')
const noMultipleVariantLibraries = require('./rules/no-multiple-variant-libraries')
const noProhibitedTailwindClasses = require('./rules/no-prohibited-tailwind-classes')
const noTailwindV4Workaround = require('./rules/no-tailwind-v4-workaround')
const noTypographicCharacters = require('./rules/no-typographic-characters')
const preferDesignSystemTokens = require('./rules/prefer-design-system-tokens')

module.exports = {
  rules: {
    'no-prohibited-tailwind-classes': noProhibitedTailwindClasses,
    'no-typographic-characters': noTypographicCharacters,
    'no-tailwind-v4-workaround': noTailwindV4Workaround,
    'no-hardcoded-values': noHardcodedValues,
    'prefer-design-system-tokens': preferDesignSystemTokens,
    'no-multiple-variant-libraries': noMultipleVariantLibraries,
    'no-inconsistent-typography': noInconsistentTypography,
  },
}
