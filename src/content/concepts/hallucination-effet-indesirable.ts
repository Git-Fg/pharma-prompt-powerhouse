import type { Concept } from '@/lib/content-schema'

export const concept = {
  slug: 'hallucination-effet-indesirable',
  title: 'Hallucination : Effet Indésirable',
  description: 'Comprendre et prévenir les hallucinations de l\'IA comme des effets indésirables prévisibles',
  icon: 'AlertTriangle',
  category: 'fondamentaux',
  difficulty: 'intermédiaire',
  tags: [
    'exemple-code',
    'guide',
    'pedagogie',
    'pharmacie',
  ],
  isFavorite: false,
  keyTakeaways: [
    'Une hallucination est une erreur factuelle plausible, un \'effet indésirable\' prévisible de l\'IA.',
    'Réduisez le risque en baissant la \'température\' (créativité) et en fournissant un contexte clair et délimité.',
    'Vérifiez systématiquement les informations critiques générées avec des sources officielles.',
  ],
  conceptSlugs: [],
  content: [
    {
      type: 'section',
      title: 'Qu\'est-ce qu\'une hallucination ?',
      content: 'Une hallucination est une erreur factuelle plausible générée par l\'IA.',
      variant: 'introduction',
    },
    {
      type: 'definedTerm',
      term: 'hallucination',
      children: 'Contrairement à une simple erreur, l\'hallucination est crédible et peut tromper même des experts. C\'est l\'équivalent d\'un effet indésirable médicamenteux : prévisible, géré, mais nécessitant une vigilance constante.',
      variant: 'inline',
      showIcon: true,
    },
    {
      type: 'section',
      title: 'Pourquoi les hallucinations surviennent-elles ?',
      content: 'Comprendre les mécanismes d\'action des hallucinations permet de mieux les prévenir et les traiter.',
      variant: 'section',
    },
    {
      type: 'alert',
      variant: 'default',
      title: 'Comprendre les mécanismes',
      content: 'Comme pour un médicament, connaître les mécanismes d\'action des hallucinations permet de mieux les prévenir et les traiter.',
    },
    {
      type: 'markdown',
      content: '### Mécanismes d\'action',
    },
    {
      type: 'card',
      title: '🌡️ Température élevée',
      content: 'L\'IA devient trop "créative" et invente des informations plausibles mais inexactes',
    },
    {
      type: 'card',
      title: '🔍 Contexte insuffisant',
      content: 'L\'IA comble les vides avec des données plausibles mais fausses, comme un diagnostique différentiel mal orienté',
    },
    {
      type: 'card',
      title: '❓ Instructions ambiguës',
      content: 'L\'IA interprète mal vos demandes et répond à côté de la question',
    },
    {
      type: 'card',
      title: '📚 Limitations du modèle',
      content: 'L\'IA n\'a pas accès à des informations récentes ou très spécialisées',
    },
    {
      type: 'markdown',
      content: '### Facteurs de risque',
    },
    {
      type: 'alert',
      variant: 'destructive',
      title: 'Attention',
      content: 'Ces facteurs augmentent significativement le risque d\'hallucination, comme des facteurs de risque d\'effet indésirable.',
    },
    {
      type: 'markdown',
      content: '- **Température > 0.7** : Risque élevé d\'hallucination\n- **Prompts vagues** : "Parle-moi des IEC" vs "Listez les IEC disponibles en France en 2025"\n- **Contexte insuffisant** : L\'IA doit deviner ce que vous voulez\n- **Tâches complexes** : Plus la tâche est complexe, plus le risque augmente\n\n## Prévention et traitement',
    },
    {
      type: 'tabs',
      defaultValue: 'prevention',
      tabs: [
        {
          value: 'prevention',
          title: 'Stratégies de Prévention',
          content: [
            {
              type: 'card',
              title: '1. Contrôle de la Température',
              content: 'Un réglage bas (ex: 0.2) favorise la factualité. Un réglage haut (ex: 0.9) favorise la créativité mais augmente le risque.\n\n**❌ Température : 0.9 (risque élevé)**\n```\n"Inventez une nouvelle molécule pour traiter l\'hypertension"\n```\n\n**✅ Température : 0.2 (risque faible)**\n```\n"Listez les molécules antihypertensives disponibles en 2025"\n```',
            },
            {
              type: 'citation',
              source: 'OpenAI',
              title: 'GPT-4 Technical Report',
              citationType: 'study',
              author: 'OpenAI Team',
              year: '2023',
              url: 'https://arxiv.org/abs/2303.08774',
              variant: 'compact',
            },
            {
              type: 'card',
              title: '2. Contexte Clair et Délimité',
              content: 'Fournir un contexte précis et des limites claires aide l\'IA à rester dans les faits.\n\n**❌ Prompt vague**\n```\n"Analyse cette ordonnance"\n```\n\n**✅ Prompt précis**\n```\n"Analyse cette ordonnance en te basant UNIQUEMENT sur les informations fournies.\nSi une information n\'est pas dans le texte, indique \'Non précisé\'."\n```',
            },
            {
              type: 'card',
              title: '3. Instructions de Validation',
              content: 'Demandez explicitement à l\'IA de vérifier ses réponses avant de les donner.\n\n```\n"Avant de répondre, vérifie que toutes les informations que tu donnes\nsont directement dérivées du contexte fourni. Si tu n\'es pas sûr,\nindique-le clairement."\n```',
            },
          ],
        },
        {
          value: 'traitement',
          title: 'Actions Correctives',
          content: [
            {
              type: 'alert',
              variant: 'destructive',
              title: 'Action immédiate requise',
              content: 'Face à une hallucination détectée, agissez rapidement pour corriger et prévenir la récidive.',
            },
            {
              type: 'markdown',
              content: '### Détection des signes d\'alerte\n\n- **Informations trop précises** sans source\n- **Citations inexistantes** d\'études\n- **Données numériques** fantaisistes\n- **Réponses trop parfaites** pour être vraies\n\n### Plan d\'action corrective\n\n1. **Réduire la température** immédiatement\n2. **Demander des sources** pour chaque affirmation\n3. **Utiliser des prompts de vérification**\n4. **Vérifier avec des sources officielles**',
            },
          ],
        },
      ],
    },
    {
      type: 'markdown',
      content: '## Applications en pharmacie\n\n### Cas 1 : Analyse d\'interaction médicamenteuse',
    },
    {
      type: 'example',
      title: 'Analyse d\'interaction médicamenteuse',
      description: 'Comparaison entre un prompt risqué et un prompt sécurisé pour l\'analyse d\'interactions',
      content: '❌ Prompt risqué\n"Dis-moi tout sur l\'interaction warfarine-amiodarone"\n\n✅ Prompt sécurisé\n"Basé sur les référentiels fournis, liste les interactions\ndocumentées entre warfarine et amiodarone. Indique le niveau\nde preuve pour chaque interaction."',
      exampleType: 'prompt',
      difficulty: 'intermédiaire',
      tags: ['sécurité', 'interaction', 'pharmacie'],
      outcome: 'Le prompt sécurisé limite le contexte aux référentiels fournis et demande explicitement le niveau de preuve, réduisant ainsi le risque d\'hallucination.',
      variant: 'card',
    },
    {
      type: 'markdown',
      content: '### Cas 2 : Calcul de dose',
    },
    {
      type: 'example',
      title: 'Calcul de dose',
      description: 'Comparaison entre un prompt risqué et un prompt sécurisé pour le calcul de doses',
      content: '❌ Prompt risqué\n"Calcule la dose de digoxine pour ce patient"\n\n✅ Prompt sécurisé\n"Utilise la formule de Cockcroft-Gault fournie pour calculer\nla clairance de créatinine, puis applique les recommandations\nde dosage de la HAS pour la digoxine."',
      exampleType: 'prompt',
      difficulty: 'intermédiaire',
      tags: ['pharmacie', 'calcul', 'sécurité'],
      outcome: 'Le prompt sécurisé spécifie la méthode de calcul à utiliser et se réfère aux recommandations officielles, garantissant des résultats précis et traçables.',
      variant: 'card',
    },
    {
      type: 'markdown',
      content: '### Cas 3 : Recherche bibliographique',
    },
    {
      type: 'example',
      title: 'Recherche bibliographique',
      description: 'Comparaison entre un prompt risqué et un prompt sécurisé pour la recherche bibliographique',
      content: '❌ Prompt risqué\n"Trouve les dernières études sur les nouveaux anticoagulants"\n\n✅ Prompt sécurisé\n"Recherche dans PubMed les études publiées entre 2020 et 2025\nsur les anticoagulants oraux directs. Limite aux essais\ncliniques randomisés."',
      exampleType: 'prompt',
      difficulty: 'intermédiaire',
      tags: ['recherche', 'bibliographie', 'pharmacie'],
      outcome: 'Le prompt sécurisé définit des critères de recherche précis (source, période, type d\'étude) pour obtenir des résultats fiables et reproductibles.',
      variant: 'card',
    },
    {
      type: 'markdown',
      content: '## Monitoring et surveillance\n\n### Signes d\'alerte\n\n- **Réponses trop détaillées** sans contexte suffisant\n- **Citations d\'études** que vous ne connaissez pas\n- **Données numériques** qui semblent trop parfaites\n- **Informations contradictoires** dans la même réponse\n\n### Tests de validation\n\n1. **Test de cohérence** : Posez la même question plusieurs fois\n2. **Test de source** : Demandez toujours les références\n3. **Test de plausibilité** : Vérifiez si la réponse semble réaliste\n4. **Test de vérification** : Confrontez avec des sources fiables\n\n## Bénéfices de cette approche\n\n1. **Sécurité accrue** : Moins de risques d\'erreurs factuelles\n2. **Fiabilité** : Réponses plus prévisibles et vérifiables\n3. **Confiance** : Vous savez quand faire confiance à l\'IA\n4. **Apprentissage** : Vous améliorez vos techniques de prompting\n\n## Règles d\'or\n\n1. **Jamais 100% de confiance** : L\'IA peut toujours halluciner\n2. **Toujours vérifier** : Les informations critiques doivent être validées\n3. **Contexte d\'abord** : Plus le contexte est clair, moins le risque est élevé\n4. **Température adaptée** : Utilisez la température la plus basse possible\n5. **Instructions précises** : Évitez l\'ambiguïté dans vos prompts\n\nEn traitant les hallucinations comme des effets indésirables prévisibles, vous transformez l\'IA en un outil plus sûr et plus fiable, exactement comme un bon pharmacien gère les effets indésirables de ses prescriptions.',
    },
    {
      type: 'toolRecommendation',
      slug: 'perplexity-ai',
      reason: 'Perplexity AI intègre nativement la vérification de sources grâce à sa fonction RAG, réduisant drastiquement le risque d\'hallucination pour la recherche d\'informations.',
    },
    {
      type: 'guideRecommendation',
      slug: 'obtenir-donnees-fiables',
      reason: 'Apprenez les techniques avancées pour utiliser l\'IA comme assistant de recherche tout en évitant le piège des hallucinations.',
    },
    {
      type: 'guideRecommendation',
      slug: 'techniques-avancees-fiabilisation',
      reason: 'Découvrez les techniques professionnelles pour détecter, prévenir et corriger les hallucinations dans vos interactions avec l\'IA.',
    },
  ],
} satisfies Concept

export default concept
