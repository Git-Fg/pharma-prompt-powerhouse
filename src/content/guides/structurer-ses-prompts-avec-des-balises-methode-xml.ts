import type { Guide } from '@/lib/content-schema'

export const guide = {
  slug: 'structurer-ses-prompts-avec-des-balises-methode-xml',
  title: 'Structurer ses Prompts avec des Balises (Méthode XML)',
  description: 'Apprenez à utiliser des balises simples pour organiser vos prompts complexes et obtenir des réponses plus fiables de l\'IA, sans écrire de code.',
  icon: 'CodeXml',
  category: 'techniques-avancees',
  difficulty: 'intermédiaire',
  estimatedTime: '20 minutes',
  tags: [
    'claude',
    'clinique',
    'exemple-code',
    'guide',
    'pedagogie',
    'pharmacie',
    'prompting',
    'xml-prompting',
  ],
  isFavorite: true,
  keyTakeaways: [
    'Utiliser des balises comme `<patient>` ou `<question>` aide à organiser vos idées et à clarifier votre demande pour l\'IA.',
    'Cette technique ne vise pas à obtenir une sortie en XML, mais à rendre votre prompt d\'entrée plus lisible et moins ambigu.',
    'C\'est particulièrement efficace pour les cas cliniques complexes ou les demandes multi-parties, notamment avec les modèles Claude.',
  ],
  conceptSlugs: [
    'structuration-par-balises',
  ],
  isWorkflow: false,
  content: [
    {
      type: 'markdown',
      content: '## Pourquoi Structurer avec des Balises ?\n\nQuand nos demandes à l\'IA deviennent complexes, comme pour une analyse de cas clinique, le texte brut peut devenir confus. Une technique simple et très efficace consiste à utiliser des balises, similaires au XML ou HTML, pour **structurer notre propre pensée** et, par conséquent, guider l\'IA.',
    },
    {
      type: 'alert',
      variant: 'default',
      title: 'Important',
      content: 'Le but ici n\'est PAS de demander à l\'IA de répondre en XML. C\'est une technique pour l\'utilisateur, pour rendre le **prompt d\'entrée** plus clair.',
    },
    {
      type: 'markdown',
      content: 'Les modèles d\'IA excellent à reconnaître des patterns. En encadrant des sections de votre prompt avec des balises claires, vous aidez le modèle à :\n\n- **Distinguer le contexte des instructions.**\n- **Comprendre la hiérarchie de l\'information.**\n- **Réduire les ambiguïtés.**',
    },
    {
      type: 'toolRecommendation',
      slug: 'anthropic-console',
      reason: 'L\'Anthropic Console offre une interface avancée avec des paramètres détaillés, parfaite pour tester et raffiner des prompts XML complexes avec Claude.',
    },
    {
      type: 'markdown',
      content: '## Exemple Concret : Analyse d\'un Cas Clinique\n\nVoici la même information présentée de deux façons différentes :',
    },
    {
      type: 'tabs',
      defaultValue: 'avant',
      tabs: [
        {
          value: 'avant',
          title: '❌ Approche Non-Structurée',
          content: [
            {
              type: 'card',
              title: 'Prompt Confus',
              description: 'Un prompt qui mélange informations et questions.',
              content: '"J\'ai un patient de 78 ans avec HTA et FA, qui prend de l\'Amiodarone 200mg, de l\'Apixaban 2.5mg x2 et du Furosémide 40mg. Il se plaint d\'une grande fatigue depuis 2 jours et son cœur bat à 45 bpm. Analyse la situation et dis-moi quoi faire."\n\n**Problèmes :** Informations mélangées, pas de hiérarchie claire, ambiguïtés possibles.',
            },
          ],
        },
        {
          value: 'apres',
          title: '✅ Approche avec Balises',
          content: [
            {
              type: 'card',
              title: 'Prompt Structuré',
              description: 'Même information, mais organisée pour une clarté maximale.',
              content: 'Voici le même cas structuré avec des balises XML :',
            },
            {
              type: 'codeBlock',
              language: 'xml',
              filename: 'cas-clinique-structure.xml',
              content: '<cas_clinique>\n  <patient>\n    <age>78 ans</age>\n    <antecedents>HTA, Fibrillation Atriale, Insuffisance Rénale (ClCr 40ml/min)</antecedents>\n  </patient>\n  <traitement>\n    <medicament nom="Amiodarone" dose="200mg/j" />\n    <medicament nom="Apixaban" dose="2.5mg x2/j" />\n    <medicament nom="Furosémide" dose="40mg/j" />\n  </traitement>\n  <presentation_clinique>\n    <symptome>Asthénie intense depuis 48h</symptome>\n    <signe_vital>Fréquence cardiaque à 45 bpm</signe_vital>\n  </presentation_clinique>\n</cas_clinique>\n\n<question>\nAnalyse ce cas. Quelle est la cause la plus probable de la bradycardie ? Propose un plan d\'action en 3 étapes.\n</question>',
            },
          ],
        },
      ],
    },
    {
      type: 'markdown',
      content: 'Le second prompt est plus long en tokens, mais il est infiniment plus clair. Vous obtiendrez une réponse plus précise et structurée du premier coup, ce qui **économise vos quotas et votre temps**.',
    },
    {
      type: 'card',
      title: '🎯 Cas d\'Usage Optimaux',
      content: 'Cette technique est particulièrement efficace pour :\n\n- **Cas cliniques :** `<patient>`, `<traitement>`, `<biologie>`, `<question>`\n- **Analyse de documents :** `<source_document>`, `<instructions>`, `<format_attendu>`\n- **Comparaisons :** `<element_A>`, `<element_B>`, `<criteres_comparaison>`',
    },
    {
      type: 'toolRecommendation',
      slug: 'claude-ai',
      reason: 'Claude comprend exceptionnellement bien la structuration XML et peut traiter des prompts très complexes avec de multiples balises imbriquées. Idéal pour les cas cliniques détaillés.',
    },
    {
      type: 'guideRecommendation',
      slug: 'les-5-piliers-dun-prompt-pharmaceutique-efficace',
      reason: 'Avant d\'utiliser la méthode XML, maîtrisez d\'abord les 5 piliers fondamentaux pour construire des prompts efficaces.',
    },
    {
      type: 'conceptRecommendation',
      slug: 'context-engineering',
      reason: 'La structuration par balises est une technique avancée de context engineering qui permet de mieux organiser l\'information fournie à l\'IA.',
    },
  ],
} satisfies Guide
