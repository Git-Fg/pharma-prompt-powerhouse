<project_philosophy>
**Philosophie du Projet : Plateforme d'Excellence Pédagogique**

- **Mission : Transformer les utilisateurs d'IA de "passagers" en "pilotes"** par l'apprentissage structuré et l'interconnexion des connaissances.
- **Excellence du Contenu :** Chaque élément doit apporter une valeur pédagogique mesurable avec des takeaways clairs et des recommandations contextuelles.
- **Écosystème Interconnecté :** Tous les contenus doivent se référencer mutuellement de manière intelligente (GuideRecommendation, ConceptRecommendation, ToolRecommendation).
- **Principe de Progression :** Architecture Débutant → Intermédiaire → Avancé avec parcours d'apprentissage guidé.
- **Qualité avant Quantité :** 36 documents finement craftés valent mieux que 100 contenus médiocres.
</project_philosophy>

<content_rules>
**Règles du Contenu : L'Excellence Pédagogique**

- **Public Cible : Non-Développeurs Uniquement.** Bannir totalement le jargon technique dev (API, RAG, etc.). Focus absolu sur l'ingénierie de prompts pharmaceutiques.
- **Approche "WebUI First" Absolue :** 100% des guides utilisent des interfaces web (ChatGPT, Claude, AI Studio, etc.). Zéro ligne de code requise.
- **Valoriser les Outils Avancés :** Promouvoir Playground/Console/Studio comme outils d'expertise, pas de développement.
- **Interconnexions Obligatoires :** Chaque contenu DOIT avoir des recommandations contextuelles vers autres contenus pertinents.
- **Variables Standardisées :** Format `{{nom_variable}}` strict dans frontmatter ET MDX avec backticks : `{{variable}}`.
- **Qualité Mesurable :** keyTakeaways obligatoires pour concepts/guides, conceptSlugs validés automatiquement.
- **Validation Croisée :** Tests automatiques vérifient toutes les références entre contenus.
</content_rules>

<project_documentation_rules>
**Documentation Architecture - Production Ready**

- **`README.md` :** Vitrine du projet fini avec métriques de performance, guide complet d'installation/déploiement.
- **`/.github/copilot-instructions.md` :** Constitution technique mise à jour reflétant l'état finalisé du projet.
- **Validation Continue :** 30+ tests automatiques garantissent la cohérence documentation/code.
- **Standards de Qualité :** Documentation alignée avec la maturité production du projet.
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

<user_experience_and_accessibility>
**UX/UI - Production Ready Standards**

- **Cohérence Absolue :** Toutes les pages suivent le même pattern : Header enrichi + KeyTakeaways + Contenu + Interconnexions + Related Content.
- **Navigation Intelligente :** PromptCard mène aux détails d'abord, action secondaire pour usage direct.
- **Accessibilité Native :** shadcn/ui garantit WCAG compliance, testid pour E2E robustes.
- **Responsive Excellence :** Mobile-first avec breakpoints optimisés pour tous devices.
- **Performance UX :** <2s load time, 48 pages statiques pré-générées.
</user_experience_and_accessibility>

---
### **Architecture Technique Finalisée**
---

<content_collections_architecture>
**Content Collections - Cœur du Système**

- **Build-Time Processing :** Transformation MDX → TypeScript au build pour performance maximale.
- **Zod + TypeScript :** Validation stricte + génération automatique de types pour tous contenus.
- **Interconnexions Automatiques :** conceptSlugs → objets Concept complets via transform functions.
- **Validation Croisée :** Tests automatiques vérifient toutes références entre contenus.
- **Zero Runtime Logic :** Aucune résolution de liens côté client, tout préparé au build.

**Configuration (`content-collections.ts`):**
- **Ordre des Dépendances :** Collections sans deps (concepts) AVANT celles qui en dépendent (guides).
- **Transform Functions :** Enrichissement des données au build via helpers dédiés.
- **Filtrage Intelligent :** ctx.skip() pour brouillons, validation taxonomy dans onSuccess.
</content_collections_architecture>

<component_system>
**Système de Composants Interconnectés**

**Composants de Recommandation (Production):**
- **GuideRecommendation :** Affiche guide avec takeaways preview + bouton d'action contextuel.
- **ConceptRecommendation :** Concept avec description + tags + lien découverte.  
- **ToolRecommendation :** Outil avec cas d'usage + accès direct + détails.

**Composants MDX Étendus :**
- **MultiFormatPrompt :** Affichage prompt multi-plateforme (Claude XML, ChatGPT standard, etc).
- **KeyTakeaways :** Points clés visuels pour apprentissage rapide.
- **RelatedContent :** Système de liens connexes automatique.

**Usage dans MDX :**
```mdx
<ToolRecommendation toolSlug="claude-ai" reason="Claude excelle pour..." />
<GuideRecommendation guideSlug="5-piliers" reason="Maîtrisez d'abord..." />
<ConceptRecommendation conceptSlug="context-engineering" reason="Technique fondamentale..." />
```
</component_system>

<react19_production_rules>
**React 19 - Optimisé Production**

**Performance Native :**
- React Compiler activé avec fallbacks manuels si nécessaire.
- Pas de useMemo/useCallback sauf cas spécifiques mesurés.
- Composants "stupides" consommant données pré-traitées par Content Collections.

**Gestion d'État Moderne :**
- `useState` + `useTransition` pour interactions client complexes (éditeur prompts).
- `use()` hook pour consommation de contextes et promesses.
- Actions React 19 pour formulaires simples avec `useActionState`.

**APIs Async Natives :**
- Toutes les APIs Next.js (cookies, headers, params) utilisées en async/await.
- Gestion d'erreur avec error boundaries appropriés.
</react19_production_rules>

<nextjs15_production_architecture>
**Next.js 15 - Configuration Production**

**App Router Optimisé :**
- Structure `/[feature]/[slug]/page.tsx` pour SEO et performance.
- Génération statique de 48 pages avec `generateStaticParams`.
- Métadonnées dynamiques complètes pour chaque type de contenu.

**Cache Strategy :**
- Cache désactivé par défaut conformément à Next.js 15.
- `force-static` uniquement où nécessaire pour performance.
- Build statique complet pour déploiement edge optimisé.

**Performance Monitoring :**
- Bundle analysis intégré avec métriques de build.
- Lighthouse scores > 95 sur tous critères.
- Core Web Vitals optimisés pour l'expérience utilisateur.
</nextjs15_production_architecture>

<shadcn_ui_integration>
**shadcn/ui - Design System Production**

**Philosophie d'Usage :**
- Composants utilisés tels quels, pas de sur-personnalisation.
- Composition simple pour fonctionnalités complexes.  
- Accessibilité intégrée exploitée à 100%.

**Patterns Etablis :**
- Card + CardHeader/CardContent pour structure cohérente.
- Tabs pour organisation multi-vues (prompts, guides).
- Alert/AlertDescription pour informations importantes.
- Badge système pour catégories/difficultés/tags.
</shadcn_ui_integration>

---

## 🎯 **Production-Ready Best Practices**

### **DO's - Excellence Standards**
- ✅ **Content Interconnection**: Systématiquement ajouter GuideRecommendation, ConceptRecommendation, ToolRecommendation contextuels  
- ✅ **Build-Time Logic**: Utiliser `transform` de Content Collections pour toute logique de données
- ✅ **Type Safety**: Faire confiance aux types générés `.content-collections/generated`
- ✅ **Quality Standards**: keyTakeaways obligatoires, conceptSlugs validés, références croisées vérifiées
- ✅ **Performance Focus**: 48 pages statiques, <2s load time, build optimisé
- ✅ **Test Coverage**: 30+ tests automatiques pour validation continue

### **DON'Ts - Anti-Patterns à Éviter**
- ❌ **Runtime Logic**: Jamais de logique liaison données côté client (guides.map() etc)
- ❌ **Manual Types**: Jamais créer de types manuels pour contenu (GuideWithSlug)  
- ❌ **Over-Engineering**: Pas de complexité inutile, solutions simples privilégiées
- ❌ **Cache Assumptions**: Next.js 15 ne cache rien par défaut, configuration explicite
- ❌ **Technical Jargon**: Contenu 100% non-développeurs, bannir API/RAG/etc

### **Content Excellence Framework**
- **Progression Naturelle**: Débutant → Intermédiaire → Avancé avec recommandations
- **Validation Automatique**: Tests vérifient toutes références croisées et métadonnées  
- **WebUI First**: 100% interfaces web, zéro ligne de code requise
- **Pharmaceutical Focus**: Exemples concrets, cas pratiques, vocabulaire métier

---

*Instructions mises à jour pour refléter l'état production-ready du projet avec 48 pages statiques, système d'interconnexions finalisé, et architecture optimisée Next.js 15 + React 19.*

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
