import type { Workflow } from '@/lib/content-schema';

export const workflow = {
  slug: 'creer-fiches-de-revision',
  title: 'Créer des Fiches de Révision Efficaces',
  description: 'Transformez vos notes de cours en fiches de révision et QCM interactifs pour un apprentissage actif.',
  icon: 'FileText',
  tags: ['révision', 'qcm', 'apprentissage'],
  isFavorite: true,
  category: 'apprentissage',
  difficulty: 'débutant',
  estimatedTime: '15 min',
  conceptSlugs: ['context-engineering', 'structuration-par-balises'],
  
  problem: [
    {
      type: 'markdown',
      content: `## Le Problème : Mes Notes Passives Ne Suffisent Plus

Quand j'ai commencé mes études de pharmacie, je pensais que relire mes notes suffirait. Erreur ! Les examens demandent une compréhension active, pas une mémorisation passive.

Le problème avec la révision traditionnelle :
- **Illusion de connaissance :** Relire donne une fausse impression de maîtrise
- **Pas d'auto-évaluation :** Impossible de savoir si on a vraiment compris
- **Révisions monotones :** Difficile de rester concentré sur du contenu statique
- **Manque de variété :** Toujours les mêmes exemples, aucune généralisation`
    }
  ],

  initialApproach: [
    {
      type: 'markdown',
      content: `## Mon Approche Initiale (et ses Limites)

Au début, j'ai essayé de demander directement à ChatGPT :

> *"Fais-moi un QCM sur les bêta-bloquants."*

**Résultat :** Des questions trop génériques, sans rapport avec mon cours spécifique, souvent avec des erreurs factuelles.`
    },
    {
      type: 'alert',
      variant: 'destructive',
      title: 'Pourquoi ça ne marche pas',
      content: `L'IA n'a aucun contexte sur votre cours, votre niveau, vos objectifs pédagogiques. Elle improvise avec ses connaissances générales, qui peuvent être inexactes ou inadaptées.`
    }
  ],

  optimizedStrategy: [
    {
      type: 'markdown',
      content: `## La Stratégie Optimisée : Le Prompt "Professeur"

J'ai développé une méthode en 3 étapes qui transforme n'importe quel cours en matériel de révision de qualité.`
    },
    {
      type: 'card',
      title: '🎯 Étape 1 : Définir le Contexte Pédagogique',
      content: `**Avant de donner votre cours :**
- Précisez votre niveau (L2, L3, Master...)
- Indiquez le type d'évaluation (QCM, cas cliniques...)
- Définissez le niveau de difficulté souhaité`
    },
    {
      type: 'card',
      title: '📚 Étape 2 : Fournir le Contenu Intégral',
      content: `**Copiez-collez votre cours complet :**
- Toutes les définitions importantes
- Les mécanismes d'action détaillés
- Les classifications et exemples
- Les contre-indications et effets indésirables

Plus vous donnez d'informations, plus les questions seront précises !`
    },
    {
      type: 'card',
      title: '⚙️ Étape 3 : Structurer la Sortie',
      content: `**Demandez un format spécifique :**
- Nombre exact de questions
- Répartition par difficulté
- Justifications détaillées obligatoires
- Format de présentation (tableau, liste...)`
    }
  ],

  toolComparison: [
    {
      type: 'markdown',
      content: `## Comparaison des Outils : Mon Retour d'Expérience

J'ai testé cette stratégie sur plusieurs plateformes. Voici mes observations personnelles :`
    },
    {
      type: 'tabs',
      defaultValue: 'chatgpt',
      tabs: [
        {
          value: 'chatgpt',
          title: 'ChatGPT',
          content: [
            {
              type: 'markdown',
              content: `**Points forts :**
- Interface intuitive, parfaite pour débuter
- Mémoire conversationnelle : peut affiner les questions sur demande
- Bon équilibre entre simplicité et qualité

**Points faibles :**
- Parfois trop "scolaire" dans le ton
- Peut manquer de créativité pour les cas complexes

**Mon verdict :** Excellent point de départ. J'utilise ChatGPT pour mes premières fiches.`
            }
          ]
        },
        {
          value: 'claude',
          title: 'Claude AI',
          content: [
            {
              type: 'markdown',
              content: `**Points forts :**
- Excellente compréhension du contexte médical
- Questions plus nuancées et réalistes
- Meilleur dans l'analyse de cas complexes

**Points faibles :**
- Interface moins intuitive que ChatGPT
- Quota plus restrictif en version gratuite

**Mon verdict :** Mon choix pour des sujets complexes ou des cas cliniques.`
            }
          ]
        },
        {
          value: 'gemini',
          title: 'Google AI Studio',
          content: [
            {
              type: 'markdown',
              content: `**Points forts :**
- Gratuit avec quotas généreux
- Excellent pour l'analyse de documents PDF
- Mode "System Prompt" idéal pour définir un rôle de professeur

**Points faibles :**
- Interface plus technique (moins "grand public")
- Courbe d'apprentissage plus raide

**Mon verdict :** Parfait une fois qu'on maîtrise l'interface. Mon outil de prédilection pour les gros volumes.`
            }
          ]
        }
      ]
    }
  ],

  finalPrompt: [
    {
      type: 'markdown',
      content: `## Le Prompt Final (à Adapter à Votre Cas)

Voici le template que j'utilise systématiquement. Remplacez les variables entre {{}} par vos informations :`
    },
    {
      type: 'multiFormatPrompt',
      alternativeVersions: {
        standard: `Tu es un professeur expérimenté spécialisé en {{MATIERE}} pour des étudiants de {{NIVEAU}}. 

À partir du cours ci-dessous, crée {{NOMBRE}} questions de type {{TYPE_QUESTIONS}} de niveau {{DIFFICULTE}}.

COURS :
{{VOTRE_COURS_INTEGRAL}}

FORMAT ATTENDU :
- Question numérotée
- 4 propositions (A, B, C, D) si QCM
- Réponse correcte avec justification détaillée
- Indication du niveau de difficulté (facile/moyen/difficile)

Assure-toi que les questions couvrent l'ensemble du cours et testent la compréhension, pas seulement la mémorisation.`,
        
        aiStudio: {
          systemPrompt: `Tu es un professeur expérimenté spécialisé en pharmacie, expert dans la création d'outils de révision pédagogiques. Tu conçois des questions qui testent la compréhension approfondie, pas seulement la mémorisation.`,
          userPrompt: `Crée {{NOMBRE}} {{TYPE_QUESTIONS}} de niveau {{DIFFICULTE}} pour des étudiants de {{NIVEAU}} à partir du cours suivant :

{{VOTRE_COURS_INTEGRAL}}

Structure chaque question avec :
1. Énoncé clair et précis
2. Propositions réalistes (pour les QCM)
3. Réponse correcte justifiée
4. Explication des erreurs courantes

Varie les types de raisonnement : mémorisation, compréhension, application, analyse.`
        }
      },
      variables: [
        'MATIERE : Pharmacologie, Chimie thérapeutique, Pharmacocinétique...',
        'NIVEAU : L2 Pharmacie, L3 Pharmacie, Master...',
        'NOMBRE : 5, 10, 15... selon vos besoins',
        'TYPE_QUESTIONS : QCM, QROC, Cas cliniques courts...',
        'DIFFICULTE : Facile, Intermédiaire, Difficile',
        'VOTRE_COURS_INTEGRAL : Copiez-collez l\'intégralité de votre cours'
      ]
    }
  ],

  keyTakeaways: [
    "La clé du succès : fournir le cours COMPLET à l'IA pour obtenir des questions précises et pertinentes.",
    "Définir clairement le rôle de 'professeur' permet d'obtenir une approche pédagogique cohérente.",
    "Tester plusieurs outils aide à trouver celui qui correspond le mieux à votre style d'apprentissage.",
    "Les questions générées ne remplacent jamais la vérification avec vos cours et sources officielles.",
    "La variété des formats (QCM, QROC, cas) optimise l'ancrage mémoriel et la compréhension."
  ]
} satisfies Workflow;