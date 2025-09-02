// src/content/guides-new/structurer-ses-prompts-avec-des-balises-methode-xml.ts
import { Guide, guideSchema } from '@/lib/content-schema';

const guideData = {
  "slug": "structurer-ses-prompts-avec-des-balises-methode-xml",
  "title": "Structurer ses Prompts avec des Balises (Méthode XML)",
  "description": "Apprenez à utiliser des balises simples pour organiser vos prompts complexes et obtenir des réponses plus fiables de l'IA, sans écrire de code.",
  "icon": "CodeXml",
  "category": "techniques-avancees",
  "difficulty": "intermédiaire",
  "estimatedTime": "20 minutes",
  "tags": [
    "claude",
    "clinique",
    "exemple-code",
    "guide",
    "pedagogie",
    "pharmacie",
    "prompting",
    "xml-prompting"
  ],
  "isFavorite": true,
  "keyTakeaways": [
    "Utiliser des balises comme `<patient>` ou `<question>` aide à organiser vos idées et à clarifier votre demande pour l'IA.",
    "Cette technique ne vise pas à obtenir une sortie en XML, mais à rendre votre prompt d'entrée plus lisible et moins ambigu.",
    "C'est particulièrement efficace pour les cas cliniques complexes ou les demandes multi-parties, notamment avec les modèles Claude."
  ],
  "conceptSlugs": [
    "structuration-par-balises"
  ],
  "isWorkflow": false,
  "content": [
    {
      "type": "markdown",
      "content": "## Pourquoi Structurer avec des Balises ?\n\nQuand nos demandes à l'IA deviennent complexes, comme pour une analyse de cas clinique, le texte brut peut devenir confus. Une technique simple et très efficace consiste à utiliser des balises, similaires au XML ou HTML, pour **structurer notre propre pensée** et, par conséquent, guider l'IA.\n\n<Alert>\n  <AlertDescription>\n    **Important :** Le but ici n'est PAS de demander à l'IA de répondre en XML. C'est une technique pour l'utilisateur, pour rendre le **prompt d'entrée** plus clair.\n  </AlertDescription>\n</Alert>\n\nLes modèles d'IA excellent à reconnaître des patterns. En encadrant des sections de votre prompt avec des balises claires, vous aidez le modèle à :\n-   **Distinguer le contexte des instructions.**\n-   **Comprendre la hiérarchie de l'information.**\n-   **Réduire les ambiguïtés.**\n\n<ToolRecommendation \n  toolSlug=\"anthropic-console\" \n  reason=\"L'Anthropic Console offre une interface avancée avec des paramètres détaillés, parfaite pour tester et raffiner des prompts XML complexes avec Claude.\"\n/>\n\n## Exemple Concret : Analyse d'un Cas Clinique\n\n<Tabs defaultValue=\"avant\">\n  <TabsList className=\"grid w-full grid-cols-2\">\n    <TabsTrigger value=\"avant\">❌ Approche Non-Structurée</TabsTrigger>\n    <TabsTrigger value=\"apres\">✅ Approche avec Balises</TabsTrigger>\n  </TabsList>\n  <TabsContent value=\"avant\" className=\"pt-2\">\n    <Card>\n      <CardHeader>\n        <CardTitle>Prompt Confus</CardTitle>\n        <CardDescription>Un prompt qui mélange informations et questions.</CardDescription>\n      </CardHeader>\n      <CardContent>\n        <Alert type=\"destructive\">\n          <AlertDescription>\n            \"J'ai un patient de 78 ans avec HTA et FA, qui prend de l'Amiodarone 200mg, de l'Apixaban 2.5mg x2 et du Furosémide 40mg. Il se plaint d'une grande fatigue depuis 2 jours et son cœur bat à 45 bpm. Analyse la situation et dis-moi quoi faire.\"\n          </AlertDescription>\n        </Alert>\n        <p className=\"text-sm text-muted-foreground mt-3\">\n          **Problèmes :** Informations mélangées, pas de hiérarchie claire, ambiguïtés possibles.\n        </p>\n      </CardContent>\n    </Card>\n  </TabsContent>\n  <TabsContent value=\"apres\" className=\"pt-2\">\n    <Card>\n      <CardHeader>\n        <CardTitle>Prompt Structuré</CardTitle>\n        <CardDescription>Même information, mais organisée pour une clarté maximale.</CardDescription>\n      </CardHeader>\n      <CardContent>\n        <CodeBlock language=\"xml\">\n{\\`\n<cas_clinique>\n  <patient>\n    <age>78 ans</age>\n    <antecedents>HTA, Fibrillation Atriale, Insuffisance Rénale (ClCr 40ml/min)</antecedents>\n  </patient>\n  <traitement>\n    <medicament nom=\"Amiodarone\" dose=\"200mg/j\" />\n    <medicament nom=\"Apixaban\" dose=\"2.5mg x2/j\" />\n    <medicament nom=\"Furosémide\" dose=\"40mg/j\" />\n  </traitement>\n  <presentation_clinique>\n    <symptome>Asthénie intense depuis 48h</symptome>\n    <signe_vital>Fréquence cardiaque à 45 bpm</signe_vital>\n  </presentation_clinique>\n</cas_clinique>\n\n<question>\nAnalyse ce cas. Quelle est la cause la plus probable de la bradycardie ? Propose un plan d'action en 3 étapes.\n</question>\n\\`}\n        </CodeBlock>\n      </CardContent>\n    </Card>\n  </TabsContent>\n</Tabs>\n\nLe second prompt est plus long en tokens, mais il est infiniment plus clair. Vous obtiendrez une réponse plus précise et structurée du premier coup, ce qui **économise vos quotas et votre temps**.\n\n## Quand utiliser les balises ?\n\n<Card>\n  <CardHeader>\n    <CardTitle>🎯 Cas d'Usage Optimaux</CardTitle>\n  </CardHeader>\n  <CardContent className=\"space-y-4\">\n    <p>Cette technique est particulièrement efficace pour :</p>\n    <ul className=\"list-disc list-inside\">\n      <li>**Cas cliniques :** \\`<patient>\\`, \\`<traitement>\\`, \\`<biologie>\\`, \\`<question>\\`</li>\n      <li>**Analyse de documents :** \\`<source_document>\\`, \\`<instructions>\\`, \\`<format_attendu>\\`</li>\n      <li>**Comparaisons :** \\`<element_A>\\`, \\`<element_B>\\`, \\`<criteres_comparaison>\\`</li>\n    </ul>\n  </CardContent>\n</Card>\n\n<ToolRecommendation \n  toolSlug=\"claude-ai\" \n  reason=\"Claude comprend exceptionnellement bien la structuration XML et peut traiter des prompts très complexes avec de multiples balises imbriquées. Idéal pour les cas cliniques détaillés.\"\n/>\n\n<GuideRecommendation \n  guideSlug=\"les-5-piliers-dun-prompt-pharmaceutique-efficace\" \n  reason=\"Avant d'utiliser la méthode XML, maîtrisez d'abord les 5 piliers fondamentaux pour construire des prompts efficaces.\"\n/>\n\n<ConceptRecommendation \n  conceptSlug=\"context-engineering\" \n  reason=\"La structuration par balises est une technique avancée de context engineering qui permet de mieux organiser l'information fournie à l'IA.\"\n/>"
    }
  ]
};

// Validation et export
export const guide: Guide = guideSchema.parse(guideData);