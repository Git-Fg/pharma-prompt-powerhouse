import { BookOpen, ExternalLink, HelpCircle, Info } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { glossary } from '@/content/glossary'
import { content } from '@/lib/content-loader'

interface DefinedTermProps {
  term: string
  children: React.ReactNode
  variant?: 'inline' | 'button'
  showIcon?: boolean
}

interface DefinitionContentProps {
  definition: {
    term: string
    category?: string
    definition: string
    relatedConcepts?: string[]
    context?: string
    examples?: string[]
  }
}

function DefinitionContent({ definition }: DefinitionContentProps) {
  const relatedConcepts = definition.relatedConcepts
    ? definition.relatedConcepts
        .map(slug => content.concepts.find(c => c.slug === slug))
        .filter((concept): concept is typeof concept & {} => concept !== undefined)
    : []

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold text-sm text-base">{definition.term}</h4>
        {definition.category && (
          <Badge variant="outline" className="text-xs mt-1">
            {definition.category}
          </Badge>
        )}
      </div>

      {definition.context && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Info className="size-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-blue-800 mb-1">Contexte</p>
              <p className="text-sm text-blue-700">{definition.context}</p>
            </div>
          </div>
        </div>
      )}

      <p className="text-sm leading-relaxed">{definition.definition}</p>

      {definition.examples && definition.examples.length > 0 && (
        <div>
          <p className="text-xs font-medium mb-2 flex items-center gap-1">
            <BookOpen className="size-3" />
            Exemples
          </p>
          <ul className="text-sm text-muted-foreground space-y-1">
            {definition.examples.map((example, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-muted-foreground">•</span>
                <span>{example}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {relatedConcepts.length > 0 && (
        <div>
          <p className="text-xs font-medium mb-2 flex items-center gap-1">
            <ExternalLink className="size-3" />
            Concepts liés
          </p>
          <div className="flex flex-wrap gap-2">
            {relatedConcepts.map(concept => (
              <Link
                key={concept.slug}
                href={`/concepts/${concept.slug}`}
                className="text-xs bg-muted/50 hover:bg-muted px-2 py-1 rounded-md transition-colors"
              >
                {concept.title}
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

export function DefinedTerm({
  term,
  children,
  variant = 'inline',
  showIcon = true,
}: DefinedTermProps) {
  const [open, setOpen] = useState(false)
  const definition = glossary[term.toLowerCase()]

  if (!definition) {
    // Si le terme n'est pas dans le glossaire, on renvoie le contenu tel quel
    return <>{children}</>
  }

  const trigger = (
    <button
      className="underline decoration-dashed decoration-1 underline-offset-2 hover:decoration-solid hover:text-primary transition-all cursor-help inline-flex items-center gap-1"
      type="button"
    >
      {children}
      {showIcon && <HelpCircle className="size-3" />}
    </button>
  )

  const content = (
    <DefinitionContent
      definition={definition}
    />
  )

  if (variant === 'button') {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="sm" className="h-auto p-1 font-normal">
            {children}
            {showIcon && <HelpCircle className="size-3 ml-1" />}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[80vh] rounded-t-lg">
          <DrawerHeader>
            <DrawerTitle className="text-lg flex items-center gap-2">
              <HelpCircle className="size-5" />
              {definition.term}
            </DrawerTitle>
            <DrawerDescription className="text-sm">
              Définition du glossaire
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto py-4 px-4">
            {content}
            <div className="pt-4 border-t mt-4">
              <Button asChild size="sm" className="w-full">
                <Link href={`/glossary#${definition.term.toLowerCase()}`}>
                  Voir dans le glossaire
                </Link>
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {trigger}
      </DrawerTrigger>
      <DrawerContent className="h-[80vh] rounded-t-lg">
        <DrawerHeader>
          <DrawerTitle className="text-lg flex items-center gap-2">
            <HelpCircle className="size-5" />
            {definition.term}
          </DrawerTitle>
          <DrawerDescription className="text-sm">
            Définition du glossaire
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto py-4 px-4">
          {content}
          <div className="pt-4 border-t mt-4">
            <Button asChild size="sm" className="w-full">
              <Link href={`/glossary#${definition.term.toLowerCase()}`}>
                Voir dans le glossaire
              </Link>
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
