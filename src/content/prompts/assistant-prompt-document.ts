// src/content/prompts-new/assistant-prompt-document.ts
import { Prompt, promptSchema } from '@/lib/content-schema';

const promptData = {
  "slug": "assistant-prompt-document",
  "title": "Assistant d'Analyse de Document",
  "description": "Permet de 'dialoguer' avec un document (PDF, notes de cours) pour en extraire des synthèses ou des réponses précises.",
  "icon": "FileText",
  "category": "apprentissage",
  "difficulty": "intermédiaire",
  "tags": [
    "claude",
    "exemple-code",
    "fiche-revision",
    "pharmacie",
    "prompting",
    "recherche",
    "synthese",
    "template",
    "variables"
  ],
  "isFavorite": false,
  "keyTakeaways": [],
  "conceptSlugs": [
    "context-engineering"
  ],
  "variables": [
    "document_content",
    "user_question"
  ],
  "promptContent": "<document>\n{{document_content}}\n</document>\n\n<instructions>\nEn te basant EXCLUSIVEMENT sur le document fourni ci-dessus, réponds à la question suivante. Si l'information n'est pas présente dans le texte, réponds \"L'information n'est pas disponible dans le document fourni.\"\n</instructions>\n\n<question>\n{{user_question}}\n</question>\n",
  "alternativeVersions": {
    "standard": "### Contexte\nVoici un document :\n\"\"\"\n{{document_content}}\n\"\"\"\n\n### Ma Question\nEn me basant uniquement sur le document ci-dessus, réponds à cette question : {{user_question}}\n\n**Règle importante :** Si la réponse ne se trouve pas dans le document, dis-le explicitement.\n",
    "xml": "<document>\n{{document_content}}\n</document>\n\n<instructions>\nEn te basant EXCLUSIVEMENT sur le document fourni ci-dessus, réponds à la question suivante. Si l'information n'est pas présente dans le texte, réponds \"L'information n'est pas disponible dans le document fourni.\"\n</instructions>\n\n<question>\n{{user_question}}\n</question>\n"
  },
  "recommendedTools": {
    "standard": [
      "ChatGPT",
      "Gemini"
    ],
    "xml": [
      "Claude.ai",
      "DeepSeek"
    ]
  },
  "content": [
    {
      "type": "markdown",
      "content": "## Notes d'Utilisation\n\nCe prompt est conçu pour analyser un contenu textuel que vous fournissez. La meilleure plateforme pour cela est **Claude**, car elle permet de téléverser des fichiers PDF directement.\n\n## Guide par Plateforme\n\n<Tabs defaultValue=\"claude\">\n  <TabsList>\n    <TabsTrigger value=\"claude\">Claude (Recommandé)</TabsTrigger>\n    <TabsTrigger value=\"aistudio\">AI Studio / Gemini</TabsTrigger>\n    <TabsTrigger value=\"chatgpt\">ChatGPT</TabsTrigger>\n  </TabsList>\n  \n  <TabsContent value=\"claude\">\n    <Card>\n      <CardHeader>\n        <CardTitle>🏆 Claude - Format Optimal</CardTitle>\n        <CardDescription>Utilisation directe des balises XML avec upload de fichiers</CardDescription>\n      </CardHeader>\n      <CardContent>\n        1. **Utilisez l'icône trombone** 📎 pour joindre votre fichier PDF\n        2. **Copiez le prompt principal** tel quel (avec les balises XML)\n        3. L'utilisation des balises \\`<document>\\` et \\`<question>\\` est particulièrement efficace sur Claude\n        \n        <Alert>\n          <AlertDescription>\n            **Avantage :** Claude excelle dans l'analyse de documents avec cette structure XML et peut traiter les PDF directement.\n          </AlertDescription>\n        </Alert>\n      </CardContent>\n    </Card>\n  </TabsContent>\n  \n  <TabsContent value=\"aistudio\">\n    <Card>\n      <CardHeader>\n        <CardTitle>🔬 Google AI Studio</CardTitle>\n        <CardDescription>Traitement de longs documents avec le contexte de 1M tokens</CardDescription>\n      </CardHeader>\n      <CardContent>\n        1. **Copiez le texte** de votre document\n        2. **Remplacez** \\`{document_content}\\` par votre contenu\n        3. **Utilisez la version XML** pour plus de précision\n        \n        <Alert>\n          <AlertDescription>\n            **Avantage :** Parfait pour les très gros documents grâce à la fenêtre de contexte massive de Gemini 2.5 Pro.\n          </AlertDescription>\n        </Alert>\n      </CardContent>\n    </Card>\n  </TabsContent>\n  \n  <TabsContent value=\"chatgpt\">\n    <Card>\n      <CardHeader>\n        <CardTitle>💬 ChatGPT</CardTitle>\n        <CardDescription>Format conversationnel plus naturel</CardDescription>\n      </CardHeader>\n      <CardContent>\n        1. **Utilisez la version alternative** (format plus conversationnel)\n        2. **Copiez-collez votre document** à la place de \\`{document_content}\\`\n        3. ChatGPT répond mieux au format des guillemets triples (\\`\"\"\"\\`)\n        \n        <Alert>\n          <AlertDescription>\n            **Note :** La version alternative est optimisée pour le style conversationnel de ChatGPT.\n          </AlertDescription>\n        </Alert>\n      </CardContent>\n    </Card>\n  </TabsContent>\n</Tabs>\n\n## Pourquoi cette structure ?\n\n<Card>\n  <CardHeader>\n    <CardTitle>🎯 Technique Anti-Hallucination</CardTitle>\n  </CardHeader>\n  <CardContent>\n    L'utilisation de balises XML (\\`<document>\\`, \\`<instructions>\\`, \\`<question>\\`) sépare clairement la source de vérité de l'instruction, ce qui réduit drastiquement le risque d'hallucination. L'IA sait exactement où chercher l'information et quoi faire si elle ne la trouve pas.\n  </CardContent>\n</Card>\n\n<ToolRecommendation \n  toolSlug=\"claude-ai\" \n  reason=\"Claude excelle dans l'analyse de documents avec cette structure XML et peut traiter les PDF directement grâce à sa capacité d'upload de fichiers native.\"\n/>\n\n<ConceptRecommendation \n  conceptSlug=\"context-engineering\" \n  reason=\"Ce prompt illustre parfaitement les principes du context engineering : structuration claire des informations pour une analyse précise et fiable.\"\n/>\n\n<GuideRecommendation \n  guideSlug=\"structurer-ses-prompts-avec-des-balises-methode-xml\" \n  reason=\"Approfondissez votre maîtrise de la structuration XML pour créer des prompts d'analyse encore plus sophistiqués et précis.\"\n/>"
    }
  ]
};

// Validation et export
export const prompt: Prompt = promptSchema.parse(promptData);