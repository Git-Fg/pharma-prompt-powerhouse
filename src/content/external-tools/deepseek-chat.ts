// src/content/external-tools-new/deepseek-chat.ts
import type { ExternalTool } from '@/lib/content-schema';

const externalToolData = {
  "slug": "deepseek-chat",
  "title": "DeepSeek Chat : L'IA Gratuite et Open-Source à la Pointe",
  "description": "Découvrez DeepSeek Chat, une plateforme propulsée par des modèles open-source puissants, offrant des outils de raisonnement, de recherche et de développement sans frais.",
  "tags": [],
  "isFavorite": false,
  "keyTakeaways": [],
  "conceptSlugs": [],
  "url": "https://chat.deepseek.com/",
  "category": "outils",
  "capabilities": [],
  "use_cases": [
    "Raisonnement logique",
    "Recherche web intégrée",
    "Développement de code"
  ],
  "color": "bg-indigo-500",
  "tldr": "IA gratuite open-source excellente en raisonnement et code. Recherche web intégrée, alternative performante aux outils payants.",
  "content": [
    {
      "type": "alert",
      "variant": "destructive",
      "title": "⚠️ Avertissement de Confidentialité",
      "content": "Cette plateforme est hébergée en Asie avec des lois sur les données souples. **Considérez que tout ce que vous écrivez peut devenir public**. À utiliser uniquement pour l'expérimentation sur des données publiques."
    },
    {
      "type": "markdown",
      "content": "## Qu'est-ce que DeepSeek Chat ?"
    },
    {
      "type": "card",
      "title": "IA Open-Source de DeepSeek AI",
      "description": "Interface gratuite avec engagement open-source",
      "content": "DeepSeek Chat est une interface de conversation développée par DeepSeek AI, une entreprise qui se distingue par son engagement envers l'**open-source**. Elle donne accès gratuitement à une famille de modèles d'IA très performants, ce qui en fait une alternative extrêmement compétitive."
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
              "title": "DeepSeek V3.1 (Août 2025)",
              "content": "- **Architecture** : Mixture-of-Experts (MoE)\n- **Spécialités** : Raisonnement, mathématiques, codage\n- **Contexte** : 128K tokens\n- **Performance** : Rivalise avec les meilleurs du marché"
            },
            {
              "type": "card",
              "title": "DeepSeek R1 (Reasoning)",
              "variant": "outline",
              "content": "Modèle spécialisé pour le raisonnement complexe et la logique étape par étape. Activé via la fonctionnalité **DeepThink**. Plus coûteux mais analyse plus profonde."
            }
          ]
        },
        {
          "value": "tools",
          "title": "Boîte à Outils Gratuite",
          "content": [
            {
              "type": "card",
              "title": "DeepThink (R1)",
              "content": "- Active le modèle de raisonnement spécialisé **DeepSeek R1**\n- Idéal pour cas cliniques, analyse de protocoles\n- **Limite** : 50 messages/jour (très généreux pour un usage étudiant)"
            },
            {
              "type": "card",
              "title": "Recherche Web en Temps Réel",
              "variant": "outline",
              "content": "Accès aux informations les plus récentes sur Internet avec capacité de citation des sources."
            },
            {
              "type": "card",
              "title": "Analyse Multi-formats",
              "variant": "outline",
              "content": "- **50 fichiers simultanément** (100 Mo max/fichier)\n- **Formats** : PDF, Word, Excel, PowerPoint, texte, images\n- Parfait pour synthèses d'annales, cours, articles"
            }
          ]
        }
      ]
    },
    {
      "type": "tabs",
      "defaultValue": "creation",
      "tabs": [
        {
          "value": "creation",
          "title": "Outils Créatifs",
          "content": [
            {
              "type": "card",
              "title": "DeepSite (Développement Web)",
              "content": "Crée un site web complet (HTML/CSS/JS) à partir d'une simple description en langage naturel. Excellent pour visualiser des concepts ou créer des présentations interactives."
            },
            {
              "type": "card",
              "title": "Janus-Pro (Génération Images)",
              "variant": "outline",
              "content": "Modèle de génération d'images très performant, capable de rivaliser avec DALL-E 3 pour créer illustrations, schémas ou supports visuels."
            }
          ]
        },
        {
          "value": "strengths",
          "title": "Points Forts",
          "content": [
            {
              "type": "card",
              "title": "Avantages Majeurs",
              "content": "✅ **Totalement Gratuit** : Accès à des modèles de pointe sans frais\n✅ **Suite Complète** : Recherche, analyse, génération\n✅ **Open-Source** : Modèles publics et auditables\n✅ **Haute Performance** : Excellentes capacités en logique"
            },
            {
              "type": "alert",
              "variant": "default",
              "title": "🎯 Spécialités",
              "content": "Particulièrement doué pour le **raisonnement mathématique** et la **programmation**, idéal pour résoudre des problèmes scientifiques complexes."
            }
          ]
        }
      ]
    },
    {
      "type": "markdown",
      "content": "## Considérations d'Usage"
    },
    {
      "type": "card",
      "title": "Limitations à Connaître",
      "content": "⚠️ **Confidentialité** : Prudence maximale avec données sensibles\n⚠️ **Limitation DeepThink** : 50 messages/jour (généreux mais limité)\n⚠️ **Interface** : Optimisée pour Anglais/Mandarin"
    },
    {
      "type": "alert",
      "variant": "default",
      "title": "🚀 Usage Optimal",
      "content": "DeepSeek Chat est une option de premier choix pour la **préparation d'examens**, l'**analyse de cas cliniques** ou la **recherche bibliographique** - à condition de rester vigilant sur la confidentialité."
    },
    {
      "type": "guideRecommendation",
      "slug": "confidentialite-securite",
      "reason": "CRITIQUE : Comprenez les risques de confidentialité avant d'utiliser des plateformes gratuites hébergées à l'étranger."
    },
    {
      "type": "conceptRecommendation",
      "slug": "hallucination-effet-indesirable",
      "reason": "Apprenez à identifier et éviter les hallucinations, particulièrement importantes sur les plateformes moins contrôlées."
    }
  ]
};

// Validation et export
export const externalTool = externalToolData satisfies ExternalTool;