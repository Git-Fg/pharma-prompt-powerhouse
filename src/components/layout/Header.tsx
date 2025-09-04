'use client'

import {
  Brain,
  Menu,
  Moon,
  Sun,
  User,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import React, { useState } from 'react'
import { CommandPalette } from '@/components/search/CommandPalette'
import Button from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { getMainNavigationLinks } from '@/lib/navigation'
import { cn } from '@/lib/utils'

export function Header() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  // Get navigation links from centralized source
  const mainNavigation = getMainNavigationLinks()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="size-8 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="size-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">Pharma Prompt</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-6">
              {mainNavigation.slice(1).map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-2">
              {/* Search */}
              <CommandPalette />

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              >
                <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>

              {/* User Profile */}
              <Button variant="ghost" size="icon">
                <User className="size-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
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
                <div className="flex flex-col h-full">
                  {/* Header du menu mobile */}
                  <div className="flex items-center justify-between pb-6 border-b border-border/50">
                    <Link
                      href="/"
                      className="flex items-center space-x-3"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                        <Brain className="size-6 text-primary-foreground" />
                      </div>
                      <span className="font-bold text-xl">Pharma Prompt</span>
                    </Link>
                  </div>

                  {/* Navigation principale */}
                  <div className="flex-1 py-6">
                    <div className="space-y-2">
                      {/* Navigation Links */}
                      {mainNavigation.slice(1).map(item => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            'flex items-center px-6 py-3 text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground rounded-lg',
                          )}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Actions secondaires */}
                  <div className="border-t border-border/50 pt-6 space-y-3">
                    <div className="px-6">
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        Actions rapides
                      </h3>
                    </div>

                    <div className="space-y-2">
                      <CommandPalette />

                      <button type="button" className="flex items-center space-x-4 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground w-full text-left">
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                          <User className="size-5" />
                        </div>
                        <div>
                          <div className="font-medium">Profil</div>
                          <div className="text-xs text-muted-foreground">
                            Gérer votre compte
                          </div>
                        </div>
                      </button>
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
