<project_philosophy>
**Philosophie du Projet : Simplicité et Apprentissage**

- **Simplicité avant tout :** Toujours choisir la solution la plus simple qui fonctionne. La clarté prime sur la sophistication.
- **Objectif Pédagogique :** Ce projet est un outil d'apprentissage pour d'autres étudiants, pas une application d'entreprise complexe.
- **Principe YAGNI (You Aren't Gonna Need It) :** Ne construire que ce qui est strictement nécessaire pour les fonctionnalités actuelles. Éviter l'ingénierie prématurée.
- **Maintenabilité :** Écrire du code et créer du contenu que n'importe qui dans l'équipe peut comprendre et modifier facilement.
</project_philosophy>

<content_rules>
**Règles du Contenu : Le Cœur du Projet**

- **Public Cible : Non-Développeurs Uniquement.** Le jargon technique lié au développement (API, RAG, etc.) est à proscrire. Le focus est sur l'ingénierie de prompts pharmaceutiques.
- **Approche "WebUI First" :** Tous les guides et tutoriels doivent se baser sur des interfaces web accessibles (ChatGPT, Google AI Studio, chat.z.ai, etc.). Aucun guide ne doit nécessiter d'écrire la moindre ligne de code.
- **Valoriser les "Playgrounds" et "Studios" :** Présenter les interfaces avancées (OpenAI Playground, Anthropic Console, Google AI Studio) comme des outils d'exploration pour non-développeurs, permettant de manipuler des paramètres comme le `system prompt` ou la `température` sans coder.
- **Clarté et Pertinence :** Prioriser la qualité du contenu pharmaceutique. Utiliser des exemples réels et des cas pratiques pour illustrer les concepts.
- **Standardisation :** Toujours utiliser le format `{{nom_variable}}` pour les variables dans les prompts afin de garantir la cohérence.
</content_rules>

<coding_style_and_principles>
**Principes et Style de Code**

- **Composants Ciblés :** Écrire des composants petits et spécialisés qui n'ont qu'une seule responsabilité.
- **Lisibilité du Code :** Utiliser des noms de variables et de fonctions descriptifs. Le code doit se lire comme une histoire et expliquer ses intentions.
- **Gestion d'État Progressive :**
  - Commencer avec `useState` pour l'état local.
  - Utiliser `useContext` pour un partage simple entre composants.
  - Réserver `useReducer` pour les logiques d'état réellement complexes.
- **Performance Intelligente :**
  - La meilleure optimisation est de **déplacer la logique vers le build** avec Content Collections.
  - Faire confiance aux optimisations automatiques de React 19 et éviter l'optimisation prématurée.
- **Dépendances Minimales :** N'ajouter une bibliothèque que si elle résout un problème réel qu'une fonctionnalité native ne peut pas couvrir.
- **Documentation Utile :** Commenter le "pourquoi" derrière les choix de code complexes, pas le "comment".
</coding_style_and_principles>

<user_experience_and_accessibility>
**Expérience Utilisateur et Accessibilité**

- **Conception Centrée sur l'Utilisateur :** Concevoir chaque interface en pensant d'abord aux étudiants non-développeurs.
- **Guidage et Intuitivité :** Créer des parcours et des outils interactifs qui sont simples à comprendre et à utiliser sans explication préalable.
- **Tirer parti de l'Accessibilité Native :** Utiliser systématiquement les fonctionnalités d'accessibilité (ARIA, gestion du focus, etc.) intégrées dans shadcn/ui pour garantir que le site est utilisable par tous.
</user_experience_and_accessibility>

---
### **Règles Techniques Spécifiques**
---

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

<instructions>
DO utiliser la première personne ("je") pour les explications personnelles, mais pas besoin d'appuyer trop le "je", les contenus en eux-même peuvent inclure des instructions sans référence personnelle.
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
