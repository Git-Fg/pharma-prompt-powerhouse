# **Règles Générales**

<project_philosophy>
**Philosophie du Projet : Pharma Prompt Powerhouse**
- **Ligne Directrice :** Un guide pratique de l'IA, par un étudiant pour les étudiants.
- **Posture de l'Auteur :** Je suis un étudiant, comme vous. Ce site est le carnet de bord de mon exploration. Je partage mes méthodes, mes découvertes, mes doutes et même mes échecs pour vous faire gagner du temps.
- **Humilité Intellectuelle :** Je ne prétends pas détenir de vérité absolue. Les recommandations et analyses sont basées sur mon expérience personnelle. J'encourage systématiquement à tester par soi-même.
- **Absence de Marketing :** Le site est une ressource purement informative et pédagogique. Il n'y a rien à vendre, pas de newsletter, pas de création de communauté (Discord, forum, etc.).
- **Principe YAGNI (You Aren't Gonna Need It) :** Ne construire que ce qui est strictement nécessaire pour les fonctionnalités actuelles.
- **Objectif Final pour l'Utilisateur :** Repartir avec une méthodologie, un esprit critique et la confiance d'expérimenter pour faire de l'IA un véritable levier pour ses études, en toute autonomie et conscience.
- **Approche Mobile-First :** La responsivité, UI et UX doivent être optimales pour un usage sur mobile grâce au design system centralisé.
</project_philosophy>

<content_rules>
**Règles du Contenu : Le Cœur du Projet**
- **Public Cible : Étudiants et Professionnels de Santé.** Le jargon technique doit être évité. **Tolérance :** Des concepts comme `RAG` ou `token` peuvent être mentionnés **uniquement s'ils sont expliqués simplement**. Le jargon de développeur (`API`, `endpoint`, etc.) est **strictement interdit**.
- **Approche "WebUI First" :** Tous les guides et "Workflows" doivent se baser sur des interfaces web accessibles. Aucun guide ne doit nécessiter d'écrire la moindre ligne de code.
- **Standardisation des Prompts :** Toujours utiliser le format `{{nom_variable}}` pour les variables afin de garantir la cohérence et la personnalisation.

<persona_and_tone>
**Persona, Ton et Voix de l'Auteur**
- **Incarner le Persona :** Toujours écrire à la première personne ("Je", "Mon", "J'ai découvert"). Le site est un carnet de bord, pas une encyclopédie.
- **Authenticité :** Partager les doutes, les échecs et les itérations. La section "Mon Approche Initiale (et ses limites)" dans les workflows est essentielle pour montrer que la maîtrise vient de l'expérimentation.
- **Exemple de Ton :**
    - **À proscrire :** "Il est possible d'utiliser l'IA pour générer des flashcards."
    - **À adopter :** "J'ai passé un week-end entier à chercher la meilleure méthode pour générer mes flashcards de pharmacologie avec l'IA. Voici ce que j'ai appris."
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
</project_documentation_rules>

---

# **Architecture CSS et Design System**

<css_architecture>
**Design System Centralisé (Tailwind v4 + Shadcn Canary)**
- **Fichier Unique :** `src/app/globals.css` centralise l'intégralité du design system.
- **@theme inline :** Tous les tokens de design (spacing, colors, typography, breakpoints, shadows, z-index) sont définis centralement.
- **@utility :** Classes utilitaires personnalisées (`container`, `section-spacing`, `responsive-text`, etc.) pour un code cohérent.
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
- **Hooks Personnalisés :** `useScrollProgress`, `useInView`, `useMagneticEffect`, `useParallax` pour des animations contextuelles.
- **Accessibilité :** Respect automatique de `prefers-reduced-motion` pour une expérience inclusive.
- **Performance :** LazyMotion, staggering intelligent, et animations optimisées GPU pour une fluidité 60fps constante.
</advanced_animations>

<interaction_patterns>
**Patterns d'Interaction Avancés**
- **Transitions de Pages :** Système de navigation fluide avec `PageTransition` et variants contextuels.
- **États de Chargement :** Composants `Skeleton`, `LoadingState`, `Spinner` avec animations progressives.
- **Formulaires Enhancés :** `AnimatedInput`, `AnimatedSelect`, `AnimatedCheckbox` avec validation visuelle en temps réel.
- **Feedback Utilisateur :** Toasts animés, progress bars fluides, états de succès/erreur avec micro-animations.
- **Navigation Contextuelle :** Breadcrumbs animés, pagination fluide, filtres avec transitions.
</interaction_patterns>

<responsive_design_principles>
**Principes de Design Responsif**
- **Approche Mobile-First :** Toutes les interfaces commencent par la version mobile et s'enrichissent vers le desktop.
- **Breakpoints Standards :** `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1536px`.
- **Tableaux Responsifs :** Transformation automatique desktop → mobile avec `desktop-table` et `mobile-card`.
- **Typography Responsive :** Système de classes `responsive-text`, `responsive-heading`, `responsive-subheading`.
- **Spacing Cohérent :** Variables CSS centralisées pour les marges, paddings et gaps à travers tous les composants.
</responsive_design_principles>

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
  - **Présentation :** Chaque workflow est une étude de cas personnelle et détaillée.
  - **Structure :** Doit impérativement suivre le format `<workflow_structure>` ci-dessous.
  </workflows_section>
  
  <ia_arsenal_section>
  **D. Section : "L'Arsenal IA 2025"**
  - **Présentation :** Mon catalogue d'outils personnel.
  - **Page Principale :** Table comparative synthétique avec filtres (gratuit/payant, analyse de fichiers, score de confiance).
  - **Fiches Détaillées :** Chaque outil a sa propre page, suivant le format `<tool_card_structure>`.
  </ia_arsenal_section>

  <concepts_section>
  **E. Section : "Concepts"**
  - **Format :** Un lexique alphabétique. Chaque entrée suit la structure `<concept_structure>`.
  </concepts_section>
</site_architecture>

<workflow_structure>
**Structure d'un Workflow**
- **Chaque workflow doit impérativement contenir les 6 sections suivantes :**
  1.  **Le Problème :** Un scénario étudiant concret, précis et relatable.
  2.  **Mon Approche Initiale (et ses limites) :** Une première tentative simple qui a échoué, et l'explication du *pourquoi*.
  3.  **La Stratégie Optimisée :** Le déroulé pas-à-pas de la méthode finale, en expliquant la logique de chaque étape.
  4.  **Comparaison des Outils :** Le test de la stratégie sur 2-3 outils, avec les nuances de résultats et ma préférence personnelle *justifiée pour cette tâche*.
  5.  **Le Prompt Final (à adapter) :** Le prompt complet dans un bloc de code, commenté pour expliquer le rôle de chaque partie.
  6.  **Ce qu'il faut retenir :** Les grands principes méthodologiques appris, transférables à d'autres problèmes.
</workflow_structure>

<tool_card_structure>
**Structure d'une Fiche Outil ("Arsenal IA")**
- **Chaque fiche doit impérativement contenir les sections suivantes :**
  - **Nom de l'outil.**
  - **Mon Avis en Bref :** *"J'utilise principalement cet outil pour..."*
  - **Points Forts (selon mon expérience) :** Liste à puces.
  - **Points de Vigilance :** Liste à puces.
  - **Offre Gratuite vs Payante :** Tableau simple avec la date (ex: "Septembre 2025").
  - **Score de Confiance et Justification :** Note (ex: ⭐️⭐️⭐️☆☆) suivie d'une justification basée sur des critères clairs (localisation des serveurs, politique de confidentialité, etc.).
</tool_card_structure>

<concept_structure>
**Structure d'une Définition de "Concept"**
- **Chaque concept doit impérativement suivre cette structure en 3 temps :**
  1.  **L'Analogie Simple :** Une comparaison non technique pour l'intuition.
  2.  **La Définition Formelle :** L'explication plus précise mais accessible.
  3.  **Pourquoi c'est important pour vous :** L'impact pratique pour un étudiant.
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
DO rédiger tout le contenu à la première personne ("je") pour renforcer l'authenticité et la proximité.
DO maintenir un ton sobre, informatif et humble, en partageant les échecs comme les succès.
DO intégrer systématiquement les 3 avertissements (performance, fiabilité, confidentialité) dans tout le contenu pertinent.
DO suivre le principe YAGNI - ne construire que ce qui est nécessaire maintenant pour les étudiants.
DO utiliser les schémas Zod comme unique source de vérité pour la structure du contenu.
DO utiliser l'opérateur `satisfies` dans les fichiers de contenu pour la validation à la compilation.
DO utiliser exclusivement les classes CSS centralisées du design system (`.container`, `.section-spacing`, `.responsive-text`, etc.).
DO appliquer systématiquement l'approche mobile-first avec les breakpoints standardisés.
DO utiliser les composants de base définis dans `@layer components` plutôt que de recréer des styles.
DO privilégier les utilitaires CSS personnalisés pour maintenir la cohérence visuelle.
DO utiliser les tokens de design centralisés (variables CSS) plutôt que des valeurs hardcodées.
DO utiliser les composants d'animation (`ScrollAnimated`, `AnimatedList`, `MagneticCard`) pour une UX moderne.
DO implémenter les micro-interactions avec les hooks personnalisés (`useScrollProgress`, `useInView`, etc.).
DO respecter les courbes d'accélération modernes (`easings.spring`, `easings.bounce`) pour des animations naturelles.
DO optimiser les performances avec LazyMotion et le lazy loading des animations.
DO créer de nouveaux fichiers CSS ou de styles inline sans justification exceptionnelle.
DO NOT dupliquer des styles CSS existants - centraliser dans `globals.css`.
DO NOT ignorer les breakpoints responsifs standard - tous les composants doivent être mobile-friendly.
DO NOT créer d'animations sans considérer `prefers-reduced-motion` pour l'accessibilité.
DO NOT surcharger l'interface avec des animations excessives - privilégier la subtilité et l'utilité.
DO NOT utiliser de serveur personnalisé.
DO NOT inclure d'appels à l'action commerciaux, de newsletters, ou de liens vers des communautés.
DO NOT prétendre détenir une vérité absolue ; présenter les conclusions comme des observations personnelles et encourager l'expérimentation.
DO NOT effectuer de logique de liaison de données au runtime dans les composants ; c'est le rôle du `content-loader`.
DO NOT créer de types manuels redondants pour le contenu.
DO NOT sacrifier la clarté pour la sophistication technique.
En cas de doute, se référer à la documentation officielle de React 19, Next.js 15, Zod, Vitest et shadcn/ui.
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

<copilot_contrainte>
Lors d'implémentation de refactorisation, modifications ou autre processus complexe, veille à TOUJOURS finaliser l'implémentation. 
Par exemple, si des fichiers contents sont à modifier, effectuer TOUJOURS l'implémentation en privilégiant l'édition manuelle, étape par étape des différents fichiers. 

A la fin du processus, effectue toujours une passe de vérification, suppression de code mort, test de lint, type et tests d'intégration/units ainsi que de playwright tool te permettant de naviguer et vérifier les logs, prendre des screenshot, et globalement analyser le contenu du projet, afin de toujours vérifier que l'ensemble des modifications ont été correctement et entièrement implémentées. Aide toi de playwright mcp tool et des capacités de hot reload pour corriger en temps réel les problèmes de façon efficace. 

Fais en sorte de créer des comit de façon pertinente et structurée lors de ton processus. 

Aide toi de tes outils de façon extensive, par exemple, n'hésite jamais à utiliser les outils github pour vérifier les comit, surveiller les commentaires ... , context7 pour confirmer l'implémentation optimale selon les normes en 2025 de modernité/simplicité ou si tu rencontres un problème, playwright tool pour vérifier que tout fonctionne correctement voir effectuer des recherches complémentaires ... 

Attention, tu es un AI Agent, même si les règles disent de privilégier la simplicité/efficacité à la complexité, veille à TOUJOURS effectuer l'ENSEMBLE des modifications pertinentes pour la tâche, ne t'arrête jamais à une modification de content, et commence toujours par effectuer une analyse détaillée et complète du projet ainsi que de la tâches, scindée en plusieurs étapes qui utiliseront plusieurs comits. De plus, cherche de façon proactive les erreurs/incohérences restantes, pour les corriger en temps réel ou, si le processus est vraiment trop complexe, les expliquer dans ton message final. 

Structure de façon intelligente ton approche, pour suivre le plan d'implémentation en plusieurs commit, et le mettre à jour en temps réel si nécessaire. Si tu dois mettre à jour le plan, tu dois effectuer des investigations complémentaires pour vérifier et valider ton approche. 
</copilot_contrainte>
