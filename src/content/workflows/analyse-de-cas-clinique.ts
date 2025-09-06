import type { Workflow } from '@/lib/content-schema'

export const workflow = {
  slug: 'analyse-de-cas-clinique',
  title: 'Le Tuteur Socratique : Analyser un Cas Clinique',
  description: 'Un workflow pour transformer l\'IA en un tuteur qui vous guide dans votre raisonnement plutôt que de vous donner la solution.',
  category: 'analyse-de-cas',
  difficulty: 'intermédiaire',
  tags: ['cas-clinique', 'socratique', 'raisonnement', 'biais'],
  isFavorite: true,
  cover: '/images/objectifs/cas-clinique-apres.png',
  keyTakeaways: [
    'Le tuteur socratique transforme l\'IA de solutionneur en guide, forçant l\'étudiant à développer son propre raisonnement clinique.',
    'Cette méthode prévient le biais d\'automatisation et le désapprentissage cognitif en maintenant l\'étudiant actif dans son apprentissage.',
    'L\'interaction se base sur des questions ciblées plutôt que des réponses directes, renforçant l\'esprit critique et la confiance.',
  ],

  content: [
    {
      type: 'keyTakeaways',
      points: [
        'Le tuteur socratique transforme l\'IA de solutionneur en guide, forçant l\'étudiant à développer son propre raisonnement clinique.',
        'Cette méthode prévient le biais d\'automatisation et le désapprentissage cognitif en maintenant l\'étudiant actif dans son apprentissage.',
        'L\'interaction se base sur des questions ciblées plutôt que des réponses directes, renforçant l\'esprit critique et la confiance.',
      ],
      variant: 'featured',
      contentType: 'workflow',
    },
    {
      type: 'introduction',
      title: 'Le Problème : Le Faux Sentiment de Compétence',
      content: 'Face à un cas clinique, notre premier réflexe est souvent de demander la solution à une IA. C\'est rapide, c\'est facile, et c\'est pédagogiquement inutile. On obtient une réponse parfaite que l\'on croit avoir comprise, mais on n\'a exercé aucune des compétences de raisonnement clinique qui nous seront demandées en examen ou en stage. C\'est le meilleur moyen de tomber dans le piège du **biais d\'automatisation** et du **désapprentissage cognitif**.',
    },
    {
      type: 'section',
      title: 'La Stratégie Optimisée : Forcer le Dialogue Socratique',
      content: 'La solution est de changer radicalement de posture : ne plus demander à l\'IA de résoudre le cas, mais de nous aider **nous** à le résoudre. On va lui assigner le rôle d\'un tuteur socratique. Son seul but est de nous poser les bonnes questions pour nous faire avancer.\n\nℹ️ **La Philosophie du Tuteur Cognitif**\nL\'IA devient un partenaire qui nous challenge. Le but n\'est plus d\'avoir la bonne réponse, mais de construire le bon raisonnement. Chaque question de l\'IA est une opportunité d\'articuler notre pensée, d\'identifier nos lacunes et de solidifier nos connaissances.',
    },
    {
      type: 'section',
      title: 'Le Prompt Final (à adapter)',
      content: 'Voici le template de prompt à utiliser pour transformer l\'IA en tuteur socratique',
      variant: 'key-points',
    },
    {
      type: 'codeBlock',
      language: 'markdown',
      filename: 'tuteur-socratique-prompt.md',
      content: `# CONTEXTE
Je suis un étudiant en pharmacie qui s'entraîne à l'analyse de cas cliniques.
Je vais te soumettre un cas et je veux que tu m'aides à le résoudre en adoptant une approche socratique.

# RÔLE
Tu es un tuteur socratique expérimenté. Ton unique objectif est de me guider dans mon raisonnement en me posant des questions, sans jamais me donner de réponses directes.

# INSTRUCTIONS

1.  **Ne jamais donner la réponse :** Ne réponds jamais directement à mes questions. Reformule-les en d'autres questions qui m'aident à trouver la réponse par moi-même.
2.  **Une question à la fois :** Pose une seule question claire et ciblée à chaque interaction.
3.  **Partir de la base :** Commence par les questions les plus fondamentales (analyse du patient, des symptômes, des antécédents) avant de progresser vers le diagnostic différentiel et la prise en charge.
4.  **Me challenger :** Si je propose une hypothèse, demande-moi de la justifier. "Quels éléments du cas te font penser à ça ?", "Y a-t-il des informations qui contredisent cette hypothèse ?".
5.  **Garder le cap :** Assure-toi que mon raisonnement reste structuré et logique.
6.  **Dévoiler la solution (uniquement à la fin) :** Une fois que j'estime avoir terminé mon analyse, et seulement à ce moment-là, je te demanderai explicitement "CONFIRMATION SOLUTION". Tu pourras alors me donner la réponse complète et détaillée, en la comparant à mon propre raisonnement pour que je puisse identifier mes erreurs.

Voici le cas clinique :

<cas_clinique>
{{cas_clinique}}
</cas_clinique>

Commençons. Quelle est la toute première question que je devrais me poser ?`,
    },
    {
      type: 'actionChecklist',
      title: 'Principes Clés du Tuteur Socratique',
      description: 'Les règles fondamentales pour une interaction efficace',
      items: [
        {
          id: 'sans-reponse-directe',
          title: 'Jamais de réponse directe',
          description: 'L\'IA reformule toujours les questions en d\'autres questions pour guider l\'étudiant',
          priority: 'high',
        },
        {
          id: 'question-unique',
          title: 'Une question à la fois',
          description: 'Pose une seule question claire et ciblée à chaque interaction pour éviter la surcharge',
          priority: 'high',
        },
        {
          id: 'progression-logique',
          title: 'Progression du simple au complexe',
          description: 'Commence par les questions fondamentales avant d\'aborder le diagnostic différentiel',
          priority: 'medium',
        },
        {
          id: 'challenge-constant',
          title: 'Challenge permanent',
          description: 'Demande toujours de justifier les hypothèses et de vérifier les contradictions',
          priority: 'high',
        },
        {
          id: 'solution-finale',
          title: 'Dévoilement final uniquement',
          description: 'La solution complète n\'est donnée qu\'à la demande explicite \'CONFIRMATION SOLUTION\'',
          priority: 'high',
        },
      ],
      variant: 'card',
      allowChecking: true,
    },
    {
      type: 'section',
      title: 'Comparaison des Outils pour ce Workflow',
      content: [
        {
          type: 'markdown',
          content: 'J\'ai testé ce prompt sur plusieurs modèles. Voici mes conclusions pour cette tâche précise.',
        },
        {
          type: 'points',
          points: [
            {
              title: 'Claude (Opus ou Sonnet)',
              description: '**Mon choix N°1.** Claude est exceptionnel pour suivre des instructions de persona complexes et maintenir un rôle sur la durée. Il respecte parfaitement la consigne de ne pas donner la réponse et pose des questions très pertinentes. Son style est naturellement plus pédagogique.',
            },
            {
              title: 'Gemini (Advanced ou AI Studio)',
              description: '**Très bon challenger.** Gemini est également très performant. Il a parfois tendance à vouloir donner des "indices" un peu trop évidents, mais une simple instruction pour être plus strict suffit à le recadrer. Sa capacité à raisonner sur des données complexes est un atout.',
            },
            {
              title: 'ChatGPT-4o',
              description: '**Fait le travail, mais moins \"naturel\".** ChatGPT a tendance à avoir un ton un peu plus professoral et moins collaboratif. Il suit les instructions, mais l\'interaction semble moins fluide, plus mécanique. Il reste une option tout à fait viable.',
            },
          ],
        },
      ],
    },
    {
      type: 'conclusion',
      title: 'Ce qu\'il faut retenir : L\'Apprentissage Actif',
      content: 'Ce workflow est plus exigeant qu\'un simple copier-coller. Il demande de la concentration et de l\'honnêteté intellectuelle. Mais c\'est l\'un des plus efficaces pour passer de la connaissance passive (lire des fiches) à la compétence active (résoudre un problème). En vous forçant à articuler chaque étape de votre pensée, vous construisez un ancrage mémoriel et un esprit critique bien plus solides.',
    },
  ],
} satisfies Workflow

export default workflow
