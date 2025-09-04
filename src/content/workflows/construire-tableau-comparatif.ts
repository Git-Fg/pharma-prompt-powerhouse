import type { Workflow } from '@/lib/content-schema';

export const workflow = {
  slug: 'construire-tableau-comparatif',
  title: 'Construire un Tableau Comparatif Efficace',
  description: 'Maîtrisez l\'art de la synthèse visuelle en générant des tableaux clairs pour comparer des médicaments, des pathologies ou des concepts.',
  icon: 'Table',
  tags: ['tableau', 'comparaison', 'synthèse', 'révision'],
  isFavorite: false,
  category: 'méthodologie',
  difficulty: 'intermédiaire',
  estimatedTime: '10 min',
  conceptSlugs: ['structuration-par-balises'],
  
  problem: [
    {
      type: 'markdown',
      content: `## Le Problème : Perdre le Fil dans les Comparaisons

Quand j'avais besoin de comparer plusieurs classes thérapeutiques (ISRS, IRSN, tricycliques...), mes notes devenaient vite illisibles. Des paragraphes de texte avec des informations mélangées.

Le problème avec les comparaisons textuelles :
- **Information noyée :** Difficile de retrouver rapidement une différence
- **Pas de vue d'ensemble :** Impossible de voir les patterns
- **Révisions inefficaces :** Pas adapté à la mémorisation rapide
- **Erreurs d'omission :** Certains aspects oubliés dans la comparaison`
    }
  ],

  initialApproach: [
    {
      type: 'markdown',
      content: `## Mon Approche Initiale (et ses Limites)

Au début, j'ai essayé de demander simplement :

> *"Compare les ISRS et les IRSN."*

**Résultat :** Deux paragraphes de texte décrivant similitudes et différences, sans structure claire.`
    },
    {
      type: 'alert',
      variant: 'destructive',
      title: 'Pourquoi ça ne marche pas',
      content: `L'IA génère du texte libre sans structure imposée. Le résultat n'est ni visuel ni facilement mémorisable. Il faut reformater manuellement.`
    }
  ],

  optimizedStrategy: [
    {
      type: 'markdown',
      content: `## La Stratégie Optimisée : Structure Imposée par l'IA

J'ai développé une approche qui force l'IA à créer directement un tableau structuré et visuel.
Cette méthode s'appuie sur la **structuration par balises** pour garantir la cohérence.`
    },
    {
      type: 'conceptRecommendation',
      slug: 'structuration-par-balises',
      reason: 'L\'utilisation de balises XML permet de forcer l\'IA à respecter une structure de tableau précise et cohérente.'
    },
    {
      type: 'card',
      title: '🏗️ Étape 1 : Définir les Éléments et Critères',
      content: `**Spécifier clairement :**
- Les éléments à comparer (colonnes)
- Les critères de comparaison (lignes)
- Le format de sortie souhaité (tableau Markdown)`
    },
    {
      type: 'card',
      title: '📋 Étape 2 : Utiliser un Prompt Structuré',
      content: `**Template de prompt efficace :**
\`\`\`
Crée un tableau comparatif des [ÉLÉMENTS] avec les critères :
[CRITÈRES]

Format : Tableau Markdown
Utilise des symboles (✅, ⚠️, ❌) pour une lecture rapide
Ajoute une synthèse sous le tableau
\`\`\``
    },
    {
      type: 'card',
      title: '🎯 Étape 3 : Optimiser selon l\'Outil',
      content: `**Adaptation par plateforme :**
- **ChatGPT/Claude :** Prompt structuré simple
- **Google AI Studio :** Structured Output pour format garanti
- **Claude :** Balises XML pour structure claire`
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
- Format Markdown natif, parfait pour les tableaux
- Bonne compréhension des instructions de structure
- Facilité d'ajustement en conversationnel

**Points faibles :**
- Parfois trop verbeux dans les cellules
- Peut "oublier" la structure en cours de génération

**Mon usage :** Idéal pour des tableaux simples à moyennement complexes avec ajustements itératifs.`
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
- Excellente compréhension des balises XML pour structure
- Très bon équilibre concision/précision dans les cellules
- Format Markdown impeccable

**Points faibles :**
- Limite de messages par jour en version gratuite
- Moins flexible pour les ajustements rapides

**Mon usage :** Parfait pour des tableaux complexes nécessitant une précision académique.`
            }
          ]
        },
        {
          value: 'google-ai-studio',
          title: 'Google AI Studio',
          content: [
            {
              type: 'markdown',
              content: `**Points forts :**
- Structured Output : format JSON garanti à 100%
- Excellent pour l'intégration dans d'autres outils
- Gratuit avec quota généreux

**Points faibles :**
- Interface moins intuitive pour l'usage ponctuel
- Nécessite configuration initiale du schéma JSON

**Mon usage :** Quand j'ai besoin d'une fiabilité absolue du format pour réutilisation automatisée.`
            }
          ]
        }
      ]
    }
  ],

  finalPrompt: [
    {
      type: 'markdown',
      content: `## Le Prompt Final : Template Universel

Voici le prompt que j'utilise maintenant, adapté selon l'outil :`
    },
    {
      type: 'multiFormatPrompt',
      alternativeVersions: {
        standard: `Crée un tableau comparatif des {{classes_medicaments}} avec les critères :
{{caracteristiques_comparees}}

Procède ainsi :
1. **Identification des Classes** : Liste toutes les classes.
2. **Définition des Caractéristiques** : Identifie les caractéristiques pertinentes.
3. **Structuration du Tableau** : Organise en lignes/colonnes.
4. **Remplissage des Données** : Complète chaque cellule.

Présente le tableau en markdown avec un en-tête clair. Utilise des symboles (✅, ⚠️, ❌) et ajoute une légende.`,
        xml: `<classes_medicaments>
{{classes_medicaments}}
</classes_medicaments>

<caracteristiques_comparees>
{{caracteristiques_comparees}}
</caracteristiques_comparees>

<thinking_process>
1. **Identification des Classes** : Liste toutes les classes de médicaments à comparer.
2. **Définition des Caractéristiques** : Identifie les caractéristiques pertinentes pour la comparaison.  
3. **Structuration du Tableau** : Organise les classes en lignes et les caractéristiques en colonnes.
4. **Remplissage des Données** : Complète chaque cellule avec l'information pertinente.
</thinking_process>

<format_sortie>
- Présente le tableau au format markdown avec un en-tête clair.
- Utilise des symboles (✅, ⚠️, ❌) pour une lecture rapide.
- Ajoute une légende si nécessaire pour les symboles.
</format_sortie>`,
        aiStudio: {
          systemPrompt: `Tu es un expert en pharmacologie et en pédagogie pour des étudiants en pharmacie. Ta spécialité est de créer des tableaux comparatifs clairs et pédagogiques pour faciliter l'apprentissage de classes thérapeutiques.`,
          userPrompt: `Crée un tableau comparatif des {{classes_medicaments}} avec les critères :
{{caracteristiques_comparees}}

Procède ainsi :
1. **Identification des Classes** : Liste toutes les classes.
2. **Définition des Caractéristiques** : Identifie les caractéristiques pertinentes.
3. **Structuration du Tableau** : Organise en lignes/colonnes.
4. **Remplissage des Données** : Complète chaque cellule.

Présente le tableau en markdown avec un en-tête clair. Utilise des symboles (✅, ⚠️, ❌) et ajoute une légende.`
        }
      },
      recommendedTools: {
        standard: ['ChatGPT', 'Claude AI'],
        xml: ['Claude AI'],
        aiStudio: ['Google AI Studio', 'Qwen Chat']
      },
      variables: [
        'classes_medicaments : Liste des classes thérapeutiques à comparer',
        'caracteristiques_comparees : Liste des caractéristiques (efficacité, effets secondaires, etc.)'
      ]
    }
  ],

  keyTakeaways: [
    "Toujours définir explicitement les éléments ET les critères de comparaison pour éviter l'improvisation de l'IA.",
    "Le format 'Tableau Markdown' est universel et facilite la copie-colle vers tous vos outils de révision.",
    "Les symboles visuels (✅, ⚠️, ❌) améliorent considérablement la mémorisation et la révision rapide.",
    "Google AI Studio avec Structured Output garantit une fiabilité de format à 100% pour l'automatisation.",
    "Un bon tableau comparatif vaut tous les paragraphes du monde pour réviser efficacement."
  ]
} satisfies Workflow;