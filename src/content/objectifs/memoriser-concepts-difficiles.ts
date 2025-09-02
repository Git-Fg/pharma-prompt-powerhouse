import { Objectif, objectifSchema } from '@/lib/content-schema';
import { allPrompts } from '@/content/prompts';

// On récupère un prompt existant pour le réutiliser
const masterPromptData = allPrompts.find(p => p.slug === 'generateur-mnemoniques-analogies');
if (!masterPromptData) throw new Error("Prompt 'generateur-mnemoniques-analogies' non trouvé");

const objectifData = {
  slug: 'memoriser-concepts-difficiles',
  title: 'Mémoriser des Concepts Difficiles',
  description: 'Vaincre les listes et mécanismes complexes en utilisant l\'IA pour générer des mnémoniques, analogies et histoires mémorables.',
  icon: 'Brain',
  
  masterPrompt: {
    description: "Ce prompt utilise l'IA pour créer des moyens mnémotechniques et des analogies pour mémoriser facilement les concepts pharmaceutiques les plus complexes.",
    prompt: masterPromptData,
  },

  beforeAfter: {
    beforePrompt: `"Donne-moi un moyen de retenir les effets des bêta-bloquants."`,
    afterPrompt: `"Crée une histoire humoristique pour mémoriser les effets des bêta-bloquants avec des conseils d'utilisation."`,
    // NOTE: Vous devrez créer ces screenshots et les placer dans /public/images/objectifs/
    beforeImageSrc: "/images/objectifs/mnemonique-avant.png",
    afterImageSrc: "/images/objectifs/mnemonique-apres.png",
  },
  
  checklist: [
    "Ai-je fourni une liste claire des éléments à mémoriser ?",
    "Ai-je spécifié le type d'aide-mémoire (analogie, mnémonique) ?",
    "Ai-je défini un style (humoristique, scientifique) pour guider la créativité ?",
    "Ai-je essayé d'augmenter la \"température\" de l'IA pour plus d'originalité ?",
 ],

  relatedConcepts: ["température-dosage"],
  relatedGuides: ["ia-stagiaire-brillant-naif"],
  
  content: [
    {
      "type": "tabs",
      "defaultValue": "google",
      "tabs": [
        {
          "value": "google",
          "title": "Avec Google AI Studio",
          "content": [
            {
              "type": "markdown",
              "content": "Google AI Studio permet un contrôle fin de la créativité grâce au curseur de **Température**.\n\n**Exemple de réglages :**\n- **Température: 0.2** : Réponses factuelles et précises\n- **Température: 0.9** : Réponses créatives et originales\n\n**Astuce :** Pour des mnémoniques vraiment mémorables, utilisez une température entre 0.7 et 0.9."
            },
            {
              "type": "toolRecommendation",
              "slug": "google-ai-studio",
              "reason": "Idéal pour contrôler précisément la créativité grâce au paramètre de température."
            }
          ]
        },
        {
          "value": "chatgpt",
          "title": "Avec ChatGPT",
          "content": [
            {
              "type": "markdown",
              "content": "Sans contrôle direct de la température, on peut guider la créativité en ajoutant des adjectifs dans le prompt.\n\n**Exemple de prompt :**\n```\nCrée une histoire **extrêmement originale et inattendue** pour mémoriser les effets des bêta-bloquants.\n```\n\n**Conseil :** Utilisez des adjectifs comme \"extrêmement\", \"inattendue\", \"décalée\" pour pousser l'IA vers plus de créativité."
            },
            {
              "type": "toolRecommendation",
              "slug": "chatgpt",
              "reason": "Excellent pour la génération créative avec des instructions bien formulées dans le prompt."
            }
          ]
        },
        {
          "value": "verdict",
          "title": "Verdict & Stratégie",
          "content": [
            {
              "type": "markdown",
              "content": "**Stratégie recommandée :**\n\n1. **Pour des mnémoniques factuels** : Utilisez une température basse (0.2-0.4)\n2. **Pour des histoires mémorables** : Utilisez une température élevée (0.7-0.9)\n3. **Demandez plusieurs approches** : L'IA proposera souvent 2-3 alternatives dont vous pourrez choisir la plus mémorable\n\n**Outils recommandés :**\n- <ToolRecommendation toolSlug='google-ai-studio' reason='Contrôle précis de la température pour optimiser la créativité.' />\n- <ToolRecommendation toolSlug='chatgpt' reason='Excellent pour la génération créative avec des instructions bien formulées.' />\n- <ToolRecommendation toolSlug='claude-ai' reason='Très bon pour les analogies complexes et les approches originales.' />"
            }
          ]
        }
      ]
    }
  ]
};

export const objectif: Objectif = objectifSchema.parse(objectifData);