'use client'

import type { LucideIcon } from 'lucide-react'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { CommandPalette } from '@/components/search/CommandPalette'
import { useLayoutAnimation } from '@/hooks/useAutoAnimate'
import { getMobileNavigationLinks } from '@/lib/navigation'
import { createTestIdProps, TestIds } from '@/lib/test-utils'
import { cn } from '@/lib/utils'
import { designTokens } from '@/design-system/tokens'

interface MobileNavItem {
  name: string
  href: string
  icon: LucideIcon | React.ComponentType<{ className?: string }>
  isActive: (pathname: string) => boolean
  isSearch?: boolean
}

// Create mobile-specific nav items based on centralized navigation
function createMobileNavItems(): MobileNavItem[] {
  const mobileNavLinks = getMobileNavigationLinks()

  // Create mobile items from centralized navigation
  const baseItems: (MobileNavItem | null)[] = [
    ...mobileNavLinks.map(link => ({
      name: link.name === 'Workflows Stratégiques'
        ? 'Workflows'
        : link.name === 'L\'Arsenal IA'
          ? 'Arsenal IA'
          : link.name === 'Par où commencer ?'
            ? 'Commencer'
            : link.name,
      href: link.href,
      icon: link.icon,
      isActive: (pathname: string) => {
        if (link.href === '/')
          return pathname === '/'
        return pathname.startsWith(link.href)
      },
    })),
    {
      name: 'Recherche',
      href: '#',
      icon: Search,
      isActive: () => false,
      isSearch: true,
    },
  ]

  return baseItems.filter((item): item is MobileNavItem => item !== null)
}

export function MobileBottomNav() {
  const pathname = usePathname()
  const navRef = useLayoutAnimation()

  const bottomNavItems = createMobileNavItems()

  return (
    <div
      {...createTestIdProps(TestIds.Layout.MobileNav)}
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border"
    >
      <nav ref={navRef} className="flex items-center justify-around safe-area-padding-bottom" style={{ paddingTop: designTokens.spacing.sm, paddingBottom: designTokens.spacing.sm, paddingLeft: designTokens.spacing.md, paddingRight: designTokens.spacing.md }}>
        {bottomNavItems.map((item) => {
          const isActive = item.isActive(pathname)
          const Icon = item.icon

          if (item.isSearch) {
            return (
              <div key={item.name} className="flex flex-col items-center" style={{ padding: designTokens.spacing.xs }}>
                <CommandPalette
                  trigger={(
                    <button
                      type="button"
                      className="flex flex-col items-center justify-center rounded-lg transition-all duration-200 hover:bg-accent active:scale-95" style={{ padding: designTokens.spacing.sm }}
                      {...createTestIdProps(TestIds.Navigation.SearchTrigger)}
                    >
                      <Icon className="text-muted-foreground transition-colors" style={{ width: '1.25rem', height: '1.25rem' }} />
                      <span className="text-muted-foreground font-medium" style={{ fontSize: designTokens.typography.fontSize.xs, marginTop: designTokens.spacing.xs }}>
                        {item.name}
                      </span>
                    </button>
                  )}
                />
              </div>
            )
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center rounded-lg transition-all duration-200 active:scale-95', style={{ padding: designTokens.spacing.sm }},
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground',
              )}
              {...createTestIdProps(TestIds.Navigation.MobileItem(item.name))}
            >
              <Icon className={cn(
                'transition-all duration-200',
                isActive && 'scale-110',
              )}
              style={{ width: '1.25rem', height: '1.25rem' }}
              />
              <span className={cn(
                'font-medium transition-all duration-200',
                isActive && 'font-semibold',
              )}
              style={{ fontSize: designTokens.typography.fontSize.xs, marginTop: designTokens.spacing.xs }}
              >
                {item.name}
              </span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
