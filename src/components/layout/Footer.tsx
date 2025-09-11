'use client'

import { ArrowRight, Brain } from 'lucide-react'
import Link from 'next/link'
import { content } from '@/lib/content-loader'
import { getNavigationLinksBySection } from '@/lib/navigation'
import { createTestIdProps, TestIds } from '@/lib/test-utils'
import { designTokens } from '@/design-system/tokens'

export function Footer() {
  // La logique de récupération des données reste la même
  const navigationLinks = getNavigationLinksBySection('main')
  const legalLinks = getNavigationLinksBySection('legal')
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
    <footer
      {...createTestIdProps(TestIds.Layout.Footer)}
      className="bg-muted/50 border-t"
    >
      <div className="container mx-auto" style={{ 
              paddingLeft: designTokens.spacing.md,
              paddingRight: designTokens.spacing.md,
              paddingTop: designTokens.spacing.xl3,
              paddingBottom: designTokens.spacing.xl3
            }}>

        {/* ====================================================================== */}
        {/* == 1. LAYOUT DESKTOP (GRAND ÉCRAN) - Inchangé mais caché par défaut == */}
        {/* `hidden lg:grid` : Ce bloc n'apparaîtra que sur les écrans larges.   */}
        {/* ====================================================================== */}
        <div
          {...createTestIdProps('desktop-footer')}
          className="hidden lg:grid lg:grid-cols-12" style={{ gap: designTokens.spacing.xl3 }}>
        >
          {/* Brand Section */}
          <div className="lg:col-span-5" style={{ gap: designTokens.spacing.lg }} {...createTestIdProps('footer-brand-section')}>
            <Link href="/" className="inline-flex items-center mb-3" style={{ gap: designTokens.spacing.sm }} {...createTestIdProps(TestIds.Navigation.Logo)}>
              <div className="w-10 h-10 bg-primary flex items-center justify-center shadow-lg" style={{ borderRadius: designTokens.radius.xl }}>
                <Brain className="size-6 text-primary-foreground" />
              </div>
              <span className="font-bold" style={{ fontSize: designTokens.typography.fontSize.xl }}>Pharma Prompt</span>
            </Link>
            <p className="prose-slogan mx-0" {...createTestIdProps('footer-brand-description')}>Mon carnet de notes personnel pour travailler avec l'IA en pharmacie, partagé avec ❤️ pour la communauté.</p>
          </div>

          {/* Links Wrapper */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3" style={{ gap: designTokens.spacing.xl3 }}>
            {/* Navigation Section */}
            <nav aria-label="Navigation principale" {...createTestIdProps('footer-navigation-section')}>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-foreground" style={{ fontSize: designTokens.typography.fontSize.sm, marginBottom: designTokens.spacing.lg }}>Navigation</h3>
              <ul className="space-y-3">
                {navigationLinks.map(link => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group text-sm text-muted-foreground hover:text-foreground transition-all duration-200 flex items-center space-x-2"
                      {...createTestIdProps(TestIds.Navigation.Link(link.name))}
                    >
                      {link.icon && <link.icon className="size-4 hidden sm:block group-hover:text-primary transition-colors" />}
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            {/* Legal & Workflows */}
            <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <nav aria-label="Sécurité & Légal" {...createTestIdProps('footer-legal-section')}>
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-foreground" style={{ fontSize: designTokens.typography.fontSize.sm, marginBottom: designTokens.spacing.lg }}>Sécurité & Légal</h3>
                <ul className="space-y-3">
                  {legalLinks.map(link => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="group text-sm text-muted-foreground hover:text-foreground transition-all duration-200 flex items-center space-x-2"
                        {...createTestIdProps(TestIds.Navigation.Link(link.name))}
                      >
                        {link.icon && <link.icon className="size-4 hidden sm:block group-hover:text-primary transition-colors" />}
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <nav aria-label="Workflows" {...createTestIdProps('footer-workflows-section')}>
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-foreground" style={{ fontSize: designTokens.typography.fontSize.sm, marginBottom: designTokens.spacing.lg }}>Workflows</h3>
                <div className="space-y-3">
                  {recentWorkflows.map(workflow => (
                    <Link
                      key={workflow.slug}
                      href={`/workflows/${workflow.slug}`}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors group line-clamp-2 block"
                      {...createTestIdProps(TestIds.Navigation.Link(workflow.title))}
                    >
                      <span>{workflow.title}</span>
                    </Link>
                  ))}
                  <Link
                    href="/workflows"
                    className="text-sm text-primary hover:text-primary/80 font-medium transition-colors group inline-flex items-center space-x-1 pt-2"
                    {...createTestIdProps(TestIds.Navigation.Link('Voir tous les workflows'))}
                  >
                    <span>Voir tous</span>
                    <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </div>

        {/* ====================================================================== */}
        {/* == 2. LAYOUT MOBILE & TABLETTE - Minimaliste et visible par défaut  == */}
        {/* `lg:hidden` : Ce bloc disparaîtra sur les écrans larges.             == */}
        {/* ====================================================================== */}
        <div
          {...createTestIdProps('mobile-footer')}
          className="lg:hidden"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm" style={{ gap: designTokens.spacing.xl3, fontSize: designTokens.typography.fontSize.sm }}>
            {/* Colonne 1: Navigation */}
            <nav aria-label="Navigation principale">
              <h3 className="font-semibold uppercase tracking-wider mb-4 text-foreground" style={{ fontSize: designTokens.typography.fontSize.sm, marginBottom: designTokens.spacing.lg }}>Navigation</h3>
              <ul className="space-y-3">
                {navigationLinks.map(link => (
                  <li key={link.name}><Link href={link.href} className="text-muted-foreground hover:text-foreground">{link.name}</Link></li>
                ))}
              </ul>
            </nav>
            {/* Colonne 2: Workflows */}
            <nav aria-label="Workflows">
              <h3 className="font-semibold uppercase tracking-wider mb-4 text-foreground" style={{ fontSize: designTokens.typography.fontSize.sm, marginBottom: designTokens.spacing.lg }}>Workflows</h3>
              <ul className="space-y-3">
                {recentWorkflows.map(workflow => (
                  <li key={workflow.slug}><Link href={`/workflows/${workflow.slug}`} className="text-muted-foreground hover:text-foreground">{workflow.title}</Link></li>
                ))}
                <li><Link href="/workflows" className="text-primary font-medium">Voir tous →</Link></li>
              </ul>
            </nav>
            {/* Colonne 3: Légal (apparaît sur sm et +) */}
            <nav aria-label="Sécurité & Légal" className="col-span-2 sm:col-span-1">
              <h3 className="font-semibold uppercase tracking-wider mb-4 text-foreground" style={{ fontSize: designTokens.typography.fontSize.sm, marginBottom: designTokens.spacing.lg }}>Sécurité & Légal</h3>
              <ul className="space-y-3">
                {legalLinks.map(link => (
                  <li key={link.name}><Link href={link.href} className="text-muted-foreground hover:text-foreground">{link.name}</Link></li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Brand & Description centrés en bas pour mobile */}
          <div className="text-center mt-8 pt-6 border-t" style={{ marginTop: designTokens.spacing.xl2, paddingTop: designTokens.spacing.lg }} {...createTestIdProps('mobile-footer-brand')}>
            <Link href="/" className="inline-flex items-center mb-3" style={{ gap: designTokens.spacing.sm }} {...createTestIdProps(TestIds.Navigation.Logo)}>
              <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center shadow-md">
                <Brain className="size-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">Pharma Prompt</span>
            </Link>
            <p className="prose-slogan text-xs mx-auto" style={{ fontSize: designTokens.typography.fontSize.xs }} {...createTestIdProps('mobile-footer-description')}>Mon carnet de notes personnel pour travailler avec l'IA en pharmacie, partagé avec ❤️ pour la communauté.</p>
          </div>
        </div>

        {/* ====================================================================== */}
        {/* == 3. COPYRIGHT - Commun aux deux layouts pour éviter la duplication == */}
        {/* ====================================================================== */}
        <div className="border-t mt-8 pt-6 text-center" style={{ marginTop: designTokens.spacing.xl2, paddingTop: designTokens.spacing.lg }} {...createTestIdProps('footer-copyright')}>
          <p className="text-sm text-muted-foreground">
            ©
            {new Date().getFullYear()}
            {' '}
            Pharma Prompt Powerhouse. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
