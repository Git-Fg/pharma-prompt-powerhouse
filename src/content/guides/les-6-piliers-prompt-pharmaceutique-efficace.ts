import type { Guide } from '@/lib/content-schema'

export const guide = {
  slug: 'les-6-piliers-prompt-pharmaceutique-efficace',
  type: 'guide',
  title: 'Les 6 Piliers d\'un Prompt Pharmaceutique Efficace',
  description: 'Apprenez la méthode complète en 6 piliers pour construire un prompt fiable : Rôle, Tâche, Contexte, Format, Ton/Style, et Fiabilisation.',
  icon: 'Pill',
  category: 'fondamentaux',
  difficulty: 'débutant',
  estimatedTime: '30 minutes',
  tags: [
    'clinique',
    'guide',
    'pedagogie',
    'pharmacie',
    'prompting',
    'fiabilisation',
    'méthodologie',
  ],
  isFavorite: true,
  isWorkflow: false,
  keyTakeaways: [
    'Structurez chaque prompt en 6 piliers : Rôle, Tâche/Intention, Contexte/Contraintes, Format, Ton/Style, et Métacognition/Fiabilisation.',
    'Expliciter le Ton/Style et l\'Intention est crucial pour aligner l\'IA avec l\'objectif final.',
    'Le 6ème pilier, la Métacognition, transforme l\'IA d\'un simple exécutant à un partenaire qui raisonne et valide son propre travail.',
    'Intégrer des contraintes claires et des exemples précis (few-shot prompting) est une des meilleures techniques de fiabilisation.',
  ],
  conceptSlugs: [
    'context-engineering',
    'structuration-par-balises',
    'tree-of-thought',
    'framework-costar',
  ],
  content: [
    {
      type: 'markdown',
      content: `## Introduction : De la Prescription à la Conversation Thérapeutique
  
  Ce guide est votre point de départ. Il vous apprend à construire un prompt fiable, étape par étape, en appliquant une méthode robuste inspirée de notre pratique en pharmacie.
  
  L'objectif n'est pas de simplement "poser une question" à l'IA, mais de lui donner une **instruction de travail complète et sans ambiguïté**. Voyez ce prompt non pas comme une ordonnance finale et immuable, mais comme le **point de départ d'une conversation thérapeutique** avec votre IA, que vous affinerez par un dialogue itératif.`,
    },
    {
      type: 'toolRecommendation',
      slug: 'google-ai-studio',
      reason: 'AI Studio est parfait pour expérimenter cette méthode. Son interface permet de modifier et d\'itérer rapidement sur chaque pilier du prompt pour voir comment l\'IA réagit, notamment avec les instructions de raisonnement étape par étape.',
    },
    {
      type: 'markdown',
      content: '## Le Workflow en 6 Piliers',
    },
    {
      type: 'card',
      title: '1. Rôle (La "Molécule")',
      description: 'Qui est l\'IA ? Spécifiez son expertise.',
      content: 'Exemple : "Tu es un pharmacien clinicien spécialisé en gériatrie..."',
    },
    {
      type: 'card',
      title: '2. Tâche & Intention (La "Posologie" et le "Pourquoi")',
      description: 'Que doit faire l\'IA et dans quel but ?',
      content: `Combinez l'action précise (Tâche) avec l'objectif final (Intention).
  
  **Exemple :** "Crée une fiche de révision synthétique (Tâche) **afin de préparer mon examen de 4ème année** (Intention)."`,
    },
    {
      type: 'card',
      title: '3. Contexte & Contraintes (Les "Antécédents" et "Garde-fous")',
      description: 'Quelles sont les informations de base ET les limites à respecter ?',
      content: `Fournissez toutes les données nécessaires et spécifiez ce que l'IA **ne doit pas faire**.
  
  **Exemple :** "Contexte : Patient de 75 ans, ClCr 40 mL/min. Contraintes : N'utilise que des molécules avec une AMM en France. Exclus la classe des AINS en raison de l'insuffisance rénale."`,
    },
    {
      type: 'card',
      title: '4. Format (La "Voie d\'Administration")',
      description: 'Comment la réponse doit-elle être structurée ?',
      content: 'Exemple : "Présente les résultats dans un tableau Markdown à 3 colonnes..."',
    },
    {
      type: 'card',
      title: '5. Ton & Style (Le "Conseil Patient vs. Confrère")',
      description: 'Quel est le ton et le style de communication attendus ?',
      content: `La manière de communiquer est cruciale en santé.
  
  **Exemple :** "Adopte un **ton rassurant et un style simple**, sans jargon médical, comme si tu t'adressais à un patient anxieux." ou "Utilise un **ton formel et un style académique** pour un rapport destiné à un confrère."`,
    },
    {
      type: 'card',
      title: '6. Métacognition & Fiabilisation (Le "Suivi Thérapeutique")',
      description: 'Comment l\'IA doit-elle raisonner et valider son travail ?',
      content: `C'est le pilier avancé de 2025. On ne demande plus seulement un résultat, mais la preuve de sa rigueur.
  
  **Instructions à intégrer :**
  - **"Raisonnement étape par étape :"** (Chain-of-Thought)
  - **"Justifie chaque conclusion :"** Exigez la transparence.
  - **"Fournis un exemple du format attendu :"** (Intégration du pilier "Exemples" / *few-shot prompting*)
  - **"Auto-critique ta réponse :"** Demandez à l'IA de vérifier son propre travail.`,
    },
    {
      type: 'alert',
      variant: 'destructive',
      title: 'Pièges à Éviter : 3 Erreurs Courantes (Même avec un Bon Framework)',
      content: `**Erreur :** Fournir un contexte qui vous semble complet mais qui est truffé de non-dits (votre cours, les protocoles de votre CHU...).
      
      **Vigilance :** Soyez exhaustif. **Principe : si ce n'est pas écrit dans le prompt, ça n'existe pas pour l'IA.**`,
    },
    {
      type: 'accordion',
      items: [
        {
          title: '1. Le Piège du Contexte Implicite',
          content: [
            {
              type: 'markdown',
              content: `**Erreur :** Fournir un contexte qui vous semble complet mais qui est truffé de non-dits (votre cours, les protocoles de votre CHU...).
      
      **Vigilance :** Soyez exhaustif. **Principe : si ce n'est pas écrit dans le prompt, ça n'existe pas pour l'IA.**`,
            },
          ],
        },
        {
          title: '2. Le Piège de la Tâche Monolithique',
          content: [
            {
              type: 'markdown',
              content: `**Erreur :** Demander une solution complexe en une seule étape ("Propose un plan de traitement complet").
      
      **Vigilance :** Pour une tâche complexe, décomposez-la en une **chaîne de prompts**. Demandez d'abord une analyse, puis une liste d'options, puis une évaluation de ces options.`,
            },
          ],
        },
        {
          title: '3. Le Piège de l\'Absence de Contraintes (Garde-fous)',
          content: [
            {
              type: 'markdown',
              content: `**Erreur :** Ne pas spécifier ce que l'IA ne doit PAS faire.
      
      **Vigilance :** Ajoutez des contraintes négatives. Exemples : "Ne propose que des molécules avec une AMM en France", "Exclus toute la classe des [X]", "Ta réponse ne doit pas dépasser 150 mots".`,
            },
          ],
        },
      ],
    },
    {
      type: 'markdown',
      content: '## Application Pratique : Construire un Prompt d\'Analyse Amélioré',
    },
    {
      type: 'codeBlock',
      language: 'xml',
      filename: 'prompt-analyse-interaction-6-piliers.xml',
      content: `<prompt>
  <role>
  Tu es un pharmacien d'officine expert en pharmacovigilance, rigoureux et pédagogique.
  </role>
  
  <intention>
  Mon objectif est de recevoir une analyse d'interaction médicamenteuse qui soit à la fois scientifiquement juste et compréhensible pour un patient, afin de pouvoir lui délivrer un conseil clair et sécurisé au comptoir.
  </intention>
  
  <tache>
  Analyse l'interaction potentielle entre le Fluconazole et l'Atorvastatine. Rédige ensuite une réponse structurée qui inclut une auto-évaluation de ta conclusion.
  </tache>
  
  <contexte>
  - Médicaments : Fluconazole 150 mg (prise ponctuelle) et Atorvastatine 20 mg (traitement chronique).
  - Patient : Homme, 65 ans, sans autre co-médication notable.
  - Source réglementaire : Base de données de l'ANSM.
  </contexte>
  
  <contraintes>
  - N'utilise que des informations vérifiables issues de la source réglementaire fournie.
  - Le conseil patient ne doit pas dépasser 40 mots.
  - Le langage doit être simple, direct et non anxiogène.
  - Exclus toute mention d'alternative thérapeutique, concentre-toi uniquement sur la gestion du risque.
  </contraintes>
  
  <ton_style>
  - Pour l'analyse : Ton formel, précis et scientifique.
  - Pour le conseil patient : Ton rassurant, simple et empathique.
  </ton_style>
  
  <format_attendu>
  <analyse>
  **1. Niveau de Risque :** [Faible, Modéré, Élevé, etc.]
  **2. Mécanisme d'Interaction :** [Description technique]
  **3. Recommandations (ANSM) :** [Synthèse des précautions d'emploi]
  </analyse>
  <conseil_patient>
  [Texte du conseil à formuler]
  </conseil_patient>
  <auto_critique>
  [Évalue la fiabilité de ta réponse et les limites de ton analyse en 1-2 phrases]
  </auto_critique>
  </format_attendu>
  
  <raisonnement>
  Je vais d'abord identifier le mécanisme d'interaction (inhibition enzymatique), puis consulter les recommandations de l'ANSM pour cette interaction spécifique. Je synthétiserai ces informations de manière technique. Ensuite, je traduirai ces données en un conseil patient simple. Finalement, j'ajouterai une note sur la certitude de ma réponse.
  </raisonnement>
  </prompt>`,
    },
    {
      type: 'markdown',
      content: `## Conclusion
  
  En adoptant ces 6 piliers, vous ne vous contentez plus de poser des questions : vous **pilotez l'IA**. Vous la guidez, vous cadrez son raisonnement, et vous lui demandez des comptes. C'est ainsi que l'on transforme un outil puissant en un véritable partenaire intellectuel fiable pour nos études et notre pratique future.`,
    },
    {
      type: 'guideRecommendation',
      slug: 'structurer-ses-prompts-avec-des-balises-methode-xml',
      reason: 'Maintenant que vous maîtrisez les 6 piliers, apprenez à les structurer de manière encore plus robuste avec le format XML. C\'est la méthode idéale pour les prompts très complexes et les workflows en plusieurs étapes.',
    },
  ],
} satisfies Guide

export default guide
