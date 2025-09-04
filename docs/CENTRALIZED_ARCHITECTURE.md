# 🏗️ Architecture Centralisée - Guide du Développeur

Ce document explique l'architecture centralisée mise en place pour garantir la maintenabilité du projet **Pharma Prompt Powerhouse**.

## 📋 Vue d'ensemble

L'architecture suit le principe **DRY (Don't Repeat Yourself)** et centralise toutes les constantes, configurations et logiques partagées dans des fichiers dédiés.

## 🎯 Fichiers Centraux

### 1. `/src/lib/constants.ts` - Source de Vérité Unique

**Responsabilité** : Centralise toutes les constantes de contenu (labels, catégories, difficultés, etc.)

```typescript
// ✅ FAIRE - Utiliser les constantes centralisées
import { getCategoryLabel, getDifficultyLabel } from '@/lib/ui-utils'

const categoryDisplay = getCategoryLabel(guide.category)
const difficultyDisplay = getDifficultyLabel(guide.difficulty)
```

```typescript
// ❌ ÉVITER - Hardcoder les labels
const categoryDisplay = guide.category === 'fondamentaux' ? 'Fondamentaux 📚' : guide.category
```

### 2. `/src/lib/env.ts` - Configuration d'Environnement

**Responsabilité** : Gère les variables d'environnement avec des fallbacks sécurisés

```typescript
// ✅ FAIRE - Utiliser la configuration centralisée
import { env } from '@/lib/env'

const baseUrl = env.baseUrl // Adapté automatiquement selon l'environnement
```

```typescript
// ❌ ÉVITER - Hardcoder les URLs
const baseUrl = 'https://pharma-prompt-powerhouse.vercel.app'
```

### 3. `/src/hooks/useContentFilter.ts` - Logique de Filtrage

**Responsabilité** : Centralise toute la logique de filtrage pour les collections de contenu

```typescript
// ✅ FAIRE - Utiliser le hook centralisé
const { filteredItems, searchTerm, setSearchTerm, resetFilters } = useContentFilter(guides)
```

```typescript
// ❌ ÉVITER - Dupliquer la logique de filtrage
const [searchTerm, setSearchTerm] = useState('')
const filteredItems = guides.filter(guide =>
  guide.title.toLowerCase().includes(searchTerm.toLowerCase())
)
```

### 4. `/src/components/ui/variants.ts` - Styles Centralisés

**Responsabilité** : Centralise les variantes de style avec `class-variance-authority`

```typescript
// ✅ FAIRE - Utiliser les variantes centralisées
import { contentCardVariants } from '@/components/ui/variants';

<div className={contentCardVariants({ variant: 'concept', size: 'compact' })}>
```

```typescript
// ❌ ÉVITER - Styles conditionnels inline
<div className={`card ${type === 'concept' ? 'border-l-blue-500' : 'border-l-gray-500'}`}>
```

### 5. `/src/lib/ui-utils.ts` - Utilitaires d'Interface

**Responsabilité** : Fonctions utilitaires pour l'affichage et la manipulation des données

## 🔧 Bonnes Pratiques

### Ajouter une Nouvelle Catégorie

1. **Mise à jour de `/src/lib/constants.ts`** :
```typescript
export type Category
  = | 'fondamentaux'
    | 'ma-nouvelle-categorie' // ← Ajouter ici

export const categoryLabels = {
  'fondamentaux': 'Fondamentaux 📚',
  'ma-nouvelle-categorie': 'Ma Nouvelle Catégorie 🆕', // ← Et ici
}
```

2. **La nouvelle catégorie sera automatiquement disponible** :
   - Dans les filtres de tous les composants
   - Dans les badges avec les bonnes couleurs
   - Dans le système de navigation
   - Dans les types TypeScript

### Ajouter un Nouveau Filtre

1. **Étendre le hook `useContentFilter`** :
```typescript
// Dans useContentFilter.ts
const [newFilter, setNewFilter] = useState('all')

// Dans la logique de filtrage
const matchesNewFilter = newFilter === 'all' || item.someProperty === newFilter
```

2. **Le nouveau filtre sera disponible pour tous les composants** qui utilisent le hook.

### Ajouter une Nouvelle Variante de Style

1. **Étendre `/src/components/ui/variants.ts`** :
```typescript
export const contentCardVariants = cva(
  'base-classes',
  {
    variants: {
      variant: {
        'concept': 'border-l-blue-500',
        'ma-nouvelle-variante': 'border-l-pink-500', // ← Ajouter ici
      }
    }
  }
)
```

## 🚀 Workflow de Développement

### 1. Avant d'Ajouter du Code

```bash
# Vérifier si une constante/utilitaire existe déjà
grep -r "votre_concept" src/lib/
```

### 2. Tester Vos Changements

```bash
# Build
npm run build

# Tests
npm run test

# Linting
npm run lint
```

### 3. Validation

- [ ] Les constantes sont centralisées dans `/src/lib/constants.ts`
- [ ] Les variables d'environnement utilisent `/src/lib/env.ts`
- [ ] La logique de filtrage réutilise `useContentFilter`
- [ ] Les styles utilisent les variantes de `/src/components/ui/variants.ts`
- [ ] Aucun hardcoding dans les composants
- [ ] Les tests passent
- [ ] Le linter ne remonte pas d'erreurs

## 🎯 Avantages de cette Architecture

### ✅ Maintenabilité
- **Un seul endroit à modifier** pour changer un label ou une configuration
- **Propagation automatique** des changements dans toute l'application

### ✅ Cohérence
- **Styles uniformes** grâce aux variantes centralisées
- **Comportements identiques** grâce aux hooks partagés

### ✅ Sécurité de Type
- **Validation TypeScript** automatique pour toutes les constantes
- **Autocomplétion** dans l'IDE pour tous les développeurs

### ✅ Performance
- **Réutilisation du code** réduit la taille du bundle
- **Hooks optimisés** avec `useMemo` et `useCallback`

## 🔍 Points de Vigilance

### ❌ Ce qu'il ne faut PAS faire

1. **Hardcoder des valeurs** qui pourraient être centralisées
2. **Dupliquer la logique** déjà présente dans les hooks
3. **Créer des styles** sans vérifier les variantes existantes
4. **Ignorer les utilitaires** de `/src/lib/ui-utils.ts`

### ✅ Ce qu'il faut FAIRE

1. **Vérifier les fichiers centraux** avant de créer du nouveau code
2. **Étendre les utilitaires existants** plutôt que de recréer
3. **Utiliser TypeScript** pour valider les types
4. **Tester les changements** avant de les committez

## 📚 Ressources

- [Documentation class-variance-authority](https://cva.style/docs)
- [Guide des hooks React](https://react.dev/reference/react)
- [Principes DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)

---

Cette architecture garantit que le projet reste maintenable et évolutif, même avec une équipe grandissante. Chaque ajout suit des patterns établis et bénéficie automatiquement de toute l'infrastructure existante.
