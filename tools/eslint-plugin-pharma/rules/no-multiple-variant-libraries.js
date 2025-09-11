// tools/eslint-plugin-pharma/rules/no-multiple-variant-libraries.js
// Règle ESLint pour empêcher l'utilisation de multiples librairies de variants

'use strict'

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Empêche l\'utilisation de multiples librairies de variants dans le même projet',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      multipleVariantLibraries: 'Utilisation de "{{library}}" détectée. Utilisez uniquement "tailwind-variants" pour la cohérence du projet.',
      preferTailwindVariants: 'Préférez "tailwind-variants" (tv) à "{{library}}" pour maintenir la cohérence du design system.',
    },
  },

  create(context) {
    // Librairies de variants non autorisées
    const prohibitedLibraries = [
      { name: 'class-variance-authority', importName: 'cva' },
      { name: 'styled-components', importName: 'styled' },
      { name: '@emotion/styled', importName: 'styled' },
      { name: 'goober', importName: 'styled' },
    ]

    // Fonction pour vérifier si un import correspond à une librairie prohibée
    function isProhibitedLibrary(importSource) {
      return prohibitedLibraries.some(lib => importSource === lib.name)
    }

    return {
      // Vérifier les imports
      ImportDeclaration(node) {
        const importSource = node.source.value

        if (isProhibitedLibrary(importSource)) {
          context.report({
            node: node.source,
            messageId: 'multipleVariantLibraries',
            data: { library: importSource },
          })
        }
      },

      // Vérifier les appels de fonction
      CallExpression(node) {
        if (node.callee.type === 'Identifier') {
          const functionName = node.callee.name

          // Vérifier si la fonction correspond à une import prohibée
          prohibitedLibraries.forEach((lib) => {
            if (functionName === lib.importName) {
              context.report({
                node: node.callee,
                messageId: 'preferTailwindVariants',
                data: { library: lib.name },
              })
            }
          })
        }
      },

      // Vérifier les tagged template literals
      TaggedTemplateExpression(node) {
        if (node.tag.type === 'Identifier') {
          const tagName = node.tag.name

          prohibitedLibraries.forEach((lib) => {
            if (tagName === lib.importName) {
              context.report({
                node: node.tag,
                messageId: 'preferTailwindVariants',
                data: { library: lib.name },
              })
            }
          })
        }
      },
    }
  },
}
