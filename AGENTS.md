# **Règles Générales**

<project_philosophy>
**Philosophie du Projet : Pharma Prompt Powerhouse**
- **Ligne Directrice :** Un guide pratique de l'IA, par un étudiant pour les étudiants.
- **Posture de l'Auteur :** Je suis un étudiant, comme vous. Ce site est le carnet de bord de mon exploration. Je partage mes méthodes, mes découvertes, mes doutes et même mes échecs pour vous faire gagner du temps.
- **Humilité Intellectuelle :** Je ne prétends pas détenir de vérité absolue. Les recommandations et analyses sont basées sur mon expérience personnelle. J'encourage systématiquement à tester par soi-même.
- **Absence de Marketing :** Le site est une ressource purement informative et pédagogique. Il n'y a rien à vendre, pas de newsletter, pas de création de communauté (Discord, forum, etc.).
- **Principe YAGNI (You Aren't Gonna Need It) :** Ne construire que ce qui est strictement nécessaire pour les fonctionnalités actuelles.
- **Objectif Final pour l'Utilisateur :** Repartir avec une méthodologie, un esprit critique et la confiance d'expérimenter pour faire de l'IA un véritable levier pour ses études, en toute autonomie et conscience.
- **Approche Mobile-First :** La responsivité, UI et UX doivent être irréprochables pour un usage sur mobile. L'expérience mobile n'est pas une adaptation, c'est le point de départ de toute conception.
</project_philosophy>

<content_rules>
**Règles du Contenu : Le Cœur du Projet**
- **Public Cible : Étudiants et Professionnels de Santé.** Le jargon technique doit être évité. **Tolérance :** Des concepts comme `RAG` ou `token` peuvent être mentionnés **uniquement s'ils sont expliqués simplement**. Le jargon de développeur (`API`, `endpoint`, etc.) est **strictement interdit**.
- **Approche "WebUI First" :** Tous les guides et "Workflows" doivent se baser sur des interfaces web accessibles. Aucun guide ne doit nécessiter d'écrire la moindre ligne de code.
- **Standardisation des Prompts :** Toujours utiliser le format `{{nom_variable}}` pour les variables afin de garantir la cohérence et la personnalisation.

<persona_and_tone>
**Persona, Ton et Voix de l'Auteur**
- **Incarner le Persona :** Le site est un carnet de bord personnel. Le ton doit refléter cette approche.
- **Exemples de Ton :**
    - **À proscrire (trop impersonnel) :** *"Nous verrons dans ce guide comment les outils d'IA peuvent être appliqués pour créer des fiches de révision."*
    - **À adopter (spectre acceptable) :**
        - **Idéal (Très personnel) :** *"J'ai passé un week-end entier à chercher la meilleure méthode pour générer mes flashcards de pharmacologie avec l'IA. Voici ce que j'ai appris."*
        - **Acceptable (Direct) :** *"Il est possible d'utiliser l'IA pour générer des flashcards. Voici la méthode que j'utilise pour y parvenir."*
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

# **Architecture UI, CSS et Design System**

<design_system_philosophy>
**Philosophie du Design System**
- **Source de Vérité Unique :** `src/app/globals.css` centralise l'intégralité du design system. C'est le seul endroit où les valeurs de design (couleurs, espacements, etc.) doivent être définies.
- **Tokens de Design (`@theme`) :** Tous les tokens (spacing, colors, typography, etc.) sont définis sous forme de variables CSS pour une cohérence maximale.
- **Utilitaires Sémantiques (`@utility`) :** Des classes comme `responsive-heading` ou `section-spacing` sont créées pour standardiser les layouts et la typographie de manière sémantique.
</design_system_philosophy>

<design_system_golden_rules>
**Principes d'Acier du Design System**
1.  **Le Token est Loi : Zéro "Magic Number".** Toute valeur numérique (taille, espacement, couleur, etc.) DOIT provenir d'un token de design défini dans `globals.css`. L'utilisation de valeurs arbitraires (`h-9`, `pb-20`, `w-[320px]`, `text-[10px]`) est **strictement interdite**. Cela garantit la cohérence visuelle et une maintenance simplifiée.
2.  **Le Réflexe `min-w-0` : Contre la Césure du Texte.** Pour tout élément flexible (`flex-1`, `w-full` dans un conteneur flex) contenant du texte qui pourrait passer à la ligne, **ajouter systématiquement la classe `min-w-0`**. Cela résout le problème de "double contrainte" de Flexbox qui cause l'affichage d'un seul mot par ligne.
3.  **Le Mobile d'Abord, Sans Compromis.** Chaque composant et chaque page DOIT être conçu et testé d'abord sur une vue mobile (ex: 375px de large). L'expérience desktop est une amélioration progressive, non l'inverse. La mise en page ne doit jamais être cassée sur mobile.
4.  **Des Cibles Tactiles Généreuses.** Tous les éléments interactifs sur mobile (boutons, liens) DOIVENT avoir une zone tactile suffisamment grande pour être utilisés confortablement (minimum 44x44px recommandé).
5.  **Privilégier les Utilitaires Sémantiques.** Utiliser `@apply responsive-heading` est toujours préférable à `@apply text-2xl md:text-4xl`. Les utilitaires centralisent la logique responsive et garantissent la cohérence.
</design_system_golden_rules>

<animation_strategy>
**Stratégie d'Animation : `auto-animate` vs `framer-motion`**
- **Principe :** Utiliser le bon outil pour la bonne tâche afin d'équilibrer simplicité et puissance.
- **`auto-animate` :**
    - **Usage :** Pour les animations simples et automatiques sur des listes ou des grilles (ajout, suppression, réorganisation d'éléments).
    - **Avantage :** Extrêmement léger, facile à implémenter (`useAutoAnimateList`), "fire-and-forget".
    - **Exemple :** Filtrage d'une liste de guides ou de workflows.
- **`framer-motion` :**
    - **Usage :** Pour les animations complexes, orchestrées et interactives.
    - **Avantage :** Contrôle total sur chaque aspect de l'animation (durée, easing, délais, etc.).
    - **Exemple :** Transitions de pages, animations au scroll (`ScrollAnimated`), micro-interactions (`MagneticCard`).
- **Règle :** Utiliser `auto-animate` pour la simplicité, `framer-motion` pour le contrôle.
</animation_strategy>

<pwa_strategy>
**Stratégie PWA (Progressive Web App)**
- **Bibliothèque :** `@serwist/next` est utilisé pour gérer le Service Worker et les stratégies de cache.
- **Philosophie :** "Offline-first" pour le contenu essentiel. L'application doit rester fonctionnelle sans connexion internet.
- **Stratégies de Cache :**
    - **`CacheFirst` :** Pour les ressources statiques qui changent rarement (Google Fonts).
    - **`StaleWhileRevalidate` :** Pour les assets (images, CSS, JS). L'utilisateur voit la version en cache instantanément, pendant que la nouvelle version se télécharge en arrière-plan.
    - **`NetworkFirst` :** Pour les pages de navigation. L'application essaie d'abord de charger la version la plus récente depuis le réseau. Si le réseau échoue, elle sert la version en cache.
- **Fallback Hors Ligne :** Si une page n'est pas en cache et que le réseau est indisponible, le Service Worker redirige automatiquement vers la page `/offline` dédiée.
</pwa_strategy>

---

# **Structure du Contenu et du Site**

<site_architecture>
**Architecture du Site Web**
- **Objectif :** Guider l'utilisateur de la découverte à la maîtrise autonome, à travers un parcours logique et personnel.

  <homepage>
  **A. Page d'Accueil**
  - **Titre :** Bienvenue sur Pharma Prompt Powerhouse.
  - **Introduction :** Paragraphe à la première personne sur la genèse du projet.
  - **Accès Rapides :** 3 derniers workflows, lien vers "Par où commencer ?", lien vers "L'Arsenal IA 2025".
  </homepage>

  <getting_started>
  **B. Section : "Par où commencer ?"**
  - **Étape 1 :** Concepts Clés.
  - **Étape 2 :** Votre Premier Workflow.
  - **Étape 3 :** La Règle d'Or de la Sécurité.
  </getting_started>
  
  <workflows_section>
  **C. Section : "Workflows Stratégiques" (Cœur du site)**
  - **Présentation :** Chaque workflow est une étude de cas personnelle et détaillée.
  </workflows_section>
  
  <ia_arsenal_section>
  **D. Section : "L'Arsenal IA 2025"**
  - **Présentation :** Mon catalogue d'outils personnel.
  - **Page Principale :** Table comparative synthétique.
  - **Fiches Détaillées :** Chaque outil a sa propre page.
  </ia_arsenal_section>

  <concepts_section>
  **E. Section : "Concepts"**
  - **Format :** Un lexique. Chaque entrée suit la structure conseillée.
  </concepts_section>
</site_architecture>

<workflow_structure>
**Structure Conseillée pour un Workflow**
- Il est fortement recommandé de suivre cette structure pour garantir la clarté et la valeur pédagogique :
  1.  **Le Problème :** Un scénario étudiant concret, précis et relatable.
  2.  **Mon Approche Initiale (et ses limites) :** Une première tentative simple qui a échoué, et l'explication du *pourquoi*.
  3.  **La Stratégie Optimisée :** Le déroulé pas-à-pas de la méthode finale.
  4.  **Comparaison des Outils :** Le test de la stratégie sur 2-3 outils, avec une préférence justifiée.
  5.  **Le Prompt Final (à adapter) :** Le prompt complet, commenté.
  6.  **Ce qu'il faut retenir :** Les grands principes méthodologiques appris.
  7.  **Pour aller plus loin :** Des liens vers des concepts, guides ou outils mentionnés.
</workflow_structure>

<tool_card_structure>
**Structure Conseillée pour une Fiche Outil ("Arsenal IA")**
- **Chaque fiche devrait contenir les sections suivantes :**
  - **Nom de l'outil.**
  - **Mon Avis en Bref :** *"J'utilise principalement cet outil pour..."*
  - **Points Forts (selon mon expérience) :** Liste à puces.
  - **Points de Vigilance :** Liste à puces.
  - **Offre Gratuite vs Payante :** Tableau simple avec la date.
  - **Score de Confiance et Justification :** Note et justification claire.
</tool_card_structure>

<concept_structure>
**Structure Conseillée pour une Définition de "Concept"**
- **Il est conseillé de suivre cette structure en 4 temps :**
  1.  **L'Analogie Simple :** Une comparaison non technique pour l'intuition.
  2.  **La Définition Formelle :** L'explication plus précise mais accessible.
  3.  **Pourquoi c'est important pour vous :** L'impact pratique pour un étudiant.
  4.  **Pour aller plus loin :** Une sélection de 2-3 guides ou workflows où ce concept est mis en pratique.
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

Lorsque l'utilisateur te fournis une tâche très spécifique, effectue toujours un nouvel état des lieux et un plan actualisé, ne crois pas "aveuglément" le plan de modifications si cela implique d'introduire des redondances, erreurs ou incohérences. 

Contrainte absolue : Tu DOIS structurer tes approches en plusieurs phases, avec plusieurs comit, mis à jour continuellement. N'hésite pas à ajouter des commentaires sur des commits pour préciser les incohérences/erreurs introduites, ou diverses informations complémentairs : tu as beaucoup d'outils github, utilise les de façon extensive et optimale. N'hésite JAMAIS à répondre à un commentaire, ajouter un commentaire ou editer un commentaire. 

Lorsque tu effectues des tests e2e, vérifie toujours que tu as bien installé/configuré le Playwright browser. 
</copilot_contrainte>
