import type { Workflow } from '@/lib/content-schema'

export const workflow = {
  slug: 'resoudre-cas-clinique',
  title: 'Résoudre un Cas Clinique Complexe',
  description: 'Apprenez ma méthode pour analyser méthodiquement un cas clinique et proposer une prise en charge thérapeutique argumentée.',
  icon: 'Stethoscope',
  tags: ['cas clinique', 'analyse', 'thérapeutique'],
  isFavorite: true,
  category: 'cas-pratiques',
  difficulty: 'avancé',
  estimatedTime: '25 min',
  conceptSlugs: ['chaîne-de-prompts', 'structuration-par-balises'],

  problem: [
    {
      type: 'markdown',
      content: `Face à un cas clinique, j\'avais tendance à me disperser. Je voyais plein de détails sans pouvoir les hiérarchiser ni construire un raisonnement structuré.

**Mes erreurs typiques :**
- Sauter aux conclusions sans analyse systématique
- Négliger les interactions médicamenteuses
- Oublier de considérer le profil complet du patient
- Proposer des solutions sans les justifier

Résultat : des réponses partielles et peu convaincantes aux examens.`,
    },
  ],

  initialApproach: [
    {
      type: 'markdown',
      content: `Je posais directement le cas à l\'IA en demandant :

> *"Analyse ce cas clinique et donne-moi la réponse."*

**Problème :** L\'IA me donnait une analyse complète d\'un coup, sans m\'aider à développer mon propre raisonnement clinique.`,
    },
    {
      type: 'alert',
      variant: 'destructive',
      title: 'Le piège de la solution immédiate',
      content: `Obtenir directement la réponse ne m\'apprenait pas à raisonner. J'étais dépendant de l\'IA sans développer mon expertise clinique personnelle.`,
    },
  ],

  optimizedStrategy: [
    {
      type: 'markdown',
      content: `J\'ai développé une approche progressive qui m\'accompagne dans l\'apprentissage du raisonnement clinique plutôt que de me donner directement la réponse.
Cette méthode utilise une **chaîne de prompts** pour décomposer le problème.`,
    },
    {
      type: 'conceptRecommendation',
      slug: 'chaîne-de-prompts',
      reason: 'Cette technique est la base de notre workflow pour analyser un cas clinique de manière structurée.',
    },
    {
      type: 'card',
      title: '🔍 Étape 1 : Collecte et Organisation des Données',
      content: `**Demander à l\'IA de structurer les informations :**
- Données démographiques et antécédents
- Symptômes et signes cliniques
- Résultats d\'examens complémentaires
- Traitements en cours

Cela m\'aide à ne rien oublier dans l\'analyse.`,
    },
    {
      type: 'conceptRecommendation',
      slug: 'structuration-par-balises',
      reason: 'Utiliser des balises XML améliore la précision de l\'organisation des données cliniques.',
    },
    {
      type: 'card',
      title: '🧠 Étape 2 : Génération d\'Hypothèses Diagnostiques',
      content: `**Construire ensemble la liste des diagnostics possibles :**
- Hypothèses principales et alternatives
- Arguments pour et contre chaque hypothèse
- Hiérarchisation par probabilité

L\'IA devient un partenaire de réflexion, pas un oracle.`,
    },
    {
      type: 'card',
      title: '💊 Étape 3 : Évaluation Thérapeutique',
      content: `**Analyser les options de traitement :**
- Efficacité des traitements proposés
- Contre-indications spécifiques au patient
- Interactions médicamenteuses potentielles
- Surveillance nécessaire`,
    },
  ],

  toolComparison: [
    {
      type: 'markdown',
      content: `## Comparaison des Outils : Mon Expérience Pratique

Chaque outil a ses forces pour l\'analyse de cas cliniques :`,
    },
    {
      type: 'tabs',
      defaultValue: 'claude',
      tabs: [
        {
          value: 'claude',
          title: 'Claude AI',
          content: [
            {
              type: 'markdown',
              content: `**Pourquoi c\'est mon premier choix :**
- Excellent raisonnement médical et nuances cliniques
- Capable de suivre une approche méthodologique complexe
- Gère bien les cas avec de multiples comorbidités

**Exemple concret :** Sur un cas de patient polymédicamenté, Claude a identifié des interactions subtiles que d\'autres outils avaient ratées.

**Limite :** Quota restrictif en version gratuite pour les cas longs.`,
            },
          ],
        },
        {
          value: 'chatgpt',
          title: 'ChatGPT',
          content: [
            {
              type: 'markdown',
              content: `**Points forts :**
- Interface conversationnelle idéale pour l\'apprentissage guidé
- Bonne capacité à expliquer le raisonnement étape par étape
- Accès illimité en version gratuite

**Points faibles :**
- Parfois moins précis sur les spécificités pharmacologiques
- Peut être trop "généraliste" pour des cas très techniques

**Mon usage :** Parfait pour apprendre la méthodologie avant de passer à des outils plus spécialisés.`,
            },
          ],
        },
        {
          value: 'gemini',
          title: 'Google AI Studio',
          content: [
            {
              type: 'markdown',
              content: `**Avantages :**
- Excellent pour analyser des cas avec beaucoup de données (tableaux biologiques)
- Capacité d\'analyse de documents PDF (examens complémentaires)
- Gratuit avec quota généreux

**Inconvénients :**
- Interface moins intuitive pour une conversation pédagogique
- Nécessite plus de structuration dans les prompts

**Mon verdict :** Idéal pour les cas complexes avec beaucoup de données à traiter.`,
            },
          ],
        },
      ],
    },
    {
      type: 'markdown',
      content: `### Outils Recommandés pour cette Approche`,
    },
    {
      type: 'toolRecommendation',
      slug: 'claude-ai',
      reason: 'Mon premier choix pour l\'analyse de cas cliniques grâce à son raisonnement médical avancé et sa gestion des nuances cliniques.',
    },
    {
      type: 'toolRecommendation',
      slug: 'google-ai-studio',
      reason: 'Excellent pour analyser des cas avec beaucoup de données (tableaux biologiques, documents PDF).',
    },
  ],

  finalPrompt: [
    {
      type: 'markdown',
      content: `## Ma Séquence de Prompts (à Adapter selon le Cas)

Voici ma séquence de prompts que j\'utilise pour chaque cas. Je les enchaîne dans une même conversation pour maintenir le contexte :`,
    },
    {
      type: 'multiFormatPrompt',
      alternativeVersions: {
        standard: `**PROMPT 1 - Structuration des données :**

Tu es un pharmacien clinicien expérimenté. Je vais te présenter un cas clinique.

Commence par organiser toutes les informations disponibles selon cette structure :
1. PATIENT : âge, sexe, antécédents
2. PLAINTE PRINCIPALE : motif de consultation
3. CLINIQUE : symptômes, signes physiques
4. PARACLINIQUE : résultats d\'examens
5. TRAITEMENTS : médicaments actuels avec posologies

Voici le cas :
{{VOTRE_CAS_CLINIQUE}}

**PROMPT 2 - Hypothèses diagnostiques :**

Maintenant, aide-moi à construire la liste des diagnostics possibles :
- Quelles sont les 3 hypothèses principales ?
- Quels éléments cliniques soutiennent chaque hypothèse ?
- Quels éléments vont contre certaines hypothèses ?
- Quels examens complémentaires permettraient de trancher ?

**PROMPT 3 - Évaluation thérapeutique :**

Pour l\'hypothèse diagnostique la plus probable, analysons les options thérapeutiques :
- Le traitement actuel est-il optimal ?
- Y a-t-il des contre-indications chez ce patient ?
- Quelles interactions médicamenteuses dois-je surveiller ?
- Quelle surveillance faut-il mettre en place ?`,

        aiStudio: {
          systemPrompt: `Tu es un pharmacien clinicien expert avec 15 ans d\'expérience. Tu accompagnes un étudiant dans l\'apprentissage de l\'analyse de cas cliniques. 

Ton approche :
- Questionner pour faire réfléchir, ne pas donner directement les réponses
- Structurer l\'analyse de manière méthodique
- Souligner les points critiques de sécurité du patient
- Justifier chaque recommandation par des arguments scientifiques`,

          userPrompt: `Je te présente ce cas clinique. Commençons par l\'analyse systématique.

CAS :
{{VOTRE_CAS_CLINIQUE}}

Étape 1 : Peux-tu organiser les informations disponibles et identifier les données manquantes qui seraient importantes pour l\'analyse ?

Ne propose pas encore de diagnostic, concentre-toi sur la structuration des données.`,
        },
      },
      variables: [
        'VOTRE_CAS_CLINIQUE : Copiez l\'intégralité du cas avec tous les détails disponibles',
      ],
    },
  ],

  keyTakeaways: [
    'L\'analyse par étapes évite de sauter aux conclusions et développe le raisonnement clinique personnel.',
    'Faire structurer les données par l\'IA aide à repérer les informations manquantes cruciales.',
    'Une approche conversationnelle permet d\'approfondir chaque aspect du cas progressivement.',
    'La vérification systématique des interactions médicamenteuses est indispensable en pharmacie clinique.',
    'L\'IA est un excellent partenaire pédagogique, mais les décisions cliniques doivent toujours être validées par un professionnel.',
  ],
} satisfies Workflow

export default guide || concept || workflow
