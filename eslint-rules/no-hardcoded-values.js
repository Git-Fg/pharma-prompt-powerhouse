/**
 * Custom ESLint rule to detect hardcoded values that should use design tokens
 * This rule helps enforce the centralized design system
 */

const HARDCODED_PATTERNS = {
  // Colors
  colors: /^#([0-9a-f]{3}){1,2}$|^rgb\(|^rgba\(|^hsl\(|^hsla\(/i,
  // Spacing values
  spacing: /^\d+(\.\d+)?(px|rem|em|%)$/,
  // Font sizes
  fontSize: /^\d+(\.\d+)?(px|rem|em)$/,
  // Z-index values (except common safe values)
  zIndex: /^[1-9]\d{2,}$/,
  // Border radius
  borderRadius: /^\d+(\.\d+)?(px|rem|em)$/,
  // Box shadows
  boxShadow: /\d+px.*\d+px/,
  // Timing values
  timing: /^\d+(\.\d+)?(s|ms)$/
};

const ALLOWED_VALUES = new Set([
  '0', '1', '2', '3', '4', '5', // Basic numbers
  'auto', 'inherit', 'initial', 'unset', 'none', 'transparent',
  '100%', '50%', // Common percentages
  '1fr', '2fr', '3fr', // Grid fractions
  'currentColor', 'inherit'
]);

const DESIGN_TOKEN_PATTERNS = {
  spacing: /^var\(--spacing-|^spacing-/,
  colors: /^var\(--color-|^(primary|secondary|accent|muted|destructive|background|foreground|border|input|ring)-/,
  fontSize: /^var\(--text-|^text-/,
  borderRadius: /^var\(--radius-|^rounded-/,
  zIndex: /^var\(--z-/,
  shadow: /^var\(--shadow-|^shadow-/
};

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow hardcoded values that should use design tokens',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: null,
    schema: [
      {
        type: 'object',
        properties: {
          allowedPatterns: {
            type: 'array',
            items: { type: 'string' }
          },
          enforceDesignTokens: {
            type: 'boolean',
            default: true
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      hardcodedValue: 'Hardcoded {{type}} value "{{value}}" detected. Use design tokens from globals.css instead.',
      suggestToken: 'Consider using design token: {{suggestion}}',
      arbitraryValue: 'Arbitrary Tailwind value "{{value}}" detected. Use design tokens or predefined classes instead.',
      inlineStyle: 'Inline style detected. Use Tailwind classes or design tokens instead.'
    }
  },

  create(context) {
    const options = context.options[0] || {};
    const allowedPatterns = options.allowedPatterns || [];
    const enforceDesignTokens = options.enforceDesignTokens !== false;

    function isAllowedValue(value) {
      if (ALLOWED_VALUES.has(value)) return true;
      // Allow CSS custom properties and functions
      if (value.startsWith('var(') || value.startsWith('hsl(') || value.startsWith('oklch(')) return true;
      return allowedPatterns.some(pattern => new RegExp(pattern).test(value));
    }

    function detectHardcodedType(value) {
      if (HARDCODED_PATTERNS.colors.test(value)) return 'color';
      if (HARDCODED_PATTERNS.spacing.test(value)) return 'spacing';
      if (HARDCODED_PATTERNS.fontSize.test(value)) return 'fontSize';
      if (HARDCODED_PATTERNS.zIndex.test(value)) return 'zIndex';
      if (HARDCODED_PATTERNS.borderRadius.test(value)) return 'borderRadius';
      if (HARDCODED_PATTERNS.boxShadow.test(value)) return 'boxShadow';
      if (HARDCODED_PATTERNS.timing.test(value)) return 'timing';
      return null;
    }

    function suggestDesignToken(type, value) {
      switch (type) {
        case 'color':
          return 'var(--color-primary), bg-primary, text-primary, etc.';
        case 'spacing':
          return 'var(--spacing-md), p-4, m-6, etc.';
        case 'fontSize':
          return 'var(--text-lg), text-lg, etc.';
        case 'borderRadius':
          return 'var(--radius-md), rounded-lg, etc.';
        case 'zIndex':
          return 'var(--z-modal), z-50, etc.';
        case 'boxShadow':
          return 'var(--shadow-lg), shadow-lg, etc.';
        case 'timing':
          return 'var(--duration-normal), transition-all, etc.';
        default:
          return 'appropriate design token';
      }
    }

    function checkForArbitraryValues(classValue) {
      // Check for Tailwind arbitrary values like w-[300px], text-[#ff0000]
      const arbitraryPattern = /\[([^\]]+)\]/g;
      let match;
      while ((match = arbitraryPattern.exec(classValue)) !== null) {
        const arbitraryValue = match[1];
        if (!isAllowedValue(arbitraryValue)) {
          const type = detectHardcodedType(arbitraryValue);
          if (type) {
            return {
              value: arbitraryValue,
              type,
              suggestion: suggestDesignToken(type, arbitraryValue)
            };
          }
        }
      }
      return null;
    }

    return {
      // Check JSX style attributes
      JSXAttribute(node) {
        if (node.name.name === 'style' && node.value) {
          context.report({
            node,
            messageId: 'inlineStyle',
          });
        }

        // Check className for arbitrary values
        if (node.name.name === 'className' && node.value) {
          let classValue = '';
          if (node.value.type === 'Literal') {
            classValue = node.value.value;
          } else if (node.value.type === 'JSXExpressionContainer' && 
                     node.value.expression.type === 'Literal') {
            classValue = node.value.expression.value;
          }

          if (classValue && typeof classValue === 'string') {
            const arbitraryCheck = checkForArbitraryValues(classValue);
            if (arbitraryCheck) {
              context.report({
                node,
                messageId: 'arbitraryValue',
                data: {
                  value: arbitraryCheck.value
                }
              });
            }
          }
        }
      },

      // Check object properties in style objects
      Property(node) {
        if (node.value && node.value.type === 'Literal') {
          const value = node.value.value;
          if (typeof value === 'string' && !isAllowedValue(value)) {
            const type = detectHardcodedType(value);
            if (type) {
              context.report({
                node,
                messageId: 'hardcodedValue',
                data: {
                  type,
                  value
                }
              });
            }
          }
        }
      },

      // Check template literals for style values
      TemplateLiteral(node) {
        node.quasis.forEach(quasi => {
          if (quasi.value.raw) {
            // Check if this looks like CSS
            const cssLikePattern = /(\w+):\s*([^;]+)/g;
            let match;
            while ((match = cssLikePattern.exec(quasi.value.raw)) !== null) {
              const value = match[2].trim();
              if (!isAllowedValue(value)) {
                const type = detectHardcodedType(value);
                if (type) {
                  context.report({
                    node: quasi,
                    messageId: 'hardcodedValue',
                    data: {
                      type,
                      value
                    }
                  });
                }
              }
            }
          }
        });
      }
    };
  },
};