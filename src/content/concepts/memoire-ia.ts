import type { Concept } from '@/lib/content-schema'

export const concept = {
  slug: 'memoire-ia',
  type: 'concept',
  title: 'La Mémoire de l\'IA : Contexte (RAM) vs Instructions (Disque Dur)',
  description: 'Comprenez la différence fondamentale entre la mémoire de travail volatile (fenêtre de contexte) et les techniques de mémoire persistante (instructions, GPTs, RAG).',
  icon: 'BrainCircuit',
  category: 'fondamentaux',
  difficulty: 'intermédiaire',
  tags: [],
  isFavorite: false,
  keyTakeaways: [
    'La mémoire de contexte (fenêtre) est temporaire et limitée, comme la RAM d\'un ordinateur',
    'La mémoire persistante (instructions, GPTs) fonctionne comme un disque dur permanent',
    'Combiner les deux types de mémoire optimise l\'efficacité des prompts',
    'Maîtriser ce flux d\'information distingue l\'utilisateur novice du prompt engineer expert',
  ],
  conceptSlugs: [],
  content: [
    {
      type: 'alert',
      variant: 'default',
      title: '💻 Analogie Informatique',
      content: 'La mémoire de l\'IA fonctionne **exactement comme un ordinateur** : une mémoire vive (RAM) pour le travail immédiat et un disque dur pour la persistance.',
    },
    {
      type: 'markdown',
      content: 'Pour interagir efficacement avec une IA, il faut comprendre comment elle "se souvient" des informations. On peut simplifier sa mémoire en deux catégories principales, très similaires au fonctionnement d\'un ordinateur.',
    },
    {
      type: 'tabs',
      defaultValue: 'contexte',
      tabs: [
        {
          value: 'contexte',
          title: 'Mémoire de Contexte (RAM)',
          content: [
            {
              type: 'card',
              title: '🧠 La Fenêtre de Contexte : La Mémoire Vive (RAM)',
              description: 'Mémoire temporaire pour le travail immédiat',
              content: 'La forme de mémoire la plus directe d\'une IA est sa **fenêtre de contexte**. C\'est la quantité totale d\'informations (votre prompt + les réponses précédentes de l\'IA + les documents fournis) que le modèle peut "voir" et traiter à un instant T.',
            },
            {
              type: 'card',
              title: 'Caractéristiques Clés',
              content: '**Analogie :** C\'est la **RAM** de l\'IA, ou la taille de son **bureau de travail**.\n\n**Force :** Plus la fenêtre est grande, plus le bureau est grand. Vous pouvez y étaler de nombreux documents (PDFs, notes) et l\'IA s\'en souviendra parfaitement... tant que vous ne quittez pas le bureau.\n\n**Évolution :** Les premiers modèles avaient quelques milliers de tokens (quelques pages). Les modèles de 2025 comme **Gemini 2.5 Pro** atteignent **1 à 2 millions de tokens** - l\'équivalent d\'une vingtaine de gros livres posés ouverts sur le bureau !',
            },
            {
              type: 'alert',
              variant: 'destructive',
              title: '⚠️ Faiblesse Critique',
              content: 'Cette mémoire est **volatile**. Dès que vous lancez une nouvelle conversation, cette mémoire est entièrement effacée. C\'est un nouveau bureau, vide.',
            },
          ],
        },
        {
          value: 'persistante',
          title: 'Mémoire Persistante (Disque Dur)',
          content: [
            {
              type: 'card',
              title: '💾 La Mémoire à Long Terme (Simulée) : Le Disque Dur',
              description: 'Stockage permanent des préférences et connaissances',
              content: 'Par nature, une IA n\'a pas de mémoire à long terme. Elle ne se souvient pas de vous entre deux conversations. Cependant, plusieurs techniques ont été développées pour **simuler un disque dur**.',
            },
            {
              type: 'card',
              title: '📌 Instructions Personnalisées - Le "Post-it" Permanent',
              description: 'Instructions qui persistent entre sessions',
              content: 'C\'est la forme la plus simple de mémoire à long terme. Disponible sur **ChatGPT** ou **Claude.ai**.\n\n**Analogie :** C\'est comme coller un **Post-it permanent** sur l\'écran de l\'IA avec vos préférences.\n\n**Exemple :** *"Je suis étudiant en pharmacie, réponds toujours en citant la classe pharmacologique des médicaments."*\n\n**Usage :** Idéal pour définir votre persona et vos préférences générales.',
            },
            {
              type: 'card',
              title: '🔧 GPTs & Assistants - Les "Logiciels Spécialisés"',
              description: 'Experts avec base de connaissances',
              content: 'Créer un **GPT (sur ChatGPT Plus)** ou un **Assistant (via l\'API d\'OpenAI)** avec une base de connaissances.\n\n**Analogie :** C\'est comme installer un **logiciel spécialisé** sur le disque dur.\n\n**Fonctionnement (RAG) :** L\'IA cherche d\'abord dans sa base de connaissances, puis place les documents pertinents dans sa mémoire vive.\n\n**Usage :** Parfait pour créer des experts sur des sujets de niche.',
            },
            {
              type: 'card',
              title: '📁 Projets & Workbenches - Les "Dossiers Thématiques"',
              description: 'Organisation par projet',
              content: 'Des plateformes comme **Claude.ai (Pro)** permettent de regrouper conversations et documents.\n\n**Analogie :** Organiser votre travail dans des **dossiers thématiques** sur votre disque dur.\n\n**Usage :** Très utile pour les projets de recherche à long terme.',
            },
          ],
        },
      ],
    },
    {
      type: 'markdown',
      content: '## Conclusion : Savoir sur quel "Disque" On Travaille',
    },
    {
      type: 'card',
      title: '🎯 Stratégie d\'un Bon Prompt Engineer',
      description: 'Utiliser les deux types de mémoire à son avantage',
      content: 'Un bon prompt engineer sait utiliser ces deux types de mémoire :\n\n- Il utilise la **fenêtre de contexte (la RAM)** pour la tâche immédiate, en y chargeant les documents et les instructions spécifiques au problème à résoudre.\n\n- Il configure la **mémoire à long terme (le disque dur)** via les instructions personnalisées, les GPTs ou les projets, pour s\'assurer que l\'IA dispose en permanence des connaissances de fond, des préférences et du rôle qu\'il attend d\'elle.',
    },
    {
      type: 'alert',
      variant: 'default',
      title: '🚀 Niveau Expert',
      content: 'Maîtriser ce flux d\'information entre la mémoire persistante et la mémoire de travail est la clé pour passer d\'un simple utilisateur à un véritable **pilote d\'IA**.',
    },
    {
      type: 'guideRecommendation',
      slug: 'gestion-memoire-ia',
      reason: 'Apprenez les techniques pratiques pour gérer activement la mémoire de l\'IA et éviter la \'démence contextuelle\'.',
    },
    {
      type: 'toolRecommendation',
      slug: 'chatgpt',
      reason: 'ChatGPT Plus offre les fonctionnalités les plus avancées pour la gestion de mémoire persistante avec les GPTs.',
    },
  ],
} satisfies Concept

export default concept
