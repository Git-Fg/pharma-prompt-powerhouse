// tools/eslint-plugin-pharma/rules/no-hardcoded-values.js
// Règle ESLint pour détecter et empêcher les valeurs codées en dur dans les styles

'use strict'

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Empêche l\'utilisation de valeurs codées en dur dans les styles',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      hardcodedStyle: 'Valeur codée en dur détectée: "{{value}}". Utilisez les tokens du design system à la place.',
      hardcodedSize: 'Taille codée en dur détectée: "{{value}}". Utilisez designTokens.spacing.* ou designTokens.typography.fontSize.* à la place.',
      hardcodedColor: 'Couleur codée en dur détectée: "{{value}}". Utilisez designTokens.color.* à la place.',
      hardcodedSpacing: 'Espacement codé en dur détecté: "{{value}}". Utilisez designTokens.spacing.* à la place.',
      hardcodedRadius: 'Rayon codé en dur détecté: "{{value}}". Utilisez designTokens.radius.* à la place.',
    },
  },

  create(context) {
    // Patterns pour détecter les valeurs codées en dur
    const hardcodedPatterns = {
      // Tailles en pixels
      pixelSize: /\b([048]|12|16|20|24|32|40|48|56|64)px\b/,
      // Tailles en rem
      remSize: /\b(0\.25|0\.5|0\.75|[1-4]|1\.25|1\.5|2\.5)rem\b/,
      // Couleurs hexadécimales
      hexColor: /#[0-9a-f]{3,8}\b/i,
      // Couleurs rgb/rgba
      rgbColor: /rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(?:\s*,\s*[\d.]+\s*)?\)/,
      // Espacement numérique
      numericSpacing: /\b(margin|padding):\s*([048]|12|16|20|24|32|40|48|56|64)px\b/,
      // Rayons de bordure
      borderRadius: /\b(border-radius):\s*([048]|12|16|24|32)px\b/,
    }

    // Fonction pour vérifier si un texte correspond à un pattern codé en dur
    function isHardcodedValue(text) {
      return Object.values(hardcodedPatterns).some(pattern => pattern.test(text))
    }

    // Fonction pour déterminer le type de valeur codée en dur
    function getHardcodedType(text) {
      if (hardcodedPatterns.pixelSize.test(text) || hardcodedPatterns.remSize.test(text)) {
        return 'size'
      }
      if (hardcodedPatterns.hexColor.test(text) || hardcodedPatterns.rgbColor.test(text)) {
        return 'color'
      }
      if (hardcodedPatterns.numericSpacing.test(text)) {
        return 'spacing'
      }
      if (hardcodedPatterns.borderRadius.test(text)) {
        return 'radius'
      }
      return 'style'
    }

    return {
      // Vérifier les attributs style dans JSX
      JSXAttribute(node) {
        if (node.name.name === 'style' && node.value && node.value.type === 'JSXExpressionContainer') {
          const styleText = context.getSourceCode().getText(node.value.expression)

          if (isHardcodedValue(styleText)) {
            const type = getHardcodedType(styleText)
            context.report({
              node: node.value,
              messageId: `hardcoded${type.charAt(0).toUpperCase() + type.slice(1)}`,
              data: { value: styleText },
            })
          }
        }
      },

      // Vérifier les styles dans les template literals
      TemplateElement(node) {
        if (node.value && isHardcodedValue(node.value.raw)) {
          const type = getHardcodedType(node.value.raw)
          context.report({
            node,
            messageId: `hardcoded${type.charAt(0).toUpperCase() + type.slice(1)}`,
            data: { value: node.value.raw },
          })
        }
      },

      // Vérifier les propriétés d'objet dans styled components ou variants
      Property(node) {
        if (node.value && node.value.type === 'Literal' && isHardcodedValue(node.value.value)) {
          const type = getHardcodedType(node.value.value)
          context.report({
            node: node.value,
            messageId: `hardcoded${type.charAt(0).toUpperCase() + type.slice(1)}`,
            data: { value: node.value.value },
          })
        }
      },
    }
  },
}
