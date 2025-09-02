// src/content/concepts-new/chaîne-de-prompts.ts
import { Concept, conceptSchema } from '@/lib/content-schema';

const conceptData = {
  "slug": "chaîne-de-prompts",
  "title": "Chaîne de Prompts",
  "description": "Découpez vos tâches complexes en une série de prompts logiques, comme un protocole de soin",
  "icon": "GitBranch",
  "category": "Méthodologie",
  "difficulty": "débutant",
  "tags": [
    "exemple-code",
    "guide",
    "pedagogie",
    "pharmacie"
  ],
  "isFavorite": false,
  "keyTakeaways": [
    "Découpez une tâche complexe en une série d'étapes logiques, comme un protocole de soin, pour augmenter la fiabilité.",
    "Chaque prompt de la chaîne doit avoir une mission unique et préparer le terrain pour le suivant.",
    "Cette méthode permet de valider chaque étape et de mieux contrôler le résultat final."
  ],
  "conceptSlugs": [],
  "mainGuideSlug": "optimisation-de-prompts-la-methode-iterative",
  "content": [
    {
      "type": "markdown",
      "content": "# Chaîne de Prompts : Protocole de Soin\n\n## Qu'est-ce que c'est ?\n\nUne **chaîne de prompts** est une série de prompts organisés logiquement, chacun ayant une mission spécifique et préparant le terrain pour le suivant. C'est l'équivalent d'un protocole de soin en pharmacie : on décompose une tâche complexe en étapes simples et contrôlables.\n\n## Pourquoi utiliser cette approche ?\n\n### Avantages\n\n- **Fiabilité accrue** : Chaque étape peut être validée individuellement\n- **Contrôle du processus** : Vous suivez le raisonnement étape par étape\n- **Réutilisabilité** : Une chaîne bien conçue peut être adaptée à d'autres cas\n- **Debugging facilité** : Si quelque chose ne va pas, vous savez à quelle étape\n\n### Analogie avec la pharmacie\n\nComme un protocole de soin qui décompose un traitement complexe en étapes :\n\n1. **Diagnostic** → Premier prompt d'analyse\n2. **Plan de traitement** → Prompt de planification\n3. **Exécution** → Prompt d'action\n4. **Suivi** → Prompt de validation\n\n## Exemple concret : Création de fiches de révision\n\n### Étape 1 : Analyse du contenu\n\n\\`\\`\\`\nTu es un expert en pédagogie. Analyse ce cours et identifie :\n- Les concepts clés (max 5)\n- Les points difficiles\n- Les liens logiques entre les parties\n\\`\\`\\`\n\n### Étape 2 : Structuration\n\n\\`\\`\\`\nBasé sur l'analyse précédente, crée une structure de fiche avec :\n- Titres des sections\n- Points clés à développer\n- Ordre logique d'apprentissage\n\\`\\`\\`\n\n### Étape 3 : Création des fiches\n\n\\`\\`\\`\nPour chaque section identifiée, crée une fiche de révision qui :\n- Explique le concept simplement\n- Donne des exemples concrets\n- Inclut des questions de vérification\n\\`\\`\\`\n\n## Bonnes pratiques\n\n1. **Chaque prompt doit avoir un objectif unique**\n2. **Le résultat d'un prompt doit alimenter le suivant**\n3. **Prévoyez des étapes de validation**\n4. **Gardez une trace de chaque étape**\n\n## Applications en pharmacie\n\n- **Analyse d'interactions médicamenteuses** : Recherche → Analyse → Recommandations → Monitoring\n- **Création de protocoles** : Littérature → Synthèse → Rédaction → Validation\n- **Cas cliniques** : Présentation → Analyse → Diagnostic → Traitement → Suivi\n\nCette approche transforme des tâches complexes en processus guidés et fiables, exactement comme un bon protocole de soin.\n\n<ToolRecommendation \n  toolSlug=\"google-ai-studio\" \n  reason=\"AI Studio permet de sauvegarder et organiser vos chaînes de prompts dans des projets séparés, idéal pour créer des workflows réutilisables et documentés.\"\n/>\n\n<GuideRecommendation \n  guideSlug=\"workflow-generer-cas-cliniques\" \n  reason=\"Découvrez un exemple concret d'application de chaîne de prompts pour créer des cas cliniques de révision de haute qualité.\"\n/>\n\n<GuideRecommendation \n  guideSlug=\"optimisation-de-prompts-la-methode-iterative\" \n  reason=\"Apprenez les techniques d'optimisation itérative qui vous aideront à peaufiner chaque prompt de votre chaîne pour des résultats optimaux.\"\n/>"
    }
  ]
};

// Validation et export
export const concept: Concept = conceptSchema.parse(conceptData);