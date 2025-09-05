import type { Concept } from '@/lib/content-schema'

const concept = {
  slug: 'self-consistency',
  title: 'Self-Consistency',
  description: "Améliorer la robustesse des réponses en générant plusieurs chemins de raisonnement et en sélectionnant la conclusion la plus fréquente par un vote majoritaire.",
  area: 'Concepts Avancés',
  isNew: true,
  content: [
    {
      type: 'markdown',
      content: `
### 1. L'Analogie Simple : Demander l'Avis de Plusieurs Experts

Imaginez que vous ayez un problème complexe. Au lieu de ne consulter qu'un seul expert, vous en consultez cinq. Vous leur posez exactement la même question.

-   Quatre d'entre eux, bien qu'utilisant des raisonnements légèrement différents, arrivent à la même conclusion finale.
-   Le cinquième arrive à une conclusion totalement différente.

Intuitivement, vous ferez davantage confiance à la conclusion majoritaire. La Self-Consistency applique ce principe à une IA. Au lieu de générer une seule réponse, on lui demande de "réfléchir" plusieurs fois au problème et on choisit la réponse qui revient le plus souvent.`,
    },
    {
      type: 'markdown',
      content: `
### 2. La Définition Formelle

La **Self-Consistency** est une technique qui améliore la performance des modèles de langage sur des tâches de raisonnement. Elle s'appuie sur l'idée qu'il existe souvent plusieurs chemins de pensée pour résoudre un problème complexe. La méthode consiste à :

1.  **Utiliser un prompt de type Chain-of-Thought (CoT)** pour encourager le raisonnement étape par étape.
2.  **Générer plusieurs sorties indépendantes** pour le même prompt en utilisant une température non nulle (généralement > 0.5) pour introduire de la diversité dans les chemins de raisonnement.
3.  **Agréger les résultats :** Extraire la réponse finale de chaque sortie et choisir la plus fréquente par un vote majoritaire.

Cette approche est plus robuste qu'une simple génération cupide (température 0), car une erreur de raisonnement dans un chemin a moins de chances de se reproduire dans les autres.`,
    },
    {
      type: 'markdown',
      content: `
### 3. Pourquoi C'est Important Pour Vous ?

Pour les questions à fort enjeu (ex: posologie, contre-indication), la fiabilité est non négociable. La Self-Consistency est une méthode statistique pour augmenter cette fiabilité.

-   **Robustesse Accrue :** Elle réduit la probabilité qu'une erreur de calcul ou de logique dans une seule chaîne de raisonnement ne conduise à une réponse finale incorrecte.
-   **Confiance dans le Résultat :** Si 5 générations sur 5 aboutissent à la même conclusion, votre niveau de confiance est maximal. Si les avis divergent (ex: 3 pour A, 2 pour B), cela signale une ambiguïté ou une complexité qui mérite une investigation humaine.
-   **Dépassement du Raisonnement Linéaire :** Cela permet de découvrir des solutions correctes même si le chemin de raisonnement le plus "évident" pour le modèle contient une faille.`,
    },
    {
      type: 'markdown',
      content: `
### 4. Pour Aller Plus Loin : l'Évolution vers RASC

La limite de la Self-Consistency classique est qu'elle traite tous les raisonnements de la même manière. Un raisonnement brillant mais qui aboutit à une conclusion minoritaire est écarté. Un raisonnement bancal qui arrive par hasard à la conclusion majoritaire est comptabilisé.

**Reasoning-Aware Self-Consistency (RASC)** est l'évolution de 2025. Au lieu d'un simple vote sur la réponse finale, RASC analyse aussi la **qualité du raisonnement** lui-même. Les étapes sont :

1.  Générer plusieurs paires (raisonnement, réponse).
2.  Filtrer les réponses incorrectes ou dont le raisonnement est jugé de mauvaise qualité par le modèle lui-même.
3.  Effectuer un vote majoritaire uniquement sur les réponses issues de raisonnements jugés solides.

Cela permet d'obtenir une fiabilité supérieure avec moins de générations, car on ne se contente plus de la popularité de la réponse, mais de la **qualité de l'argumentaire**.`,
    },
  ],
} satisfies Concept

export default concept