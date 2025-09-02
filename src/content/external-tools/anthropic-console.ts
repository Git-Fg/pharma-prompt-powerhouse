// src/content/external-tools-new/anthropic-console.ts
import { ExternalTool, externalToolSchema } from '@/lib/content-schema';

const externalToolData = {
  "slug": "anthropic-console",
  "title": "Anthropic Console : Le Laboratoire des Modèles Claude",
  "description": "Explorez la Console Anthropic, une interface avancée pour tester et maîtriser les puissants modèles Claude sans écrire de code.",
  "tags": [],
  "isFavorite": false,
  "conceptSlugs": [],
  "url": "https://console.anthropic.com/",
  "category": "outils",
  "capabilities": [],
  "use_cases": [
    "Tests de prompts avancés",
    "Analyse de paramètres",
    "Expérimentation fine"
  ],
  "color": "bg-amber-500",
  "tldr": "Interface avancée pour tester finement les modèles Claude. Contrôle précis des paramètres, parfait pour l'expérimentation poussée de prompts.",
  "content": [
    {
      "type": "card",
      "title": "🧪 Qu'est-ce que l'Anthropic Console ?",
      "description": "Le laboratoire des modèles Claude",
      "content": "L'Anthropic Console est l'équivalent du \"Playground\" ou du \"Studio\" pour les modèles d'intelligence artificielle d'Anthropic, notamment la famille **Claude**. C'est une interface web conçue pour permettre aux utilisateurs, même sans compétences techniques, d'expérimenter, d'évaluer et d'optimiser des prompts en contrôlant finement le comportement des modèles.\n\nC'est l'outil idéal pour aller plus loin que l'interface de chat simple de `claude.ai` et comprendre comment fonctionnent réellement ces IAs."
    },
    {
      "type": "markdown",
      "content": "## Les Modèles Disponibles (Prévisions 2025)"
    },
    {
      "type": "tabs",
      "defaultValue": "opus",
      "tabs": [
        {
          "value": "opus",
          "title": "Claude Opus 4.1",
          "content": [
            {
              "type": "card",
              "title": "Le Plus Puissant (Août 2025)",
              "description": "74.5% sur SWE-bench Verified",
              "content": "**Claude Opus 4.1** est le modèle le plus puissant d'Anthropic, conçu pour les tâches complexes, l'analyse approfondie et le raisonnement avancé.\n\n**Spécialisations :**\n- Analyse approfondie\n- Recherche académique\n- Traitement de codebases complexes\n- Raisonnement multi-étapes\n\n**Contexte :** 200K tokens (environ 150 000 mots)"
            }
          ]
        },
        {
          "value": "sonnet",
          "title": "Claude Sonnet 4",
          "content": [
            {
              "type": "card",
              "title": "L'Équilibre Parfait (Mai 2025)",
              "description": "Performance optimale, coût maîtrisé",
              "content": "**Claude Sonnet 4** offre l'équilibre parfait entre performance et coût. Excellent pour la génération de contenu, les agents conversationnels et l'analyse de données volumineuses.\n\n**Avantage unique :** Tendance très faible à l'hallucination, idéal pour les bases de connaissances volumineuses.\n\n**Contexte :** 200K tokens (1M tokens en version bêta depuis août 2025)"
            }
          ]
        },
        {
          "value": "haiku",
          "title": "Claude Haiku 4",
          "content": [
            {
              "type": "card",
              "title": "Vitesse et Économie (Mai 2025)",
              "description": "Réponses quasi instantanées",
              "content": "**Claude Haiku 4** est le plus rapide et le plus économique, parfait pour des réponses quasi instantanées et des applications nécessitant un traitement à haut volume.\n\n**Spécialisations :**\n- Réponses rapides\n- Traitement haut volume\n- Applications interactives\n- Usage quotidien économique"
            }
          ]
        }
      ]
    },
    {
      "type": "markdown",
      "content": "## Fonctionnalités Clés de la Console"
    },
    {
      "type": "tabs",
      "defaultValue": "modes",
      "tabs": [
        {
          "value": "modes",
          "title": "Modes d'Interaction",
          "content": [
            {
              "type": "card",
              "title": "Messages vs Completions",
              "content": "**Messages :** Un mode conversationnel structuré où vous pouvez définir un `System Prompt` pour guider l'IA en continu.\n\n**Completions :** Un mode plus simple, idéal pour les tâches de complétion de texte directes."
            }
          ]
        },
        {
          "value": "controles",
          "title": "Paramètres de Contrôle",
          "content": [
            {
              "type": "card",
              "title": "Contrôles Granulaires",
              "content": "- **Temperature :** Ajustez la créativité du modèle (0 = factuel, 1 = créatif)\n- **Top P / Top K :** Méthodes alternatives pour contrôler la créativité\n- **Max tokens :** Longueur maximale de la réponse\n- **System Prompts :** Instructions permanentes pour guider le comportement"
            }
          ]
        },
        {
          "value": "outils",
          "title": "Outils d'Optimisation",
          "content": [
            {
              "type": "card",
              "title": "Suite Complète d'Expérimentation",
              "content": "**Evaluate :** Testez rigoureusement vos prompts sur différents scénarios pour évaluer leur performance.\n\n**Workbench :** Un environnement de travail intégré pour organiser et sauvegarder vos expériences.\n\n**Générateur de Prompts :** Un assistant qui vous aide à créer des prompts détaillés et efficaces à partir d'une simple instruction."
            }
          ]
        }
      ]
    },
    {
      "type": "card",
      "title": "Claude.ai vs Anthropic Console",
      "content": "| **Aspect** | **Claude.ai** (Chat) | **Anthropic Console** (Studio) |\n|------------|---------------------|-------------------------------|\n| **Public Cible** | Utilisateurs grand public | Utilisateurs avancés, explorateurs |\n| **Contrôle** | Limité (style de conversation) | **Granulaire** (température, system prompt...) |\n| **Objectif** | Obtenir des réponses rapides | **Tester, évaluer et optimiser** des prompts |\n| **Accès aux Modèles** | Modèle par défaut (souvent Sonnet) | **Accès à toute la gamme** (Opus, Sonnet, Haiku) |\n| **Fonctionnalités** | Conversation, upload de fichiers | **Outils de test**, prompt engineering |\n| **Coût** | Gratuit/Pro | **Crédits gratuits** pour commencer |"
    },
    {
      "type": "alert",
      "variant": "default",
      "title": "🎓 Pour les Étudiants en Pharmacie",
      "content": "L'**Anthropic Console** est un outil inestimable. Elle permet de dépasser la simple conversation et de se transformer en un véritable \"ingénieur de prompts\". C'est ici que vous pouvez tester comment de légères variations dans un prompt ou un changement de température peuvent radicalement altérer la qualité d'une analyse de cas clinique ou d'une recherche de littérature, le tout **sans écrire une seule ligne de code**."
    },
    {
      "type": "toolRecommendation",
      "slug": "claude-ai",
      "reason": "Commencez par Claude.ai pour vous familiariser avec les modèles, puis passez à la Console pour l'expérimentation avancée."
    },
    {
      "type": "conceptRecommendation",
      "slug": "température-dosage",
      "reason": "Maîtrisez le paramètre de température disponible dans la Console pour optimiser vos interactions avec Claude."
    }
  ]
};

// Validation et export
export const externalTool: ExternalTool = externalToolSchema.parse(externalToolData);