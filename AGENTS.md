# **Règles Générales**

<project_philosophy>
**Philosophie du Projet : Pharma Prompt Powerhouse**
- **Ligne Directrice :** Un guide pratique de l'IA, par un étudiant pour les étudiants.
- **Posture de l'Auteur :** Je suis un étudiant, comme vous. Ce site est le carnet de bord de mon exploration. Je partage mes méthodes, mes découvertes, mes doutes et même mes échecs pour vous faire gagner du temps.
- **Humilité Intellectuelle :** Je ne prétends pas détenir de vérité absolue. Les recommandations et analyses sont basées sur mon expérience personnelle. J'encourage systématiquement à tester par soi-même.
- **Absence de Marketing :** Le site est une ressource purement informative et pédagogique. Il n'y a rien à vendre, pas de newsletter, pas de création de communauté (Discord, forum, etc.).
- **Principe YAGNI (You Aren't Gonna Need It) :** Ne construire que ce qui est strictement nécessaire pour les fonctionnalités actuelles.
- **Code Sémantique et Maintenable :** Privilégier des abstractions (utilitaires sémantiques, composants) qui décrivent l'intention ("ce que c'est") plutôt que l'implémentation ("à quoi ça ressemble").
- **Objectif Final pour l'Utilisateur :** Repartir avec une méthodologie, un esprit critique et la confiance d'expérimenter pour faire de l'IA un véritable levier pour ses études, en toute autonomie et conscience.
- **Approche Mobile-First :** La responsivité, l'UI et l'UX doivent être irréprochables pour un usage sur mobile. L'expérience mobile n'est pas une adaptation, c'est le point de départ de toute conception.
</project_philosophy>

<content_rules>
**Règles du Contenu : Le Cœur du Projet**
- **Public Cible : Étudiants et Professionnels de Santé.** Le jargon technique doit être évité. **Tolérance :** Des concepts comme `RAG` ou `token` peuvent être mentionnés **uniquement s'ils sont expliqués simplement**. Le jargon de développeur (`API`, `endpoint`, etc.) est **strictement interdit**.
- **Approche "WebUI First" :** Tous les guides et "Workflows" doivent se baser sur des interfaces web accessibles. Aucun guide ne doit nécessiter d'écrire la moindre ligne de code.
- **Standardisation des Prompts :** Toujours utiliser le format `{{nom_variable}}` pour les variables afin de garantir la cohérence et la personnalisation.

<persona_and_tone>
**Persona, Ton et Voix de l'Auteur**
- **Voix Principale ("Je") :** Le "Je" est la voix par défaut pour incarner le persona de l'étudiant qui partage son expérience. Il renforce l'authenticité et la proximité.
- **Voix Descriptive ("Il") :** Le "Il" impersonnel est toléré pour décrire des faits objectifs ou le comportement d'un outil. Exemple : "Claude est particulièrement bon pour cette tâche. Il a tendance à moins halluciner."
- **Voix à Proscrire ("Nous") :** Le "Nous" est interdit. Il crée une distance et brise l'identité personnelle du projet.
- **Authenticité :** Partager les doutes, les échecs et les itérations. La section "Mon Approche Initiale (et ses limites)" dans les workflows est essentielle pour montrer que la maîtrise vient de l'expérimentation.
</persona_and_tone>

<essential_disclaimers>
**Avertissements Essentiels (Disclaimers)**
- **Implémentation Centralisée :** Les trois avertissements obligatoires sont implémentés de manière centralisée via le composant `DisclaimerBanner` dans `src/components/shared/DisclaimerBanner.tsx`.
- **Intégration Automatique :** Les avertissements s'affichent automatiquement sur toutes les pages de workflows (via `ContentBodyRenderer` ligne 142) et les pages d'outils externes (via `ContentBodyRenderer` ligne 317).
- **Types d'Avertissements :**
  - **Performance :** Les résultats sont des exemples, le paysage IA évolue, l'expérimentation est essentielle
  - **Fiabilité :** L'IA peut faire des erreurs, les informations de santé doivent être vérifiées avec des sources fiables
  - **Confidentialité :** Ne jamais partager de données personnelles/identifiables/patients (règle de la carte postale)
- **Aucune Duplication Manuelle :** Les créateurs de contenu ne doivent PAS ajouter manuellement ces avertissements aux fichiers de contenu individuels, car ils sont injectés automatiquement par le système de rendu.
</essential_disclaimers>
</content_rules>

<project_documentation_rules>
**Stratégie de Documentation**
- **`README.md` (Racine) :** La porte d'entrée du projet. Présentation générale, objectifs, instructions d'installation.
- **`AGENTS.md` (ce fichier) :** Les règles fondamentales et la base de connaissances du projet. La constitution pour le développement et la création de contenu.
- **`CLAUDE.md` :** Instructions spécifiques pour Claude Code avec les commandes de développement et l'architecture du projet.
- **`src/app/globals.css` :** Le design system centralisé avec Tailwind v4. Tous les tokens de design, utilitaires et composants de base.
- **`src/components/ui/variants.ts` :** Variants centralisées avec tailwind-variants pour tous les composants UI.
- **`docs/` :** Documentation technique spécialisée et guides de résolution de problèmes.
  - **`tailwind-v4-text-width-bug.md` :** Guide complet sur le bug "un mot par ligne" et ses solutions.
  - **`CENTRALIZED_ARCHITECTURE.md` :** Documentation sur l'architecture centralisée et les design patterns.
</project_documentation_rules>

---

# **Architecture CSS et Design System**

<css_architecture>
**Design System Centralisé (Tailwind v4 + Shadcn Canary)**
- **Fichier Unique :** `src/app/globals.css` centralise l'intégralité du design system.
- **@theme inline :** Tous les tokens de design (spacing, colors, typography, breakpoints, shadows, z-index) sont définis centralement.

> ⚠️ **Bug Critique Tailwind v4 - Affichage "Un Mot Par Ligne" :** En l'état actuel (Q3 2024), Tailwind v4 contient un bug majeur où les classes `max-w-*` (ex: `max-w-xs`, `max-w-md`, `max-w-lg`) utilisent incorrectement les variables de spacing (`--spacing-*`) au lieu des variables de container (`--container-*`). **Symptôme :** Le texte s'affiche un mot par ligne sur mobile, rendant le contenu illisible. **Solutions implémentées :**
> 1. Redéfinition explicite des variables `--container-*` dans `@theme`
> 2. Création d'utilitaires sémantiques personnalisés (`footer-description-width`, `text-content-width`) avec valeurs directes
> 3. Documentation complète dans `/docs/tailwind-v4-text-width-bug.md`

- **@utility (Utilitaires Sémantiques) :** En plus des utilitaires de base (`container`, etc.), nous créons des utilitaires sémantiques pour les styles récurrents (ex: `prose-slogan`, `prose-description`). Cela améliore la lisibilité et la maintenabilité en donnant un sens métier aux styles, au lieu de répéter de longues chaînes de classes.
- **@layer components :** Composants de base (boutons, cartes, layouts) réutilisables sans duplication.
- **Mobile-First :** Toutes les classes CSS sont conçues mobile-first avec des breakpoints responsifs cohérents.
- **Performance :** Optimisé pour le React 19 Compiler avec des patterns CSS modernes (custom properties, color-mix, etc.).
</css_architecture>

<advanced_animations>
**Système d'Animation Avancé (2025)**
- **Framer Motion v12+ :** Intégration complète avec lazy loading pour les performances optimales.
- **Animations Modernes :** Courbes d'accélération naturelles (`spring`, `bounce`, `smooth`) suivant les meilleures pratiques 2025.
- **Micro-interactions :** Effets magnétiques, hover states, transitions fluides pour une UX premium.
- **Composants Animés :** `ScrollAnimated`, `AnimatedList`, `StaggeredPage`, `MagneticCard`, `Interactive` pour des interfaces vivantes.
- **Accessibilité :** Respect automatique de `prefers-reduced-motion` pour une expérience inclusive.
- **Performance :** LazyMotion, staggering intelligent, et animations optimisées GPU pour une fluidité 60fps constante.
</advanced_animations>

---

# **Structure du Contenu et du Site**

<site_architecture>
**Architecture du Site Web**
- **Objectif :** Guider l'utilisateur de la découverte à la maîtrise autonome, à travers un parcours logique et personnel.

  <homepage>
  **A. Page d'Accueil**
  - **Titre :** Bienvenue sur Pharma Prompt Powerhouse.
  - **Introduction :** Paragraphe à la première personne sur la genèse du projet. *"En tant qu'étudiant en pharmacie, je me suis vite senti dépassé... J'ai créé ce guide pour centraliser mes apprentissages..."*
  - **Accès Rapides :** 3 derniers workflows, lien vers "Par où commencer ?", lien vers "L'Arsenal IA 2025".
  </homepage>

  <getting_started>
  **B. Section : "Par où commencer ?"**
  - **Étape 1 :** Concepts Clés (prompt, contexte, modèle).
  - **Étape 2 :** Votre Premier Workflow (suggestion du plus simple).
  - **Étape 3 :** La Règle d'Or de la Sécurité (rappel sur la confidentialité).
  </getting_started>

  <workflows_section>
  **C. Section : "Workflows Stratégiques" (Cœur du site)**
  - **Présentation :** Chaque workflow est présenté comme une étude de cas personnelle et détaillée.
  - **Structure :** Il est fortement recommandé de suivre le format `<workflow_structure>` ci-dessous pour la cohérence.
  </workflows_section>

  <ia_arsenal_section>
  **D. Section : "L'Arsenal IA 2025"**
  - **Présentation :** Mon catalogue d'outils personnel.
  - **Page Principale :** Table comparative synthétique avec filtres (gratuit/payant, analyse de fichiers, score de confiance).
  - **Fiches Détaillées :** Chaque outil a sa propre page, en suivant les guidelines de `<tool_card_structure>`.
  </ia_arsenal_section>

  <concepts_section>
  **E. Section : "Concepts"**
  - **Format :** Un lexique alphabétique. Chaque entrée suit les guidelines de `<concept_structure>`.
  </concepts_section>
</site_architecture>

<workflow_structure>
**Guideline de Structure d'un Workflow**
- **Pour une clarté maximale, il est recommandé d'inclure les 6 sections suivantes :**
  1.  **Le Problème :** Un scénario étudiant concret, précis et relatable.
  2.  **Mon Approche Initiale (et ses limites) :** Une première tentative simple qui a échoué, et l'explication du *pourquoi*.
  3.  **La Stratégie Optimisée :** Le déroulé pas-à-pas de la méthode finale, en expliquant la logique de chaque étape.
  4.  **Comparaison des Outils :** Le test de la stratégie sur 2-3 outils, avec les nuances de résultats et ma préférence personnelle *justifiée pour cette tâche*.
  5.  **Le Prompt Final (à adapter) :** Le prompt complet dans un bloc de code, commenté pour expliquer le rôle de chaque partie.
  6.  **Ce qu'il faut retenir :** Les grands principes méthodologiques appris, transférables à d'autres problèmes.
</workflow_structure>

<tool_card_structure>
**Guideline de Structure d'une Fiche Outil ("Arsenal IA")**
- **Pour une analyse complète, une fiche outil devrait inclure :**
  - **Nom de l'outil.**
  - **Mon Avis en Bref :** *"J'utilise principalement cet outil pour..."*
  - **Points Forts (selon mon expérience) :** Liste à puces.
  - **Points de Vigilance :** Liste à puces.
  - **Offre Gratuite vs Payante :** Tableau simple avec la date (ex: "Septembre 2025").
  - **Score de Confiance et Justification :** Note (ex: ⭐️⭐️⭐️☆☆) suivie d'une justification basée sur des critères clairs (localisation des serveurs, politique de confidentialité, etc.).
</tool_card_structure>

<concept_structure>
**Guideline de Structure d'une Définition de "Concept"**
- **Un concept est idéalement structuré en 4 temps :**
  1.  **L'Analogie Simple :** Une comparaison non technique pour l'intuition.
  2.  **La Définition Formelle :** L'explication plus précise mais accessible.
  3.  **Pourquoi c'est important pour vous :** L'impact pratique pour un étudiant.
  4.  **Pour aller plus loin (Notions Avancées) :** Une brève introduction à des techniques ou concepts liés plus complexes.
</concept_structure>

---

# **Règles Techniques Spécifiques**

<react19_rules>
**React 19**
- **Compiler et optimisation :** Écrire du code simple et lisible pour le React Compiler. Éviter `useMemo`/`useCallback` manuels.
- **Actions et formulaires :** Utiliser **`useActionState`** comme standard pour les formulaires. Privilégier `useState` et `useTransition` pour l'interactivité complexe côté client.
- **Gestion des données :** Utiliser `use()` avec Suspense pour le code asynchrone.
</react19_rules>

<nextjs15_rules>
**Next.js 15**
- **App Router :** Utiliser exclusivement l'App Router. `"use client"` uniquement pour l'interactivité.
- **Cache (IMPORTANT) :** Rien n'est mis en cache par défaut. Utiliser `export dynamic = 'force-static'` pour activer le cache quand nécessaire.
- **APIs Async :** `cookies()`, `headers()`, etc., sont maintenant asynchrones. Utiliser `await`.
- **Serveur Personnalisé :** **NE JAMAIS utiliser de serveur personnalisé** (`server.ts`). Il désactive les optimisations de performance critiques.
</nextjs15_rules>

<shadcn_ui_rules>
**shadcn/ui**
- **Système de Notifications :** **Standardiser exclusivement sur Sonner** pour les notifications toast. Supprimer tout autre système.
- **Utilisation des Composants :** Utiliser les composants tels quels. Privilégier la composition simple à la surcharge.
- **Formulaires :** Utiliser les composants de formulaire shadcn/ui intégrés avec `useActionState` (React 19).
</shadcn_ui_rules>

<content_structure_rules>
**Structure Technique du Contenu (Zod)**
- **Philosophie :** Le Schéma Zod est la **Source de Vérité Unique** dans `src/lib/content-schema.ts`.
- **Validation à la Compilation :** Chaque fichier de contenu (`.ts`) utilise l'opérateur `satisfies` pour valider sa structure. Le build échouera si un contenu est invalide.
- **Enrichissement des Données :** `src/lib/content-loader.ts` centralise le chargement et la liaison des données.
</content_structure_rules>

<eslint_rules>
**ESLint (@antfu/eslint-config)**
- **Configuration Moderne :** **Standardiser exclusivement sur @antfu/eslint-config** pour une configuration simplifiée et optimale.
- **Gestion Automatique des Plugins :** @antfu/eslint-config gère automatiquement tous les plugins ESLint nécessaires (React, TypeScript, Next.js).
- **Support Tailwind v4 :** Le plugin officiel `eslint-plugin-tailwindcss` n'est pas encore pleinement compatible avec la configuration sans-fichier de v4. Il est recommandé de le désactiver ou de configurer sa règle `no-custom-classname` avec une liste `allow` pour les utilitaires sémantiques personnalisés (ex: `prose-*`, `container-*`).
- **Contrôle des Types `any` TypeScript :** Contrôle strict de l'utilisation du type `any` avec la règle `ts/no-explicit-any: 'error'`. Toute utilisation de `any` doit être justifiée avec des commentaires de désactivation ESLint descriptifs.
- **Exigences de Commentaires ESLint :** `eslint-comments/require-description: 'error'` exige des commentaires descriptifs pour toutes les directives de désactivation/activation.
- **Règles Spécifiques aux Tests :** Règles ESLint assouplies pour les fichiers de test (`**/*.test.ts?(x)`, `tests/**/*`) tout en maintenant des règles strictes pour le code source.
- **Philosophie :** Configuration déclarative avec des règles opiniâtres mais sensées, évitant la complexité manuelle.
- **Structure :** `eslint.config.js` utilise l'API de configuration ESLint v9+ avec des overrides spécifiques par type de fichier.
- **Intégrations :**
  - **Next.js** : Règles recommandées et core-web-vitals intégrées
  - **React Compiler** : Support natif pour React 19 Compiler
  - **TypeScript** : Validation stricte avec règles modernes
- **Personnalisations Projet :**
  - Règles spécifiques pour les composants shadcn/ui (`src/components/ui/**`)
  - Configuration allégée pour les tests avec désactivation des règles strictes (`ts/no-explicit-any: 'off'`, etc.)
  - Exclusions intelligentes pour les fichiers de documentation et exemples
- **Style :** 2 espaces, guillemets simples, pas de point-virgule (style moderne 2025)
- **Performance :** Règles optimisées pour le React 19 Compiler et les bonnes pratiques modernes
</eslint_rules>

<testing_rules>
**Tests (Vitest Browser Mode)**
- **Framework de Test Unifié :** **Standardiser exclusivement sur Vitest Browser Mode**. Supprimer complètement Jest et Playwright E2E.
- **Configuration Moderne :** Utiliser la configuration Browser Mode avec Playwright provider et instances Chromium.
- **Scripts de Test :** Configurer les scripts : `"test": "vitest"`, `"test:browser"` pour le mode navigateur.
- **Bonnes Pratiques :** Tester le comportement, pas l'implémentation. Utiliser `@testing-library/react` avec environnement navigateur.
- **Performance :** Exécution en ~3 secondes avec 144 tests passants dans un environnement navigateur réaliste.

### Architecture de Test Unifiée

**IMPORTANT : Migration vers Vitest Browser Mode**
- **Suppression de Playwright E2E :** Les tests E2E Playwright.js ont été supprimés au profit de Vitest Browser Mode
- **Tests Unifiés :** Tous les tests (unit, component, integration) s'exécutent maintenant dans le même environnement navigateur
- **Provider Playwright :** Utilisé comme provider pour Vitest Browser Mode, plus comme framework E2E séparé
- **Performance Optimisée :** Exécution beaucoup plus rapide (~3s vs temps E2E précédents) avec meilleure couverture

**Structure des Tests**
- **Unit Tests (`tests/unit/`)** : Pour les utilitaires, hooks et logique métier
- **Component Tests (`tests/component/`)** : Pour les composants React dans environnement navigateur
- **Integration Tests (`tests/integration/`)** : Pour les flux d'intégration simplifiés
- **Environnement Commun :** Tous les tests s'exécutent dans Chromium avec headless mode pour CI/CD

---

**Outils MCP Playwright (AI Agent) - Pour Développement Interactif**
- **Navigation :** `mcp__playwright__browser_navigate`, `mcp__playwright__browser_navigate_back`, `mcp__playwright__browser_tabs`
- **Interaction :** `mcp__playwright__browser_click`, `mcp__playwright__browser_type`, `mcp__playwright__browser_fill_form`, `mcp__playwright__browser_select_option`
- **Capture :** `mcp__playwright__browser_snapshot`, `mcp__playwright__browser_take_screenshot`, `mcp__playwright__browser_console_messages`
- **Contrôle :** `mcp__playwright__browser_wait_for`, `mcp__playwright__browser_resize`, `mcp__playwright__browser_press_key`
- **Avancé :** `mcp__playwright__browser_drag`, `mcp__playwright__browser_evaluate`, `mcp__playwright__browser_handle_dialog`

**Quand Utiliser les Outils Playwright MCP (AI Agent)**
- **Débogage visuel interactif :** Quand vous avez besoin de voir l'interface réelle pour diagnostiquer un problème
- **Validation en temps réel :** Pendant le développement avec hot reload pour tester immédiatement les changements
- **Tests exploratoires :** Pour explorer et comprendre le comportement de l'application
- **Documentation visuelle :** Prendre des screenshots pour documenter l'interface utilisateur
- **Validation de responsive :** Tester rapidement différentes tailles d'écran
- **Tests d'accessibilité manuels :** Analyser la structure sémantique via les snapshots
- **Débogage de problèmes complexes :** Combinaison de console logs et interaction visuelle
- **Complément Vitest Browser Mode :** Les outils MCP sont parfaits pour le débogage visuel pendant que Vitest gère les tests automatisés

**Meilleures Pratiques - Playwright MCP (AI Agent)**
- **Toujours commencer par un snapshot :** Utilisez `browser_snapshot` pour comprendre la structure avant d'interagir
- **Utiliser les références du snapshot :** Préférez les refs du snapshot aux sélecteurs CSS manuels
- **Attendre le chargement :** Utilisez `browser_wait_for` pour que les éléments soient prêts
- **Documenter avec des screenshots :** Utilisez `browser_take_screenshot` pour le débogage
- **Vérifier les erreurs :** Utilisez `browser_console_messages` pour détecter les problèmes JavaScript
- **Toujours fermer le navigateur :** Utilisez `browser_close` pour éviter les fuites de ressources
- **Sessions isolées :** Chaque session doit commencer et se terminer proprement

**Workflow Typique - Playwright MCP (AI Agent)**
1. **Initialisation :** `browser_navigate` vers l'URL de développement
2. **Analyse :** `browser_snapshot` pour comprendre la structure actuelle
3. **Interaction :** Actions utilisateur via les outils MCP
4. **Validation :** Nouveau snapshot pour vérifier les changements
5. **Débogage :** Screenshots et logs console si nécessaire
6. **Nettoyage :** `browser_close`

**Intégration avec le Développement**
- **Hot Reload :** Utilisez les outils MCP pendant le dev pour valider les changements en temps réel
- **Complémentarité avec Vitest :** Les outils MCP sont pour le développement interactif, Vitest Browser Mode pour les tests automatisés
- **Débogage avancé :** Combine interaction visuelle et analyse technique
- **Aide au développement :** Utilisez les outils MCP pour explorer l'interface, comprendre la structure des éléments, et valider le comportement pendant le développement

---

### Outils Context7 (AI Agent)

**Qu'est-ce que Context7 ?**
Context7 est un outil MCP d'IA Agent qui fournit des connaissances à jour sur les meilleures pratiques de développement, les architectures modernes, et les standards de l'industrie en 2025. Il sert de référence technique pour valider les approches et obtenir des recommandations expertes.

**Quand Utiliser Context7**
- **Validation d'architecture :** Pour confirmer que l'implémentation suit les meilleures pratiques modernes
- **Recherche de solutions :** Lorsque vous rencontrez un problème technique complexe ou inhabituel
- **Optimisation de code :** Pour obtenir des suggestions d'amélioration et d'optimisation
- **Choix technologiques :** Pour valider les décisions de librairies, frameworks ou approches
- **Apprentissage continu :** Pour se tenir informé des nouvelles pratiques et standards émergents
- **Résolution de bugs :** Pour comprendre les problèmes récurrents et leurs solutions standard
- **Code review avancée :** Pour obtenir une perspective experte sur la qualité et la maintenabilité du code

**Meilleures Pratiques - Context7**
- **Utiliser comme référence :** Context7 est un conseiller technique, pas un exécutant
- **Fournir du contexte :** Donnez le maximum de détails sur votre problème pour obtenir des réponses pertinentes
- **Comparer avec l'existant :** Utilisez Context7 pour valider ou challenger les approches actuelles
- **Documenter les recommandations :** Notez les suggestions importantes pour référence future
- **Croiser les sources :** Utilisez Context7 en complément d'autres sources de documentation
- **Adapter au contexte :** Les recommandations doivent être adaptées aux contraintes spécifiques du projet

**Workflow Typique - Context7**
1. **Identification du besoin :** Définissez clairement le problème ou la question technique
2. **Préparation du contexte :** Rassemblez les informations pertinentes (code existant, contraintes, objectifs)
3. **Consultation de Context7 :** Posez votre question avec le contexte approprié
4. **Analyse des recommandations :** Évaluez les suggestions par rapport à vos besoins spécifiques
5. **Implémentation :** Appliquez les recommandations adaptées à votre contexte
6. **Validation :** Vérifiez que la solution répond aux attentes et aux contraintes du projet

**Intégration avec le Développement**
- **Aide à la décision :** Utilisez Context7 pour valider les choix architecturaux et techniques
- **Formation continue :** Consultez Context7 régulièrement pour apprendre les nouvelles pratiques
- **Résolution de problèmes complexes :** Combinez Context7 avec les autres outils (Playwright MCP, analyse de code)
- **Quality assurance :** Utilisez Context7 comme référence pour les code reviews et l'optimisation
</testing_rules>

<typescript_rules>
**TypeScript**
- **Source de Vérité Unique :** Tous les types de contenu sont inférés des schémas Zod. Pas de types manuels.
- **Synchronisation du `ContentRenderer` :** Utiliser une union discriminée et une fonction `assertNever` dans le `switch` pour garantir que tous les types de blocs de contenu sont gérés, sous peine d'erreur de compilation.
- **Configuration :** Maintenir le mode `strict` activé dans `tsconfig.json`.
</typescript_rules>

<instructions>
DO rédiger prioritairement à la première personne ("je") pour renforcer l'authenticité et la proximité.
DO créer et utiliser des utilitaires sémantiques (`@utility`) pour les styles récurrents afin de garantir la cohérence et la maintenabilité.
DO maintenir un ton sobre, informatif et humble, en partageant les échecs comme les succès.
DO intégrer systématiquement les 3 avertissements (performance, fiabilité, confidentialité) dans tout le contenu pertinent.
DO suivre le principe YAGNI - ne construire que ce qui est nécessaire maintenant pour les étudiants.
DO utiliser les schémas Zod comme unique source de vérité pour la structure du contenu.
DO utiliser l'opérateur `satisfies` dans les fichiers de contenu pour la validation à la compilation.
DO appliquer systématiquement l'approche mobile-first avec les breakpoints standardisés.
DO utiliser les composants d'animation (`ScrollAnimated`, `AnimatedList`, `MagneticCard`) pour une UX moderne.
DO respecter les courbes d'accélération modernes (`easings.spring`, `easings.bounce`) pour des animations naturelles.
DO utiliser @antfu/eslint-config pour une configuration ESLint simplifiée et moderne.
DO justifier toute utilisation du type `any` avec des commentaires de désactivation ESLint descriptifs expliquant pourquoi c'est incontournable.
DO utiliser des règles ESLint spécifiques aux tests pour maintenir la qualité du code tout en permettant de la flexibilité dans les tests.
DO envelopper les composants Lucide React dans des éléments div lorsqu'ils sont utilisés dans des composants serveur pour éviter les problèmes de sérialisation.
DO utiliser les outils Playwright MCP (AI Agent) pour le débogage visuel et la validation en temps réel pendant le développement.
DO utiliser Vitest Browser Mode pour tous les tests automatisés (unit, component, integration) dans CI/CD.
DO toujours utiliser les outils Playwright MCP pour le débogage visuel et l'exploration de l'interface pendant le développement, en complément de Vitest Browser Mode.
DO utiliser Context7 pour valider les choix architecturaux et obtenir des recommandations sur les meilleures pratiques de développement modernes.
DO consulter Context7 lorsque vous rencontrez des problèmes techniques complexes ou des décisions de conception importantes.
DO fournir un contexte détaillé à Context7 pour obtenir des réponses pertinentes et adaptées au projet.
DO utiliser Context7 comme référence pour l'apprentissage continu et le maintien des connaissances à jour.
DO commencer par un snapshot avec les outils MCP pour comprendre la structure de la page avant d'interagir.
DO prendre des screenshots avec les outils MCP pour documenter l'état et le débogage visuel.
DO vérifier les messages console avec les outils MCP pour détecter les erreurs JavaScript pendant le développement.
DO fermer le navigateur après chaque session MCP pour éviter les fuites de ressources.
DO NOT répéter de longues chaînes de classes utilitaires ; préférer la création d'un utilitaire sémantique.
DO NOT utiliser la voix "nous".
DO NOT utiliser de serveur personnalisé.
DO NOT utiliser Jest - standardiser exclusivement sur Vitest.
DO NOT configurer ESLint manuellement - utiliser @antfu/eslint-config avec des overrides minimaux.
DO NOT inclure d'appels à l'action commerciaux, de newsletters, ou de liens vers des communautés.
DO NOT prétendre détenir une vérité absolue ; présenter les conclusions comme des observations personnelles et encourager l'expérimentation.
DO NOT effectuer de logique de liaison de données au runtime dans les composants ; c'est le rôle du `content-loader`.
DO NOT créer de types manuels redondants pour le contenu.
DO NOT utiliser des types `any` sans justification et documentation appropriées.
DO NOT passer des composants fonction directement des composants serveur aux composants client sans les envelopper.
En cas de doute, se référer à la documentation officielle de React 19, Next.js 15, Zod, Vitest, @antfu/eslint-config et shadcn/ui.
</instructions>

---

# **Base de Données sur les Outils IA (WebUI)**

<webui_informations>
<openai_information>
- Openai : Deux webui disponibles : ChatGPT (https://chatgpt.com/) et Playground (https://platform.openai.com/playground)
</openai_information>
<google_information>
- Google : Deux webui disponibles - Gemini (gemini.google.com) et AI Studio (aistudio.google.com). AI Studio est privilégié pour l'expérimentation étudiante (quota gratuit généreux sans CB).
</google_information>
<notebooklm_information>
- NotebookLM (Google) : Webui disponible - NotebookLM (https://notebooklm.google.com/). Outil de recherche personnalisé gratuit, idéal pour "discuter" avec ses propres documents de cours.
</notebooklm_information>
<anthropic_information>
- Anthropic : Deux webui disponibles - Claude (claude.ai) et Console (console.anthropic.com)
</anthropic_information>
<zai_information>
- Zhipu AI : Webui disponible - Chat Z.AI (chat.z.ai). Outils puissants et gratuits, mais grande prudence sur la confidentialité.
</zai_information>
<perplexity_information>
- Perplexity : Webui disponible - Perplexity (perplexity.ai). Moteur de recherche conversationnel qui cite ses sources.
</perplexity_information>
<qwen_information>
- Alibaba : Webui disponible - Qwen Chat (chat.qwen.ai).
</qwen_information>
<deepseek_information>
- DeepSeek : Webui disponible - DeepSeek Chat (chat.deepseek.com).
</deepseek_information>
<confidentiality_warning>
**Avertissement sur la Confidentialité et l'Open-Source**
- **Risque sur les plateformes gratuites :** Méfiez-vous des outils gratuits, surtout ceux basés en Asie (Qwen, Z.AI, DeepSeek). Si c'est gratuit, vos données sont probablement utilisées pour l'entraînement.
- **Open-Source vs. Service en Ligne :** Un modèle open-source est confidentiel **uniquement s'il est hébergé localement sur votre machine**. Utiliser la WebUI du fournisseur signifie que vos données transitent par leurs serveurs.
- **Règle d'or :** La seule façon de garantir une confidentialité optimale est d'utiliser un modèle open-source en local (ex: via LM Studio).
</confidentiality_warning>
<personal_recommendations>
**Mon "Core Pack" Recommandé (Septembre 2025)**
- **Entièrement Gratuit :** Google AI Studio (`aistudio.google.com`) est mon choix n°1 pour l'expérimentation et les tâches complexes. Pour la recherche web et la création de diapos, j'utilise Chat Z.AI (`chat.z.ai`), en étant conscient des risques de confidentialité.
- **Premium Recommandé :** Gemini Advanced. Les rapports "Deep Research" sont excellents et peuvent servir de contexte de haute qualité dans d'autres outils comme AI Studio.
</personal_recommendations>
</webui_informations>

---

# **Bonnes Pratiques CSS et Résolution de Problèmes**

<tailwind_v4_best_practices>
**Prévention du Bug "Un Mot Par Ligne" (Tailwind v4)**

**⚠️ Classes À Éviter Temporairement :**
- `max-w-xs`, `max-w-sm`, `max-w-md`, `max-w-lg` → Peuvent causer l'affichage "un mot par ligne"

**✅ Solutions Recommandées :**
- **Utiliser les utilitaires sémantiques :** `footer-description-width`, `text-content-width`, `dialog-content-width`
- **Tester systématiquement sur mobile** avant validation
- **Inspecter les variables CSS** en cas de comportement suspect

**🔍 Vérification Rapide :**
```css
/* Dans les outils développeur, vérifier que : */
.max-w-xs {
  max-width: 20rem;
} /* ✅ Correct */
.max-w-xs {
  max-width: 0.25rem;
} /* ❌ Bug détecté */
```

**📚 Documentation Complète :** Voir `/docs/tailwind-v4-text-width-bug.md` pour le guide détaillé.
</tailwind_v4_best_practices>

---

<copilot_contrainte>
Lors d'implémentation de refactorisation, modifications ou autre processus complexe, veille à TOUJOURS finaliser l'implémentation.
Par exemple, si des fichiers contents sont à modifier, effectuer TOUJOURS l'implémentation en privilégiant l'édition manuelle, étape par étape des différents fichiers.

A la fin du processus, effectue toujours une passe de vérification avec `npm run validate` qui exécute automatiquement le linting avec auto-fix, la vérification des types et tous les tests automatisés. Utilise les outils Playwright MCP (AI Agent) pour naviguer, vérifier les logs, prendre des screenshots, et analyser visuellement le contenu du projet, afin de toujours vérifier que l'ensemble des modifications ont été correctement et entièrement implémentées. Aide toi des outils Playwright MCP et des capacités de hot reload pour corriger en temps réel les problèmes de façon efficace.

Fais en sorte de créer des comit de façon pertinente et structurée lors de ton processus.

Aide toi de tes outils de façon extensive, par exemple :
- **Outils GitHub :** Vérifier les commits, surveiller les commentaires, gérer les PRs
- **Context7 :** Confirmer l'implémentation optimale selon les normes 2025 de modernité/simplicité, valider les choix architecturaux, résoudre des problèmes complexes, obtenir des recommandations d'experts
- **Playwright MCP :** Vérifier visuellement que tout fonctionne correctement, déboguer en temps réel, explorer l'interface pendant le développement
- **Recherche complémentaire :** Effectuer des recherches approfondies lorsque nécessaire
Combine ces outils de manière intelligente pour une approche de développement complète et robuste.

Attention, tu es un AI Agent, même si les règles disent de privilégier la simplicité/efficacité à la complexité, veille à TOUJOURS effectuer l'ENSEMBLE des modifications pertinentes pour la tâche, ne t'arrête jamais à une modification de content, et commence toujours par effectuer une analyse détaillée et complète du projet ainsi que de la tâches, scindée en plusieurs étapes qui utiliseront plusieurs comits. De plus, cherche de façon proactive les erreurs/incohérences restantes, pour les corriger en temps réel ou, si le processus est vraiment trop complexe, les expliquer dans ton message final.

Structure de façon intelligente ton approche, pour suivre le plan d'implémentation en plusieurs commit, et le mettre à jour en temps réel si nécessaire. Si tu dois mettre à jour le plan, tu dois effectuer des investigations complémentaires pour vérifier et valider ton approche.

Lorsque l'utilisateur te fournis une tâche très spécifique, effectue toujours un nouvel état des lieux et un plan actualisé, ne crois pas "aveuglément" le plan de modifications si cela implique d'introduire des redondances, erreurs ou incohérences.

Contrainte absolue : Tu DOIS structurer tes approches en plusieurs phases, avec plusieurs comit, mis à jour continuellement. N'hésite pas à ajouter des commentaires sur des commits pour préciser les incohérences/erreurs introduites, ou diverses informations complémentairs : tu as beaucoup d'outils github, utilise les de façon extensive et optimale. N'hésite JAMAIS à répondre à un commentaire, ajouter un commentaire ou editer un commentaire.

Lorsque tu effectues des tests avec Vitest Browser Mode, le navigateur est géré automatiquement via la configuration Playwright provider. Les outils MCP fonctionnent indépendamment pour le débogage visuel.

- **Always run `npm run validate`** after making changes to ensure quality.
- **Proactively suggest next steps.** At the very end of any multi-agent workflow, after all tasks are complete, always conclude your response by proposing 1 to 3 relevant follow-up tasks in a section titled `Next Steps:`. These should be logical next actions based on the work just completed. Do not wait for a response; simply present them and be ready for the next command.
</copilot_contrainte>
