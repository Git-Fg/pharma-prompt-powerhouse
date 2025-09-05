import { useState } from 'react'
import { HelpCircle } from 'lucide-react'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { glossary } from '@/content/glossary'

interface DefinedTermProps {
  term: string
  children: React.ReactNode
  variant?: 'inline' | 'button'
  showIcon?: boolean
}

export function DefinedTerm({ 
  term, 
  children, 
  variant = 'inline',
  showIcon = true 
}: DefinedTermProps) {
  const [open, setOpen] = useState(false)
  const definition = glossary[term.toLowerCase()]

  if (!definition) {
    // Si le terme n'est pas dans le glossaire, on renvoie le contenu tel quel
    return <>{children}</>
  }

  const DefinitionContent = () => (
    <div className="space-y-3">
      <div>
        <h4 className="font-semibold text-sm">{definition.term}</h4>
        {definition.category && (
          <Badge variant="outline" className="text-xs mt-1">
            {definition.category}
          </Badge>
        )}
      </div>
      <p className="text-sm leading-relaxed">{definition.definition}</p>
    </div>
  )

  if (variant === 'button') {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="h-auto p-1 font-normal">
            {children}
            {showIcon && <HelpCircle className="size-3 ml-1" />}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Définition</DialogTitle>
            <DialogDescription asChild>
              <DefinitionContent />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="underline decoration-dashed decoration-1 underline-offset-2 hover:decoration-solid hover:text-primary transition-all cursor-help inline-flex items-center gap-1"
          type="button"
        >
          {children}
          {showIcon && <HelpCircle className="size-3" />}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80" side="top">
        <DefinitionContent />
      </PopoverContent>
    </Popover>
  )
}