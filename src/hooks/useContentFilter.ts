// src/hooks/useContentFilter.ts
import { useState, useMemo } from 'react';

// Définition d'un type de base que tous les contenus doivent respecter.
// Cela garantit que les propriétés communes comme title, description, etc., sont disponibles.
interface BaseContent {
  title: string;
  description: string;
  category: string;
  difficulty?: string; // Made optional since not all content types have difficulty
}

// Le hook utilise maintenant un type générique `T` qui doit être au moins un `BaseContent`.
// Cela permet de travailler avec des types spécifiques (Guide, Prompt) tout en ayant une base commune.
export function useContentFilter<T extends BaseContent>(initialItems: T[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const filteredItems = useMemo(() => {
    // Pas de changements nécessaires ici, la logique reste la même.
    return initialItems.filter(item => {
      const lowerSearch = searchTerm.toLowerCase();
      
      const matchesSearch = !searchTerm ||
        item.title.toLowerCase().includes(lowerSearch) ||
        item.description.toLowerCase().includes(lowerSearch);
        
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

      // Only check difficulty if the item has a difficulty property
      const matchesDifficulty = selectedDifficulty === 'all' ||
        (item.difficulty && item.difficulty === selectedDifficulty);

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [initialItems, searchTerm, selectedCategory, selectedDifficulty]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
  };

  // Le hook retourne maintenant un tableau filtré du même type que celui passé en entrée.
  return {
    filteredItems,
    searchTerm,
    selectedCategory,
    selectedDifficulty,
    setSearchTerm,
    setSelectedCategory,
    setSelectedDifficulty,
    resetFilters,
  };
}
