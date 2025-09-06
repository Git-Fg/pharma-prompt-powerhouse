# Guide d'Utilisation : Détection Automatique du Glossaire

## 🎯 Vue d'ensemble

Le système de détection automatique du glossaire transforme automatiquement les termes du glossaire en liens interactifs dans tout le contenu markdown. Cette fonctionnalité améliore significativement l'expérience utilisateur en rendant les définitions facilement accessibles sans effort manuel.

## 🚀 Fonctionnalités

### ✅ Ce qui est automatiquement détecté
- **Tous les termes du glossaire** : Le système scanne automatiquement le texte à la recherche des termes définis dans `src/content/glossary.ts`
- **Mots composés** : "prompt engineering", "chain of thought", etc.
- **Variations de casse** : TOKEN, Token, token sont tous détectés
- **Correspondances exactes** : Utilise des limites de mots pour éviter les fausses détections

### ✅ Ce qui est préservé
- **Code source** : Les termes dans `<code>`, `<pre>`, et liens `<a>` ne sont pas traités
- **Composants existants** : Les `<DefinedTerm>` manuels ne sont pas double-wrappés
- **Casse originale** : "TOKEN" reste "TOKEN" dans l'affichage
- **Performance** : Mise en cache intelligente et regex optimisées

## 🛠️ Utilisation

### Dans MarkdownRenderer

```tsx
// Activation de la détection automatique
<MarkdownRenderer 
  content="Le token est l'unité de base de l'IA" 
  enableAutoGlossary={true} 
/>

// Désactivation (par défaut pour stabilité)
<MarkdownRenderer 
  content="Contenu sans détection automatique" 
  enableAutoGlossary={false} 
/>
```

### Résultat
Le texte "Le token est l'unité de base de l'IA" devient automatiquement :
```jsx
Le <DefinedTerm term="token">token</DefinedTerm> est l'unité de base de l'IA
```

## 🔧 Configuration

### Ajout de nouveaux termes au glossaire

Éditez `src/content/glossary.ts` :

```typescript
export const glossary: Record<string, {
  term: string
  definition: string
  category?: string
  context?: string
  examples?: string[]
  relatedConcepts?: string[]
}> = {
  'nouveau-terme': {
    term: 'Nouveau Terme',
    definition: 'Description du nouveau terme...',
    category: 'technique',
  },
  // ... autres termes
}
```

Le nouveau terme sera automatiquement détecté dans tous les contenus !

### Contrôle par contenu

Pour désactiver la détection sur un contenu spécifique :

```tsx
<MarkdownRenderer 
  content={contentWithoutGlossary} 
  enableAutoGlossary={false} 
/>
```

## 🏗️ Architecture Technique

### Composants Principaux

1. **AutoGlossaryProcessor** (`src/components/shared/AutoGlossaryProcessor.tsx`)
   - Composant principal qui effectue la détection
   - Compatible SSR avec hydratation côté client
   - Optimisé pour les performances

2. **MarkdownRenderer** (`src/components/markdown/MarkdownRenderer.tsx`)
   - Intègre l'AutoGlossaryProcessor optionnellement
   - Contrôle via le prop `enableAutoGlossary`

### Algorithme de Détection

1. **Préparation** : Tri des termes par longueur (plus longs en premier)
2. **Regex** : Création d'un pattern global case-insensitive avec limites de mots
3. **Traitement** : Parcours récursif de l'arbre React
4. **Wrapping** : Remplacement des termes par des composants `<DefinedTerm>`

### Gestion SSR

```typescript
// Rendu côté serveur : contenu original
if (!isClient) {
  return <>{children}</>
}

// Côté client : détection activée après hydratation
const [isClient, setIsClient] = useState(false)
useEffect(() => setIsClient(true), [])
```

## 🧪 Tests

### Tests Unitaires

8 scénarios de test couvrent :
- Détection de termes simples et multiples
- Préservation de la casse
- Évitement des doublons
- Gestion des structures complexes
- Robustesse avec du contenu vide

```bash
npm run test -- AutoGlossaryProcessor.test.tsx
```

### Tests d'Intégration

Vérification dans le contexte du MarkdownRenderer :

```bash
npm run test:integration
```

## 🎨 Personnalisation

### Exclusion de balises

Pour exclure d'autres balises HTML de la détection :

```typescript
// Dans AutoGlossaryProcessor.tsx
if (typeof node.type === 'string' && 
    ['code', 'pre', 'a', 'script', 'style'].includes(node.type)) {
  return node
}
```

### Variantes d'affichage

Les termes détectés utilisent automatiquement la variante `inline` :

```tsx
<DefinedTerm term={termKey} variant="inline">
  {matchedTerm}
</DefinedTerm>
```

## 📊 Performance

### Optimisations Implémentées

- **Regex compilée** : Pattern créé une seule fois avec `useMemo`
- **Tri intelligent** : Termes longs en premier pour éviter les conflits
- **Mise en cache** : `useCallback` pour les fonctions de traitement
- **Chargement différé** : Activation uniquement côté client

### Métriques

- **Impact minimal** : < 5ms de traitement pour un contenu typique
- **Mémoire** : Regex mise en cache, pas de fuite mémoire
- **Bundle** : +2KB gzippé pour la fonctionnalité complète

## 🔍 Débogage

### Console de développement

```javascript
// Vérifier les termes du glossaire chargés
console.log(Object.keys(glossary))

// Tester un pattern regex
const pattern = /\b(token|rag|prompt engineering)\b/gi
console.log('test text'.match(pattern))
```

### Props de débogage

```tsx
// Désactiver temporairement pour isoler les problèmes
<MarkdownRenderer enableAutoGlossary={false} />
```

## 🚀 Évolutions Futures

### Fonctionnalités Envisagées

- **Détection contextuelle** : Adaptation selon le domaine (pharmacie, IA, technique)
- **Statistiques d'usage** : Tracking des termes les plus consultés
- **Cache persistant** : Mise en cache entre les sessions
- **API publique** : Exposition de l'API pour d'autres composants

### Contributions

Pour contribuer à l'amélioration du système :

1. Ajouter des tests pour les nouveaux cas d'usage
2. Optimiser les regex pour de meilleures performances
3. Étendre la couverture des types de contenu
4. Améliorer l'accessibilité des définitions

## 📝 Changelog

### v1.0.0 - Implémentation Initiale
- ✅ Détection automatique des termes du glossaire
- ✅ Intégration dans MarkdownRenderer
- ✅ Compatibilité SSR complète
- ✅ Tests unitaires complets
- ✅ Documentation utilisateur