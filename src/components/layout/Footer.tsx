'use client'

import { ArrowRight, Brain } from 'lucide-react'
import Link from 'next/link'
import { content } from '@/lib/content-loader'
import { getNavigationLinksBySection } from '@/lib/navigation'
import { cn } from '@/lib/utils'

export function Footer() {
  // Get navigation links from centralized source
  const navigationLinks = getNavigationLinksBySection('main')
  const legalLinks = getNavigationLinksBySection('legal')

  // Get recent workflows (prioritize favorites, then fill with recent ones)
  const recentWorkflows = content.workflows
    .filter(workflow => workflow.isFavorite)
    .slice(0, 3)
    .concat(
      content.workflows
        .filter(workflow => !workflow.isFavorite)
        .slice(0, 3 - content.workflows.filter(workflow => workflow.isFavorite).length),
    )
    .slice(0, 3)

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/*
          GRID SIMPLIFIÉ :
          - `grid-cols-1` sur mobile (par défaut).
          - `lg:grid-cols-12` sur les grands écrans (tablette et plus).
          Cette approche est plus simple et plus prévisible que la gestion de `md` et `xl` séparément.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Section - Occupe 5 colonnes sur les grands écrans */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="size-7 text-primary-foreground" />
              </div>
              <span className="font-bold text-2xl">Pharma Prompt</span>
            </Link>
            {/*
              CORRECTION PRINCIPALE :
              - Application directe de `footer-description-width` au paragraphe.
              - Simplifie le DOM et garantit que la contrainte de largeur est appliquée au bon élément.
            */}
            <p className={cn('prose-slogan', 'footer-description-width', 'mx-0')}>
              Mon carnet de notes personnel pour travailler avec l'IA en pharmacie, partagé avec ❤️ pour la communauté.
            </p>
          </div>

          {/* Wrapper pour les colonnes de liens - Occupe 7 colonnes sur les grands écrans */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Navigation Section */}
            <div className="col-span-1">
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-foreground">
                Navigation
              </h3>
              <ul className="space-y-3">
                {navigationLinks.map(link => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group text-sm text-muted-foreground hover:text-foreground transition-all duration-200 flex items-center space-x-2"
                    >
                      <link.icon className="size-4 hidden sm:block group-hover:text-primary transition-colors" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal & Workflows combinés */}
            <div className="col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Legal Section */}
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-foreground">
                  Sécurité & Légal
                </h3>
                <ul className="space-y-3">
                  {legalLinks.map(link => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="group text-sm text-muted-foreground hover:text-foreground transition-all duration-200 flex items-center space-x-2"
                      >
                        <link.icon className="size-4 hidden sm:block group-hover:text-primary transition-colors" />
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Recent Workflows Section */}
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-foreground">
                  Workflows
                </h3>
                <div className="space-y-3">
                  {recentWorkflows.map(workflow => (
                    <Link
                      key={workflow.slug}
                      href={`/workflows/${workflow.slug}`}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors group line-clamp-2 block"
                    >
                      <span>{workflow.title}</span>
                    </Link>
                  ))}
                  <Link
                    href="/workflows"
                    className="text-sm text-primary hover:text-primary/80 font-medium transition-colors group inline-flex items-center space-x-1 pt-2"
                  >
                    <span>Voir tous</span>
                    <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ligne de Séparation et Copyright */}
        <div className="border-t mt-12 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Pharma Prompt Powerhouse. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
