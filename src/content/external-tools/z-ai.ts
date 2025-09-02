// src/content/external-tools-new/z-ai.ts
import { ExternalTool, externalToolSchema } from '@/lib/content-schema';

const externalToolData = {
  "slug": "z-ai",
  "title": "Zhipu AI (Chat Z.AI) : L'IA Open-Source et Gratuite",
  "description": "Explorez Chat Z.AI, la plateforme de Zhipu AI qui donne accès au puissant modèle open-source GLM-4.5 et à une suite d'outils de création impressionnants, le tout gratuitement.",
  "difficulty": "intermédiaire",
  "tags": [],
  "isFavorite": false,
  "keyTakeaways": [],
  "conceptSlugs": [],
  "url": "https://chat.z.ai/",
  "category": "Suite créative",
  "capabilities": [],
  "use_cases": [
    "Création de présentations",
    "Génération de schémas",
    "Projets créatifs"
  ],
  "color": "bg-purple-500",
  "tldr": "Suite créative complète gratuite avec GLM-4.5. Génération de présentations, schémas et projets visuels. Alternative innovante aux outils classiques.",
  "content": [
    {
      "type": "alert",
      "variant": "default",
      "title": "🆓 Totalement Gratuit",
      "content": "Chat Z.AI offre un accès gratuit complet au modèle GLM-4.5 et à tous ses outils créatifs avancés (en août 2025)."
    },
    {
      "type": "markdown",
      "content": "## Qu'est-ce que Zhipu AI (Chat Z.AI) ?"
    },
    {
      "type": "card",
      "title": "Philosophie Open-Source",
      "description": "Innovation accessible à tous",
      "content": "Zhipu AI mise fortement sur l'**open-source**, à l'instar de DeepSeek et Alibaba. Leur plateforme **Chat Z.AI** democratise l'accès aux modèles de pointe sans barrière financière."
    },
    {
      "type": "tabs",
      "defaultValue": "glm-model",
      "tabs": [
        {
          "value": "glm-model",
          "title": "Modèle GLM-4.5",
          "content": [
            {
              "type": "card",
              "title": "Architecture Mixture-of-Experts",
              "content": "- **Paramètres** : 355 milliards (MoE) - parmi les plus grands open-source\n- **Contexte** : 128K tokens (standard 2025)\n- **Performance** : 3ème mondial sur 12 benchmarks\n- **Modes** : Thinking (raisonnement) + Non-thinking (rapidité)"
            },
            {
              "type": "alert",
              "variant": "default",
              "title": "🏆 Performance Exceptionnelle",
              "content": "GLM-4.5 se classe 3ème mondial avec 63.2 points, derrière seulement Grok-4 et GPT-o3, surpassant de nombreux modèles propriétaires."
            }
          ]
        },
        {
          "value": "creative-tools",
          "title": "Suite Créative",
          "content": [
            {
              "type": "card",
              "title": "AI Slides (Présentations)",
              "description": "Agent de création de présentations",
              "content": "- Génération complète à partir d'un prompt simple\n- Recherche web autonome pour contenu et images\n- Sortie HTML universellement accessible\n- Support de documents de référence"
            },
            {
              "type": "card",
              "title": "Fullstack & Web Design",
              "variant": "outline",
              "content": "- Développement web complet (frontend + backend + BDD)\n- Création d'applications à partir de prompts naturels\n- Déploiement automatique et gestion des données"
            },
            {
              "type": "card",
              "title": "Code & Artefacts Autonomes",
              "variant": "outline",
              "content": "- Mini-jeux et simulations physiques\n- Graphiques SVG détaillés\n- Code exécutable (Python, JS, HTML)\n- Édition par dialogue naturel"
            }
          ]
        }
      ]
    },
    {
      "type": "markdown",
      "content": "## Avantages et Considérations"
    },
    {
      "type": "tabs",
      "defaultValue": "advantages",
      "tabs": [
        {
          "value": "advantages",
          "title": "Points Forts",
          "content": [
            {
              "type": "card",
              "title": "Accès Libre Total",
              "content": "✅ **Totalement Gratuit** : Aucune restriction connue sur l'usage\n✅ **Suite d'Outils Unique** : Génération slides + développement full-stack\n✅ **Excellence Agentique** : 90.6% de succès d'appel d'outils\n✅ **Open-Source** : Modèle transparent et auditable"
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
              "title": "⚠️ Confidentialité Critique",
              "content": "**Risque très élevé** : Plateforme hébergée en Asie avec politique de confidentialité légère. **Ne jamais utiliser de données sensibles, personnelles ou identifiables.**"
            },
            {
              "type": "card",
              "title": "Considérations d'Usage",
              "variant": "outline",
              "content": "⚠️ **Moins Axé Recherche Académique** : Optimisé pour la création plutôt que la recherche sourcée\n⚠️ **Vigilance Requise** : Prudence maximale sur les données partagées"
            }
          ]
        }
      ]
    },
    {
      "type": "tabs",
      "defaultValue": "presentations",
      "tabs": [
        {
          "value": "presentations",
          "title": "Cas d'Usage : Présentations",
          "content": [
            {
              "type": "card",
              "title": "Exemple Pratique",
              "description": "Création de présentation pharmaceutique",
              "content": "**Prompt** : \"Crée une présentation sur les nouveaux traitements de l'Alzheimer en 2025\"\n\n**Résultat** : L'agent effectue sa recherche web, trouve les informations récentes, sélectionne des images appropriées, et génère une présentation HTML complète en quelques minutes."
            },
            {
              "type": "alert",
              "variant": "default",
              "title": "💡 Astuce Pédagogique",
              "content": "Parfait pour créer des présentations de révision, des supports de cours, ou des projets universitaires - à condition de ne pas inclure de données confidentielles."
            }
          ]
        },
        {
          "value": "development",
          "title": "Cas d'Usage : Développement",
          "content": [
            {
              "type": "card",
              "title": "Applications Interactives",
              "content": "- **Simulateurs d'interactions médicamenteuses**\n- **Quiz interactifs pour révisions**\n- **Calculateurs de dosage** (à des fins pédagogiques)\n- **Visualisations de données pharmaceutiques**"
            },
            {
              "type": "codeBlock",
              "language": "text",
              "filename": "exemple-prompt.txt",
              "content": "Crée une application web interactive pour simuler l'interaction entre différentes classes d'antidépresseurs. Inclus :\n- Interface utilisateur simple\n- Base de données des médicaments\n- Système d'alerte pour les interactions\n- Graphiques de visualisation"
            }
          ]
        }
      ]
    },
    {
      "type": "alert",
      "variant": "default",
      "title": "🎯 Positionnement Idéal",
      "content": "Chat Z.AI excelle pour créer des **livrables concrets** (présentations, applications, prototypes) plutôt que pour la recherche bibliographique rigoureuse."
    },
    {
      "type": "guideRecommendation",
      "slug": "confidentialite-securite",
      "reason": "ESSENTIEL : Comprenez les enjeux de confidentialité avant d'utiliser des plateformes gratuites hébergées à l'étranger."
    },
    {
      "type": "toolRecommendation",
      "slug": "perplexity-ai",
      "reason": "Pour la recherche bibliographique rigoureuse, préférez Perplexity qui cite ses sources et est plus adapté à la recherche académique."
    }
  ]
};

// Validation et export
export const externalTool: ExternalTool = externalToolSchema.parse(externalToolData);