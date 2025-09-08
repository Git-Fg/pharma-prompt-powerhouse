// src/components/shared/AutoGlossaryProcessor.tsx
'use client'

import React from 'react'
import { glossary } from '@/content/glossary'
import { DefinedTerm } from './DefinedTerm'

interface AutoGlossaryProcessorProps {
  children: React.ReactNode
}

/**
 * Component that automatically detects and wraps glossary terms in text content.
 * This processor only processes direct text children and avoids complex React element manipulation.
 */
export function AutoGlossaryProcessor({ children }: AutoGlossaryProcessorProps) {
  // Only process on client side to avoid SSR issues
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    // Add a small delay to ensure DOM is fully hydrated
    const timer = setTimeout(() => setIsClient(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // For tests or when explicitly needed, enable processing immediately
  const shouldProcess = isClient || (typeof process !== 'undefined' && process.env.NODE_ENV === 'test')

  // Get all glossary terms sorted by length (longest first) to avoid partial matches
  const glossaryTerms = Object.keys(glossary).sort((a, b) => b.length - a.length)

  // Create a regex pattern that matches any glossary term (case insensitive)
  const termPattern = React.useMemo(() => {
    if (glossaryTerms.length === 0)
      return null

    // Escape special regex characters and create alternation pattern
    const escapedTerms = glossaryTerms.map(term =>
      term.replace(/[.*+?^${}()|[\\]\\\\\]/g, '\\\\$&'),
    )

    // Create pattern that matches whole words only
    return new RegExp(`\\\\b(${escapedTerms.join('|')})\\\\b`, 'gi')
  }, [glossaryTerms])

  // Process text content by replacing glossary terms with DefinedTerm components
  const processTextContent = React.useCallback((text: string): React.ReactNode => {
    if (!termPattern)
      return text

    const parts: React.ReactNode[] = []
    let lastIndex = 0
    let match: RegExpExecArray | null
    let keyCounter = 0

    // Reset regex index
    termPattern.lastIndex = 0

    // eslint-disable-next-line no-cond-assign -- Boucle de recherche de termes avec assignation conditionnelle
    while ((match = termPattern.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        const textPart = text.slice(lastIndex, match.index)
        if (textPart.length > 0) {
          parts.push(textPart)
        }
      }

      // Add the glossary term wrapped in DefinedTerm
      const matchedTerm = match[1]
      if (!matchedTerm)
        continue

      const termKey = matchedTerm.toLowerCase()

      if (glossary[termKey]) {
        parts.push(
          <DefinedTerm
            key={`${termKey}-${match.index}-${keyCounter++}`}
            term={termKey}
            variant="inline"
          >
            {matchedTerm}
          </DefinedTerm>,
        )
      }
      else {
        // Fallback if term not found (shouldn't happen)
        parts.push(matchedTerm)
      }

      lastIndex = termPattern.lastIndex
    }

    // Add remaining text
    if (lastIndex < text.length) {
      const remainingText = text.slice(lastIndex)
      if (remainingText.length > 0) {
        parts.push(remainingText)
      }
    }

    return parts.length > 1 ? parts : text
  }, [termPattern])

  // Process children - only handle simple cases to avoid complex React element manipulation
  const processedChildren = React.useMemo(() => {
    if (!shouldProcess)
      return children

    if (!children)
      return undefined

    // Only process direct string children or simple arrays
    if (typeof children === 'string') {
      return processTextContent(children)
    }

    if (Array.isArray(children)) {
      // Process each child in the array
      return children.map((child, _index) => {
        if (typeof child === 'string') {
          return processTextContent(child)
        }
        return child
      })
    }

    // For complex React elements, don't process to avoid issues
    return children
  }, [children, shouldProcess, processTextContent])

  return <>{processedChildren}</>
}
