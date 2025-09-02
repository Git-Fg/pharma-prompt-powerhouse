// src/components/markdown/MarkdownRenderer.tsx
'use client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from '@/components/ui/code-block';
import { cn } from '@/lib/utils';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * Renderer sécurisé pour le contenu Markdown utilisant react-markdown.
 * Remplace l'ancien système dangerouslySetInnerHTML par un rendu React sécurisé.
 */
export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={cn("prose prose-neutral dark:prose-invert max-w-none", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({...props}) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />,
          h2: ({...props}) => <h2 className="text-3xl font-semibold mt-6 mb-3" {...props} />,
          h3: ({...props}) => <h3 className="text-2xl font-semibold mt-5 mb-2" {...props} />,
          p: ({...props}) => <p className="leading-7 mb-4" {...props} />,
          ul: ({...props}) => <ul className="list-disc pl-6 my-4" {...props} />,
          ol: ({...props}) => <ol className="list-decimal pl-6 my-4" {...props} />,
          li: ({...props}) => <li className="mb-2" {...props} />,
          a: ({...props}) => <a className="text-primary hover:underline" {...props} />,
          code(props) {
            // Handle the complex props from react-markdown for code elements
            const {inline, className, children, ...rest} = props as {
              inline?: boolean;
              className?: string;
              children?: React.ReactNode;
              [key: string]: unknown;
            };
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <CodeBlock language={match[1]}>{String(children).replace(/\n$/, '')}</CodeBlock>
            ) : (
              <code className="bg-muted px-1.5 py-1 rounded font-mono text-sm" {...rest}>
                {children}
              </code>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}