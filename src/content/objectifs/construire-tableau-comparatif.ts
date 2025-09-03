import { allPrompts } from '@/content/prompts';
import type { Objectif } from '@/lib/content-schema';

// On récupère un prompt existant pour le réutiliser
const masterPromptData = allPrompts.find(p => p.slug === 'constructeur-tableaux-comparatifs');
if (!masterPromptData) throw new Error("Prompt 'constructeur-tableaux-comparatifs' non trouvé");

export const objectif = {
  slug: 'construire-tableau-comparatif',
  title: 'Construire un Tableau Comparatif Efficace',
  description: 'Maîtrisez l\'art de la synthèse visuelle en générant des tableaux clairs pour comparer des médicaments, des pathologies ou des concepts.',
  icon: 'Table',
  tags: [],
  isFavorite: false,
  
  masterPrompt: {
    description: "Ce prompt est conçu pour générer des tableaux comparatifs clairs et efficaces, un outil essentiel pour les révisions en pharmacie.",
    prompt: masterPromptData,
  },

  beforeAfter: {
    beforePrompt: `"Compare les ISRS et les IRSN."`,
    afterPrompt: `"Crée un tableau comparatif des ISRS et IRSN avec les critères : Mécanisme d'action, posologie, effets indésirables, contre-indications, surveillance."`,
    // TODO: Vous devrez créer ces screenshots et les placer dans /public/images/objectifs/
    beforeImageSrc: "/images/objectifs/tableau-comparatif-avant.png",
    afterImageSrc: "/images/objectifs/tableau-comparatif-apres.png",
  },
  
  checklist: [
    "Ai-je listé explicitement les éléments à comparer dans les colonnes ?",
    "Ai-je défini précisément les critères de comparaison pour les lignes ?",
    "Ai-je demandé un format de sortie \"Tableau Markdown\" ?",
    "Ai-je inclus une demande de synthèse sous le tableau ?",
 ],

  relatedConcepts: ["structuration-par-balises"],
  relatedGuides: ["structurer-ses-prompts-avec-des-balises-methode-xml"],
  
  content: [
    {
      "type": "tabs",
      "defaultValue": "simple",
      "tabs": [
        {
          "value": "simple",
          "title": "Avec un Prompt Simple",
          "content": [
            {
              "type": "markdown",
              "content": "Avec un prompt simple, l'IA génère une réponse textuelle qui peut être difficile à structurer.\n\n**Exemple de prompt :**\n```\nCompare les ISRS et les IRSN.\n```\n\n**Résultat typique :**\nDeux paragraphes de texte décrivant les similitudes et différences, sans structure claire.\n\n**Limitations :**\n- Difficile à mémoriser\n- Pas adapté à la révision rapide\n- Nécessite un reformatage manuel"
            }
          ]
        },
        {
          "value": "master",
          "title": "Avec le Master Prompt",
          "content": [
            {
              "type": "markdown",
              "content": "Le Master Prompt force une structure claire avec des éléments et critères bien définis.\n\n**Exemple de prompt :**\n```\n<sujet>Antidépresseurs</sujet>\n<elements>ISRS (fluoxétine), IRSN (venlafaxine)</elements>\n<criteres>Mécanisme d'action, posologie, effets indésirables, contre-indications, surveillance</criteres>\n```\n\n**Résultat typique :**\nUn tableau Markdown parfaitement structuré, prêt à être copié.\n\n**Avantages :**\n- Structure claire et visuelle\n- Facile à mémoriser\n- Prêt à l'emploi pour la révision"
            }
          ]
        },
        {
          "value": "advanced",
          "title": "Avec Google AI Studio (Avancé)",
          "content": [
            {
              "type": "markdown",
              "content": "Google AI Studio offre la fonctionnalité **Structured Output** qui permet de forcer une sortie au format JSON, garantissant une fiabilité à 100% pour l'intégration dans d'autres outils.\n\n**Avantages de la sortie structurée :**\n- Fiabilité garantie à 100%\n- Intégration facile dans d'autres outils\n- Possibilité d'automatisation\n**Cas d'usage avancé :**\n- Intégration dans des applications de révision\n- Génération automatique de fiches de révision\n- Création de bases de données de comparaisons"
            },
            {
              "type": "toolRecommendation",
              "slug": "google-ai-studio",
              "reason": "Excellent pour la génération de sorties structurées avec la fonctionnalité Structured Output."
            }
          ]
        },
        {
          "value": "verdict",
          "title": "Verdict & Stratégie",
          "content": [
            {
              "type": "markdown",
              "content": "**Stratégie recommandée :**\n\n1. **Pour une révision rapide** : Utilisez le Master Prompt avec sortie Markdown\n2. **Pour une intégration dans d'autres outils** : Utilisez Google AI Studio avec Structured Output\n3. **Pour des comparaisons simples** : Un prompt simple peut suffire\n\n**Outils recommandés :**\n- <ToolRecommendation toolSlug='google-ai-studio' reason='Fonctionnalité Structured Output pour des tableaux fiables à 100%.' />\n- <ToolRecommendation toolSlug='chatgpt' reason='Bon équilibre entre simplicité et puissance pour les tableaux comparatifs.' />\n- <ToolRecommendation toolSlug='claude-ai' reason='Excellent pour la structuration XML des éléments et critères.' />"
            }
          ]
        }
      ]
    }
  ]
} satisfies Objectif;