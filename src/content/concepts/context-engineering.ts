// src/content/concepts/context-engineering.ts
import type { Concept } from '@/lib/content-schema'

export const concept = {
  slug: 'context-engineering',
  title: 'Context Engineering',
  description: 'Optimisez la fenêtre de contexte de l\'IA pour maximiser la pertinence et la précision des réponses en pharmacie.',
  icon: 'Target',
  category: 'fondamentaux',
  difficulty: 'intermédiaire',
  tags: [
    'context-engineering',
    'guide',
    'pedagogie',
    'pharmacie',
  ],
  isFavorite: false,
  keyTakeaways: [
    'Le Context Engineering optimise la fenêtre de contexte de l\'IA pour des réponses plus précises et pertinentes.',
    'Hiérarchisez les informations : placez les plus importantes au début et à la fin pour éviter l\'effet \'lost-in-the-middle\'.',
    'Structurez et concisiez vos données pour maximiser l\'efficacité de la mémoire de travail de l\'IA.',
  ],
  conceptSlugs: [],
  content: [
    {
      type: 'alert',
      variant: 'default',
      title: '🎯 Définition',
      content: 'Le **Context Engineering** est l\'art d\'optimiser la fenêtre de contexte de l\'IA pour obtenir des réponses plus précises et pertinentes.',
    },
    {
      type: 'markdown',
      content: '## Pourquoi c\'est Crucial ?',
    },
    {
      type: 'card',
      title: 'Impact Direct sur la Qualité',
      description: 'La qualité du contexte détermine la qualité de la réponse',
      content: 'En pharmacie, structurer l\'information de manière optimale permet à l\'IA de comprendre parfaitement le contexte clinique et de fournir des réponses adaptées.',
    },
    {
      type: 'card',
      title: 'Bénéfices Concrets',
      content: '- **Précision diagnostique** : L\'IA comprend mieux les symptômes et l\'historique\n- **Recommandations adaptées** : Les conseils sont plus personnalisés\n- **Sécurité accrue** : Moins de risques d\'erreurs d\'interprétation\n- **Efficacité** : Réponses plus directes et utiles',
    },
    {
      type: 'markdown',
      content: '## Principes Clés',
    },
    {
      type: 'tabs',
      defaultValue: 'hierarchy',
      tabs: [
        {
          value: 'hierarchy',
          title: 'Hiérarchisation',
          content: [
            {
              type: 'alert',
              variant: 'default',
              title: '⚠️ Effet \'Lost-in-the-Middle\'',
              content: 'L\'information au milieu d\'un long contexte est moins bien retenue. Placez les informations **les plus importantes** au début et à la fin.',
            },
            {
              type: 'codeBlock',
              language: 'text',
              filename: 'exemple-hierarchisation.txt',
              content: '❌ MAUVAIS ORDRE :\n"Le patient a 34 ans, pèse 70kg, mesure 1m75, a des allergies aux pénicillines (CRITIQUE), prend du paracétamol occasionnellement..."\n\n✅ BON ORDRE :\n"🚨 ALLERGIE CRITIQUE : Pénicillines\nPatient 34 ans, symptômes actuels : [...]\nContexte médical pertinent : [...]\nDétails complémentaires : poids 70kg, taille 1m75"',
            },
          ],
        },
        {
          value: 'structure',
          title: 'Structuration',
          content: [
            {
              type: 'card',
              title: 'Organisation Logique',
              content: 'Organisez l\'information selon une logique claire :\n1. **Contexte critique** (allergies, contre-indications)\n2. **Problème actuel** (symptômes, diagnostic)\n3. **Historique pertinent** (antécédents médicaux)\n4. **Traitements** (actuels et passés)\n5. **Objectif de la consultation** (question précise)',
            },
          ],
        },
        {
          value: 'concision',
          title: 'Concision',
          content: [
            {
              type: 'alert',
              variant: 'default',
              title: '⚖️ Équilibre Délicat',
              content: 'Fournissez **assez d\'information** pour une réponse précise, mais **pas trop** pour éviter la surcharge cognitive de l\'IA.',
            },
            {
              type: 'card',
              title: 'Techniques de Concision',
              content: '- Utilisez des **abréviations standardisées** (DCI, QD, BID)\n- **Groupez** les informations similaires\n- **Éliminez** les détails non pertinents\n- **Synthétisez** plutôt que de lister exhaustivement',
            },
          ],
        },
      ],
    },
    {
      type: 'markdown',
      content: '## Applications Pratiques en Pharmacie',
    },
    {
      type: 'tabs',
      defaultValue: 'clinical-cases',
      tabs: [
        {
          value: 'clinical-cases',
          title: 'Cas Cliniques',
          content: [
            {
              type: 'card',
              title: 'Structure Optimale pour Dossier Patient',
              content: '```\n🚨 ALLERGIES/CONTRE-INDICATIONS : [Liste critique]\n\n📋 PROBLÈME ACTUEL :\n- Symptômes : [Description précise]\n- Durée : [Timeline]\n- Sévérité : [Échelle]\n\n🏥 CONTEXTE MÉDICAL :\n- Antécédents : [Pertinents seulement]\n- Traitements actuels : [Avec dosages]\n\n❓ QUESTION PRÉCISE : [Objectif clinique]\n```',
            },
            {
              type: 'codeBlock',
              language: 'text',
              filename: 'exemple-contexte-optimise.txt',
              content: '🚨 ALLERGIES : Pénicillines (éruption cutanée), AINS (asthme)\n\n📋 PROBLÈME ACTUEL :\nDouleurs articulaires (genoux, poignets) depuis 3 semaines\nIntensité : 7/10, pire le matin, amélioration avec mouvement\n\n🏥 CONTEXTE :\n- Femme 45 ans, ménopause récente\n- Antécédents : Hypertension (2018)\n- Traitements : Amlodipine 5mg QD\n- Poids : 62kg\n\n❓ QUESTION : Antalgie adaptée compte tenu des allergies AINS ?',
            },
          ],
        },
        {
          value: 'research',
          title: 'Recherche Bibliographique',
          content: [
            {
              type: 'card',
              title: 'Structure PICO pour Requêtes',
              content: '1. **Population** : Cible (âge, pathologies)\n2. **Intervention** : Traitement/diagnostic étudié\n3. **Comparaison** : Alternative ou placebo\n4. **Outcome** : Critère de jugement souhaité\n5. **Contraintes** : Période, type d\'étude',
            },
            {
              type: 'codeBlock',
              language: 'text',
              filename: 'recherche-structuree.txt',
              content: 'POPULATION : Patients diabétiques type 2, âgés >65 ans\nINTERVENTION : Metformine en monothérapie\nCOMPARAISON : Sulfamides hypoglycémiants\nOUTCOME : Contrôle glycémique (HbA1c) + effets indésirables\nCONTRAINTES : Études 2020-2025, essais contrôlés randomisés\n\nQUESTION : Efficacité et tolérance comparées ?',
            },
          ],
        },
      ],
    },
    {
      type: 'alert',
      variant: 'default',
      title: '🧠 Principe Fondamental',
      content: 'L\'IA fonctionne comme la mémoire humaine : l\'information **bien structurée** et **contextualisée** est mieux retenue et mieux utilisée.',
    },
    {
      type: 'toolRecommendation',
      slug: 'notebooklm',
      reason: 'NotebookLM excelle dans la gestion de contexte long grâce à sa capacité à ingérer des documents entiers et à maintenir une cohérence dans les réponses sur tout le corpus.',
    },
    {
      type: 'guideRecommendation',
      slug: 'gestion-memoire-ia',
      reason: 'Approfondissez vos connaissances sur la gestion optimale de la mémoire et du contexte des IA pour des interactions plus efficaces.',
    },
    {
      type: 'guideRecommendation',
      slug: 'structurer-ses-prompts-avec-des-balises-methode-xml',
      reason: 'La méthode XML est une technique avancée de context engineering qui permet de structurer parfaitement l\'information fournie à l\'IA.',
    },
  ],
} satisfies Concept

export default concept
