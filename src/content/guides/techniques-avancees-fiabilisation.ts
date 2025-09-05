import type { Guide } from '@/lib/content-schema'

const guide = {
  slug: 'techniques-avancees-fiabilisation',
  title: "Techniques de Fiabilisation 2025 : De l'Instruction à la Vérification Autonome",
  description: "Le guide de référence sur les techniques de fiabilisation pour les LLMs de 2025 : Chain-of-Verification (CoVe), Step-Back Prompting, RASC et l'évolution du Tree-of-Thought.",
  icon: 'ShieldCheck',
  category: 'techniques-avancees',
  difficulty: 'avancé',
  estimatedTime: '30 minutes',
  tags: [
    'fiabilisation',
    'CoVe',
    'Step-Back',
    'RASC',
    'Chain-of-Thought',
    'Tree-of-Thought',
    'Self-Consistency',
    'prompt-engineering',
    '2025',
  ],
  isFavorite: true,
  isWorkflow: false,
  keyTakeaways: [
    "Le Chain-of-Thought reste fondamental pour structurer le raisonnement des modèles les plus puissants.",
    "Le Chain-of-Verification (CoVe) transforme l'IA en son propre fact-checker pour une meilleure fiabilité factuelle.",
    "Le Step-Back Prompting améliore la résolution de problèmes en forçant l'IA à raisonner sur des principes généraux avant d'aborder les détails.",
    "La Self-Consistency évolue vers une analyse de la qualité du raisonnement (RASC) plutôt qu'un simple vote majoritaire.",
    "Le Tree-of-Thought est de plus en plus assisté par des outils natifs des plateformes (scaffolding).",
  ],
  conceptSlugs: [
    'chain-of-thought',
    'tree-of-thought',
    'chain-of-verification',
    'step-back-prompting',
    'self-consistency',
  ],
  content: [
    {
      type: 'markdown',
      content: `## Fiabilisation 2025 : De l'Instruction à la Vérification Autonome
      
      En 2025, la fiabilisation des LLMs a changé de paradigme. Il ne s'agit plus seulement de bien instruire l'IA, mais de lui faire intégrer des mécanismes d'**auto-vérification**. Ce guide présente les techniques de pointe pour transformer un modèle puissant en un partenaire de raisonnement fiable.`,
    },
    {
      type: 'card',
      title: 'Le Paradoxe du Chain-of-Thought (CoT) : Plus Essentiel que Jamais',
      description: 'Pourquoi les modèles les plus puissants en ont le plus besoin.',
      content: `Contrairement à l'intuition, les modèles de 2025 (GPT-5, Gemini 2.5) sont si puissants que sans un guidage séquentiel comme le CoT, ils risquent de prendre des raccourcis logiques erronés. Le CoT agit comme un "canaliseur" qui force le modèle à exploiter sa puissance de manière structurée.
      
      **Benchmark GPT-5 (Fiabilité domaine médical) :**
      - **Taux d'erreur sans CoT :** 11.6%
      - **Taux d'erreur AVEC CoT :** **4.8%**
      
      Le CoT n'est plus une simple astuce, c'est une condition sine qua non pour la fiabilité.`,
    },
    {
      type: 'markdown',
      content: `## Les Nouvelles Techniques d'Auto-Vérification`,
    },
    {
      type: 'accordion',
      items: [
        {
          title: "1. Chain-of-Verification (CoVe) : L'Auto-Correction Factuelle",
          content: [
            {
              type: 'markdown',
              content: `Le CoVe dote le modèle d'un processus d'auto-correction. L'IA génère une réponse, puis planifie et exécute des vérifications factuelles sur ses propres affirmations avant de livrer une réponse finale corrigée.`,
            },
            {
              type: 'codeBlock',
              language: 'text',
              filename: 'prompt-cove-exemple.txt',
              content: `# QUESTION
Quels sont les principaux effets indésirables de la metformine?

# INSTRUCTIONS
Suis le processus Chain-of-Verification (CoVe) :
1. **Réponse Initiale :** Rédige une réponse initiale.
2. **Plan de Vérification :** Génère 3 questions pour vérifier les faits que tu as avancés.
3. **Exécution :** Réponds à chaque question de vérification de manière indépendante.
4. **Réponse Finale :** Rédige une réponse finale corrigée en te basant sur tes vérifications.`,
            },
          ],
        },
        {
          title: "2. Step-Back Prompting : Le Pouvoir de l'Abstraction",
          content: [
            {
              type: 'markdown',
              content: `Cette technique force l'IA à prendre du recul sur une question spécifique pour d'abord raisonner sur les principes généraux sous-jacents. Cela ancre la solution dans des fondamentaux solides et évite les erreurs dues aux détails trompeurs.`,
            },
            {
              type: 'codeBlock',
              language: 'xml',
              filename: 'prompt-step-back-exemple.xml',
              content: `# QUESTION INITIALE
Un patient sous warfarine commence un traitement par amiodarone. Faut-il ajuster la posologie de la warfarine?

# TÂCHE
1. Formule une question "step-back" plus générale qui capture le principe pharmacologique.
2. Réponds à cette question générale pour établir les principes.
3. Utilise ces principes pour répondre à la question initiale.

# SORTIE ATTENDUE
<question_step_back>[Ta question générale ici]</question_step_back>
<principes_generaux>[Tes principes ici]</principes_generaux>
<reponse_finale>[Ta réponse finale ici]</reponse_finale>`,
            },
          ],
        },
      ],
    },
    {
      type: 'markdown',
      content: `## Évolution des Techniques Établies`,
    },
    {
      type: 'card',
      title: 'Évolution du Tree-of-Thoughts (ToT) : Le Scaffolding Natif',
      content: `Le ToT n'est plus un simple "hack" de prompting. Les plateformes comme Anthropic (Claude) proposent désormais des outils natifs (comme l'outil \\\`<thinking>\\\`) qui permettent de construire des arbres de pensée de manière plus structurée et fiable. L'orchestration reste à la charge de l'utilisateur, mais l'implémentation est assistée.`,
    },
    {
      type: 'card',
      title: 'Optimisation de la Self-Consistency (RASC)',
      content: `La technique a évolué. Au lieu de simplement générer beaucoup de réponses à haute température et de prendre la plus fréquente, la nouvelle approche **Reasoning-Aware Self-Consistency (RASC)** analyse aussi la **qualité du raisonnement** de chaque réponse. Un raisonnement solide a plus de poids dans le "vote" final. Cela permet d'obtenir une fiabilité égale ou supérieure avec moins de calculs et une température plus modérée (0.5-0.7).`,
    },
  ],
} satisfies Guide
