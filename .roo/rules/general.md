<context>
Projet étudiant spécialisé en ingénierie de prompts pharmaceutiques avec Next.js 15, React 19, shadcn/ui 3.0 et TypeScript. Conçu pour aider d'autres étudiants à apprendre l'ingénierie de prompts à travers des guides, principes, prompts et outils interactifs.
Le projet doit être en Français, mais n'hésite pas à utiliser des anglicisme lorsque cela décrit plus précisément certains concepts (comme token, prompt engineering, context engineering...)

Technologies clés:

- Next.js 15 avec App Router (pas de cache par défaut, APIs async)
- React 19 (Actions, useOptimistic, useActionState, use())
- shadcn/ui 3.0 (registres namespacés, MCP Server)
- eslint 9 avec flat config
- Content Collections avec schémas Zod
- TypeScript pour la sécurité des types

Priorités: simplicité, clarté, maintenabilité et accessibilité pour les non-développeurs.
</context>

<react19_rules>
**Compiler et optimisation:**

- Expérimenter avec React Compiler (expérimental) mais ne pas y faire confiance aveuglément
- Écrire du code simple et lisible que le compiler peut optimiser
- Éviter useMemo/useCallback manuels sauf besoins spécifiques

**Actions et formulaires:**

- Utiliser Actions React 19 pour la gestion des formulaires
- Préférer useActionState pour la gestion d'état des formulaires
- Utiliser useOptimistic pour les mises à jour optimistes
- Utiliser useFormStatus dans les composants de design pour accéder à l'état du formulaire parent

**Gestion des données:**

- Utiliser le hook `use()` pour lire les promesses et le contexte (peut être utilisé conditionnellement)
- Combiner `use()` avec Suspense pour un code asynchrone propre
- Ne pas utiliser `use()` avec des promesses créées dans le render

**Nouvelles fonctionnalités:**

- Utiliser le support natif des métadonnées (title, meta, link) directement dans les composants
- Utiliser les stylesheets natifs avec la propriété `precedence`
  </react19_rules>

<nextjs15_rules>
**App Router:**

- Utiliser exclusivement l'App Router avec structure basée sur les fichiers
- Modèle de route: `src/app/[feature]/page.tsx`
- Utiliser `"use client"` uniquement pour les composants interactifs

**Cache (IMPORTANT):**

- Les requêtes `fetch`, Route Handlers `GET` et navigations client ne sont PLUS cachées par défaut
- Utiliser `export dynamic = 'force-static'` pour activer le cache quand nécessaire
- Configurer explicitement le cache pour les données qui doivent être mises en cache

**APIs Async:**

- Utiliser `await` pour cookies(), headers(), draftMode(), params, searchParams
- Ces APIs sont maintenant asynchrones - ne pas y accéder de manière synchrone

**Nouvelles fonctionnalités:**

- Utiliser `@next/codemod` pour les mises à niveau automatisées
- Expérimenter avec `unstable_after` pour exécuter du code après le streaming
- Utiliser `instrumentation.js` pour l'observabilité du cycle de vie serveur
- Utiliser `next.config.ts` pour la configuration TypeScript
  </nextjs15_rules>

<shadcn_ui_rules>
**Version 3.0:**

- Utiliser les registres namespacés: `@registry/name`
- Configurer plusieurs registres dans `components.json`
- Profiter du MCP Server pour l'intégration avec les outils d'IA
- Utiliser les nouvelles commandes de recherche et découverte

**Utilisation des composants:**

- Utiliser les composants shadcn/ui tels quels, sans sur-personnalisation
- Combiner les composants simplement avec la composition
- Utiliser les fonctionnalités d'accessibilité intégrées

**Formulaires:**

- Utiliser les composants de formulaire shadcn/ui
- Intégrer avec les Actions React 19 pour la soumission
- Garder la logique de validation simple et proche du formulaire
  </shadcn_ui_rules>

<content_collections_rules>
**Philosophie : Le Build est la Source de Vérité**

- Toute la logique de préparation des données (ajout de slugs, calculs, relations) DOIT se faire dans `content-collections.ts` via la fonction `transform`.
- Les composants React doivent être "stupides" : ils consomment des données déjà prêtes et parfaitement typées, sans faire de transformations complexes (comme chercher des relations manuellement).

**Configuration (`content-collections.ts`):**

- **Ordre des Dépendances :** Déclarer les collections sans dépendances (ex: `concepts`) AVANT les collections qui en dépendent (ex: `guides`).
- **`transform` est la clé :** Utiliser systématiquement la fonction `transform` pour :
  - Ajouter des champs calculés (ex: `slug`, `estimatedTime`).
  - **Relier les collections** en utilisant `ctx.documents(collectionVariable)` pour remplacer les tableaux de slugs par des tableaux d'objets complets.
- **Sécurité des Types dans `transform` :**
  - Toujours typer les paramètres des fonctions `transform` (ex: `async (doc: DocType, ctx: Context) => ...`).
  - Utiliser `z.infer<typeof schema>` pour créer des types TypeScript précis pour chaque collection avant la transformation.
- **Filtrage au Build :** Utiliser `ctx.skip("raison")` dans `transform` pour exclure des documents (ex: brouillons avec `draft: true`).

**Schémas Zod:**

- Créer un `baseSchema` réutilisable.
- Rendre les champs calculés par `transform` (ex: `estimatedTime`) optionnels avec `.optional()` dans le schéma.

**Utilisation dans le Code :**

- Importer les collections directement depuis `"content-collections"`.
- Faire confiance aux types générés : si `guide.concepts` est typé comme `Concept[]`, c'est un tableau d'objets, pas de `string`.
  </content_collections_rules>

<typescript_rules>
**Sécurité des Types :**

- La source de vérité pour les types de contenu est le dossier `.content-collections/generated`. Ne JAMAIS créer de types manuels comme `GuideWithSlug`.
- **Inférence de Type avec Zod :** Utiliser `z.infer<typeof schema>` dans `content-collections.ts` pour typer les documents avant leur transformation.
- **Typage des Fonctions `transform` :** Importer `Context` et les types de documents inférés pour typer les fonctions de transformation.
- **Diagnostic :** En cas d'erreur de type liée au contenu, le premier réflexe est de :
  1.  Vérifier `content-collections.ts`.
  2.  Relancer le build (`pnpm dev`) pour régénérer les types.
  3.  Redémarrer le serveur TS de l'éditeur si nécessaire.

**Typage des Composants :**

- Utiliser des interfaces de props simples.
- Importer les types (`Guide`, `Concept`, etc.) directement depuis `"content-collections"` ou `@/types` pour les props des composants.
  </typescript_rules>

<general_rules>
**Philosophie:**

- Toujours choisir la solution la plus simple qui fonctionne
- Prioriser la compréhension et la maintenabilité plutôt que la sophistication
- Suivre le principe YAGNI (You Aren't Gonna Need It)
- C'est un projet d'apprentissage, pas une application d'entreprise

**Code:**

- Écrire des composants petits et concentrés qui font bien une seule chose
- Utiliser des noms descriptifs qui racontent une histoire
- Structurer le code pour qu'il se lise comme un récit
- Privilégier la lisibilité plutôt que la finesse

**Gestion d'état:**

- Commencer avec useState pour l'état local
- Utiliser useContext pour partager l'état entre composants proches
- Utiliser useReducer uniquement pour la logique d'état complexe
- Éviter les solutions de gestion d'état complexes pour des besoins simples

**Performance:**

- Faire confiance aux optimisations automatiques de React 19
- **Déplacer la logique de données vers le build** (via `content-collections`) est la meilleure optimisation de performance pour ce projet.
- Éviter l'optimisation prématurée.

**Dépendances:**

- Garder les dépendances minimales
- N'ajouter des bibliothèques que lorsqu'elles résolvent un problème réel
- Préférer les fonctionnalités intégrées aux solutions externes

**Documentation:**

- Écrire des commentaires qui expliquent le "pourquoi" derrière les décisions
- Garder la documentation concise mais utile
- Documenter chaque variable et template avec des exemples concrets

**Accessibilité:**

- Concevoir pour les non-développeurs en premier
- Créer des interfaces guidées et intuitives
- Utiliser les fonctionnalités d'accessibilité intégrées de shadcn/ui

**Contenu:**

- Prioriser la qualité et la clarté du contenu pharmaceutique
- Utiliser des exemples réels et des cas pratiques pertinents
- Standardiser le format des variables: `{{nom_variable}}`
  </general_rules>

<instructions>
DO utiliser la première personne ("je") pour les explications personnelles
DO maintenir un ton professionnel mais abordable
DO suivre le principe YAGNI - ne construire que ce qui est nécessaire maintenant
DO utiliser la fonction `transform` de Content Collections pour enrichir les données au build
DO faire confiance aux types générés par Content Collections comme source de vérité
DO relancer le build après avoir modifié `content-collections.ts`
DO utiliser les Actions React 19, useOptimistic, et useActionState pour les formulaires
DO comprendre que Next.js 15 ne met plus rien en cache par défaut
DO écrire du code facile à expliquer aux autres étudiants

DO NOT sur-ingénier les solutions ou ajouter une complexité inutile
DO NOT effectuer de logique de liaison de données (ex: `guides.map(...)` pour trouver des concepts) au runtime. C'est le rôle du build.
DO NOT créer de types manuels pour le contenu (ex: `GuideWithSlug`).
DO NOT supposer que les données sont mises en cache par défaut dans Next.js 15
DO NOT sacrifier la clarté pour la sophistication technique

En cas de doute, se référer à la documentation officielle de React 19, Next.js 15, et Content Collections.
</instructions>
