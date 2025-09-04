'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  Home, 
  BookOpen, 
  Search,
  Brain,
  Target,
} from 'lucide-react';
import { CommandPalette } from '@/components/search/CommandPalette';

const bottomNavItems = [
  {
    name: 'Accueil',
    href: '/',
    icon: Home,
    isActive: (pathname: string) => pathname === '/',
  },
  {
    name: 'Workflows',
    href: '/workflows',
    icon: Target,
    isActive: (pathname: string) => pathname.startsWith('/workflows'),
  },
  {
    name: 'Recherche',
    href: '#',
    icon: Search,
    isActive: () => false,
    isSearch: true,
  },
  {
    name: 'Arsenal IA',
    href: '/l-arsenal-ia',
    icon: Brain,
    isActive: (pathname: string) => pathname.startsWith('/l-arsenal-ia'),
  },
  {
    name: 'Guides',
    href: '/guides',
    icon: BookOpen,
    isActive: (pathname: string) => pathname.startsWith('/guides') || pathname.startsWith('/concepts'),
  },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border">
      <nav className="flex items-center justify-around py-2 px-4 safe-area-padding-bottom">
        {bottomNavItems.map((item) => {
          const isActive = item.isActive(pathname);
          const Icon = item.icon;
          
          if (item.isSearch) {
            return (
              <div key={item.name} className="flex flex-col items-center p-1">
                <CommandPalette 
                  trigger={
                    <button className="flex flex-col items-center justify-center p-2 rounded-lg transition-colors hover:bg-accent">
                      <Icon className="size-5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground mt-1 font-medium">
                        {item.name}
                      </span>
                    </button>
                  }
                />
              </div>
            );
          }
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center p-2 rounded-lg transition-colors',
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              <Icon className="size-5" />
              <span className="text-xs mt-1 font-medium">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}