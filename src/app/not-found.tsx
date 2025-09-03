import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className='container mx-auto px-4 py-16 text-center'>
      <div className='max-w-2xl mx-auto'>
        <div className='w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6'>
          <Search className='size-8 text-muted-foreground' />
        </div>

        <h1 className='text-4xl font-bold tracking-tight text-foreground sm:text-5xl'>
          Page non trouvée
        </h1>

        <p className='mt-6 text-lg leading-8 text-muted-foreground'>
          Désolé, nous n'avons pas trouvé la page que vous recherchez.
        </p>

        <div className='mt-10 flex items-center justify-center gap-x-6'>
          <Button asChild>
            <Link href='/'>
              <ArrowLeft className='size-4 mr-2' />
              Retour à l'accueil
            </Link>
          </Button>
          <Button variant='ghost' asChild>
            <Link href='/guides'>Voir tous les guides</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
