import React from 'react';
import { cn } from '@/lib/utils';
import { Container, Section } from './Container';

interface StatCardProps {
  value: string | number;
  label: string;
  colorClass: string; // Ex: "text-blue-600 dark:text-blue-400"
  bgClass: string;    // Ex: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 border-blue-200 dark:border-blue-800"
}

interface CollectionPageLayoutProps {
  title: string;
  description: string;
  stats?: StatCardProps[]; // Tableau de props pour les cartes de statistiques
  headerClassName?: string;
  contentMaxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl' | 'full';
  children: React.ReactNode;
}

export function CollectionPageLayout({
  title,
  description,
  stats,
  headerClassName,
  contentMaxWidth = '7xl',
  children,
}: CollectionPageLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Header avec responsive design mobile-first */}
      <div className={cn("border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", headerClassName)}>
        <Section size="md">
          <Container maxWidth="4xl">
            <div className="page-header">
              <h1 className="page-title text-balance">
                {title}
              </h1>
              <p className="page-description text-pretty">
                {description}
              </p>
            </div>

            {stats && stats.length > 0 && (
              <div className="stats-grid">
                {stats.map((stat, index) => (
                  <div key={index} className={cn("stat-card", stat.bgClass)}>
                    <div className={cn("stat-number", stat.colorClass)}>
                      {stat.value}
                    </div>
                    <div className={cn(
                      "stat-label",
                      stat.colorClass.replace('text-', 'text-').replace('-400', '-300/70').replace('-600', '-600/70')
                    )}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Container>
        </Section>
      </div>

      {/* Contenu principal avec marges standardisées */}
      <Section>
        <Container maxWidth={contentMaxWidth}>
          {children}
        </Container>
      </Section>
    </div>
  );
}