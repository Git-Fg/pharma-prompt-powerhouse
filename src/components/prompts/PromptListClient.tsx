'use client';

import { useState } from 'react';
import { allPrompts } from 'content-collections';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { PromptCard } from '@/components/prompts/PromptCard';

type Prompt = (typeof allPrompts)[0];

interface PromptListProps {
  initialPrompts: Prompt[];
}

const categoryLabels: { [key: string]: string } = {
  'rédaction-médicale': 'Rédaction Médicale',
  'analyse-de-données': 'Analyse de Données',
  'formation-et-éducation': 'Formation et Éducation',
  'optimisation-de-processus': 'Optimisation de Processus',
};

const difficultyLabels: { [key: string]: string } = {
  débutant: 'Débutant',
  intermédiaire: 'Intermédiaire',
  avancé: 'Avancé',
};

export function PromptListClient({ initialPrompts }: PromptListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const filteredPrompts = initialPrompts.filter(prompt => {
    const matchesSearch =
      prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || prompt.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === 'all' || prompt.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const categories = [
    'all',
    ...Array.from(new Set(initialPrompts.map(p => p.category))),
  ];
  const difficulties = [
    'all',
    ...Array.from(new Set(initialPrompts.map(p => p.difficulty))),
  ];

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 max-w-4xl mx-auto mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Rechercher un prompt..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full lg:w-[240px]">
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category === 'all'
                  ? 'Toutes les catégories'
                  : categoryLabels[category] || category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={selectedDifficulty}
          onValueChange={setSelectedDifficulty}
        >
          <SelectTrigger className="w-full lg:w-[180px]">
            <SelectValue placeholder="Difficulté" />
          </SelectTrigger>
          <SelectContent>
            {difficulties.map(difficulty => (
              <SelectItem key={difficulty} value={difficulty}>
                {difficulty === 'all'
                  ? 'Toutes les difficultés'
                  : difficultyLabels[difficulty] || difficulty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrompts.map(prompt => (
          <PromptCard
            key={prompt.slug}
            title={prompt.title}
            description={prompt.description}
            difficulty={prompt.difficulty}
            estimatedTime={prompt.estimatedTime || 'N/A'}
            tags={prompt.tags.map(t => t.name)}
            icon={prompt.icon}
            onUse={() => {}}
          />
        ))}
      </div>
    </>
  );
}