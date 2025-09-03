import { Prompt, promptSchema } from '@/lib/content-schema';

const promptData = {
  "slug": "constructeur-tableaux-comparatifs",
  "title": "Constructeur de Tableaux Comparatifs",
  "description": "Un prompt pour structurer et générer des tableaux comparatifs pédagogiques (ex: antihypertenseurs, antibiotiques).",
  "icon": "Table",
  "category": "enseignement",
  "difficulty": "intermédiaire",
 "tags": [
    "antibiotiques",
    "enseignement",
    "génération-contenu",
    "pharmacie",
    "prompting",
    "tableau-comparatif",
    "template",
    "variables"
  ],
  "isFavorite": false,
  "keyTakeaways": [],
  "conceptSlugs": [],
  "variables": [
    "classes_medicaments",
    "caracteristiques_comparees"
  ],
  "promptContent": "Tu es un expert en pharmacologie et en pédagogie pour des étudiants en pharmacie.\n\n<classes_medicaments>\n{{classes_medicaments}}\n</classes_medicaments>\n\n<caracteristiques_comparees>\n{{caracteristiques_comparees}}\n</caracteristiques_comparees>\n\n<thinking_process>\n1. **Identification des Classes** : Liste toutes les classes de médicaments à comparer.\n2. **Définition des Caractéristiques** : Identifie les caractéristiques pertinentes pour la comparaison.\n3. **Structuration du Tableau** : Organise les classes en lignes et les caractéristiques en colonnes.\n4. **Remplissage des Données** : Complète chaque cellule avec l'information pertinente.\n</thinking_process>\n\n<format_sortie>\n- Présente le tableau au format markdown avec un en-tête clair.\n- Utilise des symboles (✅, ⚠️, ❌) pour une lecture rapide.\n- Ajoute une légende si nécessaire pour les symboles.\n</format_sortie>",
  "systemPromptContent": "Tu es un expert en pharmacologie et en pédagogie pour des étudiants en pharmacie. Ta spécialité est de créer des tableaux comparatifs clairs et pédagogiques pour faciliter l'apprentissage de classes thérapeutiques.\n",
  "alternativeVersions": {
    "standard": "Tu es un expert en pharmacologie et en pédagogie pour des étudiants en pharmacie.\n\nCrée un tableau comparatif des classes de médicaments suivantes.\n\n**Classes de Médicaments :**\n{{classes_medicaments}}\n\n**Caractéristiques à Comparer :**\n{{caracteristiques_comparees}}\n\nProcède ainsi :\n1. **Identification des Classes** : Liste toutes les classes.\n2. **Définition des Caractéristiques** : Identifie les caractéristiques pertinentes.\n3. **Structuration du Tableau** : Organise en lignes/colonnes.\n4. **Remplissage des Données** : Complète chaque cellule.\n\nPrésente le tableau en markdown avec un en-tête clair. Utilise des symboles (✅, ⚠️, ❌) et ajoute une légende.",
    "xml": "Tu es un expert en pharmacologie et en pédagogie pour des étudiants en pharmacie.\n\n<classes_medicaments>\n{{classes_medicaments}}\n</classes_medicaments>\n\n<caracteristiques_comparees>\n{{caracteristiques_comparees}}\n</caracteristiques_comparees>\n\n<thinking_process>\n1. **Identification des Classes** : Liste toutes les classes de médicaments à comparer.\n2. **Définition des Caractéristiques** : Identifie les caractéristiques pertinentes pour la comparaison.\n3. **Structuration du Tableau** : Organise les classes en lignes et les caractéristiques en colonnes.\n4. **Remplissage des Données** : Complète chaque cellule avec l'information pertinente.\n</thinking_process>\n\n<format_sortie>\n- Présente le tableau au format markdown avec un en-tête clair.\n- Utilise des symboles (✅, ⚠️, ❌) pour une lecture rapide.\n- Ajoute une légende si nécessaire pour les symboles.\n</format_sortie>",
    "aiStudio": {
      "systemPrompt": "Tu es un expert en pharmacologie et en pédagogie pour des étudiants en pharmacie. Ta spécialité est de créer des tableaux comparatifs clairs et pédagogiques pour faciliter l'apprentissage de classes thérapeutiques.\n",
      "userPrompt": "Crée un tableau comparatif des classes de médicaments suivantes.\n\n**Classes de Médicaments :**\n{{classes_medicaments}}\n\n**Caractéristiques à Comparer :**\n{{caracteristiques_comparees}}\n\nProcède ainsi :\n1. **Identification des Classes** : Liste toutes les classes.\n2. **Définition des Caractéristiques** : Identifie les caractéristiques pertinentes.\n3. **Structuration du Tableau** : Organise en lignes/colonnes.\n4. **Remplissage des Données** : Complète chaque cellule.\n\nPrésente le tableau en markdown avec un en-tête clair. Utilise des symboles (✅, ⚠️, ❌) et ajoute une légende."
    }
  },
  "recommendedTools": {
    "standard": [
      "ChatGPT",
      "Claude.ai"
    ],
    "xml": [
      "Claude.ai"
    ],
    "aiStudio": [
      "Google AI Studio",
      "Qwen Chat"
    ]
  },
  "content": [
    {
      "type": "markdown",
      "content": "## Organisation Comparée par IA\n\nCe prompt guide un LLM dans la création de tableaux comparatifs structurés pour des classes thérapeutiques, facilitant l'apprentissage par la visualisation."
    },
    {
      "type": "card",
      "title": "Variables à Personnaliser",
      "content": "- **{{classes_medicaments}}** : Liste des classes thérapeutiques à comparer\n- **{{caracteristiques_comparees}}** : Liste des caractéristiques (efficacité, effets secondaires, etc.)"
    },
    {
      "type": "tabs",
      "defaultValue": "examples",
      "tabs": [
        {
          "value": "examples",
          "title": "Exemples d'Usage",
          "content": [
            {
              "type": "card",
              "title": "Exemple : Antihypertenseurs (L2)",
              "content": "**Classes de Médicaments :**\nIEC, ARA II, Bêta-bloquants, Inhibiteurs calciques, Diurétiques thiazidiques\n\n**Caractéristiques à Comparer :**\nMécanisme d'action, Indications principales, Effets secondaires fréquents, Contre-indications, Grossesse"
            }
          ]
        },
        {
          "value": "formats",
          "title": "Optimisation par Outil",
          "content": [
            {
              "type": "card",
              "title": "Version Standard",
              "content": "Parfait pour les interfaces de chat simples (ChatGPT, Claude). Format conversationnel naturel."
            },
            {
              "type": "card",
              "title": "Version XML",
              "variant": "outline",
              "content": "Optimisé pour Claude qui excelle avec les balises structurées `<classes_medicaments>`, `<caracteristiques_comparees>`."
            },
            {
              "type": "card",
              "title": "Version AI Studio",
              "variant": "outline",
              "content": "Sépare System/User pour un contrôle granulaire des paramètres de créativité. Idéal pour Qwen Chat."
            }
          ]
        }
      ]
    },
    {
      "type": "alert",
      "variant": "default",
      "title": "⚠️ Validation Scientifique",
      "content": "Toujours valider les informations générées avec des sources fiables (bonnes pratiques, référentiels officiels) avant utilisation pédagogique."
    },
    {
      "type": "guideRecommendation",
      "slug": "methodologie-comparaison",
      "reason": "Suivez une méthodologie éprouvée pour construire des comparaisons pertinentes et pédagogiques."
    }
  ]
};

// Validation et export
export const prompt: Prompt = promptSchema.parse(promptData);