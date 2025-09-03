// src/app/boite-a-outils/prompt-editor/page.tsx

'use client';

import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
// ✅ MODIFICATION : Importer le bon composant
import { PromptEditor } from '@/components/prompts/PromptEditor';

function PromptEditorContent() {
  const router = useRouter();

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
              <ArrowLeft className='size-4 mr-2' />
              Retour aux outils
            </Button>
            <div className='flex-1'>
              <h1 className='text-3xl font-bold'>✏️ Éditeur de Prompts</h1>
              <p className='text-muted-foreground mt-2'>
                Créez et personnalisez vos prompts. Les templates sont maintenant intégrés dans nos workflows.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <PromptEditor />
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