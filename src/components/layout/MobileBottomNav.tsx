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
import { useAutoAnimateLayout } from '@/hooks/useAutoAnimate';

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
  const navRef = useAutoAnimateLayout();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border">
      <nav ref={navRef} className="flex items-center justify-around py-2 px-4 safe-area-padding-bottom">
        {bottomNavItems.map((item) => {
          const isActive = item.isActive(pathname);
          const Icon = item.icon;
          
          if (item.isSearch) {
            return (
              <div key={item.name} className="flex flex-col items-center p-1">
                <CommandPalette 
                  trigger={
                    <button className="flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 hover:bg-accent active:scale-95">
                      <Icon className="size-5 text-muted-foreground transition-colors" />
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
                'flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 active:scale-95',
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              <Icon className={cn(
                'size-5 transition-all duration-200',
                isActive && 'scale-110'
              )} />
              <span className={cn(
                'text-xs mt-1 font-medium transition-all duration-200',
                isActive && 'font-semibold'
              )}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}