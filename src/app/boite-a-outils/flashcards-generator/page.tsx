'use client';

import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FlashcardsGenerator } from '@/components/tools/FlashcardsGenerator';

function FlashcardsGeneratorContent() {
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
              <ArrowLeft className='w-4 h-4 mr-2' />
              Retour aux outils
            </Button>
            <div className='flex-1'>
              <h1 className='text-3xl font-bold'>Générateur de Flashcards</h1>
              <p className='text-muted-foreground mt-2'>
                Générez des cartes mémoire optimisées pour vos révisions en pharmacie
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <FlashcardsGenerator />
    </div>
  );
}

export default function FlashcardsGeneratorPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <FlashcardsGeneratorContent />
    </Suspense>
  );
}