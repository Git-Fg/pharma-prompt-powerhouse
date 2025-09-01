"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent as _NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger as _NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Menu,
  BookOpen,
  Brain,
  Lightbulb,
  Wrench,
  ExternalLink,
  Moon,
  Sun,
  User,
  Search,
} from "lucide-react";
import { useTheme } from "next-themes";

const navigation = [
  {
    name: "Concepts",
    href: "/concepts",
    icon: Brain,
    description: "Point de départ : chaque concept est un dossier complet",
  },
  {
    name: "Guides",
    href: "/guides",
    icon: BookOpen,
    description: "Parcourir la bibliothèque de tutoriels",
  },
  {
    name: "Prompts",
    href: "/prompts",
    icon: Lightbulb,
    description: "Collection de prompts optimisés",
  },
  {
    name: "Ma Boîte à Outils",
    href: "/boite-a-outils",
    icon: Wrench,
    description: "Mes outils interactifs",
  },
  {
    name: "Outils Externes",
    href: "/outils-externes",
    icon: ExternalLink,
    description: "Mes analyses et guides sur les outils IA",
  },
];

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">Pharma Prompt</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                {navigation.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuLink
                      asChild
                      className={cn(
                        navigationMenuTriggerStyle(),
                        pathname === item.href &&
                          "bg-accent text-accent-foreground"
                      )}
                    >
                      <Link 
                        href={item.href} 
                        data-testid={`nav-${item.name.toLowerCase()}`}
                      >
                        <item.icon className="w-4 h-4 mr-2" />
                        {item.name}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center space-x-2">
              {/* Search */}
              <Button variant="ghost" size="icon">
                <Search className="w-4 h-4" />
              </Button>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                <Sun className="w-4 h-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute w-4 h-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>

              {/* User Profile */}
              <Button variant="ghost" size="icon">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Sun className="w-4 h-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute w-4 h-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
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
                        <Brain className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <span className="font-bold text-xl">Pharma Prompt</span>
                    </Link>
                  </div>

                  {/* Navigation principale */}
                  <div className="flex-1 py-6">
                    <div className="space-y-3">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          data-testid={`mobile-nav-${item.name.toLowerCase()}`}
                          className={cn(
                            "flex items-start space-x-4 px-6 py-4 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground group",
                            pathname === item.href &&
                              "bg-accent text-accent-foreground shadow-sm"
                          )}
                        >
                          <div
                            className={cn(
                              "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                              pathname === item.href
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                            )}
                          >
                            <item.icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-base mb-1">
                              {item.name}
                            </div>
                            <div className="text-xs text-muted-foreground leading-relaxed">
                              {item.description}
                            </div>
                          </div>
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
                      <button className="flex items-center space-x-4 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground w-full text-left">
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                          <Search className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-medium">Rechercher</div>
                          <div className="text-xs text-muted-foreground">
                            Trouver du contenu
                          </div>
                        </div>
                      </button>

                      <button className="flex items-center space-x-4 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground w-full text-left">
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                          <User className="w-5 h-5" />
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
  );
}
