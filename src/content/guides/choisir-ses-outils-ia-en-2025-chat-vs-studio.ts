// src/content/guides/choisir-ses-outils-ia-en-2025-chat-vs-studio.ts
import type { Guide } from '@/lib/content-schema';

export const guide = {
  "slug": "choisir-ses-outils-ia-en-2025-chat-vs-studio",
  "title": "Choisir ses Outils IA en 2025 : Chat vs Studio",
  "description": "Guide complet pour choisir ses outils IA en 2025 : interfaces de chat pour l'usage quotidien vs studios d'expérimentation pour maîtriser le prompt engineering",
  "icon": "Workflow",
  "category": "outils",
  "difficulty": "débutant",
  "estimatedTime": "25 minutes",
  "tags": [
    "outils",
    "guide",
    "pedagogie",
    "comparatif"
  ],
  "isFavorite": true,
  "isWorkflow": false,
  "keyTakeaways": [
    "Il existe deux catégories d'outils IA : les **interfaces de chat** pour l'usage quotidien et les **studios d'expérimentation** pour maîtriser le prompt engineering.",
    "Perplexity.ai est le roi de la recherche fiable grâce à ses sources systématiques et son mode 'Academic'.",
    "Google AI Studio offre l'accès gratuit le plus généreux avec Gemini 2.5 Pro et 1 million de tokens de contexte.",
    "Construisez un 'arsenal stratégique' : Perplexity pour la recherche, DeepSeek pour l'analyse de documents, Google AI Studio pour l'expérimentation."
  ],
  "conceptSlugs": [
    "context-engineering",
    "température-dosage"
  ],
  "content": [
    {
      "type": "markdown",
      "content": "# Choisir ses Outils IA en 2025 : Chat vs Studio\n\nEn 2025, l'écosystème des intelligences artificielles est organisé en deux catégories distinctes : les **interfaces de chat** pour l'usage quotidien et les **studios d'expérimentation** pour approfondir le prompt engineering. Ce guide vous aide à choisir les bons outils selon vos besoins spécifiques d'étudiant ou de professionnel de santé."
    },
    {
      "type": "markdown",
      "content": "## Les Deux Écosystèmes d'IA : Une Analogie"
    },
    {
      "type": "tabs",
      "defaultValue": "chat",
      "tabs": [
        {
          "value": "chat",
          "title": "Interfaces de Chat",
          "content": [
            {
              "type": "card",
              "title": "🚗 Les Interfaces de Chat : Votre Voiture Quotidienne",
              "content": "Les WebUIs de chat (ChatGPT, Gemini, Claude, Perplexity) sont comme des **voitures prêtes à conduire**. Vous montez, vous démarrez, et c'est parti. Parfaites pour :\n\n- Recherche rapide d'informations\n- Analyse de documents\n- Rédaction et brainstorming\n- Cas cliniques simples\n\nIdéal pour : Usage quotidien, débutants, rapidité d'exécution"
            }
          ]
        },
        {
          "value": "studio",
          "title": "Studios d'Expérimentation",
          "content": [
            {
              "type": "card",
              "title": "🔧 Les Studios d'Expérimentation : Votre Garage de Mécanique",
              "content": "Les environnements d'expérimentation (Google AI Studio, OpenAI Playground, Anthropic Console) sont comme des **bancs d'essai de moteur**. Vous regardez sous le capot, réglez les paramètres et comprenez le fonctionnement. Parfaits pour :\n\n- Comprendre la température et les paramètres\n- Tester des prompts complexes\n- Analyser des textes très longs\n- Créer des templates réutilisables\n\nIdéal pour : Apprentissage approfondi, optimisation, expérimentation"
            }
          ]
        }
      ]
    },
    {
      "type": "markdown",
      "content": "## Partie 1 : Interfaces de Chat - Votre Arsenal Quotidien"
    },
    {
      "type": "markdown",
      "content": "### Tableau Comparatif des WebUIs de Chat (Offres Gratuites)\n\n| Critère | Perplexity AI | Gemini (Google) | ChatGPT (OpenAI) | Claude.ai | DeepSeek / Qwen / Z.AI |\n| :--- | :--- | :--- | :--- | :--- | :--- |\n| **Point Fort** | **Recherche Fiable & Sourcée** | **Accès à Gemini 2.5 Flash** | **Écosystème & Popularité** | **Grande Fenêtre Contexte** | **Suite d'Outils Gratuits** |\n| **Analyse PDF** | Limitée | **Très Bonne (10 fichiers)** | Limitée | Bonne | **Excellente (50 fichiers)** |\n| **Confidentialité** | Standard (US) | Standard (US/EU) | Standard (US) | Standard (US) | ⚠️ **Très Faible (Asie)** |\n| **Idéal pour...** | Veille scientifique, réponses factuelles | Assistant polyvalent, analyse de doc | Tâches créatives, brainstorming | Analyse de longs documents, rédaction | Expérimentation, création (slides, code) |"
    },
    {
      "type": "markdown",
      "content": "### Analyse par Cas d'Usage"
    },
    {
      "type": "tabs",
      "defaultValue": "recherche",
      "tabs": [
        {
          "value": "recherche",
          "title": "Recherche Biblio",
          "content": [
            {
              "type": "card",
              "title": "🏆 Pour la Recherche Bibliographique : Perplexity AI",
              "content": "Sa fonction première est de fournir des réponses **sourcées et à jour**. La possibilité de focaliser la recherche sur les publications académiques (`Focus: Academic`) est un avantage décisif. C'est l'outil le plus fiable pour minimiser le risque d'hallucination."
            },
            {
              "type": "alert",
              "content": "**Prompt optimisé :** \"Quelles sont les dernières recommandations de l'HAS sur la prescription d'antibiotiques pour l'angine bactérienne chez l'adulte ? (Focus: Academic)\""
            }
          ]
        },
        {
          "value": "analyse",
          "title": "Analyse de Cours",
          "content": [
            {
              "type": "card",
              "title": "🏆 Pour l'Analyse de Documents : DeepSeek Chat",
              "content": "Sa capacité à traiter jusqu'à **50 documents simultanément** en version gratuite est inégalée. Vous pouvez uploader toutes vos annales, vos fiches de cours et vos articles pour une session de révision."
            },
            {
              "type": "alert",
              "content": "**Alternative fiable :** Gemini (Google) traite 10 fichiers avec une meilleure confidentialité."
            }
          ]
        },
        {
          "value": "clinique",
          "title": "Cas Cliniques",
          "content": [
            {
              "type": "card",
              "title": "🏆 Pour les Cas Cliniques : Claude.ai",
              "content": "La grande fenêtre de contexte et la robustesse logique de Claude en font l'outil de choix pour le raisonnement clinique complexe.\n\n**Alternative gratuite :** DeepSeek avec le mode \"DeepThink\" pour un raisonnement approfondi."
            }
          ]
        },
        {
          "value": "creation",
          "title": "Création de Contenu",
          "content": [
            {
              "type": "card",
              "title": "🏆 Pour la Création : Chat Z.AI",
              "content": "Ses outils intégrés, en particulier **\"AI Slides\"**, permettent de générer une présentation complète avec recherche web intégrée."
            },
            {
              "type": "alert",
              "content": "**Prompt optimisé :** \"Crée une présentation de 10 slides pour des étudiants en P2 sur le thème : 'Le rôle du pharmacien dans la gestion des maladies chroniques'. Inclus des images libres de droit.\""
            }
          ]
        }
      ]
    },
    {
      "type": "markdown",
      "content": "## Partie 2 : Studios d'Expérimentation - Votre Laboratoire d'Apprentissage"
    },
    {
      "type": "markdown",
      "content": "### Tableau Comparatif des Environnements d'Expérimentation\n\n| Critère | Google AI Studio | OpenAI Playground | Anthropic Console |\n| :--- | :--- | :--- | :--- |\n| **Point Fort** | **Accès Gratuit & Généreux** | **Accès aux derniers modèles GPT** | **Outils d'Évaluation de Prompts** |\n| **Modèle Gratuit** | ✅ **Gemini 2.5 Pro (1M tokens)** | ❌ Non (nécessite une CB) | ❌ Non (nécessite une CB) |\n| **Contexte Max** | **1 Million de tokens** | 400 00 tokens | 200 000 tokens (1M en bêta) |\n| **Expérience Non-Dev**| **Excellente et intuitive** | Bonne, un peu plus technique | Bonne, orientée évaluation |\n| **Fonctionnalité Unique**| Contexte via URL, Sorties Structurées | Accès aux variantes (nano, mini) | **Workbench & Générateur de Prompts** |\n| **Idéal pour...**| **Apprendre sans frais, tester sur de longs textes**| Expérimenter avec l'écosystème GPT | Rédiger et évaluer des prompts de manière rigoureuse |"
    },
    {
      "type": "markdown",
      "content": "### Analyse Détaillée pour le Prompt Engineer en Herbe"
    },
    {
      "type": "tabs",
      "defaultValue": "studio-debutant",
      "tabs": [
        {
          "value": "studio-debutant",
          "title": "Débuter (Gratuit)",
          "content": [
            {
              "type": "card",
              "title": "🏆 Le Meilleur Point de Départ : Google AI Studio",
              "content": "**Pourquoi ?** C'est le seul environnement qui offre un accès **totalement gratuit et sans carte de crédit** à son modèle le plus puissant, **Gemini 2.5 Pro**, avec sa phénoménale fenêtre de contexte de **1 million de tokens**.\n\n**Cas d'usage pour un étudiant en pharmacie :**\n1. **Tester la Température :** Générez une réponse avec température 0.1 (factuelle), puis 0.9 (créative) pour le même cas clinique\n2. **Analyser un Cours Entier :** Collez l'intégralité d'un cours (grâce au contexte de 1M) pour générer des questions d'examen\n3. **Utiliser le Contexte par URL :** Donnez l'URL d'une recommandation ANSM pour une synthèse automatique"
            }
          ]
        },
        {
          "value": "studio-gpt",
          "title": "Maîtriser GPT",
          "content": [
            {
              "type": "card",
              "title": "🏆 Pour Explorer l'Écosystème GPT : OpenAI Playground",
              "content": "**Pourquoi ?** Si votre objectif est de maîtriser l'écosystème OpenAI (GPTs, API, etc.), le Playground est incontournable pour comparer directement le comportement des différents modèles.\n\n**Cas d'usage pour un étudiant en pharmacie :**\n1. **Maîtriser le System Prompt :** Définir une \"constitution\" détaillée pour spécialiser l'IA en pharmacie hospitalière\n2. **Comparer les Modèles :** Tester GPT-5 vs GPT-5-nano pour arbitrer entre coût et performance"
            }
          ]
        },
        {
          "value": "studio-expert",
          "title": "Devenir Expert",
          "content": [
            {
              "type": "card",
              "title": "🏆 Pour Devenir un Artisan du Prompt : Anthropic Console",
              "content": "**Pourquoi ?** La console d'Anthropic est conçue pour ceux qui veulent aller plus loin dans la **qualité et la fiabilité** des prompts. Ses outils font d'elle un véritable atelier d'artisan.\n\n**Cas d'usage pour un étudiant en pharmacie :**\n1. **Générateur de Prompts :** Créer automatiquement des prompts détaillés pour analyser une ordonnance\n2. **Workbench :** Organiser ses recherches par matière et sauvegarder ses meilleurs prompts"
            }
          ]
        }
      ]
    },
    {
      "type": "markdown",
      "content": "## Le \"Combo\" Idéal de l'Étudiant en 2025\n\nIl n'y a pas un seul \"meilleur\" outil, mais un **arsenal stratégique** à déployer en fonction de la situation :"
    },
    {
      "type": "card",
      "content": "- **Pour la Recherche Fiable** : Utilisez **Perplexity AI** comme moteur de recherche principal.\n- **Pour le Travail sur Documents** : **DeepSeek Chat** pour analyser vos cours (vigilance confidentialité).\n- **Pour la Rédaction & le Quotidien** : **Gemini** ou **ChatGPT** comme assistants polyvalents.\n- **Pour l'Apprentissage du Prompt Engineering** : **Google AI Studio** pour comprendre les paramètres et tester des prompts complexes."
    },
    {
      "type": "markdown",
      "content": "## Votre Parcours de Formation Recommandé"
    },
    {
      "type": "card",
      "content": "1. **Démarrez avec les Interfaces de Chat** : Perplexity + Gemini pour couvrir recherche et usage quotidien.\n2. **Explorez Google AI Studio** : Gratuit et parfait pour comprendre les concepts fondamentaux.\n3. **Spécialisez-vous si Nécessaire** : OpenAI Playground ou Anthropic Console selon vos besoins spécifiques."
    },
    {
      "type": "markdown",
      "content": "## Aller Plus Loin\nPour une exploration complète des outils IA gratuits et sans carte bancaire, consultez notre guide sur le core kit gratuit."
    },
    {
      "type": "guideRecommendation",
      "slug": "le-core-kit-ia-gratuit-en-2025",
      "reason": "Découvrez en détail le duo Z.AI + AI Studio qui permet d'accéder à 95% des capacités de pointe sans frais."
    },
    {
      "type": "markdown",
      "content": "## Concepts Abordés"
    },
    {
      "type": "conceptRecommendation",
      "slug": "context-engineering",
      "reason": "Comprendre le context engineering est crucial pour utiliser efficacement les grandes fenêtres de contexte des studios."
    },
    {
      "type": "conceptRecommendation",
      "slug": "température-dosage",
      "reason": "La maîtrise de la température, un paramètre clé des studios, vous permet de doser la créativité de l'IA."
    }
  ]
} satisfies Guide;