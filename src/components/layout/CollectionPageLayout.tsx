import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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
  children: React.ReactNode;
}

export function CollectionPageLayout({
  title,
  description,
  stats,
  headerClassName,
  children,
}: CollectionPageLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className={cn("border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", headerClassName)}>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{description}</p>
          </div>

          {stats && stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className={cn("p-6 text-center", stat.bgClass)}>
                  <div className={cn("text-3xl font-bold", stat.colorClass)}>
                    {stat.value}
                  </div>
                  <div className={cn("text-sm", stat.colorClass.replace('text-', 'text-').replace('-400', '-300/70').replace('-600', '-600/70'))}>
                    {stat.label}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
}