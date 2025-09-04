import type { Workflow } from '@/lib/content-schema';

export const workflow = {
  slug: 'creer-fiches-de-revision',
  title: 'Créer des Fiches de Révision Avancées avec ma Chaîne de Prompts',
  description: 'Ma méthodologie complète en 7 étapes pour transformer questions d\'examens et cours en fiches de révision structurées, avec mnémotechniques et format optimisé pour les étudiants TDAH.',
  icon: 'FileText',
  tags: ['révision', 'qcm', 'chaîne-de-prompts', 'mnémotechniques', 'apprentissage', 'accessibilité'],
  isFavorite: true,
  category: 'apprentissage',
  difficulty: 'avancé',
  estimatedTime: '45-60 min',
  conceptSlugs: ['chaîne-de-prompts', 'context-engineering', 'structuration-par-balises'],
  
  problem: [
    {
      type: 'markdown',
      content: `## Le Problème : Les Fiches Classiques Ne Suffisent Plus

Après avoir testé toutes les méthodes de révision classiques, j'ai réalisé qu'elles avaient un défaut majeur : **elles ne reproduisent pas la complexité cognitive des examens**.

Les limitations des approches traditionnelles :
- **Questions isolées :** Pas de liens thématiques entre les concepts
- **Révision passive :** Relecture sans véritable compréhension active  
- **Manque de mnémotechniques :** Difficile de retenir des listes complexes
- **Format inadapté :** Pas optimisé pour les étudiants avec TDAH ou besoins spécifiques
- **Aucune structuration :** Impossible de créer un plan de révision cohérent`
    },
    {
      type: 'alert',
      variant: 'default',
      title: 'Mon Constat Personnel',
      content: `En tant qu'étudiant en pharmacie, j'ai découvert que les examens testent rarement des connaissances isolées. Ils évaluent notre capacité à **mobiliser des concepts interconnectés**, souvent sous contrainte de temps. Mes anciennes méthodes de révision ne préparaient pas à cette réalité.`
    }
  ],

  initialApproach: [
    {
      type: 'markdown',
      content: `## Mon Approche Initiale (et ses Limites Évidentes)

Au début, comme beaucoup d'étudiants, j'ai testé des prompts simples :

> *"Génère 10 QCM sur les anti-inflammatoires à partir de ce cours."*

**Résultat :** Questions déconnectées, sans progression logique, et surtout sans aucune aide pour la mémorisation des concepts complexes.`
    },
    {
      type: 'alert',
      variant: 'destructive',
      title: 'Pourquoi ça échoue totalement',
      content: `Cette approche ignore complètement la science cognitive de l'apprentissage. L'IA produit du contenu sans structure pédagogique, sans liens entre concepts, et sans tenir compte des difficultés spécifiques de mémorisation en pharmacie (classifications, mécanismes, interactions...).`
    },
    {
      type: 'markdown',
      content: `## Le Déclic : Découverte des Chaînes de Prompts

Tout a changé quand j'ai découvert le concept de **chaîne de prompts**. Au lieu d'une seule instruction générique, j'ai appris à décomposer la création de fiches en étapes logiques et contrôlables.`
    },
    {
      type: 'conceptRecommendation',
      slug: 'chaîne-de-prompts',
      reason: 'Les chaînes de prompts sont la fondation de ma méthodologie avancée. Comprendre ce concept est essentiel pour saisir pourquoi cette approche est si efficace.'
    }
  ],

  optimizedStrategy: [
    {
      type: 'markdown',
      content: `## Ma Méthodologie Avancée : La Chaîne de 7 Prompts

Après des mois d'expérimentation, j'ai développé une méthodologie complète qui transforme n'importe quels documents d'examen et cours en fiches de révision de qualité professionnelle. Cette approche utilise une **chaîne de 7 prompts spécialisés** (P0 à P6 + P7), chacun ayant une mission précise.`
    },
    {
      type: 'alert',
      variant: 'default',
      title: '🎯 L\'Avantage Décisif',
      content: `Cette méthode ne se contente pas de générer des questions. Elle **analyse**, **structure**, **enrichit** et **optimise** le contenu pour créer deux livrables distincts : une fiche Q&R complète et une fiche de révision condensée. Le tout avec des mnémotechniques intégrées !`
    },
    {
      type: 'markdown',
      content: `### 📋 Vue d'Ensemble de la Chaîne

La méthodologie se décompose en deux phases distinctes :`
    },
    {
      type: 'tabs',
      defaultValue: 'phase1',
      tabs: [
        {
          value: 'phase1',
          title: 'Phase 1 : Fiche Q&R (P0-P6)',
          content: [
            {
              type: 'markdown',
              content: `**Objectif :** Créer une fiche Questions-Réponses complète et pédagogique

**Prompts utilisés :**
- **P0** : Instructions système pour l'Assistant IA Pédagogique
- **P1** : Analyse approfondie des questions d'examen (QROC, QCM, Cas Cliniques)
- **P2** : Organisation thématique par clustering
- **P3** : Génération des rappels de cours + mnémotechniques
- **P4** : Génération des réponses adaptées au type + nouvelles mnémotechniques
- **P5** : Génération du plan détaillé et demande de confirmation
- **P6** : Assemblage final de la fiche Q&R en Markdown`
            }
          ]
        },
        {
          value: 'phase2',
          title: 'Phase 2 : Fiche Révision (P7)',
          content: [
            {
              type: 'markdown',
              content: `**Objectif :** Créer une fiche de révision condensée en format tableau

**Prompt utilisé :**
- **P7** : Génération d'une fiche de révision optimisée pour la révision de dernière minute, avec tableaux structurés par cluster thématique.

Cette phase utilise les résultats des étapes précédentes pour créer un format ultra-condensé et accessible.`
            }
          ]
        }
      ]
    },
    {
      type: 'markdown',
      content: `### 🔧 Prérequis et Outils Recommandés

**Documents nécessaires :**
1. **Document "Questions d'Examen"** : QROC, QCM ou Cas Cliniques de vos annales
2. **Document "Matériel de Cours"** : Votre cours complet sur le sujet

**Outil recommandé :** Google AI Studio (mon choix personnel)`
    },
    {
      type: 'toolRecommendation',
      slug: 'google-ai-studio',
      reason: 'AI Studio est parfait pour cette méthodologie : fenêtre de contexte massive (1M tokens), mode System Prompt, et possibilité de sauvegarder vos chaînes de prompts dans des projets organisés.'
    },
    {
      type: 'alert',
      variant: 'default',
      title: '⚠️ Avertissements Essentiels',
      content: `**Sur la Performance :** Les résultats présentés ici sont des exemples. Le paysage de l'IA évolue constamment et les performances des modèles peuvent changer. La seule façon de trouver la solution optimale pour *votre* besoin est d'expérimenter et de comparer.

**Sur la Fiabilité du Contenu Généré :** Une IA, même la plus avancée, peut commettre des erreurs, omettre des informations cruciales ou "halluciner". Dans le domaine de la santé, toute information générée par une IA doit être systématiquement vérifiée avec des sources fiables et validées. **N'utilisez jamais une information non vérifiée pour une décision clinique ou académique importante.**

**Sur la Confidentialité :** La règle d'or : si vous ne l'écririez pas sur une carte postale, ne le mettez pas dans un prompt. N'utilisez **jamais** de données personnelles, identifiables ou de patient sur une plateforme en ligne. Je précise le niveau de risque perçu pour chaque outil, mais la prudence absolue reste votre meilleure protection.`
    }
  ],

  toolComparison: [
    {
      type: 'markdown',
      content: `## Écosystème d'Outils : Ma Stack Complète pour les Fiches Avancées

Ma méthodologie utilise plusieurs outils complémentaires selon les besoins. Voici mon retour d'expérience après des centaines d'heures de test :`
    },
    {
      type: 'tabs',
      defaultValue: 'aistudio',
      tabs: [
        {
          value: 'aistudio',
          title: '🏆 Google AI Studio (Principal)',
          content: [
            {
              type: 'markdown',
              content: `**Mon choix N°1 pour la chaîne complète**

**Pourquoi c'est parfait pour cette méthodologie :**
- **Contexte massif (1M tokens)** : Peut traiter des cours entiers sans problème
- **Mode System Prompt** : Idéal pour définir le rôle d'Assistant IA Pédagogique (P0)
- **Sauvegarde de projets** : Je peux organiser mes chaînes par matière
- **Totalement gratuit** : Aucune limite restrictive pour un usage étudiant

**Mes astuces spécifiques :**
- Je crée un projet par matière (Pharmacologie, Chimie...)
- J'utilise le mode "Thinking" pour les analyses complexes (P1, P2)
- La fenêtre de contexte permet de faire toute la chaîne en une session`
            }
          ]
        },
        {
          value: 'complementaires',
          title: 'Outils Complémentaires',
          content: [
            {
              type: 'accordion',
              items: [
                {
                  title: '🎯 Chat Z.AI - Pour la Recherche Complémentaire',
                  content: [
                    {
                      type: 'markdown',
                      content: `**Cas d'usage :** Enrichir mes cours avec des recherches actualisées

**Pourquoi je l'utilise :**
- Agent de recherche "planifié" qui surpasse souvent Perplexity
- Parfait pour chercher des études récentes sur un mécanisme d'action
- **Bonus :** Génération de slides directement à partir de la recherche

**Mon workflow :** Recherche sur Z.AI → Import des résultats dans AI Studio pour l'intégrer à ma chaîne de prompts`
                    },
                    {
                      type: 'toolRecommendation',
                      slug: 'z-ai',
                      reason: 'Excellent pour enrichir vos cours avec des données récentes avant de lancer la chaîne de prompts principale.'
                    }
                  ]
                },
                {
                  title: '🎨 Qwen Chat - Pour la Génération d\'Images',
                  content: [
                    {
                      type: 'markdown',
                      content: `**Cas d'usage :** Créer des schémas et illustrations pour mes fiches

**Ses atouts uniques :**
- Génération d'images de qualité pour illustrer des mécanismes
- Édition d'image sémantique pour adapter des schémas existants
- Excellent en mathématiques pour les calculs de pharmacocinétique

**Mon workflow :** Après avoir créé ma fiche avec AI Studio, j'utilise Qwen pour générer des visuels explicatifs des concepts clés`
                    },
                    {
                      type: 'toolRecommendation',
                      slug: 'qwen-chat',
                      reason: 'Les capacités de génération d\'images de Qwen complètent parfaitement les fiches textuelles créées avec AI Studio.'
                    }
                  ]
                },
                {
                  title: '📊 Alternatives pour la Chaîne Principale',
                  content: [
                    {
                      type: 'table',
                      headers: ['Outil', 'Avantages', 'Inconvénients', 'Mon Verdict'],
                      rows: [
                        ['**Claude AI**', 'Excellent contexte médical, Structuration par balises native', 'Quota restrictif gratuit', 'Parfait pour les cas cliniques complexes'],
                        ['**ChatGPT**', 'Interface intuitive, Mémoire conversationnelle', 'Contexte plus limité', 'Bon pour débuter avec la méthode'],
                        ['**DeepSeek Chat**', 'Puissant et gratuit', 'Risques de confidentialité', 'Uniquement pour données publiques']
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: 'alert',
      variant: 'default',
      title: '🚀 Ma Stack Recommandée Complète',
      content: `**Principal :** Google AI Studio pour toute la chaîne de prompts
**Recherche :** Z.AI pour enrichir le contexte avec des données récentes  
**Visuel :** Qwen Chat pour générer des schémas explicatifs
**Présentation :** Z.AI Slides pour transformer les fiches en présentations

Cette combinaison couvre 100% de mes besoins de révision, de la création à la présentation.`
    }
  ],

  finalPrompt: [
    {
      type: 'markdown',
      content: `## La Chaîne de Prompts Complète : Ma Méthodologie Détaillée

Voici l'intégralité de ma chaîne de 7 prompts, prête à être utilisée dans Google AI Studio. Chaque prompt a été testé et optimisé sur des centaines de fiches.`
    },
    {
      type: 'alert',
      variant: 'default',
      title: '📋 Mode d\'emploi',
      content: `1. **Copiez le Prompt P0** dans le System Prompt d'AI Studio
2. **Exécutez les prompts P1 à P6** dans l'ordre, en copiant-collant la sortie précédente à chaque étape
3. **Utilisez P7** pour générer la fiche de révision condensée à partir des résultats de P6
4. **Vérifiez toujours** le contenu généré avec vos sources officielles`
    },
    {
      type: 'accordion',
      items: [
        {
          title: 'P0 : Instructions Système (System Prompt)',
          content: [
            {
              type: 'codeBlock',
              language: 'markdown',
              content: `**Rôle Fondamental :** Tu es un Assistant IA Pédagogique expert, spécialisé dans l'analyse de documents et la génération de contenu éducatif structuré, accessible et mémorisable. Tu opères **exclusivement en mode hors ligne**, sans aucun accès à des connaissances externes ou à Internet.

**Objectif Principal :** Générer une fiche Questions-Réponses (Q&R) pédagogiquement utile au format Markdown, **spécifiquement conçue pour des étudiants bénéficiant d'une information très structurée, visuellement claire, décomposée et enrichie d'aides mnémotechniques (ex: apprenants avec TDAH)**. Cette fiche doit être basée **strictement et uniquement** sur le contenu de deux documents fournis :
1. Le document "Questions d'Examen" (pouvant contenir des QROC, QCM, ou Cas Cliniques).
2. Le document "Matériel de Cours".
Ensuite (via Prompt 7), générer une fiche de révision distincte et condensée, optimisée pour une révision de dernière minute.

**Principes Directeurs et Contraintes Inviolables :**

1. **Mode Hors Ligne Strict :** N'utilise **AUCUNE** information externe.
2. **Fidélité aux Sources pour les Faits :** Respecte scrupuleusement le contenu factuel (définitions, formules, explications) des documents fournis. **Exception :** Tu es autorisé et encouragé, lors de l'étape P3 et P4, à **générer des moyens mnémotechniques** pour faciliter la mémorisation, à condition qu'ils soient **directement ancrés dans les concepts clés extraits du Matériel de Cours**.
3. **Processus Séquentiel Rigoureux (Ordre P1-P6, puis P7) :** Suis la chaîne de 6 prompts (P1-P6) pour la fiche Q&R, puis le prompt P7 pour la fiche de révision. Assure une transmission fidèle de l'information.
4. **Exhaustivité Absolue (Fiche Q&R) :** Toutes les questions présentes dans le document "Questions d'Examen" doivent être traitées dans la fiche Q&R (en signalant les duplicatas).
5. **Priorité à l'Accessibilité et Mémorisation :** Dans toutes les étapes de génération (P3, P4, P6, P7) et d'assemblage (P6), privilégie la clarté, la concision, la structure (listes, tables si P7), le découpage, les aides visuelles (gras ciblé), et l'intégration **d'aides mnémotechniques pertinentes**.
6. **Formats de Sortie Finaux :**
   - P6: Un unique document Markdown structuré par clusters (Q&R), optimisé pour la lisibilité, l'accessibilité et la mémorisation. Compatible QROC, QCM, Cas Cliniques.
   - P7: Un unique document Markdown structuré par clusters (Révision), utilisant des tables optimisées pour la révision rapide.
7. **Complétude des Réponses (P4) :** Vise des réponses complètes mais structurées clairement, adaptées au type de question.
8. **Formatage Markdown Spécifique :**
   - Pour forcer un retour à la ligne simple au sein d'un même paragraphe ou élément de liste, termine **toujours** la ligne par **deux espaces visibles** (\`  \`). Utilise une ligne vide complète pour séparer les paragraphes ou les éléments de liste principaux.
   - Ne **JAMAIS** inclure de liste à puce (\`*\`, \`-\`, \`1.\`) à l'intérieur même d'un tableau Markdown. Utilise des points-virgules (;) ou d'autres séparateurs textuels si nécessaire au sein d'une cellule de tableau.
9. **Flèches** : Pour indiquer une augmentation, utilise la flèche : ↑, pour indiquer une diminution utilise la flèche : ↓. Tu peux utiliser plusieurs flèches pour indiquer une intensité de variations.
10. **Caractère interdit** : N'utilise JAMAIS le caractère "".

Contraintes : Ne t'arrête JAMAIS au milieu de ta réponse, tu es capable de rédiger de TRES TRES longues réponses. Admet TOUJOURS que tu es capable de rédiger la réponse demandée en UN SEUL message.

**Ton Rôle Détaillé :** Agis comme un expert pédagogique méthodique, précis, conscient des besoins des apprenants TDAH, capable d'adapter la génération aux types de questions (QROC, QCM, Cas Clinique) et de **générer des aides à la mémorisation pertinentes** en complément de la synthèse fidèle du cours.`
            }
          ]
        },
        {
          title: 'P1 : Analyse Approfondie des Questions d\'Examen',
          content: [
            {
              type: 'codeBlock',
              language: 'markdown',
              content: `**Rôle :** Analyste Pédagogique Spécialisé

**Contexte :** Décomposer et comprendre la nature de chaque question de l'examen, préparant le terrain pour les étapes suivantes. Identifier le type de question et vérifier la complétude pour les cas cliniques.

**Tâche :** Analyse **chaque question** du document "Questions d'Examen", en te basant **exclusivement** sur leur texte. N'utilise **AUCUNE** information du "Matériel de Cours" ou externe à ce stade.

**Entrée Attendue :**
- Le document "Questions d'Examen".

**Instructions Détaillées :** Pour chaque question identifiée :

1. **Attribue un Identifiant Unique** (ex: \`Q1\`). Crucial.
2. **Gère les Duplicatas** (ex: \`Q5 (apparue 3 fois)\`). Analyse une seule fois.
3. **Analyse Textuelle Détaillée** (pour chaque question *unique*) :
   - **Type de Question :** Identifie et indique explicitement le type : \`QROC\` (rédactionnel), \`QCM\` (multiple choice), ou \`Cas Clinique\`.
   - Sujet principal.
   - Type de compétence cognitive évaluée (mémorisation, analyse, application, synthèse...).
   - Termes, concepts ou verbes clés explicites nécessitant attention.
   - Difficulté apparente (faible, moyenne, élevée) justifiée.
   - Concepts fondamentaux prérequis (inférés).
   - Dépendance envers d'autres questions (si apparente).
   - **Pour QCM :** Liste les propositions fournies (sans les évaluer).
   - **Pour Cas Clinique :** Vérifie si le texte de la question *semble contenir toutes les informations contextuelles nécessaires* pour y répondre de manière indépendante. Si du contexte semble manquer *dans le texte même de la question*, signale-le (ex: 'Contexte potentiellement incomplet dans la question Qx').
4. **Processus Interne :** Développe cette analyse textuelle.

**Format de Sortie :** Texte continu présentant l'analyse détaillée pour chaque question unique (commençant par son ID et incluant son type). Assure-toi que **toutes** les questions sont référencées.

Important : Ne t'arrête JAMAIS au milieu de ta réponse, tu es capable de rédiger de TRES TRES longues réponses. Admet TOUJOURS que tu es capable de rédiger la réponse demandée en UN SEUL message.

**Rappel Crucial :** Analyse **exclusivement** basée sur les questions. Précision fondamentale. L'identification du type de question est essentielle. Pour les cas cliniques, évalue la présence des informations *dans la question elle-même*.`
            }
          ]
        },
        {
          title: 'P2 : Organisation Thématique par Clustering',
          content: [
            {
              type: 'codeBlock',
              language: 'markdown',
              content: `**Rôle :** Architecte de l'Information Pédagogique

**Contexte :** Regroupe les questions (analysées en P1) en ensembles thématiques cohérents, basé **uniquement** sur cette analyse P1.

**Tâche :** Regroupe les questions (\`ID\` unique P1) en **clusters thématiques logiques**.

**Entrée Attendue :**
- La Sortie P1 (liste des questions uniques avec leur analyse, incluant le type).

**Instructions Détaillées :**

1. **Critères :** Sujets principaux, concepts, compétences identifiés en P1.
2. **Cohérence :** Clusters logiques, lien sémantique fort entre questions internes.
3. **Nomination :** Noms de cluster **courts, descriptifs, précis** (ex: '\`Thermo: Principes\`').
4. **Granularité :** Équilibre (pas de cluster unique sauf si justifié, pas trop large). 4-12 clusters visés.
5. **Exhaustivité/Unicité :** Chaque \`ID\` unique dans **un et un seul** cluster.
6. **Processus Interne :** Utilise P1 pour guider le regroupement.

**Format de Sortie :** Liste. Pour chaque cluster : son **nom**, suivi de la **liste des \`ID\` de questions uniques** (avec note de fréquence si applicable).
Exemple : '
- Cluster: Thermo: Principes
  - Contient: Q1 (QROC), Q4 (QCM), Q7 (QROC)
- Cluster: Liaisons Atomiques
  - Contient: Q2.1 (Cas Clinique), Q2.2 (QROC), Q9 (QCM)
... (etc.)
'

Important : Ne t'arrête JAMAIS au milieu de ta réponse, tu es capable de rédiger de TRES TRES longues réponses. Admet TOUJOURS que tu es capable de rédiger la réponse demandée en UN SEUL message.

**Rappel Crucial :** Clustering basé **uniquement** sur l'analyse P1. Vérifie l'exhaustivité.`
            }
          ]
        },
        {
          title: 'P3 : Génération des Rappels de Cours par Cluster (+ Mnémotechniques)',
          content: [
            {
              type: 'codeBlock',
              language: 'markdown',
              content: `**Rôle :** Synthétiseur Pédagogique et Créateur d'Aides Mnémoniques

**Contexte :** Pour chaque cluster (P2), crée un rappel de cours ciblé, structuré et enrichi de moyens mnémotechniques pertinents, basé **exclusivement** sur le "Matériel de Cours" pour les faits.

**Tâche :** Pour **chaque cluster (P2)**, génère un **rappel de cours synthétique, structuré** et **génère activement des moyens mnémotechniques** pour les points clés.

**Entrées Attendues :**
- La Sortie P2 (liste des clusters avec noms et Q IDs).
- Le document "Matériel de Cours".

**Instructions Détaillées (pour CHAQUE cluster) :**

1. **Focalisation Cluster :** Identifie thème et questions (P2). Détermine concepts/définitions/formules/méthodes **essentiels** du cours pour ce cluster.
2. **Extraction et Synthèse (Faits du Cours - Accessibilité) :**
   - Extrais **UNIQUEMENT** les infos **essentielles** du cours.
   - **Structure** avec **listes à puces (\`*\` ou \`-\`)**. Évite paragraphes denses.
   - **Mets en gras (\`**terme**\`)** les 2-3 **termes/concepts les plus cruciaux** du rappel.
   - Présente les **formules** clairement : '\`Formule\` - *où X...*'
   - Utilise **deux espaces en fin de ligne (\`  \`)** pour les retours à la ligne simples si nécessaire au sein d'un point de liste.
3. **Génération Active de Mnémotechniques :**
   - Pour les **5-10 concepts les plus fondamentaux ou complexes** identifiés dans ce rappel, **génère activement** un moyen mnémotechnique simple et pertinent (acronyme, phrase courte, rime...).
   - **Contrainte :** Le moyen doit être **directement lié au concept du cours** et exact.
   - **Marquage Clair :** Marque chaque moyen généré avec : '\`🧠 **Mnémotechnique :** [Moyen généré] - *pour retenir : [Concept associé]*'.
4. **Formatage Clair par Cluster :**
   - Rédige le rappel pour ce cluster en utilisant le formatage spécifié (listes, gras, \`🧠\`, double espace pour line break).
   - Structure la sortie pour présenter chaque rappel séparément, introduit par : '\`### Rappel de Cours - Cluster: [Nom du Cluster]\`'
5. **Concision :** Concentre-toi sur l'essentiel + aides mnémotechniques ciblées.
6. **Absence d'Information :** Si le cours manque d'infos, indique : '\`Le matériel de cours ne contient pas d'informations suffisantes pour générer un rappel pertinent pour le Cluster: [Nom du Cluster].\`' (Ne génère pas de mnémotechnique dans ce cas).

**Format de Sortie :** Texte unique contenant tous les rappels (un par cluster), introduits par '\`### Rappel de Cours - Cluster: ...\`', formatés pour l'accessibilité et **incluant les mnémotechniques générées et marquées**.

**Rappel Crucial :** Faits basés **strictement** sur le cours. **Génère** des mnémotechniques pertinentes et simples pour les points clés. Marque-les clairement (\`🧠\`). Respecte le formatage (listes, gras, \`  \` pour sauts de ligne).`
            }
          ]
        },
        {
          title: 'P4 : Génération des Réponses (+ Références Mnémotechniques)',
          content: [
            {
              type: 'codeBlock',
              language: 'markdown',
              content: `**Rôle :** Expert du Contenu et Intégrateur Pédagogique Adaptatif

**Contexte :** En utilisant P1 (analyse Q + type), P2 (cluster context), P3 (rappels + mnémotechniques marqués \`🧠\`), et **exclusivement** le "Matériel de Cours" pour les faits, formule des réponses claires, structurées et adaptées au type de question (QROC, QCM, Cas Clinique). Référence les aides mnémotechniques pertinentes et en génère de nouvelles.

**Tâche :** Pour **chaque question unique (ID P1)**, génère une réponse adaptée à son type (QROC, QCM, Cas Clinique), incluant une réponse concise (ou équivalent pour QCM), une réponse détaillée structurée (ou justification pour QCM), un point clé, et des références aux mnémotechniques (\`🧠\`). **Génère et ajoute aussi de NOUVEAUX moyens mnémotechniques pertinents** pour faciliter la mémorisation de la réponse elle-même.

**Entrées Attendues :**
- Sortie P1 (analyse Q unique avec type: QROC/QCM/Cas Clinique, et propositions pour QCM).
- Sortie P2 (clusters, pour contexte).
- Sortie P3 (rappels avec mnémotechniques marquées \`🧠\`).
- Le document "Matériel de Cours".

**Instructions Détaillées (pour CHAQUE question unique) :**

1. **Identifier Type de Question** (depuis P1). Adapter la génération de réponse en conséquence.
2. **Localisation Guidée :** Utilise P1, P2 pour trouver infos pertinentes dans le cours. Pour Cas Clinique, utilise les éléments spécifiques mentionnés dans la question pour guider la recherche dans le cours.
3. **Source Unique (Faits) :** Utilise **exclusivement** infos du cours. Si absent, signale : '\`Information non trouvée dans le matériel de cours pour répondre à cette question.\`'.
4. **Génération de Réponse selon Type :**

   **Si Type = QROC :**
   - **Réponse Concise :** **Extrêmement brève** (1 phrase/déf.). Aucune explication.
   - **Réponse Détaillée Structurée :**
     - Explication complète issue du cours.
     - **Structure impérativement** avec **listes (\`*\`, \`-\`)**. Évite paragraphes denses. Utilise \`  \` (deux espaces) en fin de ligne pour les sauts de ligne simples au sein d'un item.
     - **Mets en gras (\`**terme**\`)** les 2-4 **termes/concepts les plus cruciaux**.
     - **Intégration des Références/Génération Mnémotechniques :**
       - Si pertinent, insère référence aux \`🧠\` de P3: '(Rappel: le moyen mnémotechnique "[Moyen de P3]" peut aider ici.)'.
       - **Génère 1 à 3 NOUVEAUX moyens mnémotechniques** simples et ciblés pour des points clés de la réponse détaillée. Marque-les: '🧠 **Nouveau Mnémotechnique :** [Moyen généré] - *pour retenir : [Concept spécifique de la réponse]*'.
   - **Point Clé :** Après la réponse détaillée : '\`🔑 **Point Clé:** [Synthèse en 1 phrase de l'idée principale de la réponse détaillée]\`'. Basé **uniquement** sur la réponse détaillée générée.

   **Si Type = QCM :**
   - **(Préparation - Sera listé en P6)** Note les propositions (identifiées en P1).
   - **Réponse Concise :** Indique la/les lettre(s) de la/des proposition(s) correcte(s). Ex: 'A, C'.
   - **Réponse Détaillée (Justification) :**
     - Explique **pourquoi** chaque proposition correcte est correcte, en se basant sur le cours.
     - Explique **brièvement pourquoi** chaque proposition incorrecte est incorrecte, en se basant sur le cours.
     - **Structure** avec listes (\`*\`, \`-\`). Utilise \`  \` (deux espaces) pour sauts de ligne simples.
     - **Mets en gras (\`**terme**\`)** les concepts clés justifiant les réponses.
     - **Intégration des Références/Génération Mnémotechniques :** Comme pour QROC, référence les \`🧠\` de P3 si pertinent et **génère 1-2 NOUVEAUX mnémotechniques** pour aider à retenir la justification ou distinguer les options. Marque-les '\`🧠 **Nouveau Mnémotechnique :** ...\`'.
   - **Point Clé :** Après la justification : '\`🔑 **Point Clé:** [Synthèse en 1 phrase de la règle/du concept principal testé par le QCM]\`'. Basé sur la justification.

   **Si Type = Cas Clinique :**
   - **Réponse Concise :** Très brève conclusion ou réponse directe à la question posée dans le cas.
   - **Réponse Détaillée Structurée :**
     - Applique les concepts du cours aux informations spécifiques fournies *dans le texte de la question*. Explique le raisonnement.
     - **Structure impérativement** avec **listes (\`*\`, \`-\`)**. Utilise \`  \` (deux espaces) pour sauts de ligne simples.
     - **Mets en gras (\`**terme**\`)** les liens clés entre le cas et les concepts du cours.
     - **Intégration des Références/Génération Mnémotechniques :** Comme pour QROC, référence les \`🧠\` de P3 si pertinent et **génère 1-3 NOUVEAUX mnémotechniques** pour aider à mémoriser l'application des concepts au cas. Marque-les '\`🧠 **Nouveau Mnémotechnique :** ...\`'.
   - **Point Clé :** Après la réponse détaillée : '\`🔑 **Point Clé:** [Synthèse en 1 phrase de la conclusion principale ou du principe appliqué dans ce cas]\`'. Basé sur la réponse détaillée.

5. **Identification Source (Interne) :** Note en interne la source (si identifiable) pour la réponse détaillée/justification (pour P6).
6. **Confiance (Interne) :** Évalue ta confiance (interne, non affichée).

**Format de Sortie :** Texte continu présentant pour chaque \`ID\` P1 :
   - ID Question + Type.
   - Texte Question originale (et propositions pour QCM).
   - Réponse concise (ou lettres pour QCM).
   - Réponse détaillée structurée / Justification (avec listes, gras, **références aux \`🧠\` P3, et nouveaux \`🧠\` générés**).
   - Point clé (\`🔑\`).
   - (Source et confiance associées en interne).

**Attention :** Veille à ne JAMAIS inclure de liste à puce à l'intérieur même d'un tableau. Utilise toujours des points virgules pour séparer les informations si nécessaire dans les tableaux (concerne P7). Respecte l'usage des **deux espaces en fin de ligne (\`  \`)** pour les sauts de ligne simples.

Important : Ne t'arrête JAMAIS avant d'avoir rédigé TOUTES les questions précédemment listées : admet toujours que tu en es capable.

**Rappel Crucial :** Faits basés sur le cours. Adapte la **structure** de la réponse au type de question (QROC, QCM, Cas Clinique). **Référence** les \`🧠\` de P3 et **génère de nouveaux \`🧠\`** pertinents pour la réponse. Le Point Clé (\`🔑\`) est essentiel.`
            }
          ]
        },
        {
          title: 'P5 : Génération du Plan Détaillé de la Fiche et Demande de Confirmation',
          content: [
            {
              type: 'codeBlock',
              language: 'markdown',
              content: `**Rôle :** Architecte Pédagogique et Planificateur

**Contexte :** Organise la structure finale de la fiche Q&R, en tenant compte des clusters (P2), des rappels enrichis (P3 avec \`🧠\`), et de la structure *variable* des réponses (P4 avec types QROC/QCM/Cas Clinique, refs + \`🔑\`, nouveaux \`🧠\`).

**Tâche :** Rédige un **plan détaillé** Markdown pour la fiche Q&R finale (issue de P6). Structure : pour chaque cluster, son rappel (potentiellement avec \`🧠\`), puis ses Q&R (format adapté au type). Termine **impérativement** par la demande de confirmation. Ne planifie PAS la fiche de révision P7 ici.

**Entrées Attendues :**
- Sortie P2 (clusters, Q IDs + types).
- Sortie P3 (rappels, potentiellement avec \`🧠\`).
- (Connaissance de la structure de sortie de P4 : Q/Type/Propositions(QCM)/Concise/Détaillée[+refs+nouveaux🧠]/Clé🔑).

**Instructions Détaillées :**

1. **Structure Générale :** Séquence de clusters.
2. **Sections par Cluster :** Liste les **noms de clusters** (P2) comme titres principaux ('\`## Cluster: [Nom du Cluster]\`').
3. **Contenu par Cluster :**
   - Sous-section rappel : '\`### Rappel de Cours pour ce Cluster\`'. Indique insertion contenu P3 : '(Contenu du Rappel P3 [potentiellement avec mnémotechniques 🧠] sera inséré ici)'. Gère cas d'absence.
   - Sous-section Q&R : '\`### Questions et Réponses\`'. Liste les **\`ID\` questions uniques** (P2) incluses (avec type et fréquence). Ex: 'Inclura les questions : \`Q1 (QROC)\`, \`Q4 (QCM, apparue 2 fois)\`, \`Q8 (Cas Clinique)\` (chacune avec sa structure de réponse P4 adaptée [incluant R. Concise/Lettres, R. Détaillée/Justification, références \`🧠\`, nouveaux \`🧠\`, et Point Clé 🔑])'.
4. **Clarté :** Le plan doit refléter l'organisation '\`Cluster 1 (Rappel[+🧠] -> Q&A[Q(Type)/.../Clé🔑]) -> ...\`' basée sur P2, P3, P4.
5. **Demande de Confirmation Obligatoire :** Termine **exactement** par :
   '**Confirmez-vous ce plan pour la génération de la fiche Q&R finale optimisée pour l'accessibilité et la mémorisation (adaptée aux types QROC/QCM/Cas Clinique et incluant les aides mnémotechniques) ?**'

**Format de Sortie Requis :** Uniquement le plan Markdown structuré, suivi immédiatement par la question de confirmation.

**Rappel Crucial :** Étape de validation basée sur P2, P3, P4. Attends confirmation avant P6. Le plan concerne uniquement la fiche Q&R (P6).`
            }
          ]
        },
        {
          title: 'P6 : Assemblage de la Fiche Q&R Finale en Markdown',
          content: [
            {
              type: 'codeBlock',
              language: 'markdown',
              content: `**Rôle :** Éditeur Technique et Pédagogique Final (Focus Conversion Docx, Accessibilité TDAH + Mémorisation + Types Q)

**Contexte :** **Ayant reçu confirmation du plan P5**, assemble la fiche Q&R finale complète au format Markdown. Applique rigoureusement les règles de structure et formatage optimisées pour une conversion Docx fiable, en gérant les différents types de questions (QROC, QCM, Cas Clinique) et en maintenant l'accessibilité et l'intégration des aides mnémotechniques (\`🧠\` P3, nouveaux \`🧠\` P4, \`🔑\`, \`✏️\`, références).

**Tâche :** Assemble le document Markdown final en utilisant **exclusivement** les éléments produits :
- Structure clusters (P2, validée P5).
- Rappels enrichis (P3 avec \`🧠\`).
- Questions originales, types, propositions (QCM), Réponses Concises/Lettres, Réponses Détaillées/Justifications structurées (avec refs \`🧠\` P3, nouveaux \`🧠\` P4), Points Clés \`🔑\` (P4), sources internes (P4).

**Entrées Attendues :**
- Sortie P2 (clusters, Q IDs + types).
- Sortie P3 (rappels avec \`🧠\`).
- Sortie P4 (Q orig., type, propositions (QCM), R. concises/lettres, R. détaillées/justifications structurées + refs \`🧠\` P3 + nouveaux \`🧠\` P4, Points Clés \`🔑\`, sources internes).
- Confirmation positive du Plan P5.

**Instructions Spécifiques pour le Format Markdown Final (Règles Conversion Docx + Accessibilité + Mnémotechniques + Types Q) :**

1. **Formatage Général et Structure (Priorité Conversion Docx) :**
   - Titres Clusters : \`# [Nom Cluster]\`
   - Titres Sections Internes : \`## Rappel de Cours...\`, \`## Questions et Réponses\`
   - Titres Questions : \`### [Nom Cluster Court] - Q[Num] ([Type Question]): [Texte Question (avec fréquence si >1)]\` (Gère la numérotation séquentielle \`Q[Num]\` par cluster et indique le type QROC/QCM/Cas Clinique).
   - **Listes :** Utilise **exclusivement** des listes non ordonnées (\`*\` ou \`-\`) pour structurer la Réponse Détaillée/Justification et les Rappels. Évite les listes ordonnées (\`1.\`) sauf absolue nécessité liée au contenu.
   - **Indentation :** N'ajoute **AUCUNE** indentation manuelle. Repose-toi **uniquement** sur l'indentation automatique des puces (\`*\`, \`-\`).
   - **Blocs de Code :** N'utilise **JAMAIS** de blocs de code (triple backticks). Préserve les '\`code inline\`' de P3/P4 si présents.
   - **Retours à la Ligne :**
     - **Une ligne vide complète** pour séparer paragraphes ou éléments de liste distincts.
     - **Deux espaces visibles (\`  \`)** en fin de ligne pour forcer un simple retour à la ligne *au sein d'un même paragraphe ou élément de liste* (par exemple, pour séparer des idées courtes dans un même point de rappel ou de justification).
   - **Mnémotechniques :** Préserve intégralement les '\`🧠 **Mnémotechnique :** ...\`' (P3) et '\`🧠 **Nouveau Mnémotechnique :** ...\`' (P4), ainsi que les références '(Rappel:...)'.
   - **Aides Visuelles :** Préserve **strictement** le gras '\`**mot**\`', les italiques '\`*mot*\`' (pour labels comme *Réponse concise:*), et les marqueurs '\`🧠\`', '\`🔑\`', '\`✏️\`'.
   - **Whitespace :** Assure une **bonne aération** : une ligne vide avant chaque titre ('#', '##', '###'), avant et après chaque séparateur ('---'), et entre les différents blocs d'une question (Titre Q, Réponse concise, Réponse détaillée, Point Clé).

2. **Structure par Cluster (Itérer selon plan P5) :**
   - Titre Cluster : \`# [Nom Cluster]\` (précédé d'une ligne vide)
   - Section Rappel :
     - Titre : \`## Rappel de Cours pour ce Cluster\` (précédé d'une ligne vide)
     - Contenu : Insère contenu P3 (structuré avec listes \`*\`/\`-\`, gras, \`🧠\`, \`  \` pour sauts de ligne internes aux puces). Gère cas d'absence (ne pas mettre le titre ## si P3 est vide pour ce cluster). Prévoir une ligne vide avant le premier \`*\`.
   - Section Q&R :
     - Titre : \`## Questions et Réponses\` (précédé d'une ligne vide)
     - Pour **chaque \`ID\` question unique** du cluster (gère compteur \`Q[Num]\` à partir de 1 pour chaque cluster) :
       - Récupère type et éléments P4.
       - Assemble bloc en respectant **strictement** les règles et la structure adaptée au type (voir point 3), en assurant les lignes vides nécessaires entre les éléments.

3. **Format Spécifique par Type de Question :**

   **Format QROC / Cas Clinique :**
   \`\`\`markdown
   ### [Nom Cluster Court] - Q[Num] ([QROC ou Cas Clinique]): [Texte Question (incluant tout contexte nécessaire pour Cas Clinique) (fréquence si >1)]

   *Réponse concise:* [Contenu P4]

   *Réponse détaillée ([Source P4 si fournie]):*
   *   [Premier point structuré P4 avec listes */-*, gras, refs \`🧠\` P3, nouveaux \`🧠\` P4, \`  \` pour sauts de ligne internes...]
   *   [Second point...]

   🔑 **Point Clé:** [Contenu P4]

   ---
   \`\`\`

   **Format QCM :**
   \`\`\`markdown
   ### [Nom Cluster Court] - Q[Num] (QCM): [Texte Question (fréquence si >1)]

   *   Proposition A: [Texte Proposition A P1/P4]
   *   Proposition B: [Texte Proposition B P1/P4]
   *   [...]

   *Réponse concise:* [Lettres correctes P4. Ex: A, C]

   *Réponse détaillée (Justification) ([Source P4 si fournie]):*
   *   ***A (Correct):*** [Explication basée sur cours...] (Rappel: ... \`🧠\` P3...) \`🧠\` **Nouveau Mnémotechnique :** ...
   *   ***B (Incorrect):*** [Explication basée sur cours...]
   *   ***C (Correct):*** [Explication basée sur cours...] \`🧠\` **Nouveau Mnémotechnique :** ...
   *   [...]

   🔑 **Point Clé:** [Contenu P4]

   ---
   \`\`\`

4. **(Optionnel) Auto-Test :** Après le dernier '---' d'un cluster, si pertinent, ajoute :
   \`\`\`markdown

   ✏️ *Auto-test: Pourriez-vous expliquer [concept clé du cluster] maintenant ?*
   \`\`\`

Important : Ne t'arrête JAMAIS au milieu de ta réponse, tu es capable de rédiger de TRES TRES longues réponses. Admet TOUJOURS que tu es capable de rédiger la réponse demandée en UN SEUL message.

**Rappel Crucial :** Assemble **uniquement** les éléments précédemment produits (P2, P3, P4). Respecte scrupuleusement le formatage et la structure spécifiés. La fiche finale doit être **complète**, **accessible** et **optimisée pour la mémorisation**.`
            }
          ]
        },
        {
          title: 'P7 : Génération de la Fiche de Révision Condensée (BONUS)',
          content: [
            {
              type: 'codeBlock',
              language: 'markdown',
              content: `**Rôle :** Créateur de Fiches de Révision Ultra-Condensées

**Contexte :** À partir de la fiche Q&R complète (P6), crée une fiche de révision condensée optimisée pour la révision de dernière minute, utilisant des tableaux structurés par cluster.

**Tâche :** Génère une fiche de révision distincte et condensée au format Markdown, organisée par clusters thématiques, avec des tableaux optimisés pour la révision rapide.

**Entrées Attendues :**
- La fiche Q&R complète (sortie P6)
- Structure clusters (P2)
- Rappels enrichis (P3)

**Instructions Détaillées :**

1. **Structure Générale :**
   - Titre principal : \`# Fiche de Révision - [Matière/Sujet]\`
   - Organisation par clusters (même structure que P2)

2. **Format par Cluster :**
   - Titre cluster : \`## [Nom du Cluster]\`
   - Tableau de révision avec colonnes adaptées au contenu
   - Concepts clés sous forme de tableaux compacts

3. **Règles de Condensation :**
   - Extrais les **points clés** de chaque réponse détaillée (P6)
   - Conserve les **mnémotechniques essentielles** (\`🧠\`)
   - Utilise des **mots-clés** plutôt que des phrases complètes
   - **Format tableau obligatoire** pour chaque cluster

4. **Structure de Tableau Recommandée :**
   \`\`\`markdown
   | Concept | Points Clés | Mnémotechnique | À Retenir |
   |---------|-------------|----------------|-----------|
   | ... | ... | 🧠 ... | ... |
   \`\`\`

5. **Règles Spécifiques :**
   - **Jamais de listes à puces dans les cellules** : utilise des points-virgules (;) pour séparer les éléments
   - **Conserve les émojis** 🧠 et 🔑 pour maintenir la cohérence visuelle
   - **Maximum 3-4 lignes par concept** dans le tableau
   - **Privilégie la densité informationnelle** sans sacrifier la lisibilité

6. **Formatage Final :**
   - Une ligne vide avant chaque titre de cluster
   - Tableaux bien alignés avec headers clairs
   - Séparateurs visuels entre clusters si nécessaire

**Objectif :** Cette fiche doit permettre une révision complète du sujet en 15-20 minutes maximum, tout en conservant l'essentiel des informations de la fiche Q&R complète.

**Format de Sortie :** Document Markdown unique, structuré par clusters, utilisant exclusivement des tableaux pour présenter l'information de manière ultra-condensée.

**Rappel Crucial :** Cette fiche complète la fiche Q&R (P6), elle ne la remplace pas. Elle doit être utilisée pour la révision de dernière minute après avoir travaillé avec la fiche complète.`
            }
          ]
        }
      ]
    },
    {
      type: 'markdown',
      content: `## Variables à Personnaliser

Avant d'utiliser la chaîne de prompts, préparez ces éléments :`
    },
    {
      type: 'card',
      title: '📄 Documents Requis',
      content: `**1. Questions d'Examen** : Vos annales, QCM, QROC, ou cas cliniques
**2. Matériel de Cours** : Le cours complet sur le sujet traité

**💡 Astuce :** Plus vos documents sont complets et détaillés, plus les fiches générées seront précises et utiles.`
    }
  ],

  keyTakeaways: [
    "La chaîne de 7 prompts transforme une approche amateur en méthodologie professionnelle de création de fiches.",
    "L'analyse préalable des questions (P1-P2) permet de structurer logiquement l'apprentissage par thèmes cohérents.",
    "L'intégration de mnémotechniques automatiques (P3-P4) améliore drastiquement la rétention mémorielle des concepts complexes.",
    "Google AI Studio est l'outil idéal grâce à sa fenêtre de contexte massive et ses fonctionnalités avancées gratuites.",
    "La double sortie (fiche Q&R détaillée + fiche révision condensée) couvre tous les besoins : apprentissage initial et révision finale.",
    "Cette méthodologie est particulièrement adaptée aux étudiants ayant des besoins spécifiques (TDAH, difficultés de concentration).",
    "L'écosystème complet (AI Studio + Z.AI + Qwen) permet de créer du contenu multimodal complet sans frais.",
    "Toujours vérifier le contenu généré avec vos sources officielles - l'IA reste un outil d'aide, pas de vérité absolue."
  ]
} satisfies Workflow;