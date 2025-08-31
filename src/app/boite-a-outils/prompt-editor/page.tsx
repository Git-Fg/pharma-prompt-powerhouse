'use client';

import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PromptEditor } from '@/components/prompts/PromptEditor';

function PromptEditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Récupérer le paramètre 'template' depuis l'URL directement sans useEffect
  const templateToLoad = searchParams.get('template');

  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-background to-muted/20'>
      {/* Header */}
      <div className='border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='container mx-auto px-4 py-6'>
          <div className='flex items-center gap-4'>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => router.push('/boite-a-outils')}
            >
              <ArrowLeft className='w-4 h-4 mr-2' />
              Retour aux outils
            </Button>
            <div className='flex-1'>
              <h1 className='text-3xl font-bold'>Éditeur de Prompts</h1>
              <p className='text-muted-foreground mt-2'>
                {templateToLoad
                  ? `Chargement du prompt "${templateToLoad}"...`
                  : 'Créez et personnalisez vos propres prompts avec notre éditeur avancé'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal - Passe le template à charger */}
      <PromptEditor templateToLoad={templateToLoad} />
    </div>
  );
}

export default function PromptEditorPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <PromptEditorContent />
    </Suspense>
  );
}
