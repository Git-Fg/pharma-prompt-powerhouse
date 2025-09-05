'use client'

import { ArrowRight, Brain } from 'lucide-react'
import Link from 'next/link'
import { content } from '@/lib/content-loader' // Pour le contenu dynamique
import { getNavigationLinksBySection } from '@/lib/navigation'

export function Footer() {
  // Get navigation links from centralized source
  const navigationLinks = getNavigationLinksBySection('main')
  const legalLinks = getNavigationLinksBySection('legal')

  // Get recent workflows (prioritize favorites, then first 3)
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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Section - Ajusté pour la nouvelle grille */}
          <div className="md:col-span-12 xl:col-span-5 space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="size-7 text-primary-foreground" />
              </div>
              <span className="font-bold text-2xl">Pharma Prompt</span>
            </div>
            <div className="footer-description-width">
              {' '}
              {/* Limite la largeur du texte pour une meilleure lisibilité */}
              <p className="prose-slogan">
                Mon carnet de notes personnel pour travailler avec l'IA en pharmacie, partagé avec ❤️ pour la communauté.
              </p>
            </div>
          </div>

          {/* Wrapper pour les colonnes de liens - C'est ici que la magie opère */}
          <div className="md:col-span-12 xl:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">

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
                      {/* Icônes masquées sur les très petits écrans pour gagner de la place */}
                      <link.icon className="size-4 hidden sm:block group-hover:text-primary transition-colors" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal & Workflows combinés pour une meilleure densité */}
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
            ©
            {' '}
            {new Date().getFullYear()}
            {' '}
            Pharma Prompt Powerhouse. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
