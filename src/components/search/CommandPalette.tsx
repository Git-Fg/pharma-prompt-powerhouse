"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Brain, 
  Lightbulb, 
  ExternalLink,
  Search,
  FileText
} from "lucide-react";
import { content } from '@/lib/content-loader';

interface SearchableItem {
  type: 'concept' | 'guide' | 'prompt' | 'external-tool';
  slug: string;
  title: string;
  description: string;
  category?: string;
  difficulty?: string;
  icon?: string;
}

const typeConfig = {
  concept: {
    label: "Concepts",
    icon: Brain,
    prefix: "/concepts/",
    color: "bg-blue-500",
  },
  guide: {
    label: "Guides", 
    icon: BookOpen,
    prefix: "/guides/",
    color: "bg-green-500",
  },
  prompt: {
    label: "Prompts",
    icon: Lightbulb, 
    prefix: "/prompts/",
    color: "bg-yellow-500",
  },
  "external-tool": {
    label: "Outils Externes",
    icon: ExternalLink,
    prefix: "/outils-externes/",
    color: "bg-purple-500",
  },
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [searchableItems, setSearchableItems] = useState<SearchableItem[]>([]);
  const router = useRouter();

  // Build searchable index on mount
  useEffect(() => {
    const items: SearchableItem[] = [
      ...content.concepts.map(item => ({
        type: 'concept' as const,
        slug: item.slug,
        title: item.title,
        description: item.description,
        category: item.category,
        difficulty: item.difficulty,
        icon: item.icon,
      })),
      ...content.guides.map(item => ({
        type: 'guide' as const,
        slug: item.slug,
        title: item.title,
        description: item.description,
        category: item.category,
        difficulty: item.difficulty,
        icon: item.icon,
      })),
      ...content.prompts.map(item => ({
        type: 'prompt' as const,
        slug: item.slug,
        title: item.title,
        description: item.description,
        category: item.category,
        difficulty: item.difficulty,
        icon: item.icon,
      })),
      ...content.tools.map(item => ({
        type: 'external-tool' as const,
        slug: item.slug,
        title: item.title,
        description: item.description,
        category: item.category,
        difficulty: undefined, // External tools don't have difficulty
      })),
    ];
    setSearchableItems(items);
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (item: SearchableItem) => {
    setOpen(false);
    const url = typeConfig[item.type].prefix + item.slug;
    router.push(url);
  };

  const groupedItems = searchableItems.reduce((acc, item) => {
    const key = item.type;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key]!.push(item);
    return acc;
  }, {} as Record<string, SearchableItem[]>);

  return (
    <>
      {/* Search trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        data-testid="search-trigger"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline-flex">Rechercher...</span>
        <Badge variant="outline" className="ml-auto hidden sm:flex">
          ⌘K
        </Badge>
      </button>

      {/* Command Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Rechercher des concepts, guides, prompts..." 
          className="border-0"
        />
        <CommandList>
          <CommandEmpty>
            <div className="flex flex-col items-center gap-2 py-6 text-center">
              <FileText className="w-8 h-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Aucun résultat trouvé.
              </p>
            </div>
          </CommandEmpty>
          
          {Object.entries(groupedItems).map(([type, items]) => {
            const config = typeConfig[type as keyof typeof typeConfig];
            const Icon = config.icon;
            
            return (
              <CommandGroup key={type} heading={config.label}>
                {items.map((item) => (
                  <CommandItem
                    key={`${type}-${item.slug}`}
                    value={`${item.title} ${item.description} ${item.category || ''}`}
                    onSelect={() => handleSelect(item)}
                    className="flex items-center gap-3 p-3"
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${config.color} text-white`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{item.title}</span>
                        {item.difficulty && (
                          <Badge variant="secondary" className="text-xs">
                            {item.difficulty}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {item.description}
                      </p>
                      {item.category && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.category}
                        </p>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
}