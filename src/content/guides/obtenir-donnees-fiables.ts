// src/content/guides-new/obtenir-donnees-fiables.ts
import { Guide, guideSchema } from '@/lib/content-schema';

const guideData = {
  "slug": "obtenir-donnees-fiables",
  "title": "Fiabilité et Sources : Obtenir des Données Vérifiables avec l'IA",
  "description": "Comment utiliser les IAs pour la recherche sans tomber dans le piège des hallucinations ? La clé : les outils spécialisés, la méthode RAG et un esprit critique.",
  "icon": "ShieldCheck",
  "category": "Technique",
  "difficulty": "intermédiaire",
  "tags": [],
  "isFavorite": false,
  "keyTakeaways": [],
  "conceptSlugs": [],
  "isWorkflow": false,
  "content": [
    {
      "type": "alert",
      "variant": "destructive",
      "title": "⚠️ Le Plus Grand Défi : L'Hallucination",
      "content": "L'un des principaux \"effets indésirables\" des modèles de langage est l'**hallucination**. C'est la tendance de l'IA à générer des informations qui semblent parfaitement plausibles, bien écrites et logiques, mais qui sont en réalité **fausses, inventées ou mal attribuées**."
    },
    {
      "type": "card",
      "title": "💊 Analogie Pharmaceutique",
      "description": "Comprendre le risque en contexte de santé",
      "content": "Dans le domaine de la santé, où chaque information peut avoir un impact direct sur la sécurité des patients, se fier aveuglément à un chatbot standard n'est pas seulement une erreur, **c'est une faute professionnelle potentielle**.\n\nHeureusement, des outils et des techniques existent pour transformer l'IA en un puissant assistant de recherche, fiable et vérifiable."
    },
    {
      "type": "markdown",
      "content": "## La Méthode RAG : Forcer l'IA à se Baser sur des Faits Récents"
    },
    {
      "type": "card",
      "title": "Comprendre le RAG (Retrieval-Augmented Generation)",
      "description": "La différence fondamentale",
      "content": "La plupart des chatbots ont été \"entraînés\" sur une quantité massive de données, mais ces données ont une **date limite**. Ils ne connaissent pas les événements ou les publications parus après leur date d'entraînement.\n\nLe **RAG** résout ce problème :\n- **Retrieval** : L'IA va d'abord chercher l'information en temps réel sur Internet\n- **Generation** : Elle utilise les documents trouvés pour construire sa réponse\n\n**Analogie** : C'est la différence entre un étudiant qui récite son cours par cœur et un étudiant qui va chercher la réponse dans les dernières publications de la bibliothèque avant de vous répondre."
    },
    {
      "type": "markdown",
      "content": "## Workflow pour une Recherche d'Information Fiable et Critique"
    },
    {
      "type": "alert",
      "variant": "default",
      "title": "⚗️ Principe Fondamental",
      "content": "L'outil ne fait pas tout. **Votre rigueur de professionnel de santé reste indispensable.**"
    },
    {
      "type": "tabs",
      "defaultValue": "etape-1",
      "tabs": [
        {
          "value": "etape-1",
          "title": "Étape 1 : Question PICO",
          "content": [
            {
              "type": "card",
              "title": "Formuler une Question Précise",
              "description": "La qualité de votre question détermine 80% de la qualité de la réponse",
              "content": "Inspirez-vous du modèle **PICO** :\n- **P**atient/Problem\n- **I**ntervention  \n- **C**omparison\n- **O**utcome"
            },
            {
              "type": "card",
              "title": "Exemples de Formulation",
              "variant": "outline",
              "content": "**❌ À éviter (trop vague) :**\n`Parle-moi des nouveaux médicaments pour le diabète.`\n\n**✅ À privilégier (précis) :**\n`Chez les patients adultes atteints de diabète de type 2 (P), quel est l'impact de l'ajout d'un inhibiteur de la SGLT2 (I) par rapport à un placebo (C) sur la réduction de l'HbA1c et les événements cardiovasculaires majeurs (O) ?`"
            }
          ]
        },
        {
          "value": "etape-2",
          "title": "Étape 2 : Outils Spécialisés",
          "content": [
            {
              "type": "card",
              "title": "🎯 Perplexity AI - Recherche Académique",
              "description": "Moteur de réponse conçu pour la fiabilité",
              "content": "**Perplexity AI** avec `Focus: Academic` pour toute question nécessitant des preuves scientifiques - il cite systématiquement ses sources."
            },
            {
              "type": "alert",
              "variant": "default",
              "title": "🆚 Note Terrain : Z.AI",
              "content": "Selon les retours d'expérience, **Chat Z.AI** offre également une excellente approche de recherche, souvent plus \"humaine\" et contextuelle que Perplexity. Attention cependant aux considérations de confidentialité."
            }
          ]
        },
        {
          "value": "etape-3",
          "title": "Étape 3 : Analyse Critique",
          "content": [
            {
              "type": "alert",
              "variant": "destructive",
              "title": "🔍 L'Étape la Plus Importante",
              "content": "**Ne vous contentez jamais de la synthèse de l'IA.** Elle peut mal interpréter une nuance."
            },
            {
              "type": "card",
              "title": "Checklist d'Analyse des Sources",
              "content": "1. **Cliquez sur les liens** (les numéros [1], [2]...)\n2. **Évaluez la source** : Méta-analyse dans *The Lancet* ? Essai randomisé contrôlé ? Ou simple article d'opinion ?\n3. **Lisez l'abstract et les conclusions** de l'article source\n4. **Vérifiez** : L'IA a-t-elle correctement représenté les résultats ?\n5. **Cherchez** : A-t-elle omis une limitation importante mentionnée par les auteurs ?"
            }
          ]
        }
      ]
    },
    {
      "type": "alert",
      "variant": "default",
      "title": "🎯 Résultat Final",
      "content": "En adoptant cette approche méthodique, vous transformez l'IA d'une source potentielle de désinformation en un **assistant de recherche surpuissant**, qui vous fait gagner un temps précieux tout en renforçant la rigueur scientifique de votre travail."
    },
    {
      "type": "toolRecommendation",
      "slug": "perplexity-ai",
      "reason": "Perplexity AI est spécifiquement conçu pour la recherche fiable avec RAG intégré. Sa fonction Focus Academic vous donne accès aux publications scientifiques avec citations vérifiables."
    },
    {
      "type": "toolRecommendation",
      "slug": "z-ai",
      "reason": "Alternative avec approche de recherche plus 'humaine' et contextuelle, particulièrement efficace selon les retours terrain."
    },
    {
      "type": "conceptRecommendation",
      "slug": "hallucination-effet-indesirable",
      "reason": "Comprendre les mécanismes d'hallucination de l'IA est essentiel pour développer un esprit critique dans l'usage des outils d'IA en pharmacie."
    }
  ]
};

// Validation et export
export const guide: Guide = guideSchema.parse(guideData);