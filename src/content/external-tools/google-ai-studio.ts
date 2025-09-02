// src/content/external-tools-new/google-ai-studio.ts
import { ExternalTool, externalToolSchema } from '@/lib/content-schema';

const externalToolData = {
  "slug": "google-ai-studio",
  "title": "Google AI Studio : L'Accès Gratuit aux Modèles Gemini de Pointe",
  "description": "Découvrez Google AI Studio, la plateforme qui démocratise l'accès aux modèles Gemini 2.5 Pro et Flash sans nécessiter de carte de crédit.",
  "difficulty": "intermédiaire",
  "tags": [],
  "isFavorite": false,
  "keyTakeaways": [],
  "conceptSlugs": [],
  "url": "https://aistudio.google.com/",
  "category": "environnement-developpement",
  "capabilities": [],
  "use_cases": [
    "Analyse clinique précise",
    "Test de prompts avancés",
    "Raisonnement multi-étapes"
  ],
  "color": "bg-blue-500",
  "tldr": "Accès gratuit aux modèles Gemini 2.5 de Google. Interface pro sans carte de crédit, excellent pour analyse clinique précise et raisonnement complexe.",
  "content": [
    {
      "type": "alert",
      "variant": "default",
      "title": "🎯 Avantage Concurrentiel Majeur",
      "content": "Accès gratuit aux modèles Gemini 2.5 Pro les plus récents avec une fenêtre de contexte de **1 million de tokens**, sans carte de crédit requise. C'est la meilleure porte d'entrée vers la puissance de l'IA Google."
    },
    {
      "type": "markdown",
      "content": "## Qu'est-ce que Google AI Studio ?"
    },
    {
      "type": "card",
      "title": "Interface Pro Accessible",
      "description": "Un studio pour explorer les IA de Google",
      "content": "Google AI Studio est une interface web conçue pour les développeurs et les curieux, permettant d'explorer, de prototyper et d'utiliser les modèles d'intelligence artificielle les plus avancés de Google. Pour un étudiant non-développeur, c'est **la meilleure porte d'entrée vers la puissance des modèles Gemini**."
    },
    {
      "type": "tabs",
      "defaultValue": "models",
      "tabs": [
        {
          "value": "models",
          "title": "Modèles Disponibles (2025)",
          "content": [
            {
              "type": "card",
              "title": "Gemini 2.5 Pro (Juin 2025)",
              "content": "- **Capacité** : Modèle multimodal le plus puissant de Google\n- **Contexte** : 1 million de tokens\n- **Modalités** : Texte, images, audio, vidéo, documents longs\n- **Spécialité** : Analyse approfondie et raisonnement complexe"
            },
            {
              "type": "card",
              "title": "Gemini 2.5 Flash (Juin 2025)",
              "variant": "outline",
              "content": "- **Optimisé** : Vitesse et efficacité\n- **Contexte** : 1 million de tokens (identique au Pro)\n- **Usage** : Réponses rapides et applications interactives"
            },
            {
              "type": "card",
              "title": "Imagen 4 (Août 2025)",
              "variant": "outline",
              "content": "Nouvelle génération de modèles de génération d'images de Google, intégrée à l'interface AI Studio."
            }
          ]
        },
        {
          "value": "access",
          "title": "Accès Gratuit",
          "content": [
            {
              "type": "alert",
              "variant": "default",
              "title": "🆓 Quota Généreux",
              "content": "**60 requêtes par minute** - largement suffisant pour un usage étudiant intensif, sans jamais fournir d'informations de paiement."
            },
            {
              "type": "card",
              "title": "Avantages de l'Accès Gratuit",
              "content": "- Aucune carte de crédit requise\n- Accès aux modèles les plus récents\n- Interface professionnelle complète\n- Paramètres avancés disponibles\n- Documentation et exemples intégrés"
            }
          ]
        }
      ]
    },
    {
      "type": "markdown",
      "content": "## Fonctionnalités pour le Prompt Engineering"
    },
    {
      "type": "tabs",
      "defaultValue": "controls",
      "tabs": [
        {
          "value": "controls",
          "title": "Contrôles Avancés",
          "content": [
            {
              "type": "card",
              "title": "Paramètres Ajustables",
              "content": "- **Temperature** : Contrôle créativité vs prévisibilité\n- **Top K / Top P** : Affinage de la sélection des mots\n- **Max Tokens** : Limite de longueur des réponses\n- **Stop Sequences** : Contrôle précis de l'arrêt"
            },
            {
              "type": "card",
              "title": "Modes d'Interaction",
              "variant": "outline",
              "content": "- **Chat** : Conversation avec historique\n- **Completion** : Complétion de texte directe\n- **Batch** : Traitement en lot pour l'efficacité"
            }
          ]
        },
        {
          "value": "advanced",
          "title": "Fonctionnalités Uniques",
          "content": [
            {
              "type": "card",
              "title": "Structured Outputs",
              "description": "Fiabilisation avancée",
              "content": "Forcez l'IA à répondre dans un format spécifique (JSON, XML). Technique cruciale pour des réponses prévisibles et exploitables."
            },
            {
              "type": "card",
              "title": "Function Calling",
              "variant": "outline",
              "content": "Permet à l'IA de simuler l'utilisation d'outils externes comme des calculatrices ou des bases de données."
            },
            {
              "type": "card",
              "title": "URL Context",
              "variant": "outline",
              "content": "Donnez une URL à l'IA pour qu'elle base sa réponse sur le contenu de la page web."
            }
          ]
        }
      ]
    },
    {
      "type": "card",
      "title": "Comparaison : Gemini Chat vs Google AI Studio",
      "content": "| Aspect | Gemini (gemini.google.com) | Google AI Studio (aistudio.google.com) |\n|---|---|---|\n| **Modèle Gratuit** | Gemini 2.5 Flash (32K contexte) | **Gemini 2.5 Pro** (1M contexte) |\n| **Public Cible** | Grand public | Étudiants, développeurs, curieux |\n| **Contrôle** | Minimal | **Granulaire** (Température, Top K...) |\n| **Objectif** | Assistant conversationnel | Laboratoire d'expérimentation |\n| **Accès** | Simple et direct | Nécessite compte Google, **sans CB** |"
    },
    {
      "type": "alert",
      "variant": "default",
      "title": "🎓 Parfait pour les Étudiants",
      "content": "Google AI Studio est l'outil idéal pour tester des prompts sur de très longs documents de recherche, des cours entiers, ou pour apprendre à structurer les sorties de l'IA de manière fiable."
    },
    {
      "type": "guideRecommendation",
      "slug": "choisir-ses-outils-ia-en-2025-chat-vs-studio",
      "reason": "Apprenez quand utiliser les interfaces chat vs les environnements studio pour maximiser votre efficacité."
    },
    {
      "type": "conceptRecommendation",
      "slug": "température-dosage",
      "reason": "Maîtrisez les paramètres comme la température pour des réponses optimales selon votre usage."
    }
  ]
};

// Validation et export
export const externalTool: ExternalTool = externalToolSchema.parse(externalToolData);