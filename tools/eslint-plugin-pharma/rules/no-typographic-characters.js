/**
 * ESLint rule to prevent typographic quotes and apostrophes in content files
 * These characters cause TypeScript parsing errors in content files
 */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow typographic quotes and apostrophes in content files that cause TypeScript syntax errors',
      category: 'Possible Errors',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
  },

  create(context) {
    const filename = context.getFilename()

    // Only check content files
    if (!filename.includes('/content/') || !filename.endsWith('.ts')) {
      return {}
    }

    return {
      Program(node) {
        const sourceCode = context.getSourceCode()
        const text = sourceCode.getText()

        // Check for typographic apostrophes
        const typographicApostrophes = /'/g
        let match
        while ((match = typographicApostrophes.exec(text)) !== null) {
          context.report({
            node,
            loc: sourceCode.getLocFromIndex(match.index),
            message: `Typographic apostrophe "${match[0]}" found. Use regular apostrophe "'" instead to prevent TypeScript syntax errors.`,
            fix(fixer) {
              return fixer.replaceTextRange([match.index, match.index + match[0].length], '\'')
            },
          })
        }

        // Check for typographic quotes
        const typographicQuotes = /"/g
        while ((match = typographicQuotes.exec(text)) !== null) {
          context.report({
            node,
            loc: sourceCode.getLocFromIndex(match.index),
            message: `Typographic quote "${match[0]}" found. Use regular quotes '"' instead to prevent TypeScript syntax errors.`,
            fix(fixer) {
              return fixer.replaceTextRange([match.index, match.index + match[0].length], '"')
            },
          })
        }

        // Check for malformed string endings (comma inside quotes followed by comma)
        const malformedStrings = /\.',',/g
        while ((match = malformedStrings.exec(text)) !== null) {
          context.report({
            node,
            loc: sourceCode.getLocFromIndex(match.index),
            message: `Malformed string ending "${match[0]}" found. Should be ".'," instead.`,
            fix(fixer) {
              return fixer.replaceTextRange([match.index, match.index + match[0].length], '.\',')
            },
          })
        }
      },
    }
  },
}
