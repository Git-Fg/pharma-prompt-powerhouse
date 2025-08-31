# Architecture des Types

Ce dossier contient l'organisation des types TypeScript de l'application.

## 🏗️ Structure

```
src/types/
├── index.ts          # Point d'entrée principal - ré-exporte tout
├── content.ts        # Types générés par content-collections
├── app.ts            # Types partagés spécifiques à l'application
└── README.md         # Cette documentation
```

## 📋 Philosophie d'Organisation

### 1. **Source de Vérité Unique pour le Contenu**

- Les types générés par `content-collections` sont la référence absolue
- **Ne jamais** redéfinir ces types ailleurs
- Utiliser `src/types/content.ts` comme point d'entrée

### 2. **Co-localisation des Props de Composants**

- Les types spécifiques à un composant (comme ses props) doivent vivre **dans le même fichier**
- Exemple : `PromptCardProps` est défini dans `PromptCard.tsx`
- **Principe** : "Tout ce qui est lié reste ensemble"

### 3. **Types Globaux Partagés**

- Le dossier `src/types/` est réservé aux types **partagés et réutilisés**
- Ces types doivent être utilisés à **plusieurs endroits** de l'application

## 🔄 Utilisation

### Import des Types de Contenu

```typescript
import type { Prompt, Guide, Philosophy } from '@/types/content';
```

### Import des Types Applicatifs

```typescript
import type { SearchResult, FilterOptions } from '@/types/app';
```

### Import de Tout (déconseillé, mais disponible)

```typescript
import type { Prompt, SearchResult } from '@/types';
```

## 📝 Ajouter un Nouveau Type

### Question à se poser : "Où ce type sera-t-il utilisé ?"

1. **Un seul composant** → Co-localiser dans le fichier du composant
2. **Plusieurs composants** → Ajouter dans `src/types/app.ts`
3. **Structure de contenu MDX** → Utiliser les types générés par `content-collections`

### Exemple d'ajout dans `app.ts`

```typescript
// Types pour la gestion des utilisateurs
export interface User {
  id: string;
  name: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  language: 'fr' | 'en';
}
```

## 🚫 Ce qu'il ne faut PAS faire

- ❌ Redéfinir des types déjà générés par `content-collections`
- ❌ Mettre des types de props de composants dans `src/types/`
- ❌ Créer des types "fourre-tout" sans responsabilité claire
- ❌ Utiliser `any` ou `unknown` sans justification

## ✅ Bonnes Pratiques

- ✅ Utiliser des noms explicites et descriptifs
- ✅ Documenter les types complexes avec des commentaires JSDoc
- ✅ Préférer les `interface` pour les objets, les `type` pour les unions/intersections
- ✅ Utiliser des types littéraux pour les valeurs constantes
- ✅ Éviter les types trop larges, privilégier la spécificité
