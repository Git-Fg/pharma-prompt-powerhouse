// src/components/markdown/MarkdownRenderer.tsx
'use client'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { DefinedTerm } from '@/components/shared/DefinedTerm'
import { CodeBlock } from '@/components/ui/code-block'
import { parseTextWithGlossaryTerms } from '@/lib/glossary-detection'
import { cn } from '@/lib/utils'

interface MarkdownRendererProps {
  content: string
  className?: string
  enableGlossaryDetection?: boolean
}

/**
 * Composant pour rendre du texte avec détection automatique du glossaire
 */
function TextWithGlossary({ children }: { children: string }) {
  const parsedContent = parseTextWithGlossaryTerms(children)

  return (
    <>
      {parsedContent.map((segment, index) => {
        if (segment.type === 'glossary' && segment.glossaryKey) {
          return (
            <DefinedTerm
              key={`glossary-${segment.glossaryKey}-${index}`}
              term={segment.glossaryKey}
              variant="inline"
              showIcon={true}
            >
              {segment.content}
            </DefinedTerm>
          )
        }
        return segment.content
      })}
    </>
  )
}

/**
 * Renderer sécurisé pour le contenu Markdown utilisant react-markdown.
 * Remplace l'ancien système dangerouslySetInnerHTML par un rendu React sécurisé.
 * Utilise les styles prose centralisés définis dans globals.css.
 * Inclut maintenant la détection automatique des termes du glossaire.
 */
export function MarkdownRenderer({
  content,
  className,
  enableGlossaryDetection = true,
}: MarkdownRendererProps) {
  return (
    <div className={cn('prose', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ ...props }) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />,
          h2: ({ ...props }) => <h2 {...props} />, // Uses centralized .prose h2 styles
          h3: ({ ...props }) => <h3 {...props} />, // Uses centralized .prose h3 styles
          p: ({ children, ...props }) => (
            <p {...props}>
              {enableGlossaryDetection && typeof children === 'string'
                ? <TextWithGlossary>{children}</TextWithGlossary>
                : children}
            </p>
          ),
          // Appliquer aussi la détection aux éléments de liste
          li: ({ children, ...props }) => (
            <li className="mb-2" {...props}>
              {enableGlossaryDetection && typeof children === 'string'
                ? <TextWithGlossary>{children}</TextWithGlossary>
                : children}
            </li>
          ),
          // Et aux liens/texte dans les tableaux
          td: ({ children, ...props }) => (
            <td {...props}>
              {enableGlossaryDetection && typeof children === 'string'
                ? <TextWithGlossary>{children}</TextWithGlossary>
                : children}
            </td>
          ),
          ul: ({ ...props }) => <ul className="list-disc pl-6 my-4" {...props} />,
          ol: ({ ...props }) => <ol className="list-decimal pl-6 my-4" {...props} />,
          a: ({ ...props }) => <a {...props} />, // Uses centralized .prose a styles
          code(props) {
            // Handle the complex props from react-markdown for code elements
            const { inline, className, children, ...rest } = props as {
              inline?: boolean
              className?: string
              children?: React.ReactNode
              [key: string]: unknown
            }
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match
              ? (
                  <CodeBlock language={match[1]}>{String(children).replace(/\n$/, '')}</CodeBlock>
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
}
