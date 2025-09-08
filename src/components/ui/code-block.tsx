'use client'

import { Brain, Check, Copy, FileCode, Settings, User } from 'lucide-react'
import { useState } from 'react'
import Button from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  children: string
  language?: string
  filename?: string
  className?: string
  showLineNumbers?: boolean
  /**
   * Enable semantic highlighting for prompt engineering
   * Highlights roles, tasks, context, and variables with distinct colors
   */
  semanticHighlighting?: boolean
  /**
   * Type of prompt content for semantic analysis
   */
  promptType?: 'medical' | 'research' | 'analysis' | 'creative' | 'general'
}

// Semantic patterns for prompt engineering
const SEMANTIC_PATTERNS = {
  role: {
    patterns: [
      /Tu es un(e)?\s+([^.]+)/gi,
      /Agis en tant que ([^.]+)/gi,
      /En tant que ([^.]+)/gi,
      /Rôle\s*:\s*([^\n]+)/gi,
      /You are (a|an)?\s*([^.]+)/gi,
      /Act as (a|an)?\s*([^.]+)/gi,
    ],
    icon: User,
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/50',
  },
  task: {
    patterns: [
      /Tâche\s*:\s*([^\n]+)/gi,
      /Objectif\s*:\s*([^\n]+)/gi,
      /Génère\s+([^.]+)/gi,
      /Créé\s+([^.]+)/gi,
      /Analyse\s+([^.]+)/gi,
      /Explique\s+([^.]+)/gi,
      /Task\s*:\s*([^\n]+)/gi,
      /Generate\s+([^.]+)/gi,
      /Create\s+([^.]+)/gi,
      /Analyze\s+([^.]+)/gi,
    ],
    icon: Settings,
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-50 dark:bg-green-950/50',
  },
  context: {
    patterns: [
      /Contexte\s*:\s*([^\n]+)/gi,
      /Dans le contexte de ([^.]+)/gi,
      /Considérant que ([^.]+)/gi,
      /Background\s*:\s*([^\n]+)/gi,
      /Context\s*:\s*([^\n]+)/gi,
      /Given that ([^.]+)/gi,
    ],
    icon: Brain,
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-950/50',
  },
  variable: {
    patterns: [
      /\{\{([^}]+)\}\}/g,
      /\$\{([^}]+)\}/g,
      /\[([^\]]+)\]/g,
    ],
    icon: FileCode,
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-50 dark:bg-orange-950/50',
  },
}

export function CodeBlock({
  children,
  language = 'text',
  filename,
  className,
  showLineNumbers = false,
  semanticHighlighting = false,
  promptType = 'general',
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
      prompt: 'Prompt Engineering',
      medical: 'Prompt Médical',
      research: 'Prompt Recherche',
    }
    return languageMap[lang] || lang.toUpperCase()
  }

  // Apply semantic highlighting for prompt content
  const processSemanticHighlighting = (text: string) => {
    if (!semanticHighlighting)
      return text

    let processedText = text
    const highlights: Array<{ type: string, start: number, end: number, content: string }> = []

    // Find all semantic patterns
    Object.entries(SEMANTIC_PATTERNS).forEach(([type, config]) => {
      config.patterns.forEach((pattern) => {
        let match = pattern.exec(text)
        while (match !== null) {
          highlights.push({
            type,
            start: match.index,
            end: match.index + match[0].length,
            content: match[0],
          })
          match = pattern.exec(text)
        }
      })
    })

    // Sort highlights by position (reverse to avoid position shifts)
    highlights.sort((a, b) => b.start - a.start)

    // Apply highlights
    highlights.forEach((highlight) => {
      const { type, start, end, content } = highlight
      const config = SEMANTIC_PATTERNS[type as keyof typeof SEMANTIC_PATTERNS]
      const highlightedContent = `<span class="semantic-highlight semantic-${type} ${config.color} ${config.bg} px-1 py-0.5 rounded text-xs font-medium">${content}</span>`

      processedText = processedText.slice(0, start) + highlightedContent + processedText.slice(end)
    })

    return processedText
  }

  const processedCode = semanticHighlighting ? processSemanticHighlighting(code) : code

  return (
    <div className={cn('group relative my-6', className)}>
      {/* Header avec nom de fichier et bouton de copie */}
      <div className="flex items-center justify-between rounded-t-lg border border-border bg-muted px-4 py-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileCode className="size-4" />
          {filename && <span className="font-mono">{filename}</span>}
          <span className="rounded bg-background px-2 py-1 text-xs font-medium">
            {getLanguageLabel(language)}
          </span>
          {semanticHighlighting && promptType && (
            <span className="rounded bg-primary/10 text-primary px-2 py-1 text-xs font-medium">
              Prompt
              {' '}
              {promptType}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {semanticHighlighting && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              <User className="size-3 text-blue-500" />
              <Settings className="size-3 text-green-500" />
              <Brain className="size-3 text-purple-500" />
              <FileCode className="size-3 text-orange-500" />
            </div>
          )}
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
      </div>

      {/* Légende des couleurs sémantiques */}
      {semanticHighlighting && (
        <div className="border-x border-border bg-muted/50 px-4 py-2 text-xs">
          <div className="flex flex-wrap gap-3 text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="size-3 text-blue-500" />
              <span>Rôle</span>
            </div>
            <div className="flex items-center gap-1">
              <Settings className="size-3 text-green-500" />
              <span>Tâche</span>
            </div>
            <div className="flex items-center gap-1">
              <Brain className="size-3 text-purple-500" />
              <span>Contexte</span>
            </div>
            <div className="flex items-center gap-1">
              <FileCode className="size-3 text-orange-500" />
              <span>Variables</span>
            </div>
          </div>
        </div>
      )}

      {/* Bloc de code */}
      <div className="relative overflow-hidden rounded-b-lg border border-t-0 border-border bg-background">
        {showLineNumbers && (
          <div className="absolute left-0 top-0 z-10 h-full w-12 select-none border-r border-border bg-muted/50 px-2 py-4 text-right text-xs text-muted-foreground">
            {code.split('\n').map((line, index) => (
              <div

                key={`line-${index}-${line.substring(0, 10).replace(/[^a-z0-9]/gi, '')}`}
                className="leading-6"
              >
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
          {semanticHighlighting
            ? (
                <code
                  className={cn(
                    'font-mono text-foreground',
                    language && `language-${language}`,
                  )}
                  dangerouslySetInnerHTML={{ __html: processedCode }}
                />
              )
            : (
                <code
                  className={cn(
                    'font-mono text-foreground',
                    language && `language-${language}`,
                  )}
                >
                  {code}
                </code>
              )}
        </pre>
      </div>

    </div>
  )
}
