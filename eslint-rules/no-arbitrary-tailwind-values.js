/**
 * Custom ESLint rule to detect arbitrary Tailwind CSS values
 * Enforces use of design tokens over arbitrary values like w-[300px]
 */

const ARBITRARY_VALUE_PATTERN = /\[([^\]]+)\]/g;
const ALLOWED_ARBITRARY_VALUES = new Set([
  // Common safe arbitrary values
  '50%', '100%', 'auto', 'inherit', 'initial', 'unset', 'none',
  '1fr', '2fr', '3fr', 'minmax(0,1fr)',
  // Grid patterns
  'repeat(auto-fit,minmax(250px,1fr))',
  'repeat(auto-fill,minmax(200px,1fr))',
  // Safe CSS values
  'currentColor', 'transparent',
  // Viewport units for responsive design
  '100vh', '100vw', '50vh', '50vw',
  // Small utility values
  '1px', '2px', // For borders and dividers
]);

const DESIGN_TOKEN_SUGGESTIONS = {
  // Spacing patterns
  '4px': 'spacing-xs or 1',
  '8px': 'spacing-sm or 2',
  '12px': '3',
  '16px': 'spacing-md or 4',
  '20px': '5',
  '24px': 'spacing-lg or 6',
  '32px': 'spacing-xl or 8',
  '48px': 'spacing-2xl or 12',
  '64px': 'spacing-3xl or 16',
  
  // Font sizes
  '12px': 'text-xs',
  '14px': 'text-sm',
  '16px': 'text-base',
  '18px': 'text-lg',
  '20px': 'text-xl',
  '24px': 'text-2xl',
  '30px': 'text-3xl',
  '36px': 'text-4xl',
  
  // Border radius
  '4px': 'rounded-sm',
  '6px': 'rounded',
  '8px': 'rounded-lg',
  '12px': 'rounded-xl',
  '16px': 'rounded-2xl',
  
  // Z-index values
  '1000': 'z-dropdown or var(--z-dropdown)',
  '1050': 'z-modal or var(--z-modal)',
  '1060': 'z-popover or var(--z-popover)',
  '1070': 'z-tooltip or var(--z-tooltip)'
};

const COLOR_PATTERN = /^#([0-9a-f]{3}){1,2}$|^rgb\(|^rgba\(|^hsl\(|^hsla\(/i;

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow arbitrary Tailwind CSS values in favor of design tokens',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: null,
    schema: [
      {
        type: 'object',
        properties: {
          allowedArbitraryValues: {
            type: 'array',
            items: { type: 'string' }
          },
          strictMode: {
            type: 'boolean',
            default: false
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      arbitraryValue: 'Arbitrary Tailwind value "[{{value}}]" detected. {{suggestion}}',
      arbitraryColor: 'Arbitrary color value "[{{value}}]" detected. Use color tokens like bg-primary, text-foreground, etc.',
      arbitrarySpacing: 'Arbitrary spacing value "[{{value}}]" detected. Use spacing tokens: {{suggestion}}',
      arbitrarySize: 'Arbitrary size value "[{{value}}]" detected. Consider using responsive utilities or design tokens.',
      genericArbitrary: 'Arbitrary value "[{{value}}]" detected. Consider using design tokens from globals.css instead.'
    }
  },

  create(context) {
    const options = context.options[0] || {};
    const allowedArbitraryValues = new Set([
      ...ALLOWED_ARBITRARY_VALUES,
      ...(options.allowedArbitraryValues || [])
    ]);
    const strictMode = options.strictMode || false;

    function analyzeArbitraryValue(value) {
      // Skip allowed values
      if (allowedArbitraryValues.has(value)) {
        return null;
      }

      // Check for colors
      if (COLOR_PATTERN.test(value)) {
        return {
          type: 'color',
          messageId: 'arbitraryColor',
          data: { value }
        };
      }

      // Check for spacing/size values
      const spacingMatch = value.match(/^(\d+(?:\.\d+)?)(px|rem|em)$/);
      if (spacingMatch) {
        const numericValue = spacingMatch[1];
        const unit = spacingMatch[2];
        const suggestion = DESIGN_TOKEN_SUGGESTIONS[value] || 
                          DESIGN_TOKEN_SUGGESTIONS[numericValue + 'px'] ||
                          'appropriate spacing token (1-16, spacing-xs to spacing-3xl)';
        
        return {
          type: 'spacing',
          messageId: 'arbitrarySpacing',
          data: { value, suggestion }
        };
      }

      // Check for percentage or viewport units (often for sizes)
      if (/^\d+(?:\.\d+)?(%|vw|vh|vmin|vmax)$/.test(value)) {
        return {
          type: 'size',
          messageId: 'arbitrarySize',
          data: { value }
        };
      }

      // In strict mode, flag any arbitrary value
      if (strictMode) {
        return {
          type: 'generic',
          messageId: 'genericArbitrary',
          data: { value }
        };
      }

      return null;
    }

    function extractAndAnalyzeClassName(classValue) {
      if (!classValue || typeof classValue !== 'string') return [];
      
      const issues = [];
      let match;
      
      // Reset the regex
      ARBITRARY_VALUE_PATTERN.lastIndex = 0;
      
      while ((match = ARBITRARY_VALUE_PATTERN.exec(classValue)) !== null) {
        const arbitraryValue = match[1];
        const analysis = analyzeArbitraryValue(arbitraryValue);
        
        if (analysis) {
          issues.push(analysis);
        }
      }
      
      return issues;
    }

    return {
      JSXAttribute(node) {
        if (node.name.name === 'className' && node.value) {
          let classValue = '';
          
          if (node.value.type === 'Literal') {
            classValue = node.value.value;
          } else if (node.value.type === 'JSXExpressionContainer') {
            // Handle template literals and other expressions
            if (node.value.expression.type === 'Literal') {
              classValue = node.value.expression.value;
            } else if (node.value.expression.type === 'TemplateLiteral') {
              // For template literals, check each quasi
              node.value.expression.quasis.forEach(quasi => {
                const issues = extractAndAnalyzeClassName(quasi.value.raw);
                issues.forEach(issue => {
                  context.report({
                    node: quasi,
                    messageId: issue.messageId,
                    data: issue.data
                  });
                });
              });
              return;
            }
          }

          const issues = extractAndAnalyzeClassName(classValue);
          issues.forEach(issue => {
            context.report({
              node,
              messageId: issue.messageId,
              data: issue.data
            });
          });
        }
      },

      // Handle function calls like cn(), clsx(), etc.
      CallExpression(node) {
        const functionNames = ['cn', 'clsx', 'classNames', 'cx'];
        if (node.callee.type === 'Identifier' && 
            functionNames.includes(node.callee.name)) {
          
          node.arguments.forEach(arg => {
            if (arg.type === 'Literal' && typeof arg.value === 'string') {
              const issues = extractAndAnalyzeClassName(arg.value);
              issues.forEach(issue => {
                context.report({
                  node: arg,
                  messageId: issue.messageId,
                  data: issue.data
                });
              });
            }
          });
        }
      }
    };
  },
};