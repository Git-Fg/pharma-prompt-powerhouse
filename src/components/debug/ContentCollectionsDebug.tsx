'use client';

import { allGuides } from 'content-collections';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function ContentCollectionsDebug() {
  return (
    <div className='p-6 space-y-6'>
      <h2 className='text-2xl font-bold'>Debug Content Collections</h2>

      <div className='grid gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>Statistiques</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Nombre total de guides: <strong>{allGuides.length}</strong>
            </p>

            {/* Distribution des catégories */}
            <div className='mt-4'>
              <h4 className='font-semibold mb-2'>
                Distribution des catégories:
              </h4>
              {(() => {
                const categoryCount: Record<string, number> = {};
                allGuides.forEach(guide => {
                  const cat = guide.category || 'non-définie';
                  categoryCount[cat] = (categoryCount[cat] || 0) + 1;
                });

                return (
                  <div className='flex flex-wrap gap-2'>
                    {Object.entries(categoryCount).map(([cat, count]) => (
                      <Badge key={cat} variant='outline'>
                        {cat}: {count}
                      </Badge>
                    ))}
                  </div>
                );
              })()}
            </div>
          </CardContent>
        </Card>

        {/* Détails des premiers guides */}
        <Card>
          <CardHeader>
            <CardTitle>Détails des guides (3 premiers)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {allGuides.slice(0, 3).map((guide, index) => (
                <div
                  key={guide.slug || index}
                  className='border rounded p-3 space-y-2'
                >
                  <h5 className='font-semibold'>{guide.title}</h5>
                  <div className='grid grid-cols-2 gap-2 text-sm'>
                    <div>
                      <strong>Catégorie:</strong>{' '}
                      {guide.category || 'non-définie'}
                    </div>
                    <div>
                      <strong>Slug:</strong> {guide.slug || 'non-défini'}
                    </div>
                    <div>
                      <strong>Difficulté:</strong> {guide.difficulty}
                    </div>
                    <div>
                      <strong>Tags:</strong> {guide.tags?.join(', ') || 'Aucun'}
                    </div>
                    <div className='col-span-2'>
                      <strong>Chemin original:</strong>{' '}
                      {guide.slug || 'non-défini'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Vérifications */}
        <Card>
          <CardHeader>
            <CardTitle>Vérifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              {/* Vérifier les slugs */}
              {(() => {
                const guidesWithoutSlug = allGuides.filter(
                  guide => !guide.slug
                );
                return (
                  <div
                    className={`p-2 rounded ${
                      guidesWithoutSlug.length > 0
                        ? 'bg-red-100'
                        : 'bg-green-100'
                    }`}
                  >
                    <strong>Slugs:</strong>{' '}
                    {guidesWithoutSlug.length > 0
                      ? `⚠️ ${guidesWithoutSlug.length} guide(s) sans slug`
                      : '✅ Tous les guides ont un slug'}
                  </div>
                );
              })()}

              {/* Vérifier les catégories */}
              {(() => {
                const guidesWithoutCategory = allGuides.filter(
                  guide => !guide.category
                );
                return (
                  <div
                    className={`p-2 rounded ${
                      guidesWithoutCategory.length > 0
                        ? 'bg-red-100'
                        : 'bg-green-100'
                    }`}
                  >
                    <strong>Catégories:</strong>{' '}
                    {guidesWithoutCategory.length > 0
                      ? `⚠️ ${guidesWithoutCategory.length} guide(s) sans catégorie`
                      : '✅ Tous les guides ont une catégorie'}
                  </div>
                );
              })()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
