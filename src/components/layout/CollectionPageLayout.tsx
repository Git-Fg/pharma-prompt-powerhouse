import React from 'react';
import { cn } from '@/lib/utils';
import { Container, Section } from './Container';
import { StaggeredPage, StaggeredItem } from '@/components/ui/transitions';
import { ScrollAnimated, AnimatedList, AnimatedItem } from '@/components/ui/animated';

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
    <StaggeredPage className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Header avec responsive design mobile-first et animations */}
      <StaggeredItem>
        <div className={cn("border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", headerClassName)}>
          <Section size="md">
            <Container maxWidth="4xl">
              <div className="page-header">
                <h1 className="page-title text-balance animate-fade-in">
                  {title}
                </h1>
                <p className="page-description text-pretty animate-slide-up">
                  {description}
                </p>
              </div>

              {stats && stats.length > 0 && (
                <AnimatedList className="stats-grid" staggerDelay={0.15}>
                  {stats.map((stat, index) => (
                    <AnimatedItem key={index} delay={index * 0.1}>
                      <div className={cn("stat-card hover-glow hover-scale cursor-pointer", stat.bgClass)}>
                        <div className={cn("stat-number animate-bounce-subtle", stat.colorClass)}>
                          {stat.value}
                        </div>
                        <div className={cn("stat-label text-muted-foreground", stat.colorClass)}>
                          {stat.label}
                        </div>
                      </div>
                    </AnimatedItem>
                  ))}
                </AnimatedList>
              )}
            </Container>
          </Section>
        </div>
      </StaggeredItem>

      {/* Contenu principal avec marges standardisées et animations */}
      <StaggeredItem>
        <Section>
          <Container maxWidth={contentMaxWidth}>
            <ScrollAnimated variant="slideUp" className="animate-fade-in">
              {children}
            </ScrollAnimated>
          </Container>
        </Section>
      </StaggeredItem>
    </StaggeredPage>
  );
}