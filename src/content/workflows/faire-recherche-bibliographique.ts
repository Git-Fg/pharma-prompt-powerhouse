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

  problem: [
    {
      type: 'markdown',
      content: `Quand j\'ai commencé à rédiger mon mémoire, j'étais perdu dans la masse d\'informations disponibles. PubMed me donnait des centaines de résultats, mais je ne savais pas par où commencer ni comment évaluer la pertinence des articles.

**Mes difficultés :**
- Identifier les mots-clés pertinents
- Trier les sources fiables des moins crédibles
- Synthétiser des informations complexes et parfois contradictoires
- Organiser ma bibliographie de façon logique`,
    },
  ],

  initialApproach: [
    {
      type: 'markdown',
      content: `Je demandais directement :

> *"Trouve-moi des articles sur [mon sujet]"*

**Résultat :** L\'IA me citait des références qu\'elle ne pouvait pas vérifier, avec parfois des erreurs de citation ou des articles inexistants.`,
    },
    {
      type: 'alert',
      variant: 'destructive',
      title: 'Le risque des références inventées',
      content: `L\'IA peut "halluciner" des références bibliographiques qui semblent crédibles mais n\'existent pas. JAMAIS de recherche bibliographique sans vérification !`,
    },
  ],

  optimizedStrategy: [
    {
      type: 'markdown',
      content: `L\'IA comme Assistant Méthodologique

J\'utilise désormais l\'IA pour m\'aider dans la MÉTHODE de recherche, pas pour me fournir directement les références.
Cette approche s\'appuie sur la **structuration par balises** pour organiser l\'information.`,
    },
    {
      type: 'conceptRecommendation',
      slug: 'structuration-par-balises',
      reason: 'Structurer vos requêtes avec des balises améliore la précision de l\'analyse bibliographique et de la synthèse.',
    },
    {
      type: 'card',
      title: '🎯 Étape 1 : Définition de la Stratégie de Recherche',
      content: `**L\'IA m\'aide à :**
- Identifier les mots-clés pertinents et leurs synonymes
- Structurer ma question de recherche (PICO : Patient, Intervention, Comparaison, Outcome)
- Suggérer des bases de données spécialisées
- Définir des critères d\'inclusion/exclusion`,
    },
    {
      type: 'card',
      title: '📊 Étape 2 : Analyse et Synthèse des Articles Trouvés',
      content: `**Une fois mes articles récupérés :**
- Je copie les abstracts dans l\'IA pour obtenir une synthèse structurée
- Je demande une analyse critique des méthodologies
- Je fais identifier les points de convergence et divergence entre études
- J\'obtiens une hiérarchisation par niveau de preuve`,
    },
    {
      type: 'card',
      title: '📝 Étape 3 : Organisation et Rédaction',
      content: `**L\'IA m\'aide à :**
- Structurer ma revue de littérature de façon logique
- Identifier les lacunes dans mes recherches
- Reformuler les idées complexes dans mes propres mots
- Créer des tableaux comparatifs des études`,
    },
  ],

  toolComparison: [
    {
      type: 'markdown',
      content: `## Comparaison des Outils : Mon Retour d\'Expérience

Voici comment j\'utilise chaque outil selon mes besoins :`,
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
              content: `**Pourquoi c\'est devenu indispensable :**
- Recherche web en temps réel avec sources citées
- Mode "Deep Research" pour des synthèses approfondies
- Citations automatiques et vérifiables

**Mon usage :** Point de départ pour explorer un sujet et identifier les tendances récentes.

**Limite importante :** Vérifie toujours les sources originales car les résumés peuvent parfois déformer le contenu.`,
            },
          ],
        },
        {
          value: 'notebooklm',
          title: 'NotebookLM',
          content: [
            {
              type: 'markdown',
              content: `**Révolutionnaire pour l\'analyse d\'articles :**
- Upload de PDFs d\'articles directement
- Création de synthèses personnalisées sur mes documents
- Questions-réponses avec citations exactes du texte

**Mon workflow :** J\'uploade tous mes PDFs d\'articles et je crée une "bibliothèque" personnalisée.

**Avantage énorme :** Zéro risque d\'hallucination car l\'IA travaille uniquement sur MES documents.`,
            },
          ],
        },
        {
          value: 'claude',
          title: 'Claude AI',
          content: [
            {
              type: 'markdown',
              content: `**Excellent pour l\'analyse critique :**
- Capacité d\'analyse de longs documents (200k tokens)
- Bon sens critique et identification des biais méthodologiques
- Synthèse nuancée de recherches complexes

**Mon usage :** Analyse approfondie d\'articles individuels et comparaison de méthodologies.

**Point fort :** Très bon pour identifier les limites et biais des études.`,
            },
          ],
        },
      ],
    },
    {
      type: 'markdown',
      content: `### Outils Recommandés pour la Recherche Bibliographique`,
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
  ],

  finalPrompt: [
    {
      type: 'markdown',
      content: `## Mes Prompts Types pour Chaque Étape

Voici ma séquence testée et éprouvée :`,
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
   - Quels critères d\'inclusion/exclusion appliquer ?

3. ÉVALUATION :
   - Quels critères utiliser pour évaluer la qualité des études ?
   - Comment hiérarchiser les niveaux de preuve ?

**ÉTAPE 2 - Analyse d\'articles (avec abstracts récupérés) :**

Voici [X] abstracts d\'articles sur {{SUJET}}. 

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

Tu accompagnes un étudiant dans l\'apprentissage de la recherche bibliographique rigoureuse.`,

          userPrompt: `Je commence une recherche bibliographique sur : {{VOTRE_SUJET}}

Objectif de ma revue : {{OBJECTIF_REVISION}}

Peux-tu m\'aider à :
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
  ],

  keyTakeaways: [
    'L\'IA excelle pour la MÉTHODE de recherche, mais ne remplace jamais la vérification des sources primaires.',
    'NotebookLM révolutionne l\'analyse d\'articles en évitant les risques d\'hallucination.',
    'La recherche par étapes (stratégie → analyse → synthèse) est plus efficace que la recherche directe.',
    'Toujours croiser plusieurs bases de données et ne jamais se fier à une seule source d\'information.',
    'L\'analyse critique des méthodologies est aussi importante que la collecte d\'informations.',
  ],
} satisfies Workflow

export default guide || concept || workflow
