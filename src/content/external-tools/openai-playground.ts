// src/content/external-tools-new/openai-playground.ts
import { ExternalTool, externalToolSchema } from '@/lib/content-schema';

const externalToolData = {
  "slug": "openai-playground",
  "title": "OpenAI Playground : Le Studio du Prompt Engineer",
  "description": "Maîtrisez l'art du prompt engineering avec l'OpenAI Playground, l'interface avancée pour contrôler et tester les modèles GPT sans coder.",
  "difficulty": "intermédiaire",
  "tags": [],
  "isFavorite": false,
  "keyTakeaways": [],
  "conceptSlugs": [],
  "url": "https://platform.openai.com/playground",
  "category": "environnement-developpement",
  "capabilities": [],
  "use_cases": [
    "Ingénierie de prompts",
    "Tests de température",
    "Prototypage rapide"
  ],
  "color": "bg-cyan-500",
  "tldr": "Studio pro d'OpenAI pour l'ingénierie de prompts. Contrôle fin des paramètres GPT, indispensable pour prototypage et tests avancés.",
  "content": [
    {
      "type": "card",
      "title": "🧪 Qu'est-ce que l'OpenAI Playground ?",
      "description": "Le laboratoire d'expérimentation GPT",
      "content": "L'OpenAI Playground est une interface web avancée qui donne un accès direct et granulaire aux modèles de langage d'OpenAI. Contrairement à ChatGPT, qui est une application de chat optimisée, le Playground est un **laboratoire d'expérimentation**.\n\nC'est l'endroit où les prompt engineers, les développeurs (et les non-développeurs curieux !) viennent pour tester, affiner et comprendre le comportement des modèles d'IA."
    },
    {
      "type": "alert",
      "variant": "default",
      "title": "🎯 Positionnement",
      "content": "C'est ici que vous pouvez véritablement \"regarder sous le capot\" et apprendre à **piloter l'IA avec précision**."
    },
    {
      "type": "markdown",
      "content": "## Les Outils du Laboratoire (Prévisions 2025)"
    },
    {
      "type": "tabs",
      "defaultValue": "modeles",
      "tabs": [
        {
          "value": "modeles",
          "title": "Modèles Disponibles",
          "content": [
            {
              "type": "card",
              "title": "Gamme GPT Complète",
              "content": "- **GPT-5 (et ses variantes mini/nano)** : Testez la puissance brute du modèle le plus avancé d'OpenAI\n- **GPT-4.1 (et ses variantes)** : Explorez les modèles conçus pour des cas d'usage plus spécifiques\n- **GPT-4o, GPT-3.5-Turbo** : Comparez les performances avec les générations précédentes"
            }
          ]
        },
        {
          "value": "parametres",
          "title": "Paramètres de Contrôle",
          "content": [
            {
              "type": "card",
              "title": "Contrôles Fondamentaux",
              "content": "**Temperature :** Le thermostat de la créativité (0 = factuel, 1 = créatif)\n\n**Max Length :** Définissez la taille maximale de la réponse générée\n\n**Top P :** Méthode alternative pour contrôler la créativité en ne considérant qu'un sous-ensemble de mots probables"
            }
          ]
        },
        {
          "value": "modes",
          "title": "Modes d'Interaction",
          "content": [
            {
              "type": "card",
              "title": "Chat Mode",
              "description": "Simulation de conversation",
              "content": "Simule une conversation, idéal pour tester des **System Prompts** et voir comment l'IA maintient le contexte."
            },
            {
              "type": "card",
              "title": "Completion Mode",
              "variant": "outline",
              "description": "Complétion directe",
              "content": "Un mode plus simple où l'IA complète directement le texte que vous avez commencé."
            }
          ]
        },
        {
          "value": "avancees",
          "title": "Fonctions Avancées",
          "content": [
            {
              "type": "card",
              "title": "Capacités Multimodales & Agents",
              "content": "**Support Multimodal :** Testez la capacité des modèles à traiter du texte, des images et de l'audio.\n\n**Agent :** Explorez comment les modèles peuvent exécuter des tâches complexes en utilisant plusieurs outils."
            }
          ]
        }
      ]
    },
    {
      "type": "markdown",
      "content": "## Pourquoi Utiliser le Playground en tant qu'Étudiant ?"
    },
    {
      "type": "card",
      "title": "Avantages Pédagogiques",
      "description": "Développement d'expertise approfondie",
      "content": "Alors que ChatGPT est parfait pour les tâches quotidiennes, le Playground est essentiel pour développer une expertise plus profonde :\n\n1. **Comprendre la \"Température\"** : Voir concrètement comment un changement de `0.1` à `0.8` transforme une réponse factuelle en une réponse créative\n2. **Maîtriser le System Prompt** : Définir une instruction système et observer comment elle influence chaque réponse\n3. **Comparer les Modèles** : Analyser les différences de coût, vitesse et qualité entre GPT-4.1 vs GPT-5\n4. **Préparer l'Automatisation** : Les prompts perfectionnés dans le Playground sont directement réutilisables"
    },
    {
      "type": "alert",
      "variant": "destructive",
      "title": "💳 Important : Accès et Tarifs",
      "content": "Il n'existe **pas de quota gratuit significatif** pour le Playground sans enregistrer une carte de crédit. L'utilisation est directement liée à votre consommation de tokens via l'API, même sans écrire de code."
    },
    {
      "type": "card",
      "title": "💡 Alternative Gratuite",
      "variant": "outline",
      "content": "Pour une exploration totalement gratuite, des outils comme **Google AI Studio** sont souvent plus accessibles pour les débutants sans carte de crédit."
    },
    {
      "type": "alert",
      "variant": "default",
      "title": "🎓 Pour les Étudiants en Pharmacie",
      "content": "L'OpenAI Playground est un passage obligé pour quiconque souhaite sérieusement se former au prompt engineering. C'est l'occasion de créer des prompts ultra-spécifiques pour des cas cliniques, l'analyse de données ou la pharmacovigilance, et de comprendre précisément comment obtenir les **meilleurs résultats possibles** des modèles GPT."
    },
    {
      "type": "toolRecommendation",
      "slug": "google-ai-studio",
      "reason": "Alternative gratuite recommandée pour débuter l'expérimentation avec les paramètres avancés sans carte de crédit."
    },
    {
      "type": "conceptRecommendation",
      "slug": "température-dosage",
      "reason": "Maîtrisez le concept de température avant de l'expérimenter dans le Playground pour en comprendre pleinement l'impact."
    }
  ]
};

// Validation et export
export const externalTool: ExternalTool = externalToolSchema.parse(externalToolData);