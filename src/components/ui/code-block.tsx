'use client'

import { Check, Copy, FileCode } from 'lucide-react'
import { useState } from 'react'
import Button from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  children: string
  language?: string
  filename?: string
  className?: string
  showLineNumbers?: boolean
}

export function CodeBlock({
  children,
  language = 'text',
  filename,
  className,
  showLineNumbers = false,
}: CodeBlockProps) {
  const [hasCopied, setHasCopied] = useState(false)
  const code = String(children).replace(/\n$/, '')

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setHasCopied(true)
      setTimeout(() => setHasCopied(false), 2000)
    }
    catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const getLanguageLabel = (lang: string) => {
    const languageMap: Record<string, string> = {
      js: 'JavaScript',
      jsx: 'React JSX',
      ts: 'TypeScript',
      tsx: 'React TSX',
      html: 'HTML',
      css: 'CSS',
      scss: 'SCSS',
      json: 'JSON',
      md: 'Markdown',
      sql: 'SQL',
      python: 'Python',
      bash: 'Bash',
      shell: 'Shell',
      yaml: 'YAML',
      yml: 'YAML',
    }
    return languageMap[lang] || lang.toUpperCase()
  }

  return (
    <div className={cn('group relative my-6', className)}>
      {/* Header avec nom de fichier et bouton de copie */}
      <div className="flex items-center justify-between rounded-t-lg border border-border bg-muted px-4 py-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileCode className="size-4" />
          {filename && <span className="font-mono">{filename}</span>}
          {language && (
            <span className="rounded bg-background px-2 py-1 text-xs font-medium">
              {getLanguageLabel(language)}
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="size-8 p-0 opacity-0 transition-opacity hover:bg-accent hover:text-accent-foreground group-hover:opacity-100"
          onClick={copyToClipboard}
          aria-label={hasCopied ? 'Code copié !' : 'Copier le code'}
        >
          {hasCopied
            ? (
                <Check className="size-4 text-green-600" />
              )
            : (
                <Copy className="size-4" />
              )}
        </Button>
      </div>

      {/* Bloc de code */}
      <div className="relative overflow-hidden rounded-b-lg border border-t-0 border-border bg-background">
        {showLineNumbers && (
          <div className="absolute left-0 top-0 z-10 h-full w-12 select-none border-r border-border bg-muted/50 px-2 py-4 text-right text-xs text-muted-foreground">
            {code.split('\n').map((line, index) => (
              <div key={`line-${index}-${line.substring(0, 10).replace(/[^a-z0-9]/gi, '')}`} className="leading-6">
                {index + 1}
              </div>
            ))}
          </div>
        )}
        <pre
          className={cn(
            'overflow-x-auto p-4 text-sm',
            showLineNumbers && 'pl-16',
          )}
        >
          <code
            className={cn(
              'font-mono text-foreground',
              language && `language-${language}`,
            )}
          >
            {code}
          </code>
        </pre>
      </div>
    </div>
  )
}
