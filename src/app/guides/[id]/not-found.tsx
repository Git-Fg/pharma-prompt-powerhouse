import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className='container mx-auto px-4 py-16'>
      <div className='text-center max-w-2xl mx-auto'>
        <div className='w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6'>
          <Search className='w-8 h-8 text-muted-foreground' />
        </div>

        <h1 className='text-3xl font-bold mb-4'>Guide non trouvé</h1>

        <p className='text-lg text-muted-foreground mb-8'>
          Le guide que vous recherchez n'existe pas ou a été déplacé. Vérifiez
          l'URL ou explorez nos autres guides disponibles.
        </p>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button asChild size='lg'>
            <Link href='/guides'>
              <ArrowLeft className='w-4 h-4 mr-2' />
              Retour aux guides
            </Link>
          </Button>

          <Button variant='outline' size='lg' asChild>
            <Link href='/'>Accueil</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
