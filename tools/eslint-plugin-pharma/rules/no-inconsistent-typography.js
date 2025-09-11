// tools/eslint-plugin-pharma/rules/no-inconsistent-typography.js
// Règle ESLint pour détecter et empêcher la typographie incohérente

'use strict'

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Détecte et empêche la typographie incohérente pour éviter des problèmes comme le slogan trop grand',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      inconsistentTypography: 'Typographie incohérente détectée: "{{issue}}". Utilisez les classes sémantiques du design system.',
      useSemanticClasses: 'Utilisez les classes sémantiques (prose-*) plutôt que les classes Tailwind directes pour la typographie.',
      sloganSizeWarning: 'Taille de texte potentielle problématique: "{{size}}". Vérifiez que cela correspond aux guidelines du design system.',
      mixedTypographyClasses: 'Mix de classes de typographie détecté: "{{classes}}". Utilisez une seule classe sémantique.',
    },
  },

  create(context) {
    // Classes sémantiques autorisées pour la typographie
    const semanticClasses = [
      'prose-title',
      'prose-slogan',
      'prose-heading',
      'prose-body',
      'prose-description',
      'prose-caption',
      'prose-lead',
      'prose-muted',
    ]

    // Classes Tailwind à surveiller (utiliser les classes sémantiques quand possible)
    const problematicTypographyClasses = [
      'text-xl',
      'text-2xl',
      'text-3xl',
      'text-4xl',
    ]

    function checkTypographyClass(className, node) {
      // Vérifier si des classes problématiques sont utilisées sans classes sémantiques
      const hasProblematicClasses = problematicTypographyClasses.some(cls =>
        className.includes(cls),
      )

      const hasSemanticClasses = semanticClasses.some(cls =>
        className.includes(cls),
      )

      // Alerte pour les grandes tailles sans classe sémantique
      if (hasProblematicClasses && !hasSemanticClasses) {
        if (className.includes('text-xl')) {
          context.report({
            node,
            messageId: 'sloganSizeWarning',
            data: { size: 'text-xl' },
          })
        }
        else {
          context.report({
            node,
            messageId: 'useSemanticClasses',
          })
        }
      }
    }

    return {
      // Vérifier les className dans JSX
      JSXAttribute(node) {
        if (node.name.name === 'className' && node.value && node.value.type === 'Literal') {
          const className = node.value.value
          checkTypographyClass(className, node.value)
        }
      },

      // Vérifier les templates avec className
      TemplateLiteral(node) {
        if (node.parent && node.parent.type === 'JSXAttribute' && node.parent.name.name === 'className') {
          const templateText = node.quasis.map(q => q.value.raw).join('')
          checkTypographyClass(templateText, node)
        }
      },

      // Vérifier les appels à className ou classnames
      CallExpression(node) {
        if (
          (node.callee.name === 'className' || node.callee.name === 'classnames')
          && node.arguments.length > 0
        ) {
          node.arguments.forEach((arg) => {
            if (arg.type === 'Literal' && typeof arg.value === 'string') {
              checkTypographyClass(arg.value, arg)
            }
          })
        }
      },
    }
  },
}
