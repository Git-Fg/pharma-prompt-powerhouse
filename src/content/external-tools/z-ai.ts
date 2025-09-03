// src/content/external-tools-new/z-ai.ts
import type { ExternalTool } from '@/lib/content-schema';

const externalToolData = {
  "slug": "z-ai",
  "title": "Chat Z.AI : L'État de l'Art de la Recherche Intelligente",
  "description": "Découvrez Chat Z.AI, qui révolutionne la recherche et création grâce à GLM-4.5. Une alternative gratuite redoutablement efficace aux solutions payantes.",
  "difficulty": "intermédiaire",
  "tags": [],
  "isFavorite": true,
  "keyTakeaways": [],
  "conceptSlugs": [],
  "url": "https://chat.z.ai/",
  "category": "suite-creative",
  "capabilities": [],
  "use_cases": [
    "Recherche académique avancée",
    "Création de présentations",
    "Génération de schémas",
    "Projets créatifs",
    "Développement web complet"
  ],
  "color": "bg-purple-500",
  "tldr": "Suite créative complète gratuite avec GLM-4.5. **Notre choix N°1 pour la recherche web fiable** grâce à son raisonnement transparent et ses appels d'outils avancés.",
  "content": [
    {
      "type": "alert",
      "variant": "default",
      "title": "⭐ Retour d'Expérience Terrain",
      "content": "En combinaison avec AI Studio, Z.AI représente le **core kit quotidien** permettant d'exploiter quasiment l'ensemble des capacités les plus avancées du moment de façon gratuite. Particulièrement efficace pour la recherche où son approche **surpasse souvent Perplexity**."
    },
    {
      "type": "alert",
      "variant": "default",
      "title": "🆓 Totalement Gratuit + Excellence Technique",
      "content": "Chat Z.AI offre un accès gratuit complet au modèle GLM-4.5 et à tous ses outils créatifs avancés. **Aucune limitation d'usage connue** en août 2025."
    },
    {
      "type": "markdown",
      "content": "## Pourquoi Z.AI Révolutionne la Recherche"
    },
    {
      "type": "tabs",
      "defaultValue": "glm-model",
      "tabs": [
        {
          "value": "glm-model",
          "title": "Architecture GLM-4.5",
          "content": [
            {
              "type": "card",
              "title": "Performance Exceptionnelle",
              "content": "- **355 milliards de paramètres** (MoE) - parmi les plus grands open-source\n- **Contexte 128K tokens** (standard 2025)\n- **3ème mondial** sur 12 benchmarks (63.2 points)\n- **Dual-mode** : Thinking (raisonnement) + Non-thinking (rapidité)"
            },
            {
              "type": "card",
              "title": "💰 Tarification",
              "variant": "outline",
              "content": "**Gratuit** : Accès complet au GLM-4.5 sans restriction connue"
            }
          ]
        },
        {
          "value": "research-excellence",
          "title": "Excellence en Recherche",
          "content": [
            {
              "type": "card",
              "title": "Avantages Uniques",
              "content": "✅ **Web Search 'Humaine'** : Plus contextuelle et naturelle que l'approche RAG classique\n✅ **Compréhension d'images native** intégrée\n✅ **Synthèse plus fiable** que Perplexity sur de nombreux points\n✅ **Présentation avec recherche web autonome** bluffante"
            },
            {
              "type": "alert",
              "variant": "default",
              "title": "🏆 État de l'Art en Recherche",
              "content": "Représente selon l'expérience terrain **l'état de l'art dans la recherche**, bien plus fiable que Perplexity sur de nombreux points critiques."
            }
          ]
        },
        {
          "value": "creative-suite",
          "title": "Suite Créative Complète",
          "content": [
            {
              "type": "card",
              "title": "AI Slides - Création de Présentations",
              "description": "Agent de création ultra-performant",
              "content": "- Génération complète à partir d'un prompt simple\n- **Recherche web autonome** pour contenu et images\n- Sortie **HTML universellement accessible**\n- Support de documents de référence"
            },
            {
              "type": "card",
              "title": "Développement Web Complet",
              "variant": "outline",
              "content": "- **Fullstack & Web Design** : frontend + backend + BDD\n- Création d'applications à partir de **prompts naturels**\n- **Déploiement automatique** et gestion des données\n- **Artefacts autonomes** : mini-jeux, simulations physiques"
            }
          ]
        }
      ]
    },
    {
     "type": "card",
     "title": "Z.AI - Points Forts",
     "content": "| Critère | **Chat Z.AI (GLM-4.5)** |\n|-------------------------|\n| **Tarif** | 🆓 Gratuit complet |\n| **Recherche** | 🏆 Approche 'humaine' excellente |\n| **Créativité** | 🎨 Suite complète (slides, dev) |\n| **Fiabilité** | 🎯 Très bonne |\n| **Confidentialité** | ⚠️ Risque élevé (Asie) |"
   },
    {
      "type": "alert",
      "variant": "destructive",
      "title": "⚠️ Confidentialité : Prudence Maximale",
      "content": "**Risque très élevé** : Plateforme hébergée en Asie avec politique de confidentialité légère. **Ne jamais utiliser de données sensibles, personnelles ou identifiables.**"
    },
    {
      "type": "tabs",
      "defaultValue": "pharmacy-use",
      "tabs": [
        {
          "value": "pharmacy-use",
          "title": "Usage Pharmaceutique",
          "content": [
            {
              "type": "card",
              "title": "Cas d'Usage Optimaux",
              "description": "Applications pratiques pour étudiants en pharmacie",
              "content": "✅ **Recherche bibliographique** sur nouveaux traitements\n✅ **Création de présentations** de révision\n✅ **Supports de cours** et projets universitaires\n✅ **Simulateurs d'interactions** médicamenteuses (pédagogiques)"
            },
            {
              "type": "codeBlock",
              "language": "text",
              "filename": "exemple-prompt-recherche.txt",
              "content": "Recherche les dernières avancées en thérapie génique pour la mucoviscidose. Analyse les essais cliniques en cours, les mécanismes d'action novateurs, et les perspectives d'AMM en Europe."
            }
          ]
        },
        {
          "value": "presentations",
          "title": "Créer des Présentations",
          "content": [
            {
              "type": "card",
              "title": "Exemple Concret",
              "description": "Génération automatique avec recherche",
              "content": "**Prompt** : \"Crée une présentation sur les nouveaux traitements de l'Alzheimer approuvés en 2024-2025\"\n\n**Résultat automatique** :\n1. L'agent effectue sa recherche web\n2. Trouve les informations récentes validées\n3. Sélectionne des images appropriées\n4. Génère une présentation HTML complète\n5. Le tout en quelques minutes"
            },
            {
              "type": "guideRecommendation",
              "slug": "workflow-generer-cas-cliniques",
              "reason": "Combinez Z.AI avec le workflow de génération de cas cliniques : utilisez l'agent PPT pour transformer vos cas cliniques créés avec l'IA en présentations interactives pour réviser."
            },
            {
              "type": "alert",
              "variant": "default",
              "title": "💡 Excellence Pédagogique",
              "content": "Parfait pour créer des présentations de révision, des supports de cours, ou des projets universitaires - à condition de ne pas inclure de données confidentielles."
            }
          ]
        }
      ]
    },
    {
      "type": "alert",
      "variant": "default",
      "title": "🎯 Positionnement Idéal",
      "content": "Z.AI excelle pour créer des **livrables concrets** (présentations, applications, recherches) avec une approche de recherche **plus fiable que Perplexity** sur bien des aspects."
    },
    {
      "type": "guideRecommendation",
      "slug": "confidentialite-securite",
      "reason": "ESSENTIEL : Comprenez les enjeux de confidentialité avant d'utiliser des plateformes gratuites hébergées à l'étranger."
    },
    {
      "type": "toolRecommendation",
      "slug": "google-ai-studio",
      "reason": "Combo parfait : Z.AI pour la recherche créative + AI Studio pour l'analyse rigoureuse forment le core kit quotidien gratuit."
    },
    {
      "type": "card",
      "title": "Mise en Pratique",
      "description": "Voir cet outil en action",
      "content": "Pour une comparaison directe de Z.AI avec d'autres outils pour la recherche bibliographique, consultez notre page objectif dédiée.\n\n<GuideRecommendation guideSlug='faire-recherche-bibliographique' reason='Comparez Z.AI et Perplexity sur un cas pratique et apprenez le workflow de recherche optimal.' />"
    }
  ]
};

// Validation et export
export const externalTool = externalToolData satisfies ExternalTool;