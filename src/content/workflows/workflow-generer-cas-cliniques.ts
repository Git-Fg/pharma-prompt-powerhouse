import type { Workflow } from '@/lib/content-schema'

export const workflow = {
  slug: 'workflow-generer-cas-cliniques',
  type: 'workflow',
  title: 'Générer des Cas Cliniques pour la Révision',
  description: 'Apprenez à utiliser l\'IA pour générer des cas cliniques riches, pertinents et adaptés à votre niveau d\'étude, transformant la préparation aux examens.',
  icon: 'ClipboardList',
  category: 'cas-pratiques',
  difficulty: 'intermédiaire',
  estimatedTime: '20 min',
  tags: ['cas-clinique', 'génération', 'révision'],
  isFavorite: false,
  conceptSlugs: [
    'structuration-par-balises',
    'chaine-de-prompts',
  ],

  content: [
    {
      type: 'introduction',
      title: 'Le Problème : Le Manque de Cas Pratiques',
      content: 'La théorie, c\'est bien. La pratique, c\'est mieux. L\'un des plus grands défis pour les étudiants en pharmacie est de trouver suffisamment de cas cliniques variés pour s\'entraîner. L\'IA résout ce problème en devenant un générateur de scénarios inépuisable.',
    },
    {
      type: 'accordion',
      items: [
        {
          title: 'Mon Approche Initiale (et ses limites)',
          content: [
            {
              type: 'section',
              title: 'Mon Approche Initiale : La Demande Générique',
              content: 'Au début, j\'ai essayé de demander directement à l\'IA :\n\n> *"Fais-moi un cas clinique sur les interactions médicamenteuses."*\n\n**Résultat :** Des cas génériques, sans rapport avec mon niveau d\'étude, souvent trop simplistes ou au contraire trop complexes.',
            },
            {
              type: 'alert',
              variant: 'destructive',
              title: 'Pourquoi ça ne marche pas',
              content: 'L\'IA n\'a aucun contexte sur votre niveau, vos objectifs pédagogiques spécifiques, ni sur les types de problèmes que vous devez maîtriser pour vos examens.',
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      title: 'Ma Stratégie Optimisée : Le Context Engineering',
      content: 'La clé est de fournir un contexte riche et structuré. Cette approche utilise le **context engineering** pour maximiser la pertinence pédagogique.',
    },
    {
      type: 'conceptRecommendation',
      slug: 'context-engineering',
      reason: 'Un contexte bien structuré est essentiel pour générer des cas cliniques réalistes et pédagogiquement pertinents.',
    },
    {
      type: 'actionChecklist',
      title: 'Les 3 Étapes Clés de la Méthode',
      description: 'Mon workflow pour générer des cas cliniques sur mesure',
      items: [
        {
          id: 'etape1-contexte',
          title: 'Étape 1 : Définir le contexte précis',
          description: 'Précisez votre niveau (L2, L3, Master...), le type d\'évaluation (QCM, cas cliniques...), le niveau de difficulté souhaité et la spécialité concernée.',
          priority: 'high',
        },
        {
          id: 'etape2-problemes',
          title: 'Étape 2 : Identifier les problèmes à intégrer',
          description: 'Listez les concepts à tester : interactions médicamenteuses, adaptations posologiques, contre-indications, surveillance thérapeutique. Plus vous êtes précis, plus le cas sera pertinent !',
          priority: 'high',
        },
        {
          id: 'etape3-structure',
          title: 'Étape 3 : Structurer la sortie',
          description: 'Demandez un format spécifique : présentation du patient, données cliniques/biologiques, prescription initiale, questions progressives avec justifications.',
          priority: 'high',
        },
      ],
      variant: 'card',
      allowChecking: true,
    },
    {
      type: 'section',
      title: 'L\'Outil Idéal pour Cette Tâche',
      content: '',
    },
    {
      type: 'toolRecommendation',
      slug: 'google-ai-studio',
      reason: 'AI Studio est parfait pour cette tâche. Son accès à Gemini 2.5 Pro et son mode \'System Prompt\' permettent de définir un rôle de \'professeur\' expert, garantissant des cas cliniques cohérents et pédagogiques.',
    },
    {
      type: 'section',
      title: 'Le Prompt "Maître" pour Générer des Cas',
      content: 'Ce prompt est un template puissant. Vous le copiez dans **Google AI Studio** (le rôle dans le `System Prompt`, le reste dans le `User Prompt`), vous remplissez les variables, et l\'IA génère un cas sur mesure.',
    },
    {
      type: 'multiFormatPrompt',
      alternativeVersions: {
        aiStudio: {
          systemPrompt: 'Tu es un professeur de pharmacie clinique chevronné, spécialisé dans la création de cas cliniques pédagogiques pour la préparation aux examens. Tu conçois des scénarios réalistes, cohérents et stimulants.',
          userPrompt: 'Génère un cas clinique complet et réaliste basé sur les spécifications suivantes. Le cas doit être structuré en quatre parties : Présentation, Données cliniques/biologiques, Prescription, et Questions.\n\n**Spécifications :**\n- **Spécialité :** {{SPECIALITE}}\n- **Niveau de l\'étudiant :** {{NIVEAU_ETUDE}}\n- **Profil patient :** {{PROFIL_PATIENT}}\n- **Problèmes à intégrer :** {{PROBLEMES}}\n\nGénère maintenant le cas au format Markdown. Les questions doivent être de difficulté progressive.',
        },
      },
      recommendedTools: {
        aiStudio: ['Google AI Studio'],
      },
      variables: ['SPECIALITE', 'NIVEAU_ETUDE', 'PROFIL_PATIENT', 'PROBLEMES'],
    },
    {
      type: 'card',
      title: 'Comment Remplir les Variables ?',
      content: '-   `{{SPECIALITE}}` : Cardiologie, Infectiologie, Gériatrie...\n-   `{{NIVEAU_ETUDE}}` : 4ème année, préparation à l\'internat...\n-   `{{PROFIL_PATIENT}}` : "Femme de 82 ans, 55kg, insuffisante rénale chronique stade 3"\n-   `{{PROBLEMES}}` : "une interaction médicamenteuse, une posologie à adapter à la fonction rénale, une contre-indication liée aux antécédents"',
    },
    {
      type: 'keyTakeaways',
      points: [
        'Utilisez un prompt \'maître\' structuré pour générer des cas cliniques réalistes avec des problèmes pharmaceutiques ciblés.',
        'L\'IA peut créer une infinité de scénarios, vous permettant de vous entraîner sur une grande diversité de cas.',
        'Enrichissez vos cas en intégrant des \'pièges\' subtils et des questions à complexité progressive pour un apprentissage actif.',
      ],
      variant: 'featured',
      contentType: 'workflow',
    },
  ],

  keyTakeaways: [
    'Utilisez un prompt \'maître\' structuré pour générer des cas cliniques réalistes avec des problèmes pharmaceutiques ciblés.',
    'L\'IA peut créer une infinité de scénarios, vous permettant de vous entraîner sur une grande diversité de cas.',
    'Enrichissez vos cas en intégrant des \'pièges\' subtils et des questions à complexité progressive pour un apprentissage actif.',
  ],
} satisfies Workflow

export default workflow
