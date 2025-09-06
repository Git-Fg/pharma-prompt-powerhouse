import type { Workflow } from '@/lib/content-schema'

export const workflow = {
  slug: 'memoriser-concepts-difficiles',
  title: 'Mémoriser des Concepts Difficiles avec l\'IA',
  description: 'Vaincre les listes et mécanismes complexes en utilisant l\'IA pour générer des mnémoniques, analogies et histoires mémorables.',
  icon: 'Brain',
  tags: ['mémoire', 'mnémonique', 'analogie', 'apprentissage'],
  isFavorite: false,
  category: 'apprentissage',
  difficulty: 'intermédiaire',
  estimatedTime: '12 min',
  conceptSlugs: ['température-dosage'],

  content: [
    {
      type: 'introduction',
      title: 'Le Problème : Les Limites de la Mémorisation Brute',
      content: `Face à des listes interminables (effets des bêta-bloquants, étapes du cycle de Krebs, classification des antibiotiques...), la mémorisation brute atteignait ses limites.

Les difficultés classiques :
- **Listes trop longues :** Impossible de retenir 15 effets secondaires par cœur
- **Concepts abstraits :** Difficile de visualiser des mécanismes moléculaires
- **Pas de liens logiques :** Informations isolées sans connexion
- **Oubli rapide :** Ce qui est mémorisé mécaniquement s'efface vite`,
    },
    {
      type: 'section',
      title: 'Mon Approche Initiale : Trop Générique',
      content: `Au début, j'ai essayé de demander simplement :

> *"Donne-moi un moyen de retenir les effets des bêta-bloquants."*

**Résultat :** Une liste d'acronymes génériques et peu mémorables, sans personnalisation ni créativité.`,
    },
    {
      type: 'alert',
      variant: 'destructive',
      title: 'Pourquoi ça ne marche pas',
      content: `L'IA propose des solutions "bateau" sans créativité. Les mnémoniques générés sont souvent artificiels et peu mémorables car ils ne s'adaptent pas à votre style d'apprentissage.`,
    },
    {
      type: 'section',
      title: 'La Stratégie Optimisée : Créativité Contrôlée',
      content: `J'ai découvert qu'il fallait guider l'IA vers plus de créativité tout en spécifiant mon style d'apprentissage.
Cette approche utilise la **température de dosage** pour contrôler la créativité.`,
    },
    {
      type: 'conceptRecommendation',
      slug: 'température-dosage',
      reason: 'Comprendre comment ajuster la créativité de l\'IA vous permet de générer des mnémoniques plus originales et mémorables.',
    },
    {
      type: 'points',
      title: 'Les 3 Étapes Clés',
      points: [
        {
          title: '🎭 Étape 1 : Stimuler la Créativité de l\'IA',
          description: `**Techniques pour plus d'originalité :**
- Demander des approches "originales", "inattendues", "humoristiques"
- Augmenter la température (Google AI Studio)
- Spécifier un style (narratif, visuel, métaphorique)`,
        },
        {
          title: '🎯 Étape 2 : Personnaliser selon votre Profil',
          description: `**Adapter à votre style d'apprentissage :**
- Visuel → Demander des images mentales, des couleurs
- Auditif → Demander des rimes, des chansons
- Kinesthésique → Demander des gestes, des mouvements`,
        },
        {
          title: '🔄 Étape 3 : Itérer pour Optimiser',
          description: `**Affiner la mémorabilité :**
- Demander 2-3 alternatives différentes
- Tester mentalement la facilité de rappel
- Combiner les meilleures parties de chaque proposition`,
        },
      ],
    },
    {
      type: 'section',
      title: 'Comparaison des Outils : Mon Retour d\'Expérience',
      content: `J'ai testé différentes plateformes pour optimiser la création de mnémoniques :`,
    },
    {
      type: 'tabs',
      defaultValue: 'google-ai-studio',
      tabs: [
        {
          value: 'google-ai-studio',
          title: 'Google AI Studio',
          content: [
            {
              type: 'markdown',
              content: `**Points forts :**
- Contrôle précis de la **Température** (créativité)
- Gratuit avec quota généreux
- Excellent pour itérer rapidement

**Réglages recommandés :**
- **Température 0.8-0.9** : Pour des mnémoniques créatifs
- **Température 0.2-0.4** : Pour des associations logiques

**Mon usage :** Mon outil de référence pour générer des mnémoniques originaux grâce au contrôle de créativité.`,
            },
          ],
        },
        {
          value: 'chatgpt',
          title: 'ChatGPT',
          content: [
            {
              type: 'markdown',
              content: `**Points forts :**
- Excellent en mode conversationnel pour affiner
- Bonne compréhension des instructions créatives
- Interface familière et rapide

**Techniques de créativité :**
- Ajouter "extrêmement original", "inattendu", "humoristique"
- Demander plusieurs styles différents
- Utiliser le mode "brainstorming"

**Mon usage :** Parfait pour itérer et personnaliser des mnémoniques en conversationnel.`,
            },
          ],
        },
        {
          value: 'claude',
          title: 'Claude AI',
          content: [
            {
              type: 'markdown',
              content: `**Points forts :**
- Très créatif naturellement pour les analogies complexes
- Excellent pour les métaphores élaborées
- Comprend bien les nuances pédagogiques

**Points faibles :**
- Pas de contrôle de température
- Limite de messages en gratuit

**Mon usage :** Excellent pour créer des analogies narratives complexes et des histoires mémorables.`,
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      title: 'Le Prompt Final : Template pour Mnémoniques Créatifs',
      content: `Voici mon template optimisé pour générer des mnémoniques mémorables :`,
    },
    {
      type: 'multiFormatPrompt',
      alternativeVersions: {
        standard: `Tu es un expert en neurosciences de l'apprentissage appliqué à la pharmacie.

Crée un mnémonique et une analogie EXTRÊMEMENT ORIGINAUX et mémorables pour :

**Concept Complexe :**
{{concept_complexe}}

**Mon Style d'Apprentissage :**
{{style_apprentissage}} (visuel/auditif/kinesthésique)

**Contexte :**
{{contexte_apprentissage}}

Procède ainsi :
1. **Analyse** : Décompose le concept en éléments clés
2. **Mnémonique** : Crée un acronyme ou phrase mémorable 
3. **Analogie** : Formule une métaphore visuelle/narrative
4. **Explication** : Explique chaque lien de manière simple

Sois créatif, inattendu et humoristique si approprié !`,
        xml: `<concept_complexe>
{{concept_complexe}}
</concept_complexe>

<style_apprentissage>
{{style_apprentissage}}
</style_apprentissage>

<contexte_apprentissage>
{{contexte_apprentissage}}
</contexte_apprentissage>

<thinking_process>
1. **Analyse Sémantique** : Décompose le concept en éléments clés.
2. **Création de Liens** : Associe chaque élément à des images ou idées familières.
3. **Génération de Mnémoniques** : Crée un acronyme ou une phrase mnémonique ORIGINALE.
4. **Construction d'Analogies** : Formule une analogie visuelle ou narrative mémorable.
</thinking_process>

<style_créatif>
Sois extrêmement original, inattendu et créatif. Utilise l'humour si approprié.
</style_créatif>

<format_sortie>
- Présente d'abord le mnémonique, puis l'analogie.
- Explique comment chaque élément se rapporte au concept.
- Adapte le langage au contexte d'apprentissage.
</format_sortie>`,
        aiStudio: {
          systemPrompt: `Tu es un expert en neurosciences de l'apprentissage appliqué à la pharmacie. Ta spécialité est de créer des mnémoniques et analogies pédagogiques EXTRÊMEMENT ORIGINAUX qui facilitent la mémorisation de concepts complexes en les reliant à des idées familières. Sois créatif, inattendu et humoristique.`,
          userPrompt: `Crée un mnémonique et une analogie pour le concept complexe suivant.

**Concept Complexe :**
{{concept_complexe}}

**Mon Style d'Apprentissage :**
{{style_apprentissage}}

**Contexte d'Apprentissage :**
{{contexte_apprentissage}}

Procède ainsi :
1. **Analyse** : Décompose le concept en éléments clés
2. **Mnémonique** : Crée un acronyme ou phrase mémorable
3. **Analogie** : Formule une métaphore visuelle/narrative  
4. **Explication** : Explique chaque lien

Température élevée recommandée (0.8-0.9) pour plus de créativité !`,
        },
      },
      recommendedTools: {
        standard: ['ChatGPT', 'Claude AI'],
        xml: ['Claude AI'],
        aiStudio: ['Google AI Studio', 'DeepSeek Chat'],
      },
      variables: [
        'concept_complexe : Le concept difficile à mémoriser (liste, mécanisme, etc.)',
        'style_apprentissage : Votre profil (visuel, auditif, kinesthésique)',
        'contexte_apprentissage : Le niveau (L1, L2, PACES) et objectifs',
      ],
    },
    {
      type: 'key-points',
      title: 'Ce qu\'il faut retenir',
      content: `Ce workflow montre comment transformer l'IA en un partenaire créatif pour la mémorisation. En contrôlant sa créativité et en personnalisant les réponses à votre style d'apprentissage, vous pouvez créer des mnémoniques bien plus efficaces que les solutions génériques.`,
    },
  ],

  keyTakeaways: [
    'La créativité de l\'IA peut être contrôlée : utilisez des adjectifs comme \'original\', \'inattendu\' dans vos prompts.',
    'Spécifier votre style d\'apprentissage (visuel/auditif/kinesthésique) améliore drastiquement la mémorabilité.',
    'Google AI Studio permet un contrôle précis de la créativité via le paramètre Température (0.8-0.9 recommandé).',
    'Toujours demander 2-3 alternatives différentes pour choisir la plus mémorable pour vous.',
    'Les mnémoniques personnalisés battent toujours les solutions génériques trouvées sur internet.',
  ],
} satisfies Workflow

export default workflow