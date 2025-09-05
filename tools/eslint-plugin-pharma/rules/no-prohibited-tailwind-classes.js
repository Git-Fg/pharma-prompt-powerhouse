// tools/eslint-plugin-pharma/rules/no-prohibited-tailwind-classes.js
// Règle ESLint personnalisée pour interdire les classes max-w-* problématiques

'use strict'

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Interdit l\'utilisation de classes Tailwind problématiques à cause du bug Tailwind v4',
      category: 'Possible Errors',
      recommended: true,
    },
    messages: {
      forbiddenClass: 'Utilisation interdite de la classe Tailwind \"{{className}}\" à cause du bug Tailwind v4. Utilisez plutôt les utilitaires sémantiques : footer-description-width, text-content-width, dialog-content-width, ou offline-container-width.',
    },
    schema: [], // Aucune option
  },
  create(context) {
    // Pattern pour détecter les classes max-w-* interdites
    const prohibitedPattern = /\bmax-w-(xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|full|screen|none|min|max|\[.*?\])\b/

    return {
      JSXAttribute(node) {
        // Vérifier les attributs className et class
        if (node.name.name === 'className' || node.name.name === 'class') {
          // Vérifier si la valeur est une chaîne littérale
          if (node.value && node.value.type === 'Literal' && typeof node.value.value === 'string') {
            const classValue = node.value.value
            const match = classValue.match(prohibitedPattern)

            if (match) {
              context.report({
                node,
                messageId: 'forbiddenClass',
                data: {
                  className: match[0],
                },
              })
            }
          }
        }
      },
    }
  },
}
