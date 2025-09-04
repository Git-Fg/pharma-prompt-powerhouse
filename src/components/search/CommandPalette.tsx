import { content } from '@/lib/content-loader';
import { useEffect, useState } from 'react';

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { useRouter } from 'next/navigation';

export function CommandPalette() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const runCommand = (command: () => void) => {
        setOpen(false);
        command();
    };

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Rechercher un contenu..." />
            <CommandList>
                <CommandEmpty>Aucun résultat.</CommandEmpty>
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
                    {content.externalTools.map((item) => (
                        <CommandItem key={item.slug} onSelect={() => runCommand(() => router.push(`/l-arsenal-ia/${item.slug}`))}>
                            {item.title}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
}
