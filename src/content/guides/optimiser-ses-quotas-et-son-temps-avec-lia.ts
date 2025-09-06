import type { Guide } from '@/lib/content-schema'

export const guide = {
  slug: 'optimiser-ses-quotas-et-son-temps-avec-lia',
  title: 'Optimiser ses Quotas et son Temps avec l\'IA',
  description: 'Maîtrisez l\'équilibre entre qualité, vitesse et utilisation de vos quotas gratuits dans vos interactions avec l\'IA.',
  icon: 'Gauge',
  category: 'techniques-avancees',
  difficulty: 'intermédiaire',
  estimatedTime: '20 minutes',
  tags: ['clinique', 'guide', 'pedagogie', 'pharmacie'],
  isFavorite: true,
  isWorkflow: false,
  keyTakeaways: [
    'Pour nous, étudiants, le \'coût\' de l\'IA est la limite de nos quotas gratuits sur les modèles puissants et le temps d\'attente.',
    'Optimisez vos prompts en étant concis (moins de tokens) pour faire plus de requêtes de qualité avec vos quotas quotidiens.',
    'Choisissez le bon modèle pour la tâche : un modèle rapide (Gemini Flash) pour les tâches simples, et un modèle puissant (GPT-4o, Gemini Pro) pour les analyses complexes.',
  ],
  conceptSlugs: ['token-acide-amine', 'context-engineering'],
  content: [
    {
      type: 'markdown',
      content: '# Optimiser ses Quotas et son Temps avec l\'IA\n\nEn tant qu\'étudiant, on n\'utilise pas les API payantes. Notre "monnaie", ce sont les **quotas de messages gratuits** sur les modèles les plus performants (comme GPT-4o ou Gemini 2.5 Pro) et notre **temps**. Ce guide vous montre comment maximiser ces deux ressources.',
    },
    {
      type: 'markdown',
      content: '## L\'Économie des Prompts sur les Web UI Gratuites\n\nChaque prompt a un "poids" en tokens. Plus un prompt est long, plus il "consomme" de ressources.\n\n-   **Impact sur les Quotas :** Un prompt mal formulé qui nécessite 5 itérations pour obtenir la bonne réponse a "gaspillé" 4 messages de votre quota quotidien sur un modèle puissant.\n-   **Impact sur le Temps (Latence) :** Un prompt de 300 mots prendra plus de temps à être traité qu\'un prompt optimisé de 500 mots, même s\'ils visent le même résultat.\n\nL\'objectif est donc d\'être **efficace** : obtenir le résultat souhaité en un minimum de messages et de temps.',
    },
    {
      type: 'markdown',
      content: '## Stratégies d\'Optimisation',
    },
    {
      type: 'card',
      title: '1. La Concision Intelligente',
      content: 'Le principe est simple : chaque mot de votre prompt doit avoir une utilité.\n\n-   **Utilisez des listes à puces** au lieu de longues phrases.\n-   **Employez des abréviations** standard (IEC, AOD, HTA).\n-   **Supprimez les politesses superflues** ("S\'il vous plaît, pourriez-vous..."). Soyez direct.',
    },
    {
      type: 'codeBlock',
      language: 'text',
      content: '**Avant (inefficace) :**\n> Peux-tu s\'il te plaît me donner une explication très détaillée et complète sur le mécanisme d\'action des inhibiteurs de l\'enzyme de conversion ?\n\n**Après (efficace) :**\n> Explique le mécanisme d\'action des IEC. Cible : étudiant en L2 pharmacie. Points clés : SRAA, bradykinine, effets cliniques.',
    },
    {
      type: 'card',
      title: '2. Choisir le Bon Outil pour la Tâche',
      content: 'Ne gaspillez pas un message de votre quota GPT-4o pour une tâche simple.\n\n-   **Tâches simples (résumé, reformulation) :** Utilisez les modèles par défaut, plus rapides et avec des quotas plus larges (ex: Gemini Flash sur AI Studio, le modèle standard de ChatGPT).\n-   **Tâches complexes (analyse de cas, raisonnement multi-étapes) :** C\'est là que vous devez utiliser votre quota de modèles "Pro" (GPT-4o, Gemini 2.5 Pro, GLM-4.5 en Thinking Mode).',
    },
    {
      type: 'card',
      title: '3. Structurer pour la Vitesse',
      content: 'Les IA traitent plus vite les informations bien structurées. Utiliser des balises XML simples (comme vu dans le guide dédié) ou des sections Markdown (`### Contexte`) aide l\'IA à "parser" votre demande plus rapidement.',
    },
    {
      type: 'markdown',
      content: '## Conclusion\n\nOptimiser ses prompts sur les interfaces gratuites, ce n\'est pas une question d\'argent, mais d\'efficacité. En étant concis et en choisissant le bon outil, vous maximiserez la valeur que vous tirez de vos quotas gratuits et passerez moins de temps à attendre les réponses.',
    },
  ],
} satisfies Guide

export default guide || concept || workflow
