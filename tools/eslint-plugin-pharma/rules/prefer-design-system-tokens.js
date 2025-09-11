// tools/eslint-plugin-pharma/rules/prefer-design-system-tokens.js
// Règle ESLint pour encourager l'utilisation des tokens du design system

'use strict'

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Encourage l\'utilisation des tokens du design system plutôt que les classes Tailwind directes',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      preferTokens: 'Préférez utiliser les tokens du design system (designTokens.*) plutôt que les classes Tailwind directes pour "{{className}}".',
      useDesignSystemImport: 'Importez les tokens depuis "@/design-system/tokens" pour une meilleure maintenabilité.',
    },
  },

  create(context) {
    // Classes Tailwind qui devraient utiliser des tokens
    const tokenPreferableClasses = [
      // Espacement
      'p-4',
      'p-6',
      'p-8',
      'px-4',
      'px-6',
      'py-4',
      'py-6',
      'm-4',
      'm-6',
      'm-8',
      'mx-4',
      'mx-6',
      'my-4',
      'my-6',
      'space-x-4',
      'space-y-4',
      'space-x-6',
      'space-y-6',

      // Tailles de police
      'text-xs',
      'text-sm',
      'text-base',
      'text-lg',
      'text-xl',

      // Bordures
      'rounded',
      'rounded-md',
      'rounded-lg',
      'rounded-xl',

      // Couleurs sémantiques
      'text-primary',
      'text-secondary',
      'text-destructive',
      'bg-primary',
      'bg-secondary',
      'bg-destructive',
      'border-primary',
      'border-secondary',
      'border-destructive',
    ]

    return {
      // Vérifier les className dans JSX
      JSXAttribute(node) {
        if (node.name.name === 'className' && node.value && node.value.type === 'Literal') {
          const className = node.value.value

          // Vérifier si des classes problématiques sont présentes
          const problematicClasses = tokenPreferableClasses.filter(cls =>
            className.includes(cls),
          )

          if (problematicClasses.length > 0) {
            context.report({
              node: node.value,
              messageId: 'preferTokens',
              data: { className: problematicClasses.join(', ') },
            })
          }
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
              const problematicClasses = tokenPreferableClasses.filter(cls =>
                arg.value.includes(cls),
              )

              if (problematicClasses.length > 0) {
                context.report({
                  node: arg,
                  messageId: 'preferTokens',
                  data: { className: problematicClasses.join(', ') },
                })
              }
            }
          })
        }
      },

      // Vérifier les templates avec className
      TemplateLiteral(node) {
        if (node.parent && node.parent.type === 'JSXAttribute' && node.parent.name.name === 'className') {
          const templateText = node.quasis.map(q => q.value.raw).join('')

          const problematicClasses = tokenPreferableClasses.filter(cls =>
            templateText.includes(cls),
          )

          if (problematicClasses.length > 0) {
            context.report({
              node,
              messageId: 'preferTokens',
              data: { className: problematicClasses.join(', ') },
            })
          }
        }
      },
    }
  },
}
