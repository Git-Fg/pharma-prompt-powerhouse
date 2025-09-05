import type { Concept } from '@/lib/content-schema'

const concept = {
  slug: 'chain-of-verification',
  title: 'Chain-of-Verification (CoVe)',
  description: "Une technique où l'IA devient son propre fact-checker, planifiant et exécutant des vérifications sur ses propres affirmations pour réduire les hallucinations.",
  area: 'Concepts Avancés',
  isNew: true,
  content: [
    {
      type: 'markdown',
      content: `
### 1. L'Analogie Simple : Le Journaliste Interne

Imaginez une IA non pas comme un expert qui sait tout, but comme un journaliste.

1.  **Le Brouillon :** Il écrit une première version de son article (la réponse initiale).
2.  **Le Doute Systématique :** Au lieu de publier, il s'arrête et se demande : "Quelles sont les affirmations clés que j'ai faites ici ? Comment puis-je les vérifier ?".
3.  **L'Enquête :** Il pose des questions précises pour vérifier chaque affirmation (ex: "La metformine cause-t-elle *fréquemment* des troubles lactiques ?", "Quelles sont les sources primaires pour cette affirmation ?").
4.  **L'Édition Finale :** Après avoir obtenu les réponses à ses propres questions, il corrige et affine son article initial pour le rendre factuellement exact.

Le CoVe, c'est ce processus de fact-checking internalisé.`,
    },
    {
      type: 'markdown',
      content: `
### 2. La Définition Formelle

**Chain-of-Verification (CoVe)** est une technique de prompting qui vise à réduire les hallucinations factuelles d'un modèle de langage. Elle se déroule en quatre étapes :

1.  **Génération d'une Réponse de Base :** Le modèle produit une première réponse à la question de l'utilisateur.
2.  **Planification de la Vérification :** Le modèle identifie les affirmations factuelles dans sa réponse et génère une série de questions de vérification pour les valider.
3.  **Exécution de la Vérification :** Le modèle répond à ces questions de vérification de manière indépendante, sans être biaisé par sa réponse initiale. Cette étape peut parfois impliquer l'utilisation d'outils de recherche externes.
4.  **Génération d'une Réponse Finale Vérifiée :** Le modèle synthétise les informations issues de la vérification pour corriger sa réponse initiale et présenter une version finale plus fiable et factuellement exacte.`,
    },
    {
      type: 'markdown',
      content: `
### 3. Pourquoi C'est Important Pour Vous ?

Dans le domaine de la santé, une information incorrecte peut avoir des conséquences graves. Le CoVe est une barrière de sécurité cruciale.

-   **Fiabilité Accrue :** Il diminue significativement le risque que l'IA présente une information plausible mais fausse (une "hallucination").
-   **Transparence du Raisonnement :** Le plan de vérification vous montre exactement ce que l'IA a jugé nécessaire de confirmer, vous donnant un aperçu de ses "doutes".
-   **Meilleur Contrôle :** Vous pouvez évaluer non seulement la réponse finale, mais aussi la pertinence du plan de vérification lui-même, vous donnant un niveau de contrôle plus profond.`,
    },
    {
      type: 'markdown',
      content: `
### 4. Pour Aller Plus Loin (Notions Avancées)

-   **CoVe avec Recherche (Tool-Integrated CoVe) :** Les implémentations les plus avancées de CoVe ne se contentent pas de la connaissance interne du modèle. Lors de l'étape d'"Exécution", le modèle peut utiliser un outil de recherche web pour répondre à ses questions de vérification, augmentant encore la fiabilité.
-   **Limites du CoVe :** Le CoVe est excellent pour les faits vérifiables, mais moins utile pour les questions de raisonnement pur, d'opinion ou de créativité. Il augmente également le temps de réponse et le coût de la requête, car il demande plusieurs étapes de génération.`,
    },
  ],
} satisfies Concept

export default concept