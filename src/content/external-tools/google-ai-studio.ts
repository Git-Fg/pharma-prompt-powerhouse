// src/content/external-tools-new/google-ai-studio.ts
import { ExternalTool, externalToolSchema } from '@/lib/content-schema';

const externalToolData = {
  "slug": "google-ai-studio",
  "title": "Google AI Studio : L'Écosystème Multimodal Gratuit",
  "description": "Découvrez Google AI Studio, bien plus qu'un simple chat : un écosystème complet avec génération d'images, audio, vidéo et applications web, le tout avec les modèles Gemini de pointe.",
  "tags": [],
  "isFavorite": true,
  "keyTakeaways": [],
  "conceptSlugs": [],
  "url": "https://aistudio.google.com/",
  "category": "outils",
  "capabilities": [],
  "use_cases": [
    "Analyse clinique précise",
    "Test de prompts avancés",
    "Génération multimodale",
    "Création d'applications web",
    "Raisonnement multi-étapes"
  ],
  "color": "bg-blue-500",
  "tldr": "Accès gratuit aux modèles Gemini 2.5 de Google. **Inégalé pour l'analyse d'images et de documents manuscrits** grâce à son contexte de 1M de tokens.",
  "content": [
    {
      "type": "alert",
      "variant": "default",
      "title": "🚀 Core Kit Quotidien",
      "content": "En combinaison avec Z.AI, AI Studio forme le **duo parfait** : Z.AI pour la recherche créative + AI Studio pour l'analyse rigoureuse et la génération multimodale. **Aucune carte de crédit nécessaire** - outil privilégié pour les étudiants."
    },
    {
      "type": "card",
      "title": "💰 Tarification - API Gratuite Généreuse",
      "variant": "outline",
      "content": "**Gratuit** : 60 requêtes/min, 300K tokens/jour - largement suffisant pour usage étudiant intensif. Aucune information de paiement requise."
    },
    {
      "type": "markdown",
      "content": "## Au-Delà du Chat : Un Écosystème Complet"
    },
    {
      "type": "card",
      "title": "Vision Élargie d'AI Studio",
      "description": "Bien plus qu'une interface de chat",
      "content": "Google AI Studio ne se limite pas aux modèles Gemini pour le texte. C'est un **écosystème multimodal complet** qui intègre :\n\n- Génération d'images (Imagen 4)\n- Transformation audio (texte vers audio, audio vers audio)\n- Création vidéo (Veo 3)\n- Développement d'applications web complètes\n\nL'équivalent d'avoir plusieurs outils spécialisés dans une seule interface."
    },
    {
      "type": "tabs",
      "defaultValue": "models-2025",
      "tabs": [
        {
          "value": "models-2025",
          "title": "Modèles 2025",
          "content": [
            {
              "type": "card",
              "title": "Gamme Gemini Complète",
              "content": "| **Modèle** | **Lancement** | **Contexte** | **Modalités** | **Spécialité** |\n|------------|---------------|--------------|---------------|----------------|\n| **Gemini 2.5 Pro** | Juin 2025 | 1M tokens | Texte, images, audio, vidéo, PDF | Analyse approfondie, raisonnement |\n| **Gemini 2.5 Flash** | Juin 2025 | 1M tokens | Texte, images, audio, vidéo | Vitesse et efficacité - optimal quotidien |\n| **Gemini 2.5 Flash-Lite** | Juillet 2025 | 1M tokens | Multimodal complet | Coût/latence optimisés pour usage intensif |"
            }
          ]
        },
        {
          "value": "multimodal-suite",
          "title": "Suite Multimodale",
          "content": [
            {
              "type": "card",
              "title": "🎨 Imagen 4 (Images) - Août 2025",
              "description": "Génération d'images avancée",
              "content": "- **Ultra, Standard et Fast** - 3 variantes selon les besoins\n- **Génération conversationnelle** avec Gemini 2.5 Flash Image Preview\n- **Intégration native** dans l'interface AI Studio\n- **Qualité professionnelle** pour supports pédagogiques"
            },
            {
              "type": "card",
              "title": "🎬 Veo 3 (Vidéos)",
              "variant": "outline",
              "content": "✅ **Génération vidéo** à partir de prompts textuels\n✅ **Qualité HD** pour présentations\n✅ **Animations éducatives** pharmaceutiques\n✅ **Intégration directe** avec Gemini"
            },
            {
              "type": "card",
              "title": "🎵 Outils Audio Complets",
              "variant": "outline",
              "content": "- **Texte vers audio** : Narration automatique\n- **Audio vers audio** : Transformation et amélioration\n- **Synthèse vocale** pour présentations\n- **Qualité professionnelle** adaptée à l'enseignement"
            }
          ]
        },
        {
          "value": "web-apps",
          "title": "Création d'Applications",
          "content": [
            {
              "type": "card",
              "title": "Développement Web Intégré",
              "description": "Création d'applications complètes",
              "content": "- **Applications web complètes** générées par prompts\n- **Interface utilisateur** responsive automatique\n- **Logique métier** intégrée\n- **Déploiement facilité** pour prototypes éducatifs"
            },
            {
              "type": "codeBlock",
              "language": "text",
              "filename": "exemple-webapp-prompt.txt",
              "content": "Crée une application web interactive pour visualiser les interactions médicamenteuses. Interface simple avec :\n- Sélecteur de médicaments\n- Affichage des interactions en temps réel  \n- Système d'alertes par gravité\n- Export PDF des résultats"
            }
          ]
        }
      ]
    },
    {
      "type": "markdown",
      "content": "## Fonctionnalités Avancées pour le Prompt Engineering"
    },
    {
      "type": "tabs",
      "defaultValue": "structured-outputs",
      "tabs": [
        {
          "value": "structured-outputs",
          "title": "Sorties Structurées",
          "content": [
            {
              "type": "card",
              "title": "Structured Outputs",
              "description": "Fiabilisation avancée",
              "content": "Forcez l'IA à répondre dans un **format spécifique** (JSON, XML, tableaux). Technique cruciale pour des réponses prévisibles et exploitables dans des applications pharmaceutiques."
            },
            {
              "type": "alert",
              "variant": "default",
              "title": "💡 Application Pratique",
              "content": "Idéal pour extraire des données structurées de RCP, créer des bases de données de médicaments, ou générer des rapports formatés automatiquement."
            }
          ]
        },
        {
          "value": "advanced-features",
          "title": "Fonctions Avancées",
          "content": [
            {
              "type": "card",
              "title": "Function Calling & Code Execution",
              "content": "- **Function Calling** : L'IA peut simuler l'utilisation d'outils externes\n- **Code Execution** : Exécution de code Python directement dans l'interface\n- **Search Grounding** : Recherche web intégrée pour données actualisées\n- **URL Context** : Analyse de pages web en direct"
            }
          ]
        },
        {
          "value": "thinking-mode",
          "title": "Mode Thinking",
          "content": [
            {
              "type": "card",
              "title": "Raisonnement Approfondi",
              "description": "Thinking Mode activable",
              "content": "Le **mode Thinking** permet à Gemini de 'réfléchir' explicitement avant de répondre, particulièrement utile pour des analyses cliniques complexes ou des raisonnements pharmaceutiques multi-étapes."
            },
            {
              "type": "codeBlock",
              "language": "text",
              "filename": "exemple-thinking-mode.txt",
              "content": "Analyse cette interaction médicamenteuse complexe :\nPatient prenant warfarine + amiodarone + oméprazole\n\n[Mode Thinking activé : l'IA analysera chaque interaction, les mécanismes, les risques, avant de donner sa conclusion structurée]"
            }
          ]
        }
      ]
    },
    {
      "type": "card",
      "title": "Comparaison : Gemini Chat vs Google AI Studio",
      "content": "| **Aspect** | **Gemini Chat** (gemini.google.com) | **Google AI Studio** (aistudio.google.com) |\n|------------|-------------------------------------|---------------------------------------------|\n| **Public** | Grand public | Développeurs/Étudiants |\n| **Modèle Gratuit** | Gemini 2.5 Flash (32K) | **Gemini 2.5 Pro** (1M tokens) |\n| **Contrôle** | Minimal | **Granulaire complet** |\n| **Multimodal** | Chat uniquement | **Images, Audio, Vidéo** |\n| **Applications** | Non | **Développement web** |\n| **Verdict** | Usage simple | **Écosystème complet** |"
    },
    {
      "type": "tabs",
      "defaultValue": "pharmacy-applications",
      "tabs": [
        {
          "value": "pharmacy-applications",
          "title": "Applications Pharmaceutiques",
          "content": [
            {
              "type": "card",
              "title": "Cas d'Usage Multimodaux",
              "content": "✅ **Analyse de documents longs** avec le contexte 1M tokens\n✅ **Génération d'images** pour supports pédagogiques\n✅ **Création de vidéos** explicatives sur mécanismes d'action\n✅ **Applications interactives** pour révisions\n✅ **Narration audio** de cours ou présentations"
            }
          ]
        },
        {
          "value": "workflow-example",
          "title": "Workflow Complet",
          "content": [
            {
              "type": "card",
              "title": "Création d'un Support Pédagogique Complet",
              "description": "Exemple de workflow intégré",
              "content": "1. **Analyse** d'une monographie de médicament (contexte 1M tokens)\n2. **Extraction** des points clés avec structured outputs\n3. **Génération d'images** explicatives avec Imagen 4\n4. **Création vidéo** du mécanisme d'action avec Veo 3\n5. **Application web** interactive pour tester les connaissances\n6. **Narration audio** pour présentation finale"
            },
            {
              "type": "alert",
              "variant": "default",
              "title": "🎯 Avantage Unique",
              "content": "AI Studio permet de créer un **écosystème pédagogique complet** dans une seule interface, sans jongler entre plusieurs outils."
            }
          ]
        }
      ]
    },
    {
      "type": "alert",
      "variant": "default",
      "title": "🎓 Parfait pour les Étudiants",
      "content": "Google AI Studio est l'outil idéal pour **créer des écosystèmes pédagogiques multimodaux**, tester des prompts avancés, et développer des applications éducatives - le tout sans carte de crédit."
    },
    {
      "type": "guideRecommendation",
      "slug": "choisir-ses-outils-ia-en-2025-chat-vs-studio",
      "reason": "Apprenez quand utiliser les interfaces chat vs les environnements studio pour maximiser votre efficacité avec l'écosystème Google."
    },
    {
      "type": "toolRecommendation",
      "slug": "z-ai",
      "reason": "Combo parfait : AI Studio pour l'analyse multimodale rigoureuse + Z.AI pour la recherche créative forment le core kit quotidien gratuit."
    }
  ]
};

// Validation et export
export const externalTool: ExternalTool = externalToolSchema.parse(externalToolData);