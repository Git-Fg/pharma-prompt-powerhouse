'use client'

import {
  Brain,
  Menu,
  Moon,
  Sun,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { CommandPalette } from '@/components/search/CommandPalette'
import Button from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { getMainNavigationLinks } from '@/lib/navigation'
import { createTestIdProps, TestIds } from '@/lib/test-utils'
import { cn } from '@/lib/utils'
import { designTokens } from '@/design-system/tokens'

export function Header() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Get navigation links from centralized source
  const mainNavigation = getMainNavigationLinks()

  // Function to determine if a link is active
  const isActive = (href: string) => {
    return href === '/' ? pathname === href : pathname.startsWith(href)
  }

  return (
    <header
      {...createTestIdProps(TestIds.Layout.Header)}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto h-16" style={{ paddingLeft: designTokens.spacing.md, paddingRight: designTokens.spacing.md }}>
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex items-center" style={{ gap: designTokens.spacing.lg }}>
            <Link href="/" className="flex items-center" style={{ gap: designTokens.spacing.sm }} {...createTestIdProps(TestIds.Navigation.Logo)}>
              <div className="bg-primary flex items-center justify-center" style={{ width: '2rem', height: '2rem', borderRadius: designTokens.radius.lg }}>
                <Brain className="size-5 text-primary-foreground" />
              </div>
              <span className="font-bold" style={{ fontSize: designTokens.typography.fontSize.lg }}>Pharma Prompt</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center" style={{ gap: designTokens.spacing.xl2 }}>
            <nav>
              <ul className="flex items-center" style={{ gap: designTokens.spacing.xl2 }}>
                {mainNavigation.map(item => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      {...createTestIdProps(TestIds.Navigation.Link(item.name))}
                      className={cn(
                        'font-medium transition-colors hover:text-primary', style={{ fontSize: designTokens.typography.fontSize.sm }},
                        isActive(item.href) ? 'text-primary' : 'text-muted-foreground',
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center" style={{ gap: designTokens.spacing.sm }}>
              {/* Search */}
              <CommandPalette />

              {/* Theme Toggle */}
              <Button
                {...createTestIdProps(TestIds.Navigation.ThemeToggle)}
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              >
                <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center" style={{ gap: designTokens.spacing.sm }}>
            <Button
              {...createTestIdProps(TestIds.Navigation.ThemeToggle)}
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] sm:w-[400px]">
                {/* Hidden accessibility headers */}
                <SheetHeader className="sr-only">
                  <SheetTitle>Menu de navigation principal</SheetTitle>
                  <SheetDescription>
                    Menu de navigation mobile avec accès aux principales sections du site
                  </SheetDescription>
                </SheetHeader>

                <div className="flex flex-col h-full">
                  {/* Header du menu mobile */}
                  <div className="flex items-center justify-between border-b border-border/50" style={{ paddingBottom: designTokens.spacing.xl2 }}>
                    <Link
                      href="/"
                      className="flex items-center" style={{ gap: designTokens.spacing.lg }}
                      onClick={() => setIsOpen(false)}
                      {...createTestIdProps(TestIds.Navigation.Logo)}
                    >
                      <div className="bg-primary rounded-lg flex items-center justify-center" style={{ width: '2.5rem', height: '2.5rem' }}>
                        <Brain className="size-6 text-primary-foreground" />
                      </div>
                      <span className="font-bold" style={{ fontSize: designTokens.typography.fontSize.xl }}>Pharma Prompt</span>
                    </Link>
                  </div>

                  {/* Navigation principale */}
                  <div className="flex-1" style={{ paddingTop: designTokens.spacing.xl2, paddingBottom: designTokens.spacing.xl2 }}>
                    <div className="space-y-2" style={{ gap: designTokens.spacing.sm }}>
                      {/* Navigation Links */}
                      {mainNavigation.slice(1).map(item => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            'flex items-center font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground rounded-lg',
                            isActive(item.href) && 'bg-accent text-accent-foreground',
                          )}
                          style={{ paddingLeft: designTokens.spacing.xl2, paddingRight: designTokens.spacing.xl2, paddingTop: designTokens.spacing.md, paddingBottom: designTokens.spacing.md, fontSize: designTokens.typography.fontSize.sm }}
                          {...createTestIdProps(TestIds.Navigation.MobileItem(item.name))}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Actions secondaires */}
                  <div className="border-t border-border/50 space-y-3" style={{ paddingTop: designTokens.spacing.xl2, gap: designTokens.spacing.md }}>
                    <div style={{ paddingLeft: designTokens.spacing.xl2, paddingRight: designTokens.spacing.xl2 }}>
                      <h3 className="font-semibold text-muted-foreground uppercase tracking-wider" style={{ fontSize: designTokens.typography.fontSize.xs, marginBottom: designTokens.spacing.sm }}>
                        Actions rapides
                      </h3>
                    </div>

                    <div className="space-y-2">
                      <CommandPalette />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
