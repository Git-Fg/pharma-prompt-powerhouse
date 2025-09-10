import type { ExternalTool } from '@/lib/content-schema'

const externalTool = {
  slug: 'chatgpt',
  type: 'tool',
  title: 'ChatGPT',
  description: 'L\'interface de chat d\'OpenAI, une référence polyvalente avec un accès exclusif à GPT-5 en version payante.',
  url: 'https://chatgpt.com/',
  category: 'outils',
  tags: ['conversationnel', 'rédaction', 'openai', 'gpt-5'],
  isFavorite: false,

  personalReview: 'ChatGPT reste un pilier de mon arsenal. Avec l\'arrivée de GPT-5, la version payante est devenue incontournable pour les tâches exigeant une performance maximale. Sa nouvelle capacité de recherche web en temps réel le rend beaucoup plus pertinent pour les sujets d\'actualité ou la veille scientifique rapide.',

  strongPoints: [
    'Accès exclusif au modèle de pointe GPT-5 pour les abonnés Plus.',
    'Intégration native de la recherche web en temps réel, éliminant la barrière de la "date de fin de connaissance".',
    'Vaste écosystème de GPTs (version payante) pour des tâches spécialisées.',
    'Excellente mémoire conversationnelle pour l\'optimisation itérative de prompts.',
  ],

  vigilancePoints: [
    'La version gratuite (GPT-4o-mini) est maintenant nettement moins puissante que la version payante.',
    'Quota d\'usage sur GPT-5 (environ 150 messages / 3 heures) à prendre en compte.',
    'Politique de confidentialité "Opt-Out" par défaut : il faut désactiver manuellement l\'utilisation des données pour l\'entraînement.',
  ],

  confidenceScore: 4,
  confidenceJustification: 'Le score est élevé car c\'est un produit mature d\'un acteur majeur. Sa politique de confidentialité est claire (et on peut désactiver l\'entraînement sur nos données). La version payante est très fiable, mais la version gratuite peut être moins performante.',

  freeVsPaidOffer: `| Fonctionnalité | Version Gratuite | Version Payante (Plus ~20$/mois) |\n| :--- | :--- | :--- |\n| **Modèle principal** | GPT-4o-mini | ✅ **GPT-5** |\n| **Contexte max** | 128k tokens | ✅ **256k tokens** |\n| **Recherche Web** | ✅ Intégrée | ✅ Intégrée |\n| **Analyse de PDF** | Limitée | ✅ **Avancée** |\n| **GPTs personnalisés**| ❌ Non | ✅ **Accès illimité** |`,

  content: [
    {
      type: 'section',
      title: 'Comparaison des Offres : Gratuit vs Plus',
      content: 'ChatGPT propose une version gratuite avec GPT-4o-mini et une version payante (~20$/mois) avec GPT-5 et des fonctionnalités avancées.',
      variant: 'key-points',
    },
    {
      type: 'table',
      caption: 'Comparaison détaillée des fonctionnalités entre version gratuite et version Plus',
      headers: ['Fonctionnalité', 'Version Gratuite', 'Version Payante (Plus ~20$/mois)'],
      rows: [
        ['**Modèle principal**', 'GPT-4o-mini', '✅ **GPT-5**'],
        ['**Contexte max**', '128k tokens', '✅ **256k tokens**'],
        ['**Recherche Web**', '✅ Intégrée', '✅ Intégrée'],
        ['**Analyse de PDF**', 'Limitée', '✅ **Avancée**'],
        ['**GPTs personnalisés**', '❌ Non', '✅ **Accès illimité**'],
      ],
    },
    {
      type: 'card',
      title: 'Quand est-ce que j\'utilise ChatGPT ?',
      content: 'J\'utilise ChatGPT principalement pour :\n- **Obtenir des réponses rapides** sur des sujets généraux.\n- **Brainstormer** des idées pour un exposé ou un mémoire.\n- **Rédiger** des ébauches de textes, des emails ou des résumés.\n- **Traduire** des articles ou des documents de manière rapide.\n- **Dialoguer** avec l\'IA pour affiner un prompt étape par étape (optimisation itérative).',
    },
    {
      type: 'alert',
      variant: 'default',
      title: 'ChatGPT vs. OpenAI Playground : Mon Utilisation',
      content: 'Pour moi, **ChatGPT** est un **produit fini**, une application que j\'utilise pour accomplir des tâches. **OpenAI Playground** est mon **laboratoire**, un outil d\'expérimentation pour comprendre le fonctionnement des modèles et construire des prompts sur mesure. La maîtrise commence sur ChatGPT, mais l\'expertise se développe dans le Playground.',
    },
  ],
} satisfies ExternalTool

export { externalTool }
