import type { Concept } from '@/lib/content-schema';

export const concept = {
  "slug": "température-dosage",
  "title": "La Température : Le Dosage de la Créativité de l'IA",
  "description": "Découvrez comment le paramètre de température influence la créativité et la prévisibilité des réponses d'un modèle de langage.",
  "icon": "Thermometer",
  "category": "fondamentaux",
  "difficulty": "intermédiaire",
  "tags": [],
  "isFavorite": false,
  "keyTakeaways": [
    "La température (0-1) contrôle l'équilibre entre créativité et prévisibilité de l'IA",
    "Température basse (0-0.3) : réponses factuelles, précises, répétables",
    "Température haute (0.7-1) : réponses créatives, originales, mais moins fiables",
    "Le 'bon dosage' dépend de la tâche : analytique vs créative",
    "Accessible uniquement via les environnements d'expérimentation (AI Studio, Playground)"
  ],
  "conceptSlugs": [],
  "content": [
    {
      "type": "card",
      "title": "🌡️ Définition : La Température, c'est quoi ?",
      "description": "Une métaphore pharmaceutique pour comprendre ce paramètre",
      "content": "Dans les réglages d'un modèle de langage, la **température** est un paramètre (généralement entre 0 et 1, parfois jusqu'à 2) qui contrôle le degré d'aléa et de \"créativité\" dans les réponses de l'IA.\n\nCe n'est pas une mesure de la \"chaleur\" de la réponse, mais plutôt une métaphore pour son degré de prévisibilité.\n\n**C'est l'équivalent d'un dosage en pharmacie** : un mauvais dosage peut rendre la réponse inefficace ou toxique (hors-sujet)."
    },
    {
      "type": "tabs",
      "defaultValue": "basse-temperature",
      "tabs": [
        {
          "value": "basse-temperature",
          "title": "Basse Température (0-0.3)",
          "content": [
            {
              "type": "card",
              "title": "Mode Précision Maximale",
              "description": "Pour les tâches factuelles et reproductibles",
              "content": "L'IA choisira les mots les plus probables et les plus logiques pour compléter un texte. Les réponses seront très **factuelles, prévisibles, voire répétitives**."
            },
            {
              "type": "card",
              "title": "Cas d'Usage en Pharmacie",
              "content": "- **Extraction d'informations** : \"Extrais toutes les posologies mentionnées dans ce document.\"\n- **Classification** : \"Classe ces médicaments en fonction de leur famille thérapeutique.\"\n- **Résumé factuel** : \"Résume les conclusions de cette étude clinique sans interprétation.\"\n- **Formatage de données** : \"Transforme cette liste de médicaments en un tableau JSON.\""
            }
          ]
        },
        {
          "value": "haute-temperature",
          "title": "Haute Température (0.7-1.0)",
          "content": [
            {
              "type": "card",
              "title": "Mode Créativité",
              "description": "Pour l'exploration et la génération d'idées",
              "content": "L'IA sera plus audacieuse et pourra choisir des mots moins probables. Les réponses seront plus **créatives, surprenantes**, parfois même incohérentes ou \"farfelues\"."
            },
            {
              "type": "card",
              "title": "Cas d'Usage en Pharmacie",
              "content": "- **Brainstorming** : \"Donne-moi 10 idées de sujets de thèse sur l'impact de l'IA en pharmacovigilance.\"\n- **Génération de mnémoniques** : \"Invente une phrase mnémotechnique pour se souvenir des effets secondaires des bêta-bloquants.\"\n- **Reformulation** : \"Réécris ce paragraphe sur le mécanisme d'action du paracétamol pour un public de non-initiés, en utilisant une analogie simple.\"\n- **Simulation de dialogue** : \"Simule une conversation entre un pharmacien et un patient inquiet au sujet des vaccins.\""
            }
          ]
        }
      ]
    },
    {
      "type": "card",
      "title": "🔬 Où Régler la Température ?",
      "content": "Ce paramètre n'est généralement **pas disponible** dans les interfaces de chat grand public comme ChatGPT ou Gemini.\n\n**Pour y accéder, vous devez utiliser les environnements d'expérimentation :**"
    },
    {
      "type": "table",
      "headers": ["Plateforme", "Accès", "Spécialité"],
      "rows": [
        ["**Google AI Studio**", "Gratuit", "Écosystème Gemini complet"],
        ["**OpenAI Playground**", "Payant", "Modèles GPT"],
        ["**Anthropic Console**", "Gratuit/Payant", "Modèles Claude"]
      ],
      "caption": "Ces plateformes sont de véritables **laboratoires conçus pour les non-développeurs** souhaitant maîtriser le prompt engineering."
    },
    {
      "type": "alert",
      "variant": "default",
      "title": "💡 Conseil Pratique",
      "content": "Commencez par tester vos prompts à différentes températures dans **Google AI Studio** (gratuit). Observez comment la même question génère des réponses de plus en plus créatives quand vous augmentez la température de 0.1 à 0.9."
    },
    {
      "type": "toolRecommendation",
      "slug": "google-ai-studio",
      "reason": "Google AI Studio est la meilleure plateforme gratuite pour expérimenter avec le paramètre de température et comprendre son impact sur les réponses de Gemini."
    }
  ]
} satisfies Concept;