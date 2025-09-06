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
 * This processor scans text nodes and replaces glossary terms with DefinedTerm components.
 * Only runs on the client side to avoid SSR issues.
 */
export function AutoGlossaryProcessor({ children }: AutoGlossaryProcessorProps) {
  // Only process on client side to avoid SSR issues
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  // Get all glossary terms sorted by length (longest first) to avoid partial matches
  const glossaryTerms = React.useMemo(() => {
    return Object.keys(glossary).sort((a, b) => b.length - a.length)
  }, [])

  // Create a regex pattern that matches any glossary term (case insensitive)
  const termPattern = React.useMemo(() => {
    if (glossaryTerms.length === 0)
      return null

    // Escape special regex characters and create alternation pattern
    const escapedTerms = glossaryTerms.map(term =>
      term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
    )

    // Create pattern that matches whole words only
    return new RegExp(`\\b(${escapedTerms.join('|')})\\b`, 'gi')
  }, [glossaryTerms])

  const processTextNode = React.useCallback((text: string): React.ReactNode[] => {
    if (!termPattern)
      return [text]

    const parts: React.ReactNode[] = []
    let lastIndex = 0
    let match: RegExpExecArray | null
    let keyCounter = 0

    // Reset regex index
    termPattern.lastIndex = 0

    // eslint-disable-next-line no-cond-assign
    while ((match = termPattern.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        const textPart = text.slice(lastIndex, match.index)
        if (textPart.length > 0) {
          parts.push(<React.Fragment key={`text-${keyCounter++}`}>{textPart}</React.Fragment>)
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
        parts.push(<React.Fragment key={`fallback-${keyCounter++}`}>{matchedTerm}</React.Fragment>)
      }

      lastIndex = termPattern.lastIndex
    }

    // Add remaining text
    if (lastIndex < text.length) {
      const remainingText = text.slice(lastIndex)
      if (remainingText.length > 0) {
        parts.push(<React.Fragment key={`text-${keyCounter++}`}>{remainingText}</React.Fragment>)
      }
    }

    return parts.length > 0 ? parts : [text]
  }, [termPattern])

  const processNode = React.useCallback((node: React.ReactNode, nodeIndex = 0): React.ReactNode => {
    if (typeof node === 'string') {
      return processTextNode(node)
    }

    if (React.isValidElement(node)) {
      // Don't process if it's already a DefinedTerm to avoid double wrapping
      // Check for DefinedTerm by component name or props
      if (node.type === DefinedTerm
        || (typeof node.type === 'function' && node.type.name === 'DefinedTerm')
        || (node.props && typeof node.props === 'object' && node.props !== null
          && 'term' in node.props && 'children' in node.props)) {
        return node
      }

      // Don't process code blocks, links, or other special elements
      if (typeof node.type === 'string' && ['code', 'pre', 'a'].includes(node.type)) {
        return node
      }

      // Process children recursively
      const props = node.props as { children?: React.ReactNode }

      // Use alternatives to React.Children.map for better performance
      const childrenProcessed = Array.isArray(props.children)
        ? props.children.map((child, idx) => processNode(child, idx))
        : props.children
          ? processNode(props.children, 0)
          : undefined

      // Instead of cloneElement, create a new element with the same type and props
      return React.createElement(
        node.type as any,
        {
          ...(node.props as object),
          key: node.key || `processed-${nodeIndex}`,
          children: childrenProcessed,
        },
      )
    }

    return node
  }, [processTextNode])

  // Return unprocessed children during SSR
  if (!isClient) {
    return <>{children}</>
  }

  // Process all children using modern React patterns
  const processedChildren = Array.isArray(children)
    ? children.map((child, idx) => processNode(child, idx))
    : children
      ? processNode(children, 0)
      : undefined

  return <>{processedChildren}</>
}
