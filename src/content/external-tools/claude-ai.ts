// src/content/external-tools-new/claude-ai.ts
import { ExternalTool, externalToolSchema } from '@/lib/content-schema';

const externalToolData = {
  "slug": "claude-ai",
  "title": "Claude.ai : La Conversation Intelligente avec Anthropic",
  "description": "Découvrez Claude.ai, l'interface de chat directe et accessible pour interagir avec les modèles d'IA d'Anthropic au quotidien.",
  "difficulty": "débutant",
  "tags": [],
  "isFavorite": false,
  "keyTakeaways": [],
  "conceptSlugs": [],
  "url": "https://claude.ai/",
  "category": "chatbot",
  "capabilities": [],
  "use_cases": [
    "Analyse de longs PDF",
    "Synthèse de cours",
    "Dialogue avec un document"
  ],
  "color": "bg-orange-500",
  "tldr": "Chat IA d'Anthropic excellent pour analyser des documents longs et PDFs. Interface intuitive, idéale pour synthèse de cours et recherche approfondie.",
  "content": [
    {
      "type": "markdown",
      "content": "## Qu'est-ce que Claude.ai ?\n\n\\`Claude.ai\\` est l'interface de conversation grand public développée par Anthropic. C'est un chatbot puissant et accessible, conçu pour des interactions fluides et naturelles. Contrairement à l'Anthropic Console qui est un environnement de test, \\`claude.ai\\` est l'outil du quotidien pour rédiger, résumer, analyser des documents et obtenir des réponses à des questions complexes.\n\nIl est particulièrement réputé pour sa grande fenêtre de contexte et sa faible propension à l'hallucination, ce qui en fait un allié fiable pour les étudiants et les professionnels.\n\n## Les Offres : Gratuit vs. Payant\n\nClaude.ai propose deux niveaux d'accès principaux :\n\n**Version Gratuite :**\n- **Usage :** Idéal pour des besoins ponctuels. Vous bénéficiez d'un nombre généreux de messages, mais celui-ci est limité et se réinitialise toutes les quelques heures (environ 50 messages toutes les 8 heures).\n- **Modèle :** Accès principalement au modèle **Claude Sonnet 4**, un excellent compromis entre performance et rapidité.\n- **Fonctionnalités :** Compréhension de base des PDF et autres documents uploadés.\n- **Limitations :** Peut être ralenti durant les pics d'utilisation.\n\n**Version Payante (Claude Pro, environ 18-25€/mois) :**\n- **Usage :** Au moins 5 fois plus de messages que la version gratuite, idéal pour une utilisation intensive.\n- **Modèles :** Accès prioritaire à **Claude Sonnet 4** et accès au modèle le plus puissant, **Claude Opus 4.1**, pour les tâches les plus complexes.\n- **Fonctionnalités Avancées :\n**  - **Analyse de documents volumineux :** Traitez des PDF, des documents Word ou des feuilles de calcul complexes.\n  - **Fonctionnalité \"Projects\" :** Organisez vos conversations et vos documents dans des espaces de travail dédiés, agissant comme une mémoire à long terme pour vos projets.\n  - **Accès anticipé :** Bénéficiez des nouvelles fonctionnalités en avant-première.\n\n## Cas d'Usage pour un Étudiant en Pharmacie\n\n- **Analyse d'études cliniques :** Uploadez un PDF de plusieurs dizaines de pages et demandez à Claude d'en extraire le protocole, les résultats principaux et les conclusions.\n- **Préparation de cas :** Soumettez une description de cas et utilisez Claude pour explorer les diagnostics différentiels, les options de traitement et les interactions médicamenteuses potentielles.\n- **Génération de fiches de révision :** Collez le contenu d'un cours et demandez-lui de le synthétiser en points clés, en tableaux ou en flashcards.\n- **Aide à la rédaction :** Utilisez-le pour reformuler des phrases, corriger la grammaire ou trouver des synonymes pour des termes médicaux.\n\n## Claude.ai vs. Anthropic Console\n\nLa distinction est simple :\n\n- **\\`claude.ai\\`** est votre **assistant de travail**. Vous l'utilisez pour accomplir des tâches.\n- **L'Anthropic Console** est votre **laboratoire d'expérimentation**. Vous l'utilisez pour comprendre *comment* l'IA fonctionne et pour construire des prompts optimisés.\n\nCommencez par maîtriser \\`claude.ai\\` pour vos besoins quotidiens, puis explorez la Console lorsque vous souhaitez passer à un niveau supérieur de \\`prompt engineering\\`.\n\n<GuideRecommendation \n  guideSlug=\"structurer-ses-prompts-avec-des-balises-methode-xml\" \n  reason=\"Claude excelle dans l'interprétation de prompts structurés en XML. Maîtrisez cette technique pour exploiter pleinement ses capacités d'analyse et de raisonnement.\"\n/>\n\n<GuideRecommendation \n  guideSlug=\"gestion-memoire-ia\" \n  reason=\"Apprenez à exploiter la fonctionnalité Projects de Claude Pro pour créer une mémoire à long terme et organiser vos conversations par thème ou matière.\"\n/>\n\n<ConceptRecommendation \n  conceptSlug=\"context-engineering\" \n  reason=\"Claude gère exceptionnellement bien les contextes longs et complexes. Découvrez comment optimiser vos interactions avec des techniques de context engineering.\"\n/>"
    }
  ]
};

// Validation et export
export const externalTool: ExternalTool = externalToolSchema.parse(externalToolData);