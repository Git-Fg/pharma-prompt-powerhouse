// src/content/guides-new/optimisation-de-prompts-la-methode-iterative.ts
import { Guide, guideSchema } from '@/lib/content-schema';

const guideData = {
  "slug": "optimisation-de-prompts-la-methode-iterative",
  "title": "Optimisation de Prompts : La Méthode Itérative",
  "description": "Maîtrisez l'art de l'amélioration continue de vos prompts grâce au dialogue, à l'auto-critique et aux chaînes de prompts.",
  "icon": "TrendingUp",
  "category": "methodologie",
  "difficulty": "intermédiaire",
  "estimatedTime": "25 minutes",
  "tags": [
    "auto-critique",
    "chain-of-thought",
    "clinique",
    "guide",
    "pedagogie",
    "pharmacie",
    "prompting"
  ],
  "isFavorite": true,
  "keyTakeaways": [
    "Un prompt efficace est le résultat d'un cycle d'optimisation : Prompt initial -> Analyse -> Auto-critique assistée -> Raffinement.",
    "Utilisez des 'chaînes de prompts' pour décomposer une tâche complexe en une série d'étapes simples et fiables, comme un protocole.",
    "Fournissez un feedback précis et actionnable au lieu de critiques vagues pour guider efficacement l'IA."
  ],
  "conceptSlugs": [
    "chaîne-de-prompts"
  ],
  "isWorkflow": false,
  "content": [
    {
      "type": "markdown",
      "content": "Un bon résultat vient rarement du premier coup. Le \\`prompt engineering\\` est un dialogue, pas une simple commande. L'itération est la pratique la plus importante pour obtenir des résultats de qualité professionnelle.\n\n## Le Cycle d'Optimisation des Prompts\n\nCe cycle en 4 étapes transforme un prompt moyen en un outil de haute précision.\n\n<Tabs defaultValue=\"etape1\">\n  <TabsList>\n    <TabsTrigger value=\"etape1\">1. Prompt Initial</TabsTrigger>\n    <TabsTrigger value=\"etape2\">2. Analyse Critique</TabsTrigger>\n    <TabsTrigger value=\"etape3\">3. Auto-Critique Assistée</TabsTrigger>\n    <TabsTrigger value=\"etape4\">4. Raffinement</TabsTrigger>\n  </TabsList>\n  <TabsContent value=\"etape1\">\n    <Card>\n      <CardHeader><CardTitle>Étape 1 : Le Prompt Initial (La Première Prescription)</CardTitle></CardHeader>\n      <CardContent>\n        <p>Formulez votre premier prompt de manière claire, en suivant les 5 piliers. Ne visez pas la perfection, visez la clarté.</p>\n        <CodeBlock language=\"text\">\"Explique les interactions médicamenteuses des IEC.\"</CodeBlock>\n      </CardContent>\n    </Card>\n  </TabsContent>\n  <TabsContent value=\"etape2\">\n    <Card>\n      <CardHeader><CardTitle>Étape 2 : L'Analyse Critique (L'Évaluation Clinique)</CardTitle></CardHeader>\n      <CardContent>\n        <p>Exécutez le prompt et analysez la réponse. Est-elle complète ? Structurée ? Précise ?</p>\n        <p><strong>Constat :</strong> La réponse est trop générale, manque de structure et n'est pas adaptée à un étudiant.</p>\n      </CardContent>\n    </Card>\n  </TabsContent>\n  <TabsContent value=\"etape3\">\n    <Card>\n      <CardHeader><CardTitle>Étape 3 : L'Auto-Critique Assistée (La RCP)</CardTitle></CardHeader>\n      <CardContent>\n        <p>C'est l'étape clé. Demandez à l'IA de critiquer son propre travail pour vous aider à raffiner le prompt.</p>\n        <CodeBlock language=\"text\">\"Critique ta réponse précédente. Comment pourrais-tu l'améliorer pour qu'elle soit plus utile pour un étudiant en pharmacie ? Propose 3 axes d'amélioration.\"</CodeBlock>\n        <Alert className=\"mt-4\"><AlertDescription>L'IA va souvent suggérer d'ajouter de la structure (tableau), de préciser le public cible, et d'inclure des exemples concrets.</AlertDescription></Alert>\n      </CardContent>\n    </Card>\n  </TabsContent>\n  <TabsContent value=\"etape4\">\n    <Card>\n      <CardHeader><CardTitle>Étape 4 : Le Raffinement (L'Ajustement Posologique)</CardTitle></CardHeader>\n      <CardContent>\n        <p>Intégrez les critiques (les vôtres et celles de l'IA) dans un nouveau prompt amélioré.</p>\n        <CodeBlock language=\"text\">\"Ta réponse manque de structure. Présente les interactions des IEC sous forme de tableau avec les colonnes : Famille de médicaments, Type d'interaction, Conséquence clinique, Conduite à tenir. Cible : étudiant en 4ème année.\"</CodeBlock>\n        <p className=\"mt-4\">Répétez ce cycle jusqu'à obtenir le résultat souhaité.</p>\n      </CardContent>\n    </Card>\n  </TabsContent>\n</Tabs>\n\n## Aller Plus Loin : Les Chaînes de Prompts\n\nPour les tâches très complexes, un seul prompt, même parfait, ne suffit pas. La solution est de créer une **chaîne de prompts**, où la sortie d'un prompt devient l'entrée du suivant. C'est l'équivalent d'un protocole thérapeutique.\n\n<RelatedContent items={[{ type: 'concept', id: 'chaîne-de-prompts' }]} />\n\n### Exemple : Créer une Fiche de Révision Complète en 3 Étapes\n\n1.  **Prompt 1 (Extraction) :** \\`Extrais les 10 concepts clés de ce cours.\\`\n2.  **Prompt 2 (Structuration) :** \\`À partir de ces 10 concepts, propose un plan de fiche de révision logique.\\`\n3.  **Prompt 3 (Rédaction) :** \\`Rédige la fiche de révision en suivant ce plan et en détaillant chaque concept.\\`\n\nCette méthode décompose un problème complexe en tâches simples et maîtrisables, augmentant drastiquement la fiabilité du résultat final.\n\n<ToolRecommendation \n  toolSlug=\"chatgpt\" \n  reason=\"ChatGPT est idéal pour l'optimisation itérative grâce à sa fonction de mémoire conversationnelle qui garde le contexte de vos itérations précédentes.\"\n/>\n\n<GuideRecommendation \n  guideSlug=\"les-5-piliers-dun-prompt-pharmaceutique-efficace\" \n  reason=\"Avant d'optimiser, assurez-vous de maîtriser les fondamentaux : un prompt bien structuré nécessite moins d'itérations pour atteindre l'excellence.\"\n/>\n\n<ConceptRecommendation \n  conceptSlug=\"chaîne-de-prompts\" \n  reason=\"Découvrez comment décomposer des tâches complexes en séquences de prompts simples et fiables pour des résultats reproductibles.\"\n/>"
    }
  ]
};

// Validation et export
export const guide: Guide = guideSchema.parse(guideData);