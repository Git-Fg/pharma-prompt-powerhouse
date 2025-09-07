// src/components/markdown/MarkdownRenderer.tsx
'use client'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { AutoGlossaryProcessor } from '@/components/shared/AutoGlossaryProcessor'
import { CodeBlock } from '@/components/ui/code-block'
import { cn } from '@/lib/utils'

interface MarkdownRendererProps {
  content: string
  className?: string
  enableAutoGlossary?: boolean
}

/**
 * Renderer sécurisé pour le contenu Markdown utilisant react-markdown.
 * Remplace l'ancien système dangerouslySetInnerHTML par un rendu React sécurisé.
 * Utilise les styles prose centralisés définis dans globals.css.
 * Intègre la détection automatique des termes du glossaire.
 */
export function MarkdownRenderer({ content, className, enableAutoGlossary = true }: MarkdownRendererProps) {
  const markdownContent = (
    <div className={cn('prose', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ ...props }) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />,
          h2: ({ ...props }) => <h2 {...props} />, // Uses centralized .prose h2 styles
          h3: ({ ...props }) => <h3 {...props} />, // Uses centralized .prose h3 styles
          p: ({ ...props }) => <p {...props} />, // Uses centralized .prose p styles
          ul: ({ ...props }) => <ul className="list-disc pl-6 my-4" {...props} />,
          ol: ({ ...props }) => <ol className="list-decimal pl-6 my-4" {...props} />,
          li: ({ ...props }) => <li className="mb-2" {...props} />,
          a: ({ ...props }) => <a {...props} />, // Uses centralized .prose a styles
          code(props) {
            // Handle the complex props from react-markdown for code elements
            // Type-safe props handling for react-markdown code elements
            const { inline, className, children, ...rest } = props as {
              inline?: boolean
              className?: string
              children?: React.ReactNode
            } & Record<string, string | boolean | number | undefined>
            const match = /language-(\w+)/.exec(className || '')

            // More robust children handling for react-markdown
            let codeContent = ''
            if (typeof children === 'string') {
              codeContent = children
            }
            else if (Array.isArray(children)) {
              codeContent = children.join('')
            }
            else if (children && typeof children === 'object') {
              // Handle React elements and other object types safely
              codeContent = String(children)
            }
            else {
              codeContent = String(children || '')
            }

            return !inline && match
              ? (
                  <CodeBlock language={match[1]}>{codeContent.replace(/\n$/, '')}</CodeBlock>
                )
              : (
                  <code {...rest}>
                    {' '}
                    {/* Uses centralized .prose code styles */}
                    {children}
                  </code>
                )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )

  // Wrap with AutoGlossaryProcessor if enabled
  return enableAutoGlossary
    ? (
        <AutoGlossaryProcessor>{markdownContent}</AutoGlossaryProcessor>
      )
    : markdownContent
}
