'use client';

import { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  Input,
} from '@/components/ui';
import {
  Copy,
  Check,
  Search,
  Filter,
  Sparkles,
  BookOpen,
  Lightbulb,
  Target,
  TrendingUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  createdAt: string;
  usageCount: number;
}

interface PromptListProps {
  prompts: Prompt[];
  className?: string;
}

const categoryIcons = {
  clinical: BookOpen,
  research: Lightbulb,
  education: Target,
  analysis: TrendingUp,
  general: Sparkles,
};

export function PromptList({ prompts, className }: PromptListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  const copyToClipboard = async (content: string, promptId: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedPromptId(promptId);
      setTimeout(() => setCopiedPromptId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Le React Compiler optimisera automatiquement ce calcul
  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch =
      prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.tags.some(tag =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === 'all' || prompt.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === 'all' || prompt.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const categories = Array.from(new Set(prompts.map(p => p.category)));
  const difficulties = ['beginner', 'intermediate', 'advanced'];

  return (
    <div className={cn('space-y-6', className)}>
      {/* Filtres et recherche */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Search className='h-5 w-5' />
            Rechercher et filtrer
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          {/* Barre de recherche */}
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              placeholder='Rechercher par titre, description ou tags...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className='pl-10'
            />
          </div>

          {/* Filtres */}
          <div className='flex flex-wrap gap-2'>
            <div className='flex items-center gap-2'>
              <Filter className='h-4 w-4 text-muted-foreground' />
              <span className='text-sm text-muted-foreground'>Catégorie:</span>
            </div>
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size='sm'
              onClick={() => setSelectedCategory('all')}
            >
              Toutes
            </Button>
            {categories.map(category => {
              const Icon =
                categoryIcons[category as keyof typeof categoryIcons] ||
                Sparkles;
              return (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? 'default' : 'outline'
                  }
                  size='sm'
                  onClick={() => setSelectedCategory(category)}
                  className='flex items-center gap-2'
                >
                  <Icon className='h-3 w-3' />
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              );
            })}
          </div>

          <div className='flex flex-wrap gap-2'>
            <span className='text-sm text-muted-foreground'>Difficulté:</span>
            <Button
              variant={selectedDifficulty === 'all' ? 'default' : 'outline'}
              size='sm'
              onClick={() => setSelectedDifficulty('all')}
            >
              Toutes
            </Button>
            {difficulties.map(difficulty => (
              <Button
                key={difficulty}
                variant={
                  selectedDifficulty === difficulty ? 'default' : 'outline'
                }
                size='sm'
                onClick={() => setSelectedDifficulty(difficulty)}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Résultats */}
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-semibold'>
            Prompts trouvés ({filteredPrompts.length})
          </h3>
          {searchTerm ||
          selectedCategory !== 'all' ||
          selectedDifficulty !== 'all' ? (
            <Button
              variant='ghost'
              size='sm'
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedDifficulty('all');
              }}
            >
              Effacer les filtres
            </Button>
          ) : null}
        </div>

        {filteredPrompts.length === 0 ? (
          <Card>
            <CardContent className='pt-6 text-center'>
              <Sparkles className='mx-auto h-12 w-12 text-muted-foreground mb-4' />
              <p className='text-muted-foreground'>
                Aucun prompt trouvé avec ces critères.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {filteredPrompts.map(prompt => {
              const Icon =
                categoryIcons[prompt.category as keyof typeof categoryIcons] ||
                Sparkles;
              return (
                <Card
                  key={prompt.id}
                  className='group hover:shadow-lg transition-all duration-200'
                >
                  <CardHeader className='pb-3'>
                    <div className='flex items-start justify-between'>
                      <div className='flex items-center gap-2'>
                        <Icon className='h-4 w-4 text-primary' />
                        <Badge variant='secondary' className='text-xs'>
                          {prompt.category}
                        </Badge>
                      </div>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity'
                        onClick={() =>
                          copyToClipboard(prompt.content, prompt.id)
                        }
                        aria-label='Copier le prompt'
                      >
                        {copiedPromptId === prompt.id ? (
                          <Check className='h-4 w-4 text-green-600' />
                        ) : (
                          <Copy className='h-4 w-4' />
                        )}
                      </Button>
                    </div>
                    <CardTitle className='text-base leading-tight'>
                      {prompt.title}
                    </CardTitle>
                    <CardDescription className='text-sm line-clamp-2'>
                      {prompt.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='pt-0'>
                    <div className='flex items-center justify-between text-xs text-muted-foreground'>
                      <Badge
                        variant={
                          prompt.difficulty === 'beginner'
                            ? 'default'
                            : prompt.difficulty === 'intermediate'
                              ? 'secondary'
                              : 'destructive'
                        }
                        className='text-xs'
                      >
                        {prompt.difficulty}
                      </Badge>
                      <span>Utilisé {prompt.usageCount} fois</span>
                    </div>
                    <div className='flex flex-wrap gap-1 mt-3'>
                      {prompt.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant='outline' className='text-xs'>
                          {tag}
                        </Badge>
                      ))}
                      {prompt.tags.length > 3 && (
                        <Badge variant='outline' className='text-xs'>
                          +{prompt.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
