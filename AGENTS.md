# Global Rules : 

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
  
<project_documentation_rules>
**Stratégie de Documentation**

- **`README.md` (Racine) :** La porte d'entrée du projet. Doit contenir la présentation générale, les objectifs, et les instructions d'installation pour les visiteurs et contributeurs.
- **`/.github/copilot-instructions.md` :** La "Constitution" du projet. C'est la source de vérité pour les règles de développement, le style de code et la philosophie. Sert de contexte pour les développeurs et les assistants IA.
- **`/docs/` :** La documentation d'architecture. Contient les documents de haut niveau qui expliquent les décisions de conception majeures (ex: "concept-hub-architecture.md"). Utile pour comprendre le "pourquoi" derrière la structure du projet.
</project_documentation_rules>

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

- Expérimenter avec React Compiler (expérimental) mais ne pas y faire confiance aveuglément.
- Écrire du code simple et lisible que le compiler peut optimiser.
- Éviter `useMemo`/`useCallback` manuels sauf besoins spécifiques.

**Actions et formulaires:**

- Pour les formulaires simples (soumission de données serveur), explorer les Actions React 19 pour centraliser la logique.
- Pour les composants interactifs complexes côté client (ex: l'éditeur de prompts), une gestion d'état avec `useState` et `useTransition` est privilégiée pour une meilleure réactivité de l'interface.
- Lors de l'utilisation d'Actions, `useActionState` est l'outil de choix pour gérer l'état (pending, error, data).
- `useOptimistic` peut être utilisé pour améliorer l'UX lors des mutations de données serveur.

**Gestion des données:**

- Utiliser le hook `use()` pour lire les promesses et le contexte (peut être utilisé conditionnellement).
- Combiner `use()` avec Suspense pour un code asynchrone propre.
- Ne pas utiliser `use()` avec des promesses créées dans le render.

**Nouvelles fonctionnalités:**

- Utiliser le support natif des métadonnées (title, meta, link) directement dans les composants.
- Utiliser les stylesheets natifs avec la propriété `precedence`.
</react19_rules>

<nextjs15_rules>
**App Router:**

- Utiliser exclusivement l'App Router avec structure basée sur les fichiers.
- Modèle de route: `src/app/[feature]/page.tsx`.
- Utiliser `"use client"` uniquement pour les composants interactifs.

**Cache (IMPORTANT):**

- Les requêtes `fetch`, Route Handlers `GET` et navigations client ne sont PLUS cachées par défaut.
- Utiliser `export dynamic = 'force-static'` pour activer le cache quand nécessaire.
- Configurer explicitement le cache pour les données qui doivent être mises en cache.

**APIs Async:**

- Utiliser `await` pour `cookies()`, `headers()`, `draftMode()`, `params`, `searchParams`.
- Ces APIs sont maintenant asynchrones - ne pas y accéder de manière synchrone.

**Nouvelles fonctionnalités:**

- Utiliser `@next/codemod` pour les mises à niveau automatisées.
- Expérimenter avec `unstable_after` pour exécuter du code après le streaming.
- Utiliser `instrumentation.js` pour l'observabilité du cycle de vie serveur.
- Utiliser `next.config.ts` pour la configuration TypeScript.
</nextjs15_rules>

<shadcn_ui_rules>
**Version 3.0:**

- Utiliser les registres namespacés: `@registry/name`.
- Configurer plusieurs registres dans `components.json`.
- Profiter du MCP Server pour l'intégration avec les outils d'IA.
- Utiliser les nouvelles commandes de recherche et découverte.

**Utilisation des composants:**

- Utiliser les composants shadcn/ui tels quels, sans sur-personnalisation.
- Combiner les composants simplement avec la composition.
- Utiliser les fonctionnalités d'accessibilité intégrées.

**Formulaires:**

- Utiliser les composants de formulaire shadcn/ui.
- Intégrer avec les hooks React (`useState`, `useTransition`) ou les Actions React 19 selon le cas d'usage.
- Garder la logique de validation simple et proche du formulaire.
</shadcn_ui_rules>

<content_collections_rules>
**Philosophie : Le Build est la Source de Vérité**

- Toute la logique de préparation des données (ajout de slugs, calculs, relations) DOIT se faire dans `content-collections.ts` via la fonction `transform`.
- Les composants React doivent être "stupides" : ils consomment des données déjà prêtes et parfaitement typées, sans faire de transformations complexes.

**Configuration (`content-collections.ts`):**

- **Ordre des Dépendances :** Déclarer les collections sans dépendances (ex: `concepts`) AVANT les collections qui en dépendent (ex: `guides`).
- **`transform` est la clé :** Utiliser systématiquement la fonction `transform` pour enrichir les données. Extraire la logique complexe dans des fonctions helpers pour garder le fichier principal lisible.
- **Filtrage au Build :** Utiliser `ctx.skip("raison")` dans `transform` pour exclure des documents (ex: brouillons avec `draft: true`).

**Validation et Qualité des Données:**

- **Validation Stricte de la Taxonomie :** Le build DOIT échouer ou afficher un avertissement clair si un tag utilisé dans un fichier de contenu n'est pas défini dans la `TAG_TAXONOMY`. Cette vérification est implémentée dans le hook `onSuccess` de `content-collections.ts` pour garantir la cohérence des métadonnées.

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
DO comprendre que Next.js 15 ne met plus rien en cache par défaut
DO écrire du code facile à expliquer aux autres étudiants

DO NOT sur-ingénier les solutions ou ajouter une complexité inutile
DO NOT effectuer de logique de liaison de données (ex: `guides.map(...)` pour trouver des concepts) au runtime. C'est le rôle du build.
DO NOT créer de types manuels pour le contenu (ex: `GuideWithSlug`).
DO NOT supposer que les données sont mises en cache par défaut dans Next.js 15
DO NOT sacrifier la clarté pour la sophistication technique

En cas de doute, se référer à la documentation officielle de React 19, Next.js 15, et Content Collections.
</instructions>

<webui_informations>
<openai_information>
- Openai : Deux webui disponibles : ChatGPT (https://chatgpt.com/) et Playground (https://platform.openai.com/playground)

  • Modèles récents (2024-2025) :
    - GPT-5 (août 2025) : Modèle unifié avec raisonnement avancé. 
      Variantes : gpt-5 (complet), gpt-5-mini (rapide), gpt-5-nano (ultra-rapide)
      Fenêtre contextuelle : jusqu'à 400K tokens
      Performances : 94.6% (AIME 2025), 74.9% (SWE-bench), 84.2% (MMMU)
    - GPT-4.1 (2024) : Modèle pour développeurs, API flexible
      Variantes : gpt-4.1, gpt-4.1-mini, gpt-4.1-nano
    - GPT-4o (mai 2024) : Multimodal (texte, image, son)

  • ChatGPT - Outils disponibles :
    - Compréhension PDF :
      • Gratuit : GPT-4o mini (limité)
      • Payant (20€/mois) : GPT-5 (complet) - OCR natif, analyse tableaux/diagrammes
    
    - Deep Research :
      • Gratuit : Version lite (5 utilisations/mois)
      • Payant : Version complète (illimitée, export PDF)
    
    - Live :
      • Gratuit : Voix standard
      • Payant : Voix avancée, streaming temps réel

  • ChatGPT Playground - Outils :
    - Modèles : GPT-5, GPT-4.1, GPT-4o, GPT-3.5-turbo (+ variants mini/nano)
    - Paramètres : Temperature (0-1), Max length (1-2048), Top P (0-1)
    - Modes : Chat, Completion
    - Multimodal : Texte, image, audio
    - Connecteurs : Intégrations externes, CRM, bases de données
    - Agent : Exécution tâches complexes multi-outils
    - Pas de quotas gratuit sans CB

  • Accès gratuit vs payant (20€/mois) :
    - Gratuit : GPT-5 limité, GPT-4o mini, 8K tokens, plugins non disponibles
    - Payant : GPT-5 étendu, 32K tokens, plugins, génération images, GPTs personnalisés
</openai_information>

<google_information>
- Google : Deux webui disponibles - Gemini (gemini.google.com) et AI Studio (aistudio.google.com)

  • Modèles récents (2024-2025) :
    - Gemini 2.5 Pro (juin 2025) : Modèle "pensant" le plus puissant
      • Contexte : 1M tokens (env. 750 Mo texte)
      • Entrées : Audio, images, vidéo, texte, PDF
      • Performances : Raisonnement avancé, analyse codebases, traitement documents longs
    - Gemini 2.5 Flash (juin 2025) : Meilleur rapport prix/performance
      • Contexte : 1M tokens
      • Entrées : Audio, images, vidéo, texte
      • Optimisé pour faible latence et haut débit
    - Gemini 2.5 Flash-Lite (juillet 2025) : Version optimisée coût/latence
      • Contexte : 1M tokens
      • Entrées : Texte, image, vidéo, audio, PDF
    - Gemini 2.5 Flash Image Preview (août 2025) : Génération d'images conversationnelle
    - Imagen 4 (août 2025) : Ultra, Standard et Fast modèles

  • Gemini - Outils disponibles :
    - Compréhension PDF :
      • Gratuit : Gemini 2.5 Flash (limité à 32K tokens, 10 fichiers max 100Mo)
      • Payant (20€/mois) : Gemini 2.5 Pro (1M tokens, analyse feuilles calcul, données tabulaires)
    
    - Deep Research :
      • Gratuit : Non disponible
      • Payant : Disponible avec Gemini Advanced, génération rapports détaillés
    
    - Live :
      • Gratuit : Voix standard
      • Payant : Gemini Live avec interactions vocales temps réel

  • Google AI Studio - Outils :
    - Modèles : Gemini 2.5 Pro/Flash/Flash-Lite, Imagen 4, Veo 3
    - Paramètres : Temperature, Max tokens, Top P, Top K
    - Modes : Chat, Completion, Batch
    - Multimodal : Texte, image, audio, vidéo, PDF
    - Fonctionnalités : 
      • Structured outputs
      • Function calling
      • Code execution
      • Search grounding
      • Thinking mode
      • URL context
      • Caching support
    - API gratuite : 60 requêtes/min, 300K tokens/jour
    - API Gratuite = Accès gratuit sur la webui avec quota (utilisant api en arrière plan mais pas besoin de code). De plus, pas de CB nécessaire pour l'inscription = outil privilégié pour les étudiants, sans nécessité de sortir la carte de crédit, permettant d'accéder aux meilleurs modèles avec quota généreux. 

  • Accès gratuit vs payant (20€/mois - Gemini Advanced) :
    - Gratuit : Gemini 2.5 Flash, 32K tokens, 10 fichiers 100Mo max
    - Payant : Gemini 2.5 Pro, 1M tokens, 100 requêtes 2.5 Pro/jour, Veo 3 (3 vidéos/jour), Deep Research
</google_information> 

<anthropic_information>
- Anthropic : Deux webui disponibles - Claude (claude.ai) et Console (console.anthropic.com)

  • Modèles récents (2024-2025) :
    - Claude Opus 4.1 (août 2025) : Modèle le plus performant pour tâches complexes
      • Contexte : 200K tokens (env. 150 000 mots)
      • Performances : 74.5% sur SWE-bench Verified, excellence en codage et raisonnement
      • Spécialisation : Analyse approfondie, recherche, traitement codebases complexes
    - Claude Sonnet 4 (mai 2025) : Meilleur rapport performance/pratique
      • Contexte : 200K tokens (1M tokens en version bêta depuis août 2025)
      • Performances : Faible hallucination, idéal pour bases de connaissances volumineuses
      • Spécialisation : Agents conversationnels, génération code, analyse données
    - Claude Haiku 4 (mai 2025) : Modèle rapide et économique
      • Contexte : 200K tokens
      • Spécialisation : Réponses rapides, traitement haut volume

  • Claude - Outils disponibles :
    - Compréhension PDF :
      • Gratuit : Traitement basique, 50 messages/jour
      • Payant ($18-25/mois) : Analyse avancée, traitement documents volumineux
    
    - Research :
      • Gratuit : Accès limité aux fonctionnalités de recherche
      • Payant : Accès complet à Research, analyse approfondie
    
    - Projects :
      • Gratuit : Non disponible
      • Payant : Organisation illimitée de chats et documents

  • Anthropic Console - Outils :
    - Modèles : Claude Opus 4.1, Sonnet 4, Haiku 4
    - Paramètres : Temperature, Top P, Top K, Max tokens
    - Modes : Messages, Completions
    - Fonctionnalités :
      • Evaluate : Tests et évaluation de prompts avec génération de cas de test
      • Workbench : Environnement de développement intégré
      • Générateur de prompts : Création automatique de prompts détaillés
      • API Reference : Documentation complète et exemples de code
      • Cookbooks : Exemples pratiques et meilleures pratiques
      • Prompt caching : Jusqu'à 90% d'économies
      • Batch processing : 50% d'économies
      • Support multimodal : Texte, image, document

  • Accès gratuit vs payant ($18-25/mois) :
    - Gratuit : 50 messages/jour, personas prédéfinis, publicités occasionnelles
    - Payant : Usage illimité (limites en heures de pointe), personas personnalisables, intégrations (Slack, Google Workspace), priorité accès, early features, Claude Code, Projects illimités
</anthropic_information>

<zai_information>
- Zhipu AI : Webui disponible - Chat Z.AI (chat.z.ai)

  • Modèle récent (2025) :
    - GLM-4.5 (juillet 2025) : Modèle open-source unifié
      • Architecture : Mixture-of-Experts (MoE) avec 355B paramètres totaux, 32B actifs
      • Contexte : 128K tokens
      • Performances : 3ème mondial (63.2) sur 12 benchmarks, derrière Grok-4 et GPT-o3
      • Modes hybrides : Mode "thinking" pour raisonnement complexe, mode "non-thinking" pour réponses rapides

  • Chat Z.AI - Outils disponibles (tous gratuits actuellement) :
    - Création de présentation (AI Slides) :
      • Agent PPT/Poster intégré
      • Recherche web autonome pour contenu et images
      • Génération directe en HTML (pas de templates)
      • Support documents de référence
    
    - Web search avancée :
      • Simulation de recherche "humaine" plus naturelle que Perplexity
      • Collecte et synthèse d'informations en temps réel
      • Intégration native dans les workflows de création
    
    - Fullstack :
      • Développement web complet (frontend, backend, base de données)
      • Création d'applications entières à partir de prompts simples
      • Déploiement automatique et gestion de bases de données
    
    - Web design :
      • Création d'interfaces frontend complexes et responsives
      • Génération de graphiques SVG détaillés
      • Design visuel avancé avec HTML et Python
      • Agent dédié pour sites web complets
    
    - Code :
      • Support multi-langages
      • Création d'artefacts autonomes (mini-jeux, simulations physiques)
      • Génération de code exécutable en HTML, SVG, Python
      • Capacités d'édition et raffinement par dialogue naturel

  • Fonctionnalités principales :
    - Architecture unifiée raisonnement/codage/agent
    - Taux de succès d'appel d'outils : 90.6% (meilleur que Claude-4-Sonnet, Kimi K2, Qwen3-Coder)
    - Mode Auto Think pour activation automatique du raisonnement
    - Création d'artefacts complexes et autonomes
    - Interface conversationnelle pour itérations et améliorations

  • Accès : Totalement gratuit (août 2025)
    • Aucune limitation de usage connue
    • Accès direct au modèle GLM-4.5 complet
    • Tous les outils avancés disponibles sans restriction

Attention, risque très important au niveau de la confidentialité lorsque l'on passe par leurs propre plateforme.
</zai_information>

<perplexity_information>
- Perplexity : Webui disponible - Perplexity (perplexity.ai)

  • Modèles récents (2024-2025) :
    - Sonar (2024) : Moteur de réponse propriétaire basé sur Llama 3.3 fine-tuné par perplexity (70B)
      • Contexte : Recherche web en temps réel
      • Performances : 1 200 tokens/seconde, dépasse GPT-4o mini et Claude 3.5 Haiku
      • Variantes : Sonar (rapide et léger), Sonar Pro (plus puissant, requêtes simultanées)
    - Modèles externes (accès payant) :
      • GPT 5
      • Gemini 2.5 Pro
      • Claude 3

  • Perplexity - Outils disponibles :
    - Recherche approfondie (Deep Research) :
      • Gratuit : Non disponible
      • Payant ($20/mois) : Effectue dizaines de recherches, analyse centaines de sources, génère rapports complets autonomes
    
    - Génération d'images :
      • Gratuit : Non disponible
      • Payant : Intégrée directement dans l'interface
    
    - Traitement de fichiers :
      • Gratuit : Limité (extraits ou documents courts)
      • Payant : Illimité (PDFs, images, CSVs, tableurs)

  • Fonctionnalités principales :
    - Recherche web en temps réel avec sources citées (utilisation de RAG, possibilité de cibler contenu des réseaux sociaux, académiques)
    - Synthèse structurée avec transparence des sources
    - Mode conversationnel pour affiner les résultats
    - Capacité à traiter et analyser des documents uploadés
    - Personnalisation des domaines de recherche favoris
    - Historique des recherches et conversations

  • Accès gratuit vs payant ($20/mois) :
    - Gratuit :
      • 5 recherches Pro/jour
      • Recherches standard illimitées (modèle par défaut)
      • Modèle : Sonar (version rapide)
      • Uploads limités
      • Support basique
    
    - Payant (Pro) :
      • 300+ recherches Pro/jour
      • Accès modèles avancés (GPT-4o, Claude 3)
      • Génération d'images
      • Uploads illimités
      • Deep Research
      • Support prioritaire (1-2 jours)
      • $5/mois de crédits API
</perplexity_information>

<qwen_information>
- Alibaba : Webui disponible - Qwen Chat (chat.qwen.ai)

  • Modèles récents (2025) :
    - Qwen 3 (avril 2025) : Famille de modèles open-source sous licence Apache 2.0
      • Architecture : Mixture of Experts (MoE) et versions denses
      • Variantes principales :
        - Qwen3-235B-A22B : 235B paramètres totaux, 22B actifs (modèle phare)
        - Qwen3-30B-A3B : 30B paramètres, 3B actifs (recommandé pour usage local)
        - Qwen3-32B dense : Version dense pour créativité et raisonnement complexe
        - Qwen3-14B : Compromis performance/matériel
      • Contexte : Jusqu'à 128K tokens
      • Performances : Excellence en mathématiques (surpasse DeepSeek R1 sur AIME'24/25), programmation, raisonnement

  • Qwen Chat - Outils disponibles (tous gratuits actuellement) :
    - Deep Research :
      • Disponible pour tous les utilisateurs depuis août 2025
      • Compile des rapports complets sur des sujets complexes
      • Pose des questions de précision pour affiner la recherche
      • Analyse et synthétise des centaines de sources
    
    - Image Edit :
      • Basé sur Qwen-Image-Edit (20B paramètres)
      • Architecture dual-path pour préservation sémantique et apparence
      • Modifications haute fidélité avec contrôle sémantique
      • Retouches d'images en quelques secondes
    
    - Web Dev :
      • Développement full-stack sans codage
      • Création d'applications web complètes via prompts naturels
      • Génération instantanée de code et composants UI
      • Support frontend et backend avec intégration Qwen 3
    
    - Image Generation :
      • Intégration de Qwen-Image pour génération d'images
      • Rendu de texte précis
      • Création à partir de descriptions textuelles
      • Support multimodal avancé

  • Fonctionnalités principales :
    - Mode "Thinking" pour raisonnement approfondi
    - Recherche web intégrée avec sources
    - Capacités multimodales (texte, image, vidéo)
    - Traitement de documents
    - Interface conversationnelle naturelle
    - Compatibilité avec matériel grand public (versions optimisées)

  • Accès : Totalement gratuit (août 2025)
    • Aucune limitation de usage connue
    • Accès à tous les modèles Qwen 3
    • Tous les outils avancés disponibles sans restriction
    • Licence Apache 2.0 pour utilisation commerciale
</qwen_information>

<deepseek_information>
Informations fondamentales sur la webui évoquée dans le projet :
- DeepSeek : Webui disponible - DeepSeek Chat (chat.deepseek.com)

  • Modèles récents (2025) :
    - DeepSeek V3.1 (août 2025) : Dernière version open-source
      • Architecture : Mixture-of-Experts avec 671B paramètres totaux, 37B actifs par token
      • Contexte : 128K tokens (environ 100 000 caractères chinois ou 96 000 mots anglais)
      • Performances : Excellence en raisonnement mathématique (59.4 sur AIME), programmation (49.2 sur LiveCodeBench), rédaction chinoise
      • Améliorations : Raisonnement intégré (pas de basculement manuel), traitement frontend amélioré
    
    - DeepSeek R1 : Modèle spécialisé raisonnement
      • Focus : Raisonnement complexe, logique avancée
      • Performances : Supérieur à V3.1 sur tâches nécessitant une réflexion approfondie
      • Tarification : 6,5 fois plus coûteux que V3.1

  • DeepSeek Chat - Outils disponibles (tous gratuits actuellement) :
    - DeepThink (R1) :
      • Fonctionnalité de raisonnement approfondi intégrée
      • Traitement de problèmes complexes avec analyse logique étape par étape
      • Combinable avec recherche web pour réponses plus complètes
      • Limitation : 50 messages par jour en mode gratuit
    
    - Recherche web en temps réel :
      • Accès aux informations actualisées
      • Intégration avec DeepThink pour analyses approfondies
      • Pas de limitation d'utilisation connue
    
    - Import et analyse de fichiers :
      • Formats supportés : PDF, Word (.docx), Excel (.xlsx), PowerPoint (.pptx), texte brut (.txt)
      • Images : JPEG, PNG, GIF
      • Capacité : Jusqu'à 50 fichiers simultanément, 100 Mo par fichier
      • Extraction et analyse d'informations multi-formats
    
    - Développement web (via DeepSite) :
      • Création de sites web par description en langage naturel
      • Génération complète de code HTML/CSS/JavaScript
      • Modification et ajustement en temps réel
      • Aucune connaissance en codage requise
    
    - Génération d'images (via Janus-Pro) :
      • Modèle Janus-Pro-7B spécialisé
      • Performances : Surpasse DALL-E 3 et Stable Diffusion
      • Génération de prompts détaillés pour création d'images
      • Applications : Art numérique, supports marketing, impression à demande

  • Fonctionnalités principales :
    - Interface similaire à ChatGPT avec moteur de recherche intégré
    - Mode "Thinking" automatique pour raisonnement approfondi
    - Support multilingue (anglais et mandarin principalement)
    - Historique des conversations organisable
    - Évaluation des réponses pour amélioration du modèle
    - Personnalisation : thème clair/sombre, langue d'interface

  • Accès : Totalement gratuit (août 2025)
    • Aucune restriction sur les fonctionnalités de base
    • Limitation : 50 messages/jour pour DeepThink R1
    • API disponible à tarification compétitive (0,27$/million tokens entrée, 1,10$/million sortie)
    • Modèles open-source sous licence MIT pour utilisation commerciale
</deepseek_information>

<autre>
- Plateforme complètement gratuite mais énorme risque de confidentialité : https://ish.junioralive.in/
- Trouver des outils gratuits en IA (attention à la confidentialité, si c'est gratuit c'est que les données sont très probablement réutilisées au mieux pour l'entraînement, au pire pour la revente) : https://fmhy.net/ai#ai-chatbots
- ATTENTION : Veiller à distinguer MODELE OPENSOURCE du Provider, un modèle opensource (glm-4.5, qwen-3 ...) est, par définition, parfaitement confidentiel, SI HEBERGE LOCALEMENT. Lorsque vous utilisez les site comme z.ai, qwen ... vous utilisez une version qu'eux-même hébergent et donc vos données transitent par leurs serveurs. Par défaut, évitez toute données confidentielles, mais méfiez vous particulièrement des serveurs basés en asie (qwen, zai, deepseek...) la politique de confidentialité étant bien souvent très légère par rapport à ceux hébergés en UE. La seule façon d'avoir une confidentialité optimale/suffisante pour des données personnelles ou identifiable est d'héberger localement, sur son ordinateur via des outils comme LM Studio, des modèles. 
</autre>

</webui_informations>  
