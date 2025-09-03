// src/content/external-tools-new/claude-ai.ts
import type { ExternalTool } from '@/lib/content-schema';

const externalToolData = {
  "slug": "claude-ai",
  "title": "Claude.ai : La Conversation Intelligente avec Anthropic",
  "description": "Découvrez Claude.ai, l'interface de chat directe et accessible pour interagir avec les modèles d'IA d'Anthropic au quotidien.",
  "tags": [],
  "isFavorite": false,
  "keyTakeaways": [],
  "conceptSlugs": [],
  "url": "https://claude.ai/",
  "category": "outils",
  "capabilities": [],
  "use_cases": [
    "Analyse de longs PDF",
    "Synthèse de cours",
    "Dialogue avec un document"
  ],
  "color": "bg-orange-500",
  "tldr": "Chat IA d'Anthropic excellent pour analyser des documents longs et PDFs. Interface intuitive, idéale pour synthèse de cours et recherche approfondie.",
  "content": [
    {
      "type": "markdown",
      "content": "## Qu'est-ce que Claude.ai ?"
    },
    {
      "type": "card",
      "title": "Interface Grand Public d'Anthropic",
      "description": "Chat IA puissant et accessible",
      "content": "`Claude.ai` est l'interface de conversation grand public développée par Anthropic. C'est un chatbot puissant et accessible, conçu pour des interactions fluides et naturelles. Il est particulièrement réputé pour sa grande fenêtre de contexte et sa faible propension à l'hallucination."
    },
    {
      "type": "tabs",
      "defaultValue": "free-vs-paid",
      "tabs": [
        {
          "value": "free-vs-paid",
          "title": "Gratuit vs Payant",
          "content": [
            {
              "type": "card",
              "title": "Version Gratuite",
              "content": "- **Usage** : Besoins ponctuels (≈50 messages toutes les 8h)\n- **Modèle** : Claude Sonnet 4 (excellent compromis)\n- **Fonctionnalités** : Compréhension de base des PDF\n- **Limitations** : Peut être ralenti aux heures de pointe"
            },
            {
              "type": "card",
              "title": "Claude Pro (18-25€/mois)",
              "variant": "outline",
              "content": "- **Usage** : Au moins 5× plus de messages, utilisation intensive\n- **Modèles** : Sonnet 4 + **Claude Opus 4.1** (le plus puissant)\n- **Fonctionnalités** : Analyse documents volumineux, Projects, accès anticipé\n- **Avantages** : Mémoire à long terme, espaces de travail dédiés"
            }
          ]
        },
        {
          "value": "use-cases",
          "title": "Cas d'Usage Pharmacie",
          "content": [
            {
              "type": "card",
              "title": "Analyse d'Études Cliniques",
              "content": "Uploadez un PDF de plusieurs dizaines de pages et demandez à Claude d'extraire le protocole, les résultats principaux et les conclusions."
            },
            {
              "type": "card",
              "title": "Préparation de Cas",
              "variant": "outline",
              "content": "Soumettez une description de cas pour explorer les diagnostics différentiels, options de traitement et interactions médicamenteuses."
            },
            {
              "type": "card",
              "title": "Fiches de Révision",
              "variant": "outline",
              "content": "Collez le contenu d'un cours pour le synthétiser en points clés, tableaux ou flashcards."
            },
            {
              "type": "card",
              "title": "Aide à la Rédaction",
              "variant": "outline",
              "content": "Reformulation de phrases, correction grammaticale, synonymes pour termes médicaux."
            }
          ]
        }
      ]
    },
    {
      "type": "alert",
      "variant": "default",
      "title": "🎯 Claude.ai vs Anthropic Console",
      "content": "- **`claude.ai`** = Votre **assistant de travail** pour accomplir des tâches\n- **Anthropic Console** = Votre **laboratoire d'expérimentation** pour le prompt engineering"
    },
    {
      "type": "markdown",
      "content": "## Stratégie d'Apprentissage"
    },
    {
      "type": "card",
      "title": "Progression Recommandée",
      "content": "1. **Maîtrisez `claude.ai`** pour vos besoins quotidiens\n2. **Explorez la Console** pour le prompt engineering avancé\n3. **Combinez les deux** pour un workflow optimal"
    },
    {
      "type": "guideRecommendation",
      "slug": "structurer-ses-prompts-avec-des-balises-methode-xml",
      "reason": "Claude excelle dans l'interprétation de prompts structurés en XML. Maîtrisez cette technique pour exploiter pleinement ses capacités d'analyse et de raisonnement."
    },
    {
      "type": "guideRecommendation",
      "slug": "gestion-memoire-ia",
      "reason": "Apprenez à exploiter la fonctionnalité Projects de Claude Pro pour créer une mémoire à long terme et organiser vos conversations par thème ou matière."
    },
    {
      "type": "conceptRecommendation",
      "slug": "context-engineering",
      "reason": "Claude gère exceptionnellement bien les contextes longs et complexes. Découvrez comment optimiser vos interactions avec des techniques de context engineering."
    }
  ]
};

// Validation et export
export const externalTool = externalToolData satisfies ExternalTool;