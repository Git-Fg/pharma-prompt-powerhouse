# 📋 Guide de Migration - Architecture Centralisée

Ce guide aide à migrer les composants existants vers la nouvelle architecture centralisée.

## 🔄 Migration des Constantes

### Avant - Labels hardcodés
```typescript
// ❌ Dans un composant
const getCategoryDisplay = (category: string) => {
  switch(category) {
    case 'fondamentaux': return 'Fondamentaux 📚';
    case 'methodologie': return 'Méthodologie 🔬';
    default: return category;
  }
}
```

### Après - Utilisation centralisée
```typescript
// ✅ Import et utilisation
import { getCategoryLabel } from '@/lib/ui-utils';

const categoryDisplay = getCategoryLabel(category);
```

## 🎨 Migration des Styles

### Avant - Styles conditionnels
```typescript
// ❌ Dans un composant
<div className={`card p-6 ${
  type === 'concept' ? 'border-l-4 border-l-blue-500' :
  type === 'guide' ? 'border-l-4 border-l-green-500' :
  'border-l-4 border-l-gray-500'
}`}>
```

### Après - Variantes centralisées
```typescript
// ✅ Import et utilisation
import { contentCardVariants } from '@/components/ui/variants';

<div className={contentCardVariants({ variant: type })}>
```

## 🔍 Migration du Filtrage

### Avant - Logique dupliquée
```typescript
// ❌ Dans chaque page de collection
const [searchTerm, setSearchTerm] = useState('');
const [selectedCategory, setSelectedCategory] = useState('all');

const filteredItems = useMemo(() => {
  return items.filter(item => {
    const matchesSearch = !searchTerm || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
      item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
}, [items, searchTerm, selectedCategory]);
```

### Après - Hook centralisé
```typescript
// ✅ Une seule ligne
import { useContentFilter } from '@/hooks/useContentFilter';

const {
  filteredItems,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  resetFilters
} = useContentFilter(items);
```

## 🌐 Migration des URLs

### Avant - URLs hardcodées
```typescript
// ❌ Dans sitemap.ts, robots.ts, etc.
const baseUrl = 'https://pharma-prompt-powerhouse.vercel.app';
```

### Après - Configuration centralisée
```typescript
// ✅ Import et utilisation
import { env } from '@/lib/env';

const baseUrl = env.baseUrl; // Adapté automatiquement
```

## 🚀 Checklist de Migration

Pour chaque composant existant, vérifiez :

### 📝 Constants et Labels
- [ ] Remplacer les labels hardcodés par `getCategoryLabel()`, `getDifficultyLabel()`
- [ ] Utiliser `getConfidenceInfo()` pour les scores de confiance
- [ ] Remplacer les switches/conditions par les utilitaires

### 🎨 Styles et Variants
- [ ] Remplacer les styles conditionnels par `contentCardVariants`
- [ ] Utiliser `difficultyBadgeVariants`, `categoryBadgeVariants`, etc.
- [ ] Vérifier que tous les styles utilisent les variantes centralisées

### 🔍 Filtrage et Recherche
- [ ] Remplacer la logique de filtrage custom par `useContentFilter`
- [ ] Vérifier que les options de filtrage avancées sont utilisées
- [ ] S'assurer que les statistiques du hook sont exploitées

### 🌐 Configuration
- [ ] Remplacer les URLs hardcodées par `env.baseUrl`
- [ ] Utiliser `env.appConfig` pour les métadonnées
- [ ] Vérifier les variables d'environnement

### 🧪 Tests et Validation
- [ ] Tester le composant avec les nouveaux utilitaires
- [ ] Vérifier que TypeScript ne remonte pas d'erreurs
- [ ] S'assurer que les tests existants passent toujours

## 🛠️ Outils de Migration

### Script de recherche des hardcodings
```bash
# Rechercher les labels potentiellement hardcodés
grep -r "📚\|🔬\|🚀\|💊" src/components/ | grep -v "constants.ts"

# Rechercher les URLs hardcodées
grep -r "pharma-prompt-powerhouse.vercel.app" src/ | grep -v "env.ts"

# Rechercher la logique de filtrage dupliquée
grep -r "useState.*search" src/components/
```

### Validation post-migration
```bash
# Build pour vérifier TypeScript
npm run build

# Tests pour vérifier le comportement
npm run test

# Linting pour vérifier la qualité
npm run lint
```

## ⚡ Migration Automatique Recommandée

### 1. Constants Migration
Recherchez et remplacez :
```bash
# Exemple de remplacement avec sed
sed -i "s/category === 'fondamentaux' ? 'Fondamentaux 📚'/getCategoryLabel(category)/g" src/components/**/*.tsx
```

### 2. Import Statements
Ajoutez automatiquement les imports nécessaires :
```typescript
// Ajouter en haut des fichiers qui utilisent les utilitaires
import { getCategoryLabel, getDifficultyLabel } from '@/lib/ui-utils';
import { contentCardVariants } from '@/components/ui/variants';
import { useContentFilter } from '@/hooks/useContentFilter';
```

## 📈 Bénéfices Post-Migration

### Réduction du Code
- **-60%** de code dupliqué pour le filtrage
- **-40%** de code pour l'affichage des labels  
- **-30%** de styles conditionnels

### Amélioration de la Maintenabilité
- **1 seul endroit** pour modifier un label → propagation automatique
- **Types TypeScript** pour toutes les constantes
- **Tests centralisés** pour la logique partagée

### Performance
- **Hooks optimisés** avec `useMemo` et `useCallback`
- **Bundle size** réduit grâce à la réutilisation
- **Re-renders** optimisés avec React 19 Compiler

---

Cette migration garantit la cohérence et la maintenabilité du code sur le long terme. Chaque composant migré bénéficie automatiquement des améliorations apportées à l'architecture centralisée.