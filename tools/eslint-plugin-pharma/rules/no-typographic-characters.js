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
        for (const apostropheMatch of text.matchAll(typographicApostrophes)) {
          context.report({
            node,
            loc: sourceCode.getLocFromIndex(apostropheMatch.index),
            message: `Typographic apostrophe "${apostropheMatch[0]}" found. Use regular apostrophe "'" instead to prevent TypeScript syntax errors.`,
          })
        }

        // Check for typographic quotes
        const typographicQuotes = /"/g
        for (const quoteMatch of text.matchAll(typographicQuotes)) {
          context.report({
            node,
            loc: sourceCode.getLocFromIndex(quoteMatch.index),
            message: `Typographic quote "${quoteMatch[0]}" found. Use regular quotes '"' instead to prevent TypeScript syntax errors.`,
          })
        }

        // Check for malformed string endings (comma inside quotes followed by comma)
        const malformedStrings = /\.',',/g
        for (const malformedMatch of text.matchAll(malformedStrings)) {
          context.report({
            node,
            loc: sourceCode.getLocFromIndex(malformedMatch.index),
            message: `Malformed string ending "${malformedMatch[0]}" found. Should be ".'," instead.`,
          })
        }
      },
    }
  },
}
