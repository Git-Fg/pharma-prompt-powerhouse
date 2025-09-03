import { allPrompts } from '@/content/prompts';
import type { Objectif } from '@/lib/content-schema';

// On récupère le prompt que nous venons de créer
const masterPromptData = allPrompts.find(p => p.slug === 'resolveur-cas-cliniques-tot');
if (!masterPromptData) throw new Error("Prompt 'resolveur-cas-cliniques-tot' non trouvé");

export const objectif = {
  slug: 'resoudre-cas-clinique',
  title: 'Résoudre un Cas Clinique Complexe',
  description: 'Utilisez des techniques de prompting avancées pour transformer l\'IA en un partenaire de raisonnement clinique, capable d\'explorer plusieurs hypothèses.',
  icon: 'GitBranch',
 tags: [],
  isFavorite: false,
  
 masterPrompt: {
    description: "Ce prompt avancé combine les concepts de structuration par balises et de Tree-of-Thought pour analyser des cas cliniques complexes avec un diagnostic différentiel structuré. C'est le prompt le plus avancé et le plus pédagogique du site.",
    prompt: masterPromptData,
  },

  beforeAfter: {
    beforePrompt: `"Voici un patient de 78 ans avec une bradycardie. Quel est le diagnostic ?"`,
    afterPrompt: `"En utilisant la méthode Tree-of-Thought, analysez ce cas en explorant les 3 hypothèses diagnostiques principales avec probabilités et justifications."`,
    // NOTE: Vous devrez créer ces screenshots et les placer dans /public/images/objectifs/
    beforeImageSrc: "/images/objectifs/cas-clinique-avant.png",
    afterImageSrc: "/images/objectifs/cas-clinique-apres.png",
  },
  
  checklist: [
    "Ai-je structuré les données du patient avec des balises (<patient>, <traitement>) ?",
    "Ai-je défini plusieurs \"branches\" d'hypothèses à explorer ?",
    "Ai-je demandé à l'IA d'évaluer la probabilité de chaque branche ?",
    "Ai-je exigé un plan d'action final priorisé ?",
 ],

  relatedConcepts: ["tree-of-thought", "chaîne-de-prompts", "structuration-par-balises"],
  relatedGuides: ["tree-of-thought-clinique", "techniques-avancees-fiabilisation"],
  
  content: [
    {
      "type": "tabs",
      "defaultValue": "methode",
      "tabs": [
        {
          "value": "methode",
          "title": "Méthode Chaîne de Prompts",
          "content": [
            {
              "type": "markdown",
              "content": "La méthode **Chaîne de Prompts** consiste à résoudre le cas en plusieurs étapes distinctes :\n\n1. **Analyse initiale** : Premier prompt pour une vue d'ensemble\n2. **Exploration des hypothèses** : Un prompt par hypothèse diagnostique\n3. **Synthèse et plan d'action** : Prompt final pour la conclusion\n\n**Avantages :**\n- Contrôle granulaire sur chaque étape\n- Possibilité de raffiner chaque analyse\n\n**Inconvénients :**\n- Processus plus long\n- Risque de perte de contexte entre les étapes"
            },
            {
              "type": "guideRecommendation",
              "slug": "tree-of-thought-clinique",
              "reason": "Apprenez à structurer vos prompts avec la méthode Tree-of-Thought pour une analyse plus intégrée."
            }
          ]
        },
        {
          "value": "tot",
          "title": "Méthode Tree-of-Thought",
          "content": [
            {
              "type": "markdown",
              "content": "La méthode **Tree-of-Thought** résout le cas en une seule fois avec une analyse multi-branches intégrée :\n\n1. **Prompt unique** qui demande à l'IA d'explorer plusieurs hypothèses en parallèle\n2. **Évaluation comparative** de chaque branche avec probabilités\n3. **Synthèse structurée** avec diagnostic le plus probable\n**Avantages :**\n- Analyse intégrée et cohérente\n- Comparaison directe des hypothèses\n- Résultat plus rapide\n\n**Inconvénients :**\n- Moins de contrôle sur chaque branche individuelle\n- Nécessite un prompt plus complexe"
            },
            {
              "type": "guideRecommendation",
              "slug": "tree-of-thought-clinique",
              "reason": "Maîtrisez la méthode Tree-of-Thought avec des exemples concrets et des conseils d'implémentation."
            }
          ]
        },
        {
          "value": "verdict",
          "title": "Verdict & Stratégie",
          "content": [
            {
              "type": "markdown",
              "content": "**Stratégie recommandée :**\n\n1. **Pour les débutants** : Commencez avec la méthode Chaîne de Prompts pour comprendre chaque étape\n2. **Pour les utilisateurs avancés** : Utilisez la méthode Tree-of-Thought avec le Master Prompt pour une analyse plus efficace\n3. **Dans tous les cas** : Validez toujours les résultats avec un clinicien humain\n\n**Outils recommandés :**\n- <ToolRecommendation toolSlug='claude-ai' reason='Excellent pour la structuration XML et l'analyse multi-branches.' />\n- <ToolRecommendation toolSlug='google-ai-studio' reason='Parfait pour les prompts complexes avec contrôle granulaire.' />\n- <ToolRecommendation toolSlug='chatgpt' reason='Bon équilibre entre simplicité et puissance pour les analyses cliniques.' />"
            }
          ]
        }
      ]
    }
  ]
} satisfies Objectif;