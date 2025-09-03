// src/content/guides/ia-stagiaire-brillant-naif.ts
import type { GuideInput } from '@/types/content';

export const guide = {
  "slug": "ia-stagiaire-brillant-naif",
  "title": "IA : Stagiaire Brillant mais Naïf",
  "description": "Comprendre et gérer les limites de l'IA pour l'utiliser efficacement en pharmacie",
  "icon": "GraduationCap",
  "category": "methodologie",
  "difficulty": "débutant",
  "estimatedTime": "15 minutes",
  "tags": [
    "clinique",
    "guide",
    "pedagogie",
    "pharmacie"
  ],
  "isFavorite": true,
  "keyTakeaways": [
    "Considérez l'IA comme un stagiaire ultra-compétent mais sans jugement critique : il a besoin de votre supervision.",
    "Votre rôle est de fournir des instructions claires, de vérifier systématiquement le travail et de corriger les erreurs.",
    "La responsabilité finale de l'information générée vous incombe toujours ; validez avec des sources fiables."
  ],
  "conceptSlugs": [
    "structuration-par-balises"
  ],
  "isWorkflow": false,
  "content": [
    {
      "type": "markdown",
      "content": "Considérez l'IA comme un stagiaire très motivé, capable de traiter rapidement de grandes quantités d'informations, mais qui a besoin de guidance. Votre rôle est de la guider et de superviser son travail."
    },
    {
      "type": "tabs",
      "defaultValue": "qualites",
      "tabs": [
        {
          "value": "qualites",
          "title": "✅ Les Qualités du \"Stagiaire IA\"",
          "content": [
            {
              "type": "card",
              "content": "- **Motivation infatigable :** L'IA ne se fatigue pas et peut traiter des volumes d'information considérables\n- **Vitesse d'exécution :** Capable de générer des réponses complexes en quelques secondes\n- **Vaste base de connaissances :** Accès à une immense quantité d'informations sur de nombreux sujets\n- **Polyvalence :** Peut s'adapter à de nombreuses tâches différentes"
            }
          ]
        },
        {
          "value": "limites",
          "title": "⚠️ Les Limites du \"Stagiaire IA\"",
          "content": [
            {
              "type": "card",
              "content": "- **Manque de jugement critique :** Ne peut évaluer la fiabilité ou la pertinence des informations\n- **Absence de véritable compréhension :** Manipule des patterns statistiques sans comprendre le sens profond\n- **Sensibilité aux instructions :** Peut être influencé par des formulations ambiguës ou contradictoires\n- **Pas d'éthique propre :** N'a pas de valeurs morales intégrées"
            }
          ]
        }
      ]
    },
    {
      "type": "card",
      "title": "Votre Rôle de Superviseur",
      "description": "Comme pour un stagiaire, vous devez :",
      "content": "- **Donner des instructions claires et précises**\n- **Vérifier systématiquement le travail avant utilisation**\n- **Corriger les erreurs et expliquer pourquoi c'est incorrect**\n- **Guider l'IA vers de meilleures réponses par des itérations successives**\n- **Protéger l'IA contre les mauvaises informations ou instructions**"
    },
    {
      "type": "alert",
      "variant": "destructive",
      "title": "La Responsabilité Finale",
      "content": "Comme un médecin reste responsable des prescriptions signées, vous restez responsable des informations générées par l'IA que vous utilisez. La validation par des sources fiables et votre expertise professionnelle sont indispensables."
    }
  ]
} satisfies GuideInput;