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
    return new RegExp(`\\b(${escapedTerms.join('|')})\\b`, 'gi')
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

  // Process children - recursively process text content within React elements
  const processedChildren = React.useMemo(() => {
    if (!children)
      return undefined

    let uniqueCounter = 0

    // Helper function to process React elements recursively
    const processElement = (element: React.ReactNode): React.ReactNode => {
      if (typeof element === 'string') {
        return processTextContent(element)
      }

      if (Array.isArray(element)) {
        return element.map((child) => {
          const processed = processElement(child)
          // Use stable unique key instead of array index
          const uniqueKey = `auto-glossary-${++uniqueCounter}`
          if (React.isValidElement(processed)) {
            // eslint-disable-next-line react/no-clone-element -- Required for preserving element structure while processing glossary terms
            return React.cloneElement(processed, { key: uniqueKey })
          }
          return processed
        })
      }

      if (React.isValidElement(element)) {
        const { children: elementChildren, ...props } = element.props as { children?: React.ReactNode }

        // Skip processing for code elements
        if (element.type === 'code') {
          return element
        }

        // Process children recursively
        const processedChildren = processElement(elementChildren)

        // eslint-disable-next-line react/no-clone-element -- Required for preserving element structure while processing glossary terms
        return React.cloneElement(
          element,
          { ...props, key: `auto-glossary-element-${++uniqueCounter}` },
          processedChildren,
        )
      }

      return element
    }

    return processElement(children)
  }, [children, processTextContent])

  return <>{processedChildren}</>
}
