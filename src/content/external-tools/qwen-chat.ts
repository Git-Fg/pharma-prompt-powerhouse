// src/content/external-tools-new/qwen-chat.ts
import type { ExternalTool } from '@/lib/content-schema';

const externalToolData = {
  "slug": "qwen-chat",
  "title": "Qwen Chat : La Puissance Open-Source d'Alibaba",
  "description": "Découvrez Qwen Chat, la plateforme gratuite qui donne accès aux modèles Qwen 3 d'Alibaba, réputés pour leurs performances en mathématiques et en codage.",
  "difficulty": "intermédiaire",
  "tags": [],
  "isFavorite": false,
  "keyTakeaways": [],
  "conceptSlugs": [],
  "url": "https://chat.qwen.ai/",
  "category": "chatbot",
  "capabilities": [],
  "use_cases": [
    "Calculs mathématiques",
    "Support multilingue",
    "Analyse technique"
  ],
  "color": "bg-rose-500",
  "tldr": "IA d'Alibaba gratuite, excellente en maths et codage. Support multilingue robuste, idéale pour calculs complexes et analyse technique.",
  "content": [
    {
      "type": "alert",
      "variant": "default",
      "title": "🆓 Accès Totalement Gratuit",
      "content": "Alibaba offre un accès gratuit complet aux modèles Qwen 3 open-source (licence Apache 2.0) avec tous les outils avancés."
    },
    {
      "type": "markdown",
      "content": "## Qu'est-ce que Qwen Chat ?"
    },
    {
      "type": "card",
      "title": "Interface d'Alibaba Cloud",
      "description": "Accès libre aux modèles Qwen 3",
      "content": "Qwen Chat (Tongyi Qianwen) est l'interface de conversation développée par Alibaba Cloud. Similaire à ChatGPT ou DeepSeek, cette plateforme donne un accès **totalement gratuit** à sa puissante famille de modèles open-source **Qwen 3**."
    },
    {
      "type": "tabs",
      "defaultValue": "models",
      "tabs": [
        {
          "value": "models",
          "title": "Modèles Qwen 3 (2025)",
          "content": [
            {
              "type": "card",
              "title": "Qwen3-235B-A22B (Modèle Phare)",
              "content": "- **Architecture** : Mixture-of-Experts (MoE)\n- **Paramètres** : 235B totaux, 22B actifs\n- **Performances** : Premier plan en raisonnement, maths, programmation\n- **Contexte** : 128K tokens"
            },
            {
              "type": "card",
              "title": "Qwen3-32B (Version Dense)",
              "variant": "outline",
              "content": "Version dense optimisée pour la créativité et le raisonnement complexe, plus petite mais très performante."
            },
            {
              "type": "card",
              "title": "Versions Locales (14B, 3B)",
              "variant": "outline",
              "content": "Excellents compromis performance/ressources, idéales pour usage local sur ordinateur personnel."
            }
          ]
        },
        {
          "value": "tools",
          "title": "Outils Créatifs",
          "content": [
            {
              "type": "card",
              "title": "Deep Research",
              "content": "Agent de recherche autonome qui compile des rapports complets en analysant des centaines de sources et posant des questions de précision."
            },
            {
              "type": "card",
              "title": "Image Edit",
              "variant": "outline",
              "content": "Retouche d'images avec contrôle sémantique haute-fidélité. Ex: \"change la couleur de la blouse sans altérer le fond\"."
            },
            {
              "type": "card",
              "title": "Web Dev",
              "variant": "outline",
              "content": "Développement full-stack - crée des applications web complètes à partir de descriptions naturelles."
            },
            {
              "type": "card",
              "title": "Image Generation",
              "variant": "outline",
              "content": "Générateur Qwen-Image particulièrement doué pour le rendu précis de texte dans les images."
            }
          ]
        }
      ]
    },
    {
      "type": "markdown",
      "content": "## Points Forts et Considérations"
    },
    {
      "type": "tabs",
      "defaultValue": "strengths",
      "tabs": [
        {
          "value": "strengths",
          "title": "Avantages",
          "content": [
            {
              "type": "card",
              "title": "Excellence Technique",
              "content": "✅ **Totalement Gratuit** : Accès illimité sans frais\n✅ **Open-Source Apache 2.0** : Transparence totale\n✅ **Excellence Maths/Code** : Performances reconnues\n✅ **Outils Créatifs Uniques** : Édition image + développement web"
            }
          ]
        },
        {
          "value": "considerations",
          "title": "Précautions",
          "content": [
            {
              "type": "alert",
              "variant": "destructive",
              "title": "⚠️ Confidentialité",
              "content": "Service hébergé en Asie. **Prudence maximale** pour les données personnelles ou sensibles."
            },
            {
              "type": "card",
              "title": "Autres Considérations",
              "variant": "outline",
              "content": "⚠️ **Focalisation Asiatique** : Interface et modèles optimisés pour langues/cultures asiatiques\n⚠️ **Support Francophone** : Peut être moins optimal que les modèles occidentaux"
            }
          ]
        }
      ]
    },
    {
      "type": "alert",
      "variant": "default",
      "title": "🎯 Usage Recommandé",
      "content": "Excellente alternative gratuite pour **travaux de recherche** et **création de supports**, tout en évitant les informations confidentielles."
    },
    {
      "type": "guideRecommendation",
      "slug": "confidentialite-securite",
      "reason": "ESSENTIEL : Comprenez les enjeux de confidentialité avant d'utiliser des plateformes gratuites hébergées à l'étranger."
    },
    {
      "type": "toolRecommendation",
      "slug": "perplexity-ai",
      "reason": "Pour la recherche bibliographique rigoureuse avec sources citées, préférez Perplexity en complément de Qwen Chat."
    }
  ]
};

// Validation et export
export const externalTool = externalToolData satisfies ExternalTool;