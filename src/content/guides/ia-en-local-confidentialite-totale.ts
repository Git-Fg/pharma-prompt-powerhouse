// src/content/guides/ia-en-local-confidentialite-totale.ts
import type { Guide } from '@/lib/content-schema'

export const guide = {
  slug: 'ia-en-local-confidentialite-totale',
  title: 'IA en Local : Le Guide Complet Q3 2025 pour une Confidentialité Totale',
  description: 'Le guide de référence pour héberger des modèles IA sur votre machine en Q3 2025. Prérequis matériel (RTX 50-series, Apple M5), modèles recommandés (Qwen2.5-7B) et plateformes de déploiement (LM Studio, Ollama, Jan.ai).',
  difficulty: 'avancé',
  category: 'securite',
  estimatedTime: '25 min de lecture',
  icon: 'Lock',
  isFavorite: true,
  isWorkflow: false,
  keyTakeaways: [
    'En Q3 2025, les modèles 7-8B (comme Qwen2.5-7B) sont le nouveau standard pour l\'IA locale grand public.',
    'Une NVIDIA RTX 5060 (12GB) ou un MacBook M5 Pro (24GB) sont les nouvelles configurations de référence.',
    'LM Studio reste le plus simple pour débuter, mais Ollama propose désormais une application de bureau officielle, et Jan.ai est une alternative open-source complète.',
    'La quantification (GGUF Q4_K_M) est la clé pour faire tourner ces modèles efficacement.',
  ],
  conceptSlugs: ['context-engineering', 'memoire-ia', 'quantification-ia'],
  tags: ['local', 'confidentialité', 'sécurité', 'Q3 2025', 'Qwen', 'RTX 50', 'Apple M5'],
  content: [
    {
      type: 'alert',
      variant: 'default',
      title: '🎯 Mise à Jour Q3 2025',
      content: 'Ce guide a été entièrement révisé pour refléter l\'état de l\'art de l\'IA locale au troisième trimestre 2025. Les recommandations de matériel et de modèles ont changé de manière significative depuis début 2024.',
    },
    {
      type: 'markdown',
      content: `## Section 1 : Le Nouveau Standard des Modèles Locaux (<15B)
      
En Q3 2025, le compromis performance/taille a basculé. Grâce aux progrès matériels, les modèles de la classe **7-8 milliards de paramètres** sont devenus la nouvelle norme, offrant un gain de performance significatif en raisonnement et en compréhension par rapport à l\'ancienne génération de modèles 4B.`,
    },
    {
      type: 'table',
      caption: 'Tableau Comparatif des Modèles Locaux (<15B) - Q3 2025',
      headers: ['Modèle', 'Paramètres', 'Contexte Max', 'Licence', 'Score Moyen (FR)', 'VRAM Requise (GGUF Q4_K_M)', 'Cas d\'Usage Recommandé'],
      rows: [
        ['**Qwen2.5-7B-Instruct**', '7.6B', '131k', 'Apache 2.0', '**26.76**', '~5.5 GB', 'Polyvalent, excellent en français, code, raisonnement.'],
        ['**Llama 3.1 8B Instruct**', '8B', '**128k**', 'Llama 3.1 License', 'N/A', '~5.5 GB', 'Analyse de documents longs, écosystème robuste.'],
        ['**Mistral 7B Instruct v0.3**', '7.3B', '8k (extensible)', 'Apache 2.0', 'N/A', '~5.0 GB', 'Inférence rapide, configurations légères, baseline fiable.'],
        ['**Qwen3-4B (Baseline)**', '4B', '32k', 'Apache 2.0', 'N/A', '~3.0 GB', 'Configurations très légères, CPU uniquement, <8GB RAM.'],
      ],
    },
    {
      type: 'markdown',
      content: `### Recommandation : Qwen2.5-7B-Instruct
        
Pour un usage polyvalent en français, **Qwen2.5-7B-Instruct** est actuellement le meilleur choix. Il offre le meilleur compromis entre performance brute, excellence démontrée en langue française, et une licence Apache 2.0 permissive.`,
    },
    {
      type: 'markdown',
      content: `## Section 2 : Prérequis Matériels en Q3 2025`,
    },
    {
      type: 'table',
      caption: 'Matrice de Recommandation Matérielle - Q3 2025',
      headers: ['Plateforme', 'Puce/GPU', 'Mémoire', 'Modèles Recommandés', 'Perf. Attendue (tokens/s)', 'Cas d\'Usage Idéal', 'Prix Estimé'],
      rows: [
        ['PC (Standard)', 'NVIDIA RTX 5060', '12 GB VRAM', '7-8B (INT4/GGUF Q4), 14B (exp.)', '~55-65', 'Le nouveau standard pour une IA fluide', '~450€'],
        ['Mac (Standard)', 'Apple M5 Pro', '24 GB Unifiée', '7-8B (INT8), 14B (INT4)', '~40-60', 'Développement, analyse de documents', '~2500€'],
        ['PC (Performant)', 'NVIDIA RTX 5070', '12 GB VRAM', '7-8B (INT8/GGUF Q8), 14B (INT4)', '~70-90', 'Qualité et vitesse, contextes longs', '~650€'],
        ['Mac (Pro)', 'Apple M5 Max', '48 GB Unifiée', '14B (INT8), 32B (INT4)', '> 80', 'Recherche, fine-tuning local', '> 3500€'],
      ],
    },
    {
      type: 'markdown',
      content: `## Section 3 : Plateformes de Déploiement Local

Le marché des outils a évolué. Le choix ne se limite plus à LM Studio vs. Ollama en ligne de commande.`,
    },
    {
      type: 'table',
      caption: 'Tableau Comparatif des Outils de Déploiement Local - Q3 2025',
      headers: ['Critère', 'LM Studio', 'Ollama', 'Jan.ai'],
      rows: [
        ['**Licence**', 'Propriétaire, gratuit', 'MIT (Open Source)', 'AGPLv3 (Open Source)'],
        ['**Interface Principale**', 'GUI (Très intuitive)', 'CLI + GUI Officielle', 'GUI (Très complète)'],
        ['**Serveur API**', '✅ Compatible OpenAI', '✅ Compatible OpenAI', '✅ Compatible OpenAI'],
        ['**Profil Idéal**', 'Débutant, utilisateur non-technique', 'Développeur, utilisateur hybride', 'Utilisateur GUI pro-open source'],
      ],
    },
    {
      type: 'markdown',
      content: `### Recommandation de Démarrage
      Pour les débutants, **LM Studio** reste la solution la plus simple. Pour les utilisateurs préférant une solution open-source dès le départ, la nouvelle application officielle d'**Ollama** ou **Jan.ai** sont d\'excellentes alternatives.`,
    },
  ],
} satisfies Guide

export default guide
