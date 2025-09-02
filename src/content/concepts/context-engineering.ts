// src/content/concepts-new/context-engineering.ts
import { Concept, conceptSchema } from '@/lib/content-schema';

const conceptData = {
  "slug": "context-engineering",
  "title": "Context Engineering",
  "description": "Optimisez la fenêtre de contexte de l'IA pour maximiser la pertinence et la précision des réponses en pharmacie.",
  "icon": "Target",
  "category": "Fondamentaux",
  "difficulty": "débutant",
  "tags": [
    "context-engineering",
    "guide",
    "pedagogie",
    "pharmacie"
  ],
  "isFavorite": false,
  "keyTakeaways": [
    "Le Context Engineering optimise la fenêtre de contexte de l'IA pour des réponses plus précises et pertinentes.",
    "Hiérarchisez les informations : placez les plus importantes au début et à la fin pour éviter l'effet 'lost-in-the-middle'.",
    "Structurez et concisiez vos données pour maximiser l'efficacité de la mémoire de travail de l'IA."
  ],
  "conceptSlugs": [],
  "mainGuideSlug": "gestion-memoire-ia",
  "content": [
    {
      "type": "markdown",
      "content": "Le **Context Engineering** est l'art d'optimiser la fenêtre de contexte de l'IA pour obtenir des réponses plus précises et pertinentes. En pharmacie, cela signifie structurer l'information de manière à ce que l'IA comprenne parfaitement le contexte clinique.\n\n## Pourquoi c'est crucial ?\n\nLa qualité du contexte détermine directement la qualité de la réponse :\n\n- **Précision diagnostique** : L'IA comprend mieux les symptômes et l'historique\n- **Recommandations adaptées** : Les conseils sont plus personnalisés\n- **Sécurité accrue** : Moins de risques d'erreurs d'interprétation\n- **Efficacité** : Réponses plus directes et utiles\n\n## Principes clés\n\n1. **Hiérarchisation** : Informations les plus importantes en premier\n2. **Structuration** : Organisation logique des données\n3. **Concision** : Éviter la surcharge d'information\n4. **Cohérence** : Terminologie uniforme et claire\n\n## Applications pratiques\n\n- **Dossiers patients** : Structurer les informations essentielles\n- **Cas cliniques** : Organiser les données pour l'analyse\n- **Recherche bibliographique** : Optimiser les requêtes de recherche\n- **Formation continue** : Structurer les supports d'apprentissage\n\n<ToolRecommendation \n  toolSlug=\"notebooklm\" \n  reason=\"NotebookLM excelle dans la gestion de contexte long grâce à sa capacité à ingérer des documents entiers et à maintenir une cohérence dans les réponses sur tout le corpus.\"\n/>\n\n<GuideRecommendation \n  guideSlug=\"gestion-memoire-ia\" \n  reason=\"Approfondissez vos connaissances sur la gestion optimale de la mémoire et du contexte des IA pour des interactions plus efficaces.\"\n/>\n\n<GuideRecommendation \n  guideSlug=\"structurer-ses-prompts-avec-des-balises-methode-xml\" \n  reason=\"La méthode XML est une technique avancée de context engineering qui permet de structurer parfaitement l'information fournie à l'IA.\"\n/>"
    }
  ]
};

// Validation et export
export const concept: Concept = conceptSchema.parse(conceptData);