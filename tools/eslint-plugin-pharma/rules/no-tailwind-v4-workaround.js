// tools/eslint-plugin-pharma/rules/no-tailwind-v4-workaround.js
// Règle ESLint personnalisée pour empêcher la modification du @theme inline avec le workaround officiel

'use strict'

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Interdit la modification du @theme inline avec le workaround officiel Tailwind v4',
      category: 'Possible Errors',
      recommended: true,
    },
    messages: {
      forbiddenThemeModification: 'Modification interdite du @theme inline avec le workaround officiel Tailwind v4. Utilisez plutôt des utilitaires sémantiques avec valeurs directes comme prose-description (max-width: 42rem) pour contourner le bug.',
    },
    schema: [], // Aucune option
  },
  create(context) {
    // Pattern pour détecter les modifications du @theme inline avec le workaround
    const themeWorkaroundPatterns = [
      /--container-(3xs|2xs|xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl|prose|screen-sm|screen-md|screen-lg|screen-xl|screen-2xl)/,
      /--max-w-(3xs|2xs|xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl|prose|screen-sm|screen-md|screen-lg|screen-xl|screen-2xl)/,
      /--container-(1-2|1-3|2-3|1-4|3-4|1-5|2-5|3-5|4-5|1-6|5-6)/,
      /max-width:\s*var\(--container-/,
    ]

    return {
      // Vérifier les fichiers CSS
      Program(node) {
        const filename = context.getFilename()
        if (filename.endsWith('.css') || filename.endsWith('.scss')) {
          const sourceCode = context.getSourceCode()
          const text = sourceCode.getText()

          // Vérifier si on est dans une section @theme
          const themeMatch = text.match(/@theme\s*\{[^}]*\}/)
          if (themeMatch) {
            const themeContent = themeMatch[0]

            // Vérifier chaque pattern interdit
            for (const pattern of themeWorkaroundPatterns) {
              if (pattern.test(themeContent)) {
                context.report({
                  node,
                  messageId: 'forbiddenThemeModification',
                })
                break
              }
            }
          }
        }
      },
    }
  },
}
