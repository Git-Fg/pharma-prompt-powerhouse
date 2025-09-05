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
- **Intégration Obligatoire :** Ces trois avertissements doivent être présents et visibles sur chaque workflow et chaque fiche d'outil.
- **Sur la Performance :** *"Les résultats présentés ici sont des exemples. Le paysage de l'IA évolue constamment et les performances des modèles peuvent changer. La seule façon de trouver la solution optimale pour *votre* besoin est d'expérimenter et de comparer."*
- **Sur la Fiabilité du Contenu Généré :** *"Une IA, même la plus avancée, peut commettre des erreurs, omettre des informations cruciales ou "halluciner". Dans le domaine de la santé, toute information générée par une IA doit être systématiquement vérifiée avec des sources fiables et validées. **N'utilisez jamais une information non vérifiée pour une décision clinique ou académique importante.**"*
- **Sur la Confidentialité :** *"La règle d'or : si vous ne l'écririez pas sur une carte postale, ne le mettez pas dans un prompt. N'utilisez **jamais** de données personnelles, identifiables ou de patient sur une plateforme en ligne. Je précise le niveau de risque perçu pour chaque outil, mais la prudence absolue reste votre meilleure protection."*
</essential_disclaimers>
</content_rules>

<project_documentation_rules>
**Stratégie de Documentation**
- **`README.md` (Racine) :** La porte d'entrée du projet. Présentation générale, objectifs, instructions d'installation.
- **`AGENTS.md` (ce fichier) :** Les règles fondamentales et la base de connaissances du projet. La constitution pour le développement et la création de contenu.
- **`src/app/globals.css` :** Le design system centralisé avec Tailwind v4. Tous les tokens de design, utilitaires et composants de base.
- **`docs/` :** Documentation technique spécialisée et guides de résolution de problèmes.
  - **`tailwind-v4-text-width-bug.md` :** Guide complet sur le bug "un mot par ligne" et ses solutions.
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
- **Philosophie :** Configuration déclarative avec des règles opiniâtres mais sensées, évitant la complexité manuelle.
- **Structure :** `eslint.config.js` utilise l'API de configuration ESLint v9+ avec des overrides spécifiques par type de fichier.
- **Intégrations :**
  - **Next.js** : Règles recommandées et core-web-vitals intégrées
  - **React Compiler** : Support natif pour React 19 Compiler
  - **TypeScript** : Validation stricte avec règles modernes
- **Personnalisations Projet :**
  - Règles spécifiques pour les composants shadcn/ui (`src/components/ui/**`)
  - Configuration allégée pour les tests (`**/*.test.ts?(x)`)
  - Exclusions intelligentes pour les fichiers de documentation et exemples
- **Style :** 2 espaces, guillemets simples, pas de point-virgule (style moderne 2025)
- **Performance :** Règles optimisées pour le React 19 Compiler et les bonnes pratiques modernes
</eslint_rules>

<testing_rules>
**Tests (Vitest)**
- **Framework de Test :** **Standardiser exclusivement sur Vitest**. Supprimer complètement Jest.
- **Configuration :** Utiliser la configuration standard pour Next.js avec les alias et le mode `globals`.
- **Scripts de Test :** Configurer les scripts : `"test": "vitest"`, `"test:watch": "vitest"`.
- **Bonnes Pratiques :** Tester le comportement, pas l'implémentation. Utiliser `@testing-library/react`.
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
DO NOT répéter de longues chaînes de classes utilitaires ; préférer la création d'un utilitaire sémantique.
DO NOT utiliser la voix "nous".
DO NOT utiliser de serveur personnalisé.
DO NOT utiliser Jest - standardiser exclusivement sur Vitest.
DO NOT configurer ESLint manuellement - utiliser @antfu/eslint-config avec des overrides minimaux.
DO NOT inclure d'appels à l'action commerciaux, de newsletters, ou de liens vers des communautés.
DO NOT prétendre détenir une vérité absolue ; présenter les conclusions comme des observations personnelles et encourager l'expérimentation.
DO NOT effectuer de logique de liaison de données au runtime dans les composants ; c'est le rôle du `content-loader`.
DO NOT créer de types manuels redondants pour le contenu.
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
.max-w-xs { max-width: 20rem; } /* ✅ Correct */
.max-w-xs { max-width: 0.25rem; } /* ❌ Bug détecté */
```

**📚 Documentation Complète :** Voir `/docs/tailwind-v4-text-width-bug.md` pour le guide détaillé.
</tailwind_v4_best_practices>

---

<copilot_contrainte>
Lors d'implémentation de refactorisation, modifications ou autre processus complexe, veille à TOUJOURS finaliser l'implémentation.
Par exemple, si des fichiers contents sont à modifier, effectuer TOUJOURS l'implémentation en privilégiant l'édition manuelle, étape par étape des différents fichiers.

A la fin du processus, effectue toujours une passe de vérification, suppression de code mort, test de lint, type et tests d'intégration/units ainsi que de playwright tool te permettant de naviguer et vérifier les logs, prendre des screenshot, et globalement analyser le contenu du projet, afin de toujours vérifier que l'ensemble des modifications ont été correctement et entièrement implémentées. Aide toi de playwright mcp tool et des capacités de hot reload pour corriger en temps réel les problèmes de façon efficace.

Fais en sorte de créer des comit de façon pertinente et structurée lors de ton processus.

Aide toi de tes outils de façon extensive, par exemple, n'hésite jamais à utiliser les outils github pour vérifier les comit, surveiller les commentaires ... , context7 pour confirmer l'implémentation optimale selon les normes en 2025 de modernité/simplicité ou si tu rencontres un problème, playwright tool pour vérifier que tout fonctionne correctement voir effectuer des recherches complémentaires ...

Attention, tu es un AI Agent, même si les règles disent de privilégier la simplicité/efficacité à la complexité, veille à TOUJOURS effectuer l'ENSEMBLE des modifications pertinentes pour la tâche, ne t'arrête jamais à une modification de content, et commence toujours par effectuer une analyse détaillée et complète du projet ainsi que de la tâches, scindée en plusieurs étapes qui utiliseront plusieurs comits. De plus, cherche de façon proactive les erreurs/incohérences restantes, pour les corriger en temps réel ou, si le processus est vraiment trop complexe, les expliquer dans ton message final.

Structure de façon intelligente ton approche, pour suivre le plan d'implémentation en plusieurs commit, et le mettre à jour en temps réel si nécessaire. Si tu dois mettre à jour le plan, tu dois effectuer des investigations complémentaires pour vérifier et valider ton approche.

Lorsque l'utilisateur te fournis une tâche très spécifique, effectue toujours un nouvel état des lieux et un plan actualisé, ne crois pas "aveuglément" le plan de modifications si cela implique d'introduire des redondances, erreurs ou incohérences.

Contrainte absolue : Tu DOIS structurer tes approches en plusieurs phases, avec plusieurs comit, mis à jour continuellement. N'hésite pas à ajouter des commentaires sur des commits pour préciser les incohérences/erreurs introduites, ou diverses informations complémentairs : tu as beaucoup d'outils github, utilise les de façon extensive et optimale. N'hésite JAMAIS à répondre à un commentaire, ajouter un commentaire ou editer un commentaire.

Lorsque tu effectues des tests e2e, vérifie toujours que tu as bien installé/configuré le Playwright browser.
</copilot_contrainte>
