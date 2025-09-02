// src/content/external-tools-new/notebooklm.ts
import { ExternalTool, externalToolSchema } from '@/lib/content-schema';

const externalToolData = {
  "slug": "notebooklm",
  "title": "NotebookLM : Votre Assistant de Recherche Personnalisé",
  "description": "Transformez vos documents de cours, articles et notes en une base de connaissances interactive avec laquelle vous pouvez dialoguer, grâce à l'IA de Google.",
  "difficulty": "débutant",
  "tags": [],
  "isFavorite": false,
  "keyTakeaways": [
    "NotebookLM crée un chatbot personnalisé à partir de vos documents (PDF, articles, notes)",
    "Parfait pour synthétiser de gros volumes de littérature scientifique en pharmacie",
    "Génère des podcasts audio automatiques pour réviser en déplacement",
    "Gratuit et intégré à l'écosystème Google, avec une interface intuitive"
  ],
  "conceptSlugs": [
    "context-engineering"
  ],
  "url": "https://notebooklm.google.com/",
  "category": "Assistant de Recherche",
  "pricing": "Gratuit",
  "capabilities": [],
  "use_cases": [
    "Synthèse de multiples cours",
    "Préparation de thèse/mémoire",
    "Analyse de littérature scientifique"
  ],
  "color": "bg-yellow-500",
  "tldr": "Google transforme vos documents en assistant personnel. Uploadez vos cours, posez des questions, obtenez des synthèses instantanées. Idéal pour révisions et recherche académique.",
  "content": [
    {
      "type": "markdown",
      "content": "## Qu'est-ce que NotebookLM ?\n\nNotebookLM est l'outil de recherche assistée par IA de Google qui révolutionne la façon dont les étudiants travaillent avec leurs documents. Imaginez pouvoir \"discuter\" avec tous vos cours de pharmacologie, vos articles de recherche et vos notes de révision comme s'ils étaient un professeur personnel disponible 24h/24.\n\nL'outil analyse vos documents téléchargés et crée un assistant conversationnel spécialisé dans votre contenu, capable de répondre à des questions précises, de créer des synthèses et même de générer des podcasts audio pour réviser en déplacement.\n\n## Fonctionnalités Clés pour les Étudiants en Pharmacie\n\n### 📚 **Création d'une Base de Connaissances Personnalisée**\n\n- **Upload Multiple :** Téléchargez simultanément tous vos PDF de cours, articles scientifiques, et notes personnelles\n- **Formats Supportés :** PDF, documents Google, sites web, notes manuscrites numérisées\n- **Capacité :** Jusqu'à 50 documents par notebook, avec une limite totale généreuse\n- **Organisation :** Créez différents notebooks par matière (pharmacologie, toxicologie, galénique...)\n\n### 🔍 **Interrogation Intelligente de Contenu**\n\nNotebookLM excelle dans l'analyse contextuelle de vos documents :\n\n- **Questions Précises :** *\"Quels sont les effets indésirables des inhibiteurs de l'ECA mentionnés dans mes cours ?\"*\n- **Synthèse Comparative :** *\"Compare les mécanismes d'action des diurétiques selon mes différentes sources\"*\n- **Recherche Ciblée :** Trouve instantanément les passages pertinents avec références aux sources\n\n### 🎧 **Génération de Podcasts Audio (Audio Overview)**\n\nUne fonctionnalité révolutionnaire pour les étudiants :\n\n- **Podcast Automatique :** Transforme vos documents en discussion audio entre deux \"présentateurs IA\"\n- **Format Digestible :** 10-20 minutes de synthèse audio de vos contenus les plus importants\n- **Révision Mobile :** Écoutez vos cours pendant vos trajets ou séances de sport\n- **Ton Engageant :** Les IA présentent le contenu de manière conversationnelle et accessible\n\n## Cas d'Usage Concrets en Pharmacie\n\n### 🧬 **Préparation d'Examen**\n\nCréez un notebook \"Révisions Pharmacologie\" avec :\n- Tous vos cours magistraux en PDF\n- Les fiches résumés de chaque classe thérapeutique\n- Articles complémentaires sur les nouvelles molécules\n\n**Prompt exemple :** *\"Crée-moi un QCM de 20 questions sur les anti-inflammatoires en te basant sur mes documents, avec les réponses justifiées\"*\n\n### 📖 **Recherche Bibliographique**\n\nPour un mémoire ou un exposé :\n- Uploadez 10-15 articles scientifiques sur votre sujet\n- Posez des questions transversales pour identifier les consensus et controverses\n- Demandez une synthèse structurée avec les références bibliographiques\n\n### 🔬 **Analyse de Cas Cliniques**\n\n- Compilez des cas cliniques similaires dans un notebook\n- Interrogez les patterns diagnostiques et thérapeutiques\n- Générez des cas d'entraînement basés sur vos exemples réels\n\n## Avantages et Limites\n\n| Avantages | Limites |\n| :--- | :--- |\n| ✅ **Totalement Gratuit :** Aucune limite de temps, intégration Google Workspace | ⚠️ **Dépendance aux Sources :** La qualité des réponses dépend entièrement de vos documents uploadés |\n| ✅ **Interface Intuitive :** Prise en main immédiate, pas de courbe d'apprentissage | ⚠️ **Pas de Mise à Jour Auto :** Les informations restent figées au moment de l'upload |\n| ✅ **Citations Précises :** Chaque réponse inclut les références exactes dans vos documents | ⚠️ **Limites Linguistiques :** Optimisé pour l'anglais, performances variables en français |\n| ✅ **Audio Overview :** Révolution pour l'apprentissage auditif et mobile | ⚠️ **Confidentialité :** Vos documents sont analysés par les serveurs Google |\n\n## Workflow Recommandé pour Étudiants\n\n1. **Organisation Initiale**\n   - Créez un notebook par UE ou par système (cardiovasculaire, respiratoire...)\n   - Uploadez méthodiquement tous vos supports de cours\n\n2. **Enrichissement Progressif**\n   - Ajoutez régulièrement articles et notes de TD\n   - Intégrez vos propres fiches de révision au format PDF\n\n3. **Utilisation Active**\n   - Commencez chaque session de révision par des questions générales\n   - Affinez progressivement vers des points spécifiques\n   - Générez un podcast audio avant les examens pour les révisions passives\n\n4. **Collaboration Intelligente**\n   - Partagez vos notebooks les plus réussis avec vos collègues\n   - Créez des notebooks collaboratifs pour les projets de groupe\n\n## Conclusion : La Révolution de l'Étude Personnalisée\n\nNotebookLM transforme radicalement la relation entre l'étudiant et ses documents de cours. Plus besoin de feuilleter frénétiquement des centaines de pages pour retrouver une information : votre assistant personnel connaît tout votre contenu par cœur.\n\nL'outil est particulièrement puissant pour les étudiants en sciences de la santé qui doivent maîtriser des volumes importants d'informations techniques et les interconnecter. C'est votre professeur particulier, disponible instantanément, qui ne juge jamais et répond à toutes vos questions avec patience.\n\n<GuideRecommendation guideSlug=\"gestion-memoire-ia\" reason=\"Approfondissez votre compréhension de la mémoire contextuelle pour optimiser vos notebooks NotebookLM\" />\n\n<ConceptRecommendation conceptSlug=\"context-engineering\" reason=\"Maîtrisez l'art de structurer le contexte pour des interactions plus efficaces avec NotebookLM\" />\n\n<ToolRecommendation toolSlug=\"claude-ai\" reason=\"Complétez NotebookLM avec Claude.ai pour des analyses encore plus poussées de vos documents\" />"
    }
  ]
};

// Validation et export
export const externalTool: ExternalTool = externalToolSchema.parse(externalToolData);