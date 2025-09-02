// src/content/external-tools-new/perplexity-ai.ts
import { ExternalTool, externalToolSchema } from '@/lib/content-schema';

const externalToolData = {
  "slug": "perplexity-ai",
  "title": "Perplexity AI : Le Moteur de Réponse pour la Recherche Fiable",
  "description": "Découvrez Perplexity AI, l'outil qui combine la puissance des LLMs avec la recherche web en temps réel pour fournir des réponses sourcées et précises.",
  "difficulty": "débutant",
  "tags": [],
  "isFavorite": false,
  "keyTakeaways": [],
  "conceptSlugs": [],
  "url": "https://www.perplexity.ai/",
  "category": "moteur-de-recherche",
  "capabilities": [],
  "use_cases": [
    "Recherche bibliographique",
    "Vérification de faits",
    "Veille scientifique"
  ],
  "color": "bg-green-500",
  "tldr": "Moteur de recherche IA avec sources citées en temps réel. Parfait pour recherche bibliographique fiable et veille scientifique actualisée.",
  "content": [
    {
      "type": "alert",
      "variant": "default",
      "title": "🎯 Point Clé",
      "content": "Perplexity AI n'est pas un chatbot traditionnel, c'est un **moteur de réponse** qui cite toujours ses sources en temps réel."
    },
    {
      "type": "markdown",
      "content": "## Qu'est-ce que Perplexity AI ?"
    },
    {
      "type": "card",
      "title": "Technologie RAG",
      "description": "Retrieval-Augmented Generation",
      "content": "Perplexity utilise une approche **RAG classique** : il recherche d'abord, puis synthétise. Cette méthode est excellente pour la recherche factuelle rapide et fiable avec sources citées."
    },
    {
      "type": "tabs",
      "defaultValue": "sonar",
      "tabs": [
        {
          "value": "sonar",
          "title": "Modèle Sonar (Maison)",
          "content": [
            {
              "type": "card",
              "title": "Sonar 2024",
              "content": "- **Base** : Llama 3.3 fine-tuné par Perplexity\n- **Vitesse** : Jusqu'à 1 200 tokens/seconde\n- **Spécialisation** : Recherche et synthèse en temps réel\n- **Performance** : Dépasse GPT-4o mini et Claude 3.5 Haiku"
            },
            {
              "type": "card",
              "title": "Sonar Pro",
              "variant": "outline",
              "content": "Version plus puissante disponible pour les abonnés Pro avec des capacités de requêtes simultanées."
            }
          ]
        },
        {
          "value": "external",
          "title": "Modèles Externes (Pro)",
          "content": [
            {
              "type": "markdown",
              "content": "L'abonnement Pro donne accès aux meilleurs modèles du marché :"
            },
            {
              "type": "card",
              "title": "Modèles Disponibles",
              "content": "- **GPT-5** : Le modèle le plus avancé d'OpenAI\n- **Gemini 2.5 Pro** : Excellence en analyse multimodale\n- **Claude 3** : Spécialisé en raisonnement complexe"
            }
          ]
        }
      ]
    },
    {
      "type": "markdown",
      "content": "## Fonctionnalités par Version"
    },
    {
      "type": "card",
      "title": "Comparaison Gratuit vs Pro",
      "content": "| Fonctionnalité | Version Gratuite | Version Pro (20€/mois) |\n|---|---|---|\n| **Recherches Pro** | 5 par jour | 300+ par jour |\n| **Modèle par défaut** | Sonar (rapide) | Sonar Pro + modèles premium |\n| **Traitement de fichiers** | Limité (extraits) | **Illimité** (PDF, images, CSV) |\n| **Deep Research** | ❌ Non disponible | ✅ **Rapports complets autonomes** |\n| **Génération d'images** | ❌ Non disponible | ✅ Intégrée à l'interface |"
    },
    {
      "type": "alert",
      "variant": "default",
      "title": "🔬 Focus Academic",
      "content": "La fonctionnalité **Focus Academic** limite la recherche aux publications scientifiques - un outil inestimable pour les étudiants en pharmacie."
    },
    {
      "type": "tabs",
      "defaultValue": "focus-types",
      "tabs": [
        {
          "value": "focus-types",
          "title": "Types de Focus",
          "content": [
            {
              "type": "card",
              "title": "Focus Academic",
              "description": "Recherche scientifique ciblée",
              "content": "Limite la recherche aux publications scientifiques et journaux académiques. Parfait pour la recherche bibliographique fiable."
            },
            {
              "type": "card",
              "title": "Autres Focus",
              "variant": "outline",
              "content": "- **Wolfram|Alpha** : Calculs et données structurées\n- **YouTube** : Informations dans les vidéos\n- **Reddit** : Discussions et avis communautaires"
            }
          ]
        },
        {
          "value": "use-cases",
          "title": "Cas d'Usage Pharmacie",
          "content": [
            {
              "type": "card",
              "title": "Pharmacovigilance",
              "content": "\"Quels sont les derniers signalements sur les effets secondaires de la molécule X selon les articles publiés en 2024 ?\""
            },
            {
              "type": "card",
              "title": "Protocoles de Traitement",
              "content": "\"Existe-t-il des protocoles de traitement standard pour la maladie Y chez les patients pédiatriques ?\""
            },
            {
              "type": "card",
              "title": "Analyse d'Études",
              "content": "Uploadez un PDF : \"Résume les points clés et compare avec les 3 articles les plus récents sur le même sujet.\""
            },
            {
              "type": "card",
              "title": "Veille Scientifique",
              "content": "\"Quelles sont les nouvelles thérapies géniques en phase 3 d'essais cliniques pour la mucoviscidose ?\""
            }
          ]
        }
      ]
    },
    {
      "type": "alert",
      "variant": "default",
      "title": "🎯 Avantage Concurrentiel",
      "content": "Contrairement aux chatbots qui peuvent \"halluciner\", Perplexity priorise la **véracité** et la **fraîcheur** de l'information avec ses sources citées."
    },
    {
      "type": "conceptRecommendation",
      "slug": "hallucination-effet-indesirable",
      "reason": "Comprenez pourquoi Perplexity est plus fiable que les chatbots traditionnels pour la recherche factuelle."
    },
    {
      "type": "guideRecommendation",
      "slug": "obtenir-donnees-fiables",
      "reason": "Apprenez les meilleures pratiques pour utiliser Perplexity et d'autres outils de recherche de manière optimale."
    },
    {
      "type": "card",
      "title": "Mise en Pratique",
      "description": "Voir cet outil en action",
      "content": "Pour une comparaison directe de Perplexity avec d'autres outils pour la recherche bibliographique, consultez notre page objectif dédiée.\n\n<GuideRecommendation guideSlug='faire-recherche-bibliographique' reason='Comparez Perplexity et Z.AI sur un cas pratique et apprenez le workflow de recherche optimal.' />"
    }
  ]
};

// Validation et export
export const externalTool: ExternalTool = externalToolSchema.parse(externalToolData);