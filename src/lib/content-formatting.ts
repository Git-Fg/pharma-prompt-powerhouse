// src/lib/content-formatting.ts

/**
 * Content Formatting System
 *
 * This module provides semantic content formatting utilities to replace
 * hardcoded markdown formatting with maintainable, type-safe alternatives.
 *
 * Key benefits:
 * - Centralized formatting logic
 * - Type-safe emphasis levels
 * - Consistent visual hierarchy
 * - Easy global style changes
 */

export type EmphasisLevel = 'subtle' | 'moderate' | 'strong' | 'critical'
export type TextRole = 'concept' | 'warning' | 'instruction' | 'definition' | 'result' | 'example'

// =================================================================
// EMPHASIS MAPPING - Semantic emphasis levels
// =================================================================

export const emphasisStyles = {
  subtle: 'font-medium text-foreground/90', // Light emphasis
  moderate: 'font-semibold text-foreground', // Standard bold
  strong: 'font-bold text-primary', // Strong emphasis with color
  critical: 'font-black text-destructive', // Critical warnings
} as const

// =================================================================
// TEXT ROLE STYLING - Contextual text formatting
// =================================================================

export const textRoleStyles = {
  concept: 'font-semibold text-blue-600 dark:text-blue-400',
  warning: 'font-bold text-amber-600 dark:text-amber-400',
  instruction: 'font-semibold text-emerald-600 dark:text-emerald-400',
  definition: 'font-medium text-purple-600 dark:text-purple-400',
  result: 'font-semibold text-green-600 dark:text-green-400',
  example: 'font-medium text-cyan-600 dark:text-cyan-400',
} as const

// =================================================================
// CONTENT REPLACEMENT UTILITIES
// =================================================================

interface TextSegment {
  type: 'text' | 'emphasized'
  content: string
  emphasis?: EmphasisLevel
  role?: TextRole
}

/**
 * Parse markdown-like text into semantic segments
 * Converts **text** into structured emphasis levels
 */
export function parseEmphasisText(text: string, defaultEmphasis: EmphasisLevel = 'moderate'): TextSegment[] {
  const segments: TextSegment[] = []
  const parts = text.split(/(\*\*[^*]+\*\*)/g)

  for (const part of parts) {
    if (part.startsWith('**') && part.endsWith('**')) {
      // Extract emphasized text
      const content = part.slice(2, -2)
      segments.push({
        type: 'emphasized',
        content,
        emphasis: defaultEmphasis,
      })
    }
    else if (part.trim()) {
      // Regular text
      segments.push({
        type: 'text',
        content: part,
      })
    }
  }

  return segments
}

/**
 * Render text segments with proper semantic styling
 */
export function renderTextSegments(segments: TextSegment[]): string {
  return segments
    .map((segment) => {
      if (segment.type === 'emphasized') {
        const emphasisClass = segment.emphasis ? emphasisStyles[segment.emphasis] : ''
        const roleClass = segment.role ? textRoleStyles[segment.role] : ''
        const className = [emphasisClass, roleClass].filter(Boolean).join(' ')
        return `<span class="${className}">${segment.content}</span>`
      }
      return segment.content
    })
    .join('')
}

// =================================================================
// QUICK FORMATTING UTILITIES
// =================================================================

/**
 * Quick emphasis replacement for common patterns
 */
export const formatText = {
  concept: (text: string) => parseEmphasisText(text, 'strong').map(s => ({ ...s, role: 'concept' as TextRole })),
  warning: (text: string) => parseEmphasisText(text, 'critical').map(s => ({ ...s, role: 'warning' as TextRole })),
  instruction: (text: string) => parseEmphasisText(text, 'moderate').map(s => ({ ...s, role: 'instruction' as TextRole })),
  definition: (text: string) => parseEmphasisText(text, 'moderate').map(s => ({ ...s, role: 'definition' as TextRole })),
  result: (text: string) => parseEmphasisText(text, 'strong').map(s => ({ ...s, role: 'result' as TextRole })),
  example: (text: string) => parseEmphasisText(text, 'subtle').map(s => ({ ...s, role: 'example' as TextRole })),
}

// =================================================================
// COMMON CONTENT PATTERNS
// =================================================================

export const contentPatterns = {
  // Frequently used bold terms that should be semantic
  keyTerms: [
    { pattern: /\*\*(Règle absolue|INTERDIT|JAMAIS|OBLIGATOIRE)\*\*/g, role: 'warning' as TextRole },
    { pattern: /\*\*(Exemple|Par exemple|Cas concret)\*\*/g, role: 'example' as TextRole },
    { pattern: /\*\*(Définition|Qu'est-ce que|C'est quoi)\*\*/g, role: 'definition' as TextRole },
    { pattern: /\*\*(Résultat|Conclusion|Important)\*\*/g, role: 'result' as TextRole },
    { pattern: /\*\*(Concept|Notion|Principe)\*\*/g, role: 'concept' as TextRole },
  ],

  // Pharmaceutical/Medical specific patterns
  pharmacyTerms: [
    { pattern: /\*\*(DCI|Princeps|Générique|Posologie|AMM)\*\*/g, role: 'concept' as TextRole },
    { pattern: /\*\*(Contre-indication|Effet indésirable|Précaution)\*\*/g, role: 'warning' as TextRole },
    { pattern: /\*\*(Protocole|Procédure|Étapes)\*\*/g, role: 'instruction' as TextRole },
  ],
}

/**
 * Apply semantic patterns to text content
 */
export function applySemantitPatterns(text: string): string {
  let processedText = text

  // Apply general patterns
  contentPatterns.keyTerms.forEach(({ pattern, role }) => {
    processedText = processedText.replace(pattern, (match, term) => {
      const className = textRoleStyles[role]
      return `<span class="${className}">${term}</span>`
    })
  })

  // Apply pharmacy-specific patterns
  contentPatterns.pharmacyTerms.forEach(({ pattern, role }) => {
    processedText = processedText.replace(pattern, (match, term) => {
      const className = textRoleStyles[role]
      return `<span class="${className}">${term}</span>`
    })
  })

  return processedText
}

// =================================================================
// MIGRATION HELPERS
// =================================================================

/**
 * Helper to identify content files that need semantic formatting updates
 */
export function analyzeContentFormatting(content: string) {
  const boldMatches = content.match(/\*\*[^*]+\*\*/g) || []
  const patterns = {
    warnings: boldMatches.filter(match =>
      /INTERDIT|JAMAIS|OBLIGATOIRE|ATTENTION|DANGER/i.test(match),
    ),
    concepts: boldMatches.filter(match =>
      /concept|définition|principe|notion/i.test(match),
    ),
    examples: boldMatches.filter(match =>
      /exemple|cas|illustration/i.test(match),
    ),
    instructions: boldMatches.filter(match =>
      /étape|procédure|méthode|comment/i.test(match),
    ),
    general: boldMatches.filter(match =>
      !/INTERDIT|JAMAIS|concept|exemple|étape/i.test(match),
    ),
  }

  return {
    totalBoldTerms: boldMatches.length,
    patterns,
    suggestedMigrations: {
      warnings: patterns.warnings.length,
      concepts: patterns.concepts.length,
      examples: patterns.examples.length,
      instructions: patterns.instructions.length,
      needsManualReview: patterns.general.length,
    },
  }
}
