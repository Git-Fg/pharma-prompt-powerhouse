import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Button from '@/components/ui/button'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { content } from '@/lib/content-loader'

interface CommandPaletteProps {
  trigger?: React.ReactNode
}

export function CommandPalette({ trigger }: CommandPaletteProps = {}) {
  const [open, setOpen] = useState(false)
  const [searchResults, setSearchResults] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(open => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  // Count results for announcement
  const totalItems = content.guides.length + content.concepts.length + content.workflows.length + content.externalTools.length

  useEffect(() => {
    if (open) {
      setSearchResults(`${totalItems} résultats disponibles dans la recherche`)
    }
  }, [open, totalItems])

  const defaultTrigger = (
    <Button variant="outline" className="px-3 text-sm text-muted-foreground">
      <Search className="size-4 mr-2" />
      Rechercher...
      <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
        <span className="text-xs">⌘</span>
        K
      </kbd>
    </Button>
  )

  return (
    <>
      <div onClick={() => setOpen(true)}>
        {trigger || defaultTrigger}
      </div>
      <CommandDialog 
        open={open} 
        onOpenChange={setOpen}
        title="Palette de recherche de contenu"
        description="Recherchez parmi les guides, concepts, workflows et outils disponibles"
      >
        {/* Live region for search results announcements */}
        <div 
          aria-live="polite" 
          aria-atomic="true"
          className="sr-only"
        >
          {searchResults}
        </div>
        
        <CommandInput placeholder="Rechercher un contenu..." />
        <CommandList>
          <CommandEmpty>Aucun résultat trouvé pour votre recherche.</CommandEmpty>
          <CommandGroup heading="Guides">
            {content.guides.map(item => (
              <CommandItem key={item.slug} onSelect={() => runCommand(() => router.push(`/guides/${item.slug}`))}>
                {item.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Concepts">
            {content.concepts.map(item => (
              <CommandItem key={item.slug} onSelect={() => runCommand(() => router.push(`/concepts/${item.slug}`))}>
                {item.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Workflows">
            {content.workflows.map(item => (
              <CommandItem key={item.slug} onSelect={() => runCommand(() => router.push(`/workflows/${item.slug}`))}>
                {item.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Outils Externes">
            {content.externalTools.map(item => (
              <CommandItem key={item.slug} onSelect={() => runCommand(() => router.push(`/l-arsenal-ia/${item.slug}`))}>
                {item.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
