import type { Workflow } from '@/lib/content-schema'

export const workflow = {
  slug: 'faire-recherche-bibliographique',
  title: 'Faire une Recherche Bibliographique Efficace',
  description: 'Ma méthode pour utiliser l\'IA comme assistant de recherche et organiser une bibliographie scientifique de qualité.',
  icon: 'Search',
  tags: ['recherche', 'bibliographie', 'sources'],
  isFavorite: false,
  category: 'recherche',
  difficulty: 'intermédiaire',
  estimatedTime: '20 min',
  conceptSlugs: ['structuration-par-balises'],

  content: [
    {
      type: 'introduction',
      title: 'Le Problème : La Surcharge Informationnelle',
      content: 'Quand j\'ai commencé à rédiger mon mémoire, j\'étais perdu dans la masse d\'informations disponibles. PubMed me donnait des centaines de résultats, mais je ne savais pas par où commencer ni comment évaluer la pertinence des articles.\n\n**Mes difficultés :**\n- Identifier les mots-clés pertinents\n- Trier les sources fiables des moins crédibles\n- Synthétiser des informations complexes et parfois contradictoires\n- Organiser ma bibliographie de façon logique',
    },
    {
      type: 'section',
      title: 'Mon Approche Initiale : La Demande Directe',
      content: 'Je demandais directement :\n\n> *"Trouve-moi des articles sur [mon sujet]"*\n\n**Résultat :** L\'IA me citait des références qu\'elle ne pouvait pas vérifier, avec parfois des erreurs de citation ou des articles inexistants.',
    },
    {
      type: 'alert',
      variant: 'destructive',
      title: 'Le risque des références inventées',
      content: 'L\'IA peut "halluciner" des références bibliographiques qui semblent crédibles mais n\'existent pas. JAMAIS de recherche bibliographique sans vérification !',
    },
    {
      type: 'section',
      title: 'La Stratégie Optimisée : L\'IA comme Assistant Méthodologique',
      content: 'J\'utilise désormais l\'IA pour m\'aider dans la MÉTHODE de recherche, pas pour me fournir directement les références. Cette approche s\'appuie sur la **structuration par balises** pour organiser l\'information.',
    },
    {
      type: 'conceptRecommendation',
      slug: 'structuration-par-balises',
      reason: 'Structurer vos requêtes avec des balises améliore la précision de l\'analyse bibliographique et de la synthèse.',
    },
    {
      type: 'actionChecklist',
      title: 'Les 3 Étapes Clés de la Méthode',
      description: 'Mon workflow optimisé pour la recherche bibliographique',
      items: [
        {
          id: 'etape1-strategie',
          title: 'Étape 1 : Définition de la stratégie de recherche',
          description: 'L\'IA m\'aide à identifier les mots-clés pertinents, structurer ma question de recherche (PICO), suggérer des bases de données spécialisées et définir des critères d\'inclusion/exclusion.',
          priority: 'high',
        },
        {
          id: 'etape2-analyse',
          title: 'Étape 2 : Analyse et synthèse des articles trouvés',
          description: 'Une fois les articles récupérés, je copie les abstracts dans l\'IA pour obtenir une synthèse structurée, une analyse critique des méthodologies et une hiérarchisation par niveau de preuve.',
          priority: 'high',
        },
        {
          id: 'etape3-organisation',
          title: 'Étape 3 : Organisation et rédaction',
          description: 'L\'IA m\'aide à structurer ma revue de littérature de façon logique, identifier les lacunes dans mes recherches et créer des tableaux comparatifs des études.',
          priority: 'high',
        },
      ],
      variant: 'card',
      allowChecking: true,
    },
    {
      type: 'example',
      title: 'Exemple de stratégie de recherche avec PICO',
      description: 'Application concrète de la méthode PICO pour une recherche sur les anticoagulants',
      content: 'Sujet : "Impact des anticoagulants oraux directs chez le sujet âgé"\n\nApplication PICO :\n- P (Patient) : Patients >75 ans, fibrillation auriculaire\n- I (Intervention) : Anticoagulants oraux directs (apixaban, rivaroxaban)\n- C (Comparaison) : Antivitamines K (warfarine)\n- O (Outcome) : Événements hémorragiques majeurs, mortalité\n\nMots-clés identifiés :\n- "elderly patients", "aged >75", "older adults"\n- "direct oral anticoagulants", "DOACs", "apixaban", "rivaroxaban"\n- "vitamin K antagonists", "warfarin"\n- "major bleeding", "mortality", "safety"',
      exampleType: 'workflow',
      difficulty: 'intermédiaire',
      tags: ['PICO', 'recherche', 'bibliographie'],
      outcome: 'La structuration PICO permet de générer une équation de recherche précise et de réduire le bruit documentaire.',
      variant: 'card',
    },
    {
      type: 'citation',
      source: 'Higgins et al.',
      title: 'Cochrane Handbook for Systematic Reviews of Interventions',
      citationType: 'guideline',
      author: 'Julian PT Higgins, James Thomas, Jacqueline Chandler et al.',
      year: '2022',
      journal: 'Cochrane',
      url: 'https://training.cochrane.org/handbook',
      variant: 'compact',
    },
    {
      type: 'section',
      title: 'Comparaison des Outils : Mon Retour d\'Expérience',
      content: 'Voici comment j\'utilise chaque outil selon mes besoins :',
    },
    {
      type: 'tabs',
      defaultValue: 'perplexity',
      tabs: [
        {
          value: 'perplexity',
          title: 'Perplexity AI',
          content: [
            {
              type: 'markdown',
              content: '**Pourquoi c\'est devenu indispensable :**\n- Recherche web en temps réel avec sources citées\n- Mode "Deep Research" pour des synthèses approfondies\n- Citations automatiques et vérifiables\n\n**Mon usage :** Point de départ pour explorer un sujet et identifier les tendances récentes.\n\n**Limite importante :** Vérifie toujours les sources originales car les résumés peuvent parfois déformer le contenu.',
            },
          ],
        },
        {
          value: 'notebooklm',
          title: 'NotebookLM',
          content: [
            {
              type: 'markdown',
              content: '**Révolutionnaire pour l\'analyse d\'articles :**\n- Upload de PDFs d\'articles directement\n- Création de synthèses personnalisées sur mes documents\n- Questions-réponses avec citations exactes du texte\n\n**Mon workflow :** J\'uploade tous mes PDFs d\'articles et je crée une "bibliothèque" personnalisée.\n\n**Avantage énorme :** Zéro risque d\'hallucination car l\'IA travaille uniquement sur MES documents.',
            },
          ],
        },
        {
          value: 'claude',
          title: 'Claude AI',
          content: [
            {
              type: 'markdown',
              content: '**Excellent pour l\'analyse critique :**\n- Capacité d\'analyse de longs documents (200k tokens)\n- Bon sens critique et identification des biais méthodologiques\n- Synthèse nuancée de recherches complexes\n\n**Mon usage :** Analyse approfondie d\'articles individuels et comparaison de méthodologies.\n\n**Point fort :** Très bon pour identifier les limites et biais des études.',
            },
          ],
        },
      ],
    },
    {
      type: 'toolRecommendation',
      slug: 'perplexity-ai',
      reason: 'Excellent point de départ pour explorer un sujet grâce à sa recherche web en temps réel avec sources citées et vérifiables.',
    },
    {
      type: 'toolRecommendation',
      slug: 'notebooklm',
      reason: 'Révolutionnaire pour analyser vos PDFs d\'articles sans risque d\'hallucination, l\'IA travaille uniquement sur vos documents.',
    },
    {
      type: 'section',
      title: 'Le Prompt Final : Ma Séquence Testée et Éprouvée',
      content: 'Voici les prompts types pour chaque étape du processus :',
    },
    {
      type: 'multiFormatPrompt',
      alternativeVersions: {
        standard: `**ÉTAPE 1 - Définition de stratégie (pour tous les outils) :**

Tu es un bibliothécaire spécialisé en sciences de la santé. Je prépare une revue de littérature sur : {{VOTRE_SUJET}}

Aide-moi à construire une stratégie de recherche efficace :

1. MOTS-CLÉS :
   - Quels sont les termes principaux et leurs synonymes ?
   - Quels termes MeSH seraient pertinents ?
   - Dans quelles langues dois-je chercher ?

2. STRATÉGIE DE RECHERCHE :
   - Quelle équation de recherche booléenne recommandes-tu ?
   - Quelles bases de données privilégier pour ce sujet ?
   - Quels critères d'inclusion/exclusion appliquer ?

3. ÉVALUATION :
   - Quels critères utiliser pour évaluer la qualité des études ?
   - Comment hiérarchiser les niveaux de preuve ?

**ÉTAPE 2 - Analyse d'articles (avec abstracts récupérés) :**

Voici [X] abstracts d'articles sur {{SUJET}}. 

Peux-tu :
1. Créer un tableau comparatif des études (design, population, résultats principaux)
2. Identifier les points de convergence et divergence
3. Signaler les lacunes méthodologiques importantes
4. Suggérer une organisation thématique pour ma revue

[COLLER LES ABSTRACTS]

**ÉTAPE 3 - Structuration finale :**

Aide-moi à organiser ces informations en plan de revue de littérature cohérent, avec pour chaque section les articles les plus pertinents à citer.`,

        aiStudio: {
          systemPrompt: `Tu es un expert en méthodologie de recherche bibliographique avec une spécialisation en sciences pharmaceutiques et médicales. 

Ton expertise :
- Maîtrise des bases de données scientifiques (PubMed, Cochrane, Embase)
- Analyse critique des méthodologies de recherche
- Identification des biais et limitations des études
- Synthèse et organisation de littérature scientifique

Tu accompagnes un étudiant dans l'apprentissage de la recherche bibliographique rigoureuse.`,

          userPrompt: `Je commence une recherche bibliographique sur : {{VOTRE_SUJET}}

Objectif de ma revue : {{OBJECTIF_REVISION}}

Peux-tu m'aider à :
1. Définir une stratégie de recherche méthodique
2. Identifier les mots-clés et termes MeSH appropriés
3. Suggérer des critères de qualité pour sélectionner mes sources

Ne me donne pas de références spécifiques, concentre-toi sur la méthodologie.`,
        },
      },
      variables: [
        'VOTRE_SUJET : Le sujet précis de votre recherche bibliographique',
        'OBJECTIF_REVISION : L\'objectif de votre revue (mémoire, article, cours...)',
      ],
    },
    {
      type: 'keyTakeaways',
      points: [
        'L\'IA excelle pour la MÉTHODE de recherche, mais ne remplace jamais la vérification des sources primaires.',
        'NotebookLM révolutionne l\'analyse d\'articles en évitant les risques d\'hallucination.',
        'La recherche par étapes (stratégie → analyse → synthèse) est plus efficace que la recherche directe.',
        'Toujours croiser plusieurs bases de données et ne jamais se fier à une seule source d\'information.',
        'L\'analyse critique des méthodologies est aussi importante que la collecte d\'informations.',
      ],
      variant: 'featured',
      contentType: 'workflow',
    },
  ],

  keyTakeaways: [
    'L\'IA excelle pour la MÉTHODE de recherche, mais ne remplace jamais la vérification des sources primaires.',
    'NotebookLM révolutionne l\'analyse d\'articles en évitant les risques d\'hallucination.',
    'La recherche par étapes (stratégie → analyse → synthèse) est plus efficace que la recherche directe.',
  ],
} satisfies Workflow

export default workflow
