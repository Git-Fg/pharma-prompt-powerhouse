'use client';

import { useState, useTransition } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Alert,
  AlertDescription,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import {
  Loader2,
  Sparkles,
  Copy,
  Check,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

interface PromptFormProps {
  className?: string;
  onSubmit?: (prompt: string) => void;
}

interface PromptState {
  success?: boolean;
  error?: string;
  prompt?: {
    id: string;
    title: string;
    content: string;
    category: string;
    tags: string[];
  };
}

export function PromptForm({ className, onSubmit }: PromptFormProps) {
  const [state, setState] = useState<PromptState | null>(null);
  const [isPending, startTransition] = useTransition();
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  const handleSubmit = (formData: FormData) => {
    startTransition(() => {
      const prompt = formData.get('prompt') as string;
      const category = formData.get('category') as string;

      if (!prompt.trim()) {
        setState({ error: 'Le prompt ne peut pas être vide' });
        return;
      }

      if (prompt.length < 10) {
        setState({ error: 'Le prompt doit contenir au moins 10 caractères' });
        return;
      }

      setState({
        success: true,
        prompt: {
          id: Date.now().toString(),
          title: prompt.substring(0, 50) + '...',
          content: prompt,
          category,
          tags: [],
        },
      });
    });

    // Callback optionnel
    if (onSubmit) {
      const prompt = formData.get('prompt') as string;
      onSubmit(prompt);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPrompt(text);
      setTimeout(() => setCopiedPrompt(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Formulaire principal */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Sparkles className='h-5 w-5 text-primary' />
            Créer un nouveau prompt
          </CardTitle>
          <CardDescription>
            Utilisez ce formulaire pour créer des prompts efficaces et
            réutilisables
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='category'>Catégorie</Label>
              <Select name='category' defaultValue='general'>
                <SelectTrigger>
                  <SelectValue placeholder='Sélectionnez une catégorie' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='general'>Général</SelectItem>
                  <SelectItem value='clinical'>Cas clinique</SelectItem>
                  <SelectItem value='research'>Recherche</SelectItem>
                  <SelectItem value='education'>Éducation</SelectItem>
                  <SelectItem value='analysis'>Analyse</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='prompt'>Prompt</Label>
              <Textarea
                id='prompt'
                name='prompt'
                placeholder='Entrez votre prompt ici... Utilisez des instructions claires et spécifiques pour obtenir les meilleurs résultats.'
                className='min-h-[120px] resize-y'
                required
              />
              <p className='text-xs text-muted-foreground'>
                Astuce : Soyez spécifique, incluez le contexte et définissez le
                format de sortie souhaité.
              </p>
            </div>

            <Button type='submit' disabled={isPending} className='w-full'>
              {isPending ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Génération en cours...
                </>
              ) : (
                <>
                  <Sparkles className='mr-2 h-4 w-4' />
                  Générer le prompt
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Messages d'erreur */}
      {state?.error && (
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {/* Messages de succès */}
      {state?.success && state.prompt && (
        <Alert className='border-green-500/50 bg-green-500/10'>
          <CheckCircle className='h-4 w-4 text-green-600' />
          <AlertDescription className='text-green-700 dark:text-green-400'>
            <div className='flex items-center justify-between'>
              <span>Prompt créé avec succès !</span>
              <Button
                variant='ghost'
                size='sm'
                onClick={() =>
                  state.prompt && copyToClipboard(state.prompt.content)
                }
                className='h-8 w-8 p-0'
              >
                {state.prompt && copiedPrompt === state.prompt.content ? (
                  <Check className='h-4 w-4 text-green-600' />
                ) : (
                  <Copy className='h-4 w-4' />
                )}
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
