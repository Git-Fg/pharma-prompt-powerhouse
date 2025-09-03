import { content } from '@/lib/content-loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, ResponsiveSection } from '@/components/layout/ResponsiveContainer';
import { ResponsiveGrid } from '@/components/layout/ResponsiveGrid';
import { ResponsiveComparisonTable } from '@/components/shared/ResponsiveComparisonTable';
import { spacing } from '@/lib/design-system';

export default function ExternalToolsPage() {
  const tools = content.externalTools;

  return (
    <ResponsiveSection>
      <ResponsiveContainer>
        <div className="space-y-8">
          <header className="text-center space-y-2">
            <h1 className={`${spacing.desktop.text.heading} ${spacing.mobile.text.heading} font-bold`}>
              L'Arsenal IA 2025
            </h1>
            <p className={`${spacing.desktop.text.subheading} ${spacing.mobile.text.subheading} text-muted-foreground`}>
              Mon guide personnel des outils IA pour les étudiants en pharmacie
            </p>
          </header>

          {/* Quick Stats */}
          <ResponsiveGrid 
            cols={{ mobile: 2, tablet: 4, desktop: 4 }}
            className="text-center"
          >
            <div className={`${spacing.mobile.card} ${spacing.desktop.card} border rounded-lg`}>
              <div className="text-2xl font-bold text-blue-600">{tools.length}</div>
              <div className="text-sm text-muted-foreground">Outils testés</div>
            </div>
            <div className={`${spacing.mobile.card} ${spacing.desktop.card} border rounded-lg`}>
              <div className="text-2xl font-bold text-green-600">
                {tools.filter(t => t.isFavorite).length}
              </div>
              <div className="text-sm text-muted-foreground">Favoris</div>
            </div>
            <div className={`${spacing.mobile.card} ${spacing.desktop.card} border rounded-lg`}>
              <div className="text-2xl font-bold text-purple-600">
                {tools.filter(t => t.personalReview).length}
              </div>
              <div className="text-sm text-muted-foreground">Avis détaillés</div>
            </div>
            <div className={`${spacing.mobile.card} ${spacing.desktop.card} border rounded-lg`}>
              <div className="text-2xl font-bold text-orange-600">
                {tools.filter(t => !t.freeVsPaidOffer || t.freeVsPaidOffer.includes('Gratuit')).length}
              </div>
              <div className="text-sm text-muted-foreground">Accès gratuit</div>
            </div>
          </ResponsiveGrid>

          {/* Comparative Table */}
          <Card>
            <CardHeader>
              <CardTitle>Tableau Comparatif</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveComparisonTable tools={tools} />
            </CardContent>
          </Card>
        </div>
      </ResponsiveContainer>
    </ResponsiveSection>
  );
}
