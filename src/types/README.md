# Architecture des Types

Ce dossier contient les types globaux partagés de l'application.

## 🏗️ Structure

```
src/types/
├── index.ts          # Point d'entrée principal - ré-exporte les types importants
├── icon-taxonomy.ts  # Types et logique pour les icônes
└── README.md         # Cette documentation
```

## 📋 Philosophie d'Organisation

### 1. **Source de Vérité Unique pour le Contenu**

-   **Tous les types de contenu** (`Concept`, `Guide`, `Prompt`, etc.) sont définis via des schémas Zod dans `src/lib/content-schema.ts`.
-   Ce fichier est la **source de vérité unique**. Les types TypeScript sont inférés de ces schémas.
-   **Ne jamais** redéfinir manuellement ces types ailleurs.

### 2. **Co-localisation des Props de Composants**

-   Les types spécifiques à un composant (comme ses props) doivent vivre **dans le même fichier que le composant**.
-   Exemple : `PromptCardProps` est défini dans `PromptCard.tsx`.

### 3. **Types Globaux Partagés**

-   Ce dossier `src/types/` est réservé aux types **partagés et réutilisés à travers toute l'application** qui ne sont pas liés au contenu.
-   `index.ts` agit comme un point d'entrée pratique pour importer les types les plus courants, notamment ceux du contenu.

## 🔄 Utilisation

```typescript
// Importer un type spécifique de contenu
import type { Prompt, Guide } from '@/types';

// Importer un type de bloc de contenu
import type { ContentBlock } from '@/types';
```
