import type { Guide } from '@/lib/content-schema'

export const guide = {
  slug: 'le-core-kit-ia-gratuit-en-2025',
  title: 'Le Core Kit de l\'Étudiant : Maîtriser l\'IA de Pointe sans Carte Bancaire en 2025',
  description: 'Découvrez le duo gagnant Z.AI + Google AI Studio : comment accéder aux capacités IA les plus avancées du moment sans débourser un euro. Guide complet d\'un workflow éprouvé sur le terrain.',
  difficulty: 'intermédiaire',
  category: 'outils',
  estimatedTime: '15 min de lecture + 30 min de pratique',
  icon: 'Star',
  isFavorite: true,
  isWorkflow: false,
  keyTakeaways: [
    'Le duo Z.AI + AI Studio offre 95% des capacités des solutions payantes',
    'Z.AI surpasse Perplexity pour la recherche planifiée et sourcée',
    'AI Studio est inégalé pour l\'analyse multimodale et la création d\'écosystèmes',
    'Workflow optimisé : Recherche (Z.AI) → Analyse (AI Studio) → Validation croisée',
  ],
  conceptSlugs: ['structuration-par-balises', 'hallucination-effet-indesirable'],
  tags: ['gratuit', 'workflow', 'recherche', 'multimodal'],
  content: [
    {
      type: 'alert',
      variant: 'default',
      title: '🎓 Retour d\'Expérience Terrain',
      content: 'Ce guide synthétise une approche éprouvée quotidiennement depuis septembre 2025. Le combo Z.AI + AI Studio permet d\'exploiter quasiment l\'ensemble des capacités les plus avancées du moment, **sans information bancaire** et avec une fiabilité supérieure à bien des solutions payantes.',
    },
    {
      type: 'markdown',
      content: '## Le Concept : Un Core Kit Réellement Gratuit',
    },
    {
      type: 'card',
      title: 'Pourquoi ce Duo Fonctionne',
      description: 'La synergie parfaite entre deux approches complémentaires',
      content: '**Z.AI** excelle dans la **recherche planifiée** avec GLM-4.5 et ses capacités d\'appel d\'outils avancées. Là où Perplexity utilise une approche RAG classique, Z.AI **planifie ses recherches** comme le ferait un humain expert.\n\n**Google AI Studio** complète parfaitement avec Gemini 2.5 Pro et son **contexte de 1M de tokens**, idéal pour l\'analyse approfondie et la création d\'écosystèmes multimodaux.\n\n**Le résultat** : Vous avez accès aux meilleures capacités mondiales d\'IA sans sortir votre carte bancaire.',
    },
    {
      type: 'tabs',
      defaultValue: 'core-workflow',
      tabs: [
        {
          value: 'core-workflow',
          title: 'Workflow Core Kit',
          content: [
            {
              type: 'card',
              title: '🔍 Étape 1 : Recherche avec Z.AI',
              description: 'La base solide de votre travail',
              content: '**Utilisez Z.AI pour :**\n- Recherche bibliographique sur nouveaux traitements\n- Création de présentations avec recherche web autonome\n- Génération de supports visuels et schémas\n- Vérification croisée d\'informations critiques\n\n**Avantage unique :** Son approche de recherche \'humaine\' avec raisonnement visible surpasse souvent Perplexity sur la fiabilité.',
            },
            {
              type: 'card',
              title: '🧠 Étape 2 : Analyse avec AI Studio',
              description: 'L\'analyse approfondie et multimodale',
              content: '**Transférez vers AI Studio pour :**\n- Analyse de documents longs (RCP, études cliniques)\n- Reconnaissance d\'images et transcription de manuscrits\n- Raisonnement multi-étapes complexe avec mode Thinking\n- Création d\'applications web interactives\n- Génération multimodale (images, vidéo, audio)\n\n**Contexte 1M tokens** = Analysez des documents entiers sans limitation',
            },
            {
              type: 'card',
              title: '✅ Étape 3 : Validation Croisée',
              content: '**Bonnes pratiques :**\n1. Confrontez les résultats des deux outils\n2. Utilisez AI Studio pour analyser les sources trouvées par Z.AI\n3. Validez les informations critiques avec des sources officielles\n4. Documentez vos sources pour traçabilité',
            },
          ],
        },
        {
          value: 'practical-examples',
          title: 'Exemples Concrets',
          content: [
            {
              type: 'card',
              title: 'Cas d\'Usage : Analyse d\'un Nouveau Traitement',
              description: 'Workflow complet étudiant en pharmacie',
              content: '**Sujet** : Nouveaux traitements Alzheimer approuvés en 2024-2025\n\n**Z.AI (Recherche) :**\n1. "Recherche les derniers traitements Alzheimer approuvés FDA/EMA 2024-2025"\n2. L\'agent effectue sa recherche planifiée\n3. Génère une présentation avec sources vérifiées\n\n**AI Studio (Analyse) :**\n1. Copie des sources trouvées pour analyse approfondie\n2. "Analyse ces RCP et compare mécanismes d\'action, efficacité, profil de sécurité"\n3. Génération d\'images explicatives avec Imagen\n4. Création d\'une application interactive de révision',
            },
            {
              type: 'codeBlock',
              language: 'text',
              filename: 'workflow-exemple.txt',
              content: '📋 Workflow Type : Recherche Pharmaceutique\n1. Z.AI - Recherche initiale :\n   "Trouve les dernières données sur l\'efficacité des inhibiteurs de SGLT2 \n   en insuffisance cardiaque. Focus sur les essais 2024-2025."\n   \n2. AI Studio - Analyse approfondie :\n   [Copier les sources trouvées]\n   "Analyse comparative des études DAPA-HF vs EMPEROR-Reduced vs nouvelles données 2025.\n   Structure : mécanisme, population, endpoints, résultats, place en thérapie."\n   \n3. Validation croisée :\n   - Vérifier cohérence entre les deux analyses\n   - Contrôler avec sources officielles (HAS, ESC/AHA)\n   - Documenter les références pour usage ultérieur',
            },
          ],
        },
        {
          value: 'advanced-tips',
          title: 'Techniques Avancées',
          content: [
            {
              type: 'card',
              title: '🎯 Optimisations Expertes',
              content: '**Pour Z.AI :**\n- Utilisez les modes Auto Think pour des analyses complexes\n- Exploitez l\'agent PPT pour des présentations avec recherche autonome\n- Testez les capacités de développement web pour créer des outils interactifs\n\n**Pour AI Studio :**\n- Activez le mode Thinking pour les raisonnements multi-étapes\n- Utilisez Function Calling pour simuler des interactions complexes\n- Exploitez Structured Outputs pour des réponses formatées\n- Testez Code Execution pour des calculs pharmacocinétiques',
            },
            {
              type: 'alert',
              variant: 'default',
              title: '💡 Astuce Pro',
              content: '**Synergie maximale :** Commencez toujours par Z.AI pour la recherche créative, puis basculez sur AI Studio pour l\'analyse rigoureuse. Cette séquence exploite les forces de chaque outil de manière optimale.',
            },
          ],
        },
      ],
    },
    {
      type: 'card',
      title: 'Core Kit vs Solutions Payantes - Comparaison Réaliste',
    },
    {
      type: 'table',
      headers: ['**Capacité**', '**Core Kit Gratuit**', '**Solutions Payantes**', '**Verdict**'],
      rows: [
        ['**Recherche web**', '🏆 Z.AI (GLM-4.5)', '⚖️ Perplexity Pro ($20)', '**Avantage gratuit**'],
        ['**Contexte long**', '🏆 AI Studio (1M tokens)', '⚖️ Claude Pro (200K tokens)', '**Avantage gratuit**'],
        ['**Multimodal**', '🏆 AI Studio (complet)', '⚖️ ChatGPT Plus ($20)', '**Avantage gratuit**'],
        ['**Créativité**', '🎨 Z.AI (suite complète)', '⚖️ Limité ailleurs', '**Avantage gratuit**'],
        ['**Confidentialité**', '⚠️ Risque (Asie/US)', '✅ Meilleur contrôle', 'Payant gagne'],
        ['**Support**', '❌ Communautaire', '✅ Support dédié', 'Payant gagne'],
        ['**Stabilité**', '⚡ Variable', '✅ SLA garantis', 'Payant gagne'],
      ],
      caption: '**Conclusion** : Le core kit gratuit offre 95% des capacités pour 0% du coût',
    },
    {
      type: 'alert',
      variant: 'destructive',
      title: '⚠️ Limites et Précautions',
      content: '**Confidentialité critique :** Les deux outils sont hébergés à l\'étranger (Asie/US) avec politiques de confidentialité variables. **Ne jamais utiliser de données sensibles, personnelles ou identifiables** dans le cadre d\'études cliniques ou recherche confidentielle.',
    },
    {
      type: 'tabs',
      defaultValue: 'getting-started',
      tabs: [
        {
          value: 'getting-started',
          title: 'Premiers Pas',
          content: [
            {
              type: 'card',
              title: '🚀 Setup Initial en 5 Minutes',
              description: 'Configuration optimale pour étudiants',
              content: '**1. Créer les comptes (gratuits, sans CB) :**\n- Z.AI : [chat.z.ai](https://chat.z.ai/) - Inscription directe\n- Google AI Studio : [aistudio.google.com](https://aistudio.google.com/) - Compte Google\n\n**2. Tester le workflow :**\n- Recherche simple sur Z.AI sur votre spécialité\n- Copier-coller le résultat dans AI Studio pour analyse\n- Comparer la richesse des deux approches\n\n**3. Marquer en favoris** les deux interfaces pour accès rapide quotidien',
            },
          ],
        },
        {
          value: 'troubleshooting',
          title: 'Résolution de Problèmes',
          content: [
            {
              type: 'card',
              title: 'Problèmes Courants & Solutions',
              content: '**Z.AI ne répond plus :**\n- Vérifier la connexion internet\n- Réessayer en mode navigation privée\n- Basculer temporairement sur AI Studio\n\n**AI Studio refuse l\'analyse :**\n- Réduire la taille du document (contexte max 1M tokens)\n- Reformuler la question de manière moins directive\n- Utiliser le mode Thinking pour analyses complexes\n\n**Résultats contradictoires :**\n- Normal et souhaitable pour validation croisée\n- Privilégier AI Studio pour l\'analyse technique\n- Privilégier Z.AI pour la recherche factuelle récente',
            },
          ],
        },
      ],
    },
    {
      type: 'guideRecommendation',
      slug: 'confidentialite-securite',
      reason: 'ESSENTIEL avant d\'utiliser ce core kit : comprendre les enjeux de confidentialité des plateformes gratuites hébergées à l\'étranger.',
    },
    {
      type: 'toolRecommendation',
      slug: 'z-ai',
      reason: 'Découvrir Z.AI en détail : capacités de recherche, outils créatifs et positionnement face à Perplexity.',
    },
    {
      type: 'toolRecommendation',
      slug: 'google-ai-studio',
      reason: 'Explorer l\'écosystème complet d\'AI Studio : bien plus qu\'un simple chat, c\'est une suite créative multimodale.',
    },
  ],
} satisfies Guide

export default guide
