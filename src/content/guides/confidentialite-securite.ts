import type { Guide } from '@/lib/content-schema';

export const guide = {
  slug: 'confidentialite-securite',
  title: "Confidentialité et Sécurité : Le Serment d'Hippocrate de l'Ère Numérique",
  description: "Comment utiliser les outils d'IA de manière responsable en protégeant les données. Les bonnes pratiques pour un usage éthique et légal en santé.",
  icon: "Shield",
  category: "bonnes-pratiques",
  difficulty: "débutant",
  tags: ["confidentialite", "securite", "rgpd", "bonnes-pratiques"],
  isFavorite: false,
  isWorkflow: false,
  keyTakeaways: [
    "Ne soumettez JAMAIS d'informations permettant d'identifier un patient à une IA grand public",
    "Anonymisez toujours vos cas cliniques en supprimant tous les éléments identifiants",
    "Choisissez vos outils selon le niveau de risque : plateformes US pour données anonymisées, hébergement local pour données confidentielles",
    "Désactivez l'utilisation de vos données pour l'entraînement dans les paramètres de votre compte"
  ],
  conceptSlugs: [],
  estimatedTime: "10 min",
  content: [
    {
      type: 'markdown',
      content: `## La Règle d'Or : Zéro Donnée Identifiable`
    },
    {
      type: 'alert',
      variant: 'destructive',
      content: `**Règle absolue non négociable :** Ne soumettez JAMAIS d'informations permettant d'identifier un patient (directement ou indirectement) à une IA grand public. Violer cette règle est une violation du secret professionnel et des lois sur la protection des données (RGPD).`
    },
    {
      type: 'markdown',
      content: `### Qu'est-ce qu'une Donnée Identifiable ?
C'est plus large que vous ne le pensez.`
    },
    {
      type: 'tabs',
      defaultValue: 'directes',
      tabs: [
        {
          value: 'directes',
          title: 'Informations Directes',
          content: [
            {
              type: 'markdown',
              content: `**Informations directement identifiantes**
Ces données sont évidentes et ne doivent JAMAIS être partagées

- **Nom, prénom, initiales**
- **Date de naissance, âge précis** si combiné à d'autres faits
- **Adresse, numéro de téléphone, email**
- **Numéro de sécurité sociale**`
            }
          ]
        },
        {
          value: 'indirectes',
          title: 'Informations Indirectes (Le Piège)',
          content: [
            {
              type: 'markdown',
              content: `**Informations indirectement identifiantes**
Le danger caché : ces combinaisons peuvent rendre une personne identifiable`
            },
            {
              type: 'alert',
              variant: 'default',
              content: `**Exemple critique :** "Patient de 92 ans, ancien mineur, traité pour une pathologie X dans le service Y de l'hôpital Z" peut rendre une personne identifiable par croisement de données.`
            },
            {
              type: 'markdown',
              content: `- Une **combinaison de faits rares**
- Un **récit très détaillé** d'un cas clinique avec éléments personnels
- Des **données géographiques précises** combinées à d'autres facteurs`
            }
          ]
        }
      ]
    },
    {
      type: 'markdown',
      content: `### L'Anonymisation : Votre Réflexe Conditionné`
    },
    {
      type: 'tabs',
      defaultValue: 'mauvais',
      tabs: [
        {
          value: 'mauvais',
          title: '❌ NON-Anonymisé (INTERDIT)',
          content: [
            {
              type: 'alert',
              variant: 'destructive',
              content: `"Analyse ce cas : Mme Durand, 82 ans, habitant près de l'Hôpital de la Croix-Rousse à Lyon, est admise le 15 mars pour une chute. Elle est sous Eliquis pour une fibrillation auriculaire connue. Son dossier mentionne une allergie à la pénicilline. Que faire ?"`
            }
          ]
        },
        {
          value: 'bon',
          title: '✅ Correctement Anonymisé',
          content: [
            {
              type: 'alert',
              variant: 'default',
              content: `"Analyse ce cas : Patiente de 80-85 ans, sexe féminin, admise pour une chute. Antécédents de fibrillation auriculaire traitée par un anticoagulant oral direct (apixaban). Allergie connue aux bêtalactamines. Quelles sont les options thérapeutiques à considérer pour la gestion de la douleur, en tenant compte du risque hémorragique ?"`
            }
          ]
        }
      ]
    },
    {
      type: 'markdown',
      content: `## Comprendre où Vont vos Données : La Traçabilité

Lorsque vous tapez une question dans une WebUI, cette donnée ne reste pas sur votre ordinateur. Elle fait un voyage :

\`Votre PC -> Internet -> Serveurs de l'entreprise (ex: Google, OpenAI) -> Traitement par le modèle d'IA -> Serveurs de l'entreprise -> Internet -> Votre PC\`

La politique de confidentialité de l'entreprise détermine ce qu'il advient de vos données sur leurs serveurs.

1.  **Utilisation pour l'entraînement :** La plupart des services gratuits se réservent le droit d'utiliser vos conversations (anonymisées par leurs soins) pour améliorer leurs futurs modèles. **Vous pouvez et devriez désactiver cette option** dans les paramètres de votre compte si vous tenez un minimum à votre vie privée.
2.  **Stockage pour l'historique :** Vos conversations sont sauvegardées pour que vous puissiez y accéder plus tard. C'est pratique, mais cela signifie qu'elles sont stockées quelque part.

## Le Facteur Géographique : Toutes les Lois ne se Valent Pas`
    },
    {
      type: 'alert',
      variant: 'default',
      content: `**Important :** La localisation des serveurs et le cadre légal de l'entreprise ont un impact majeur sur la confidentialité réelle de vos données.`
    },
    {
      type: 'table',
      headers: ['Juridiction', 'Entreprises Concernées', 'Niveau de Risque (Données Sensibles Anonymisées)'],
      rows: [
        ['**Union Européenne (RGPD)**', '(Certains services Cloud pro, non grand public)', '**Faible**. Le RGPD est le cadre le plus strict au monde.'],
        ['**États-Unis**', '**OpenAI, Google, Anthropic, Perplexity**', '**Modéré**. Politiques de sécurité robustes, mais soumis au CLOUD Act.'],
        ['**Asie (Chine, etc.)**', '**DeepSeek, Zhipu AI (Z.AI), Alibaba (Qwen)**', '⚠️ **Élevé à Très Élevé**. Lois sur les données souples.']
      ]
    },
    {
      type: 'markdown',
      content: `### Recommandations par Niveau de Risque`
    },
    {
      type: 'tabs',
      defaultValue: 'modere',
      tabs: [
        {
          value: 'eleve',
          title: 'Risque Élevé Accepté',
          content: [
            {
              type: 'markdown',
              content: `**🌏 Plateformes Asiatiques (DeepSeek, Qwen, Z.AI)**
Usage : Expérimentations sur données publiques uniquement`
            },
            {
              type: 'alert',
              variant: 'destructive',
              content: `**Considérez que tout ce que vous tapez devient public.** Idéales pour l'apprentissage sur des articles scientifiques publics, des cours, mais JAMAIS pour des données d'entreprise ou sensibles.`
            },
            {
              type: 'markdown',
              content: `**Cas d'usage appropriés :**
- Articles scientifiques publics
- Exercices d'apprentissage
- Tests de capacités de l'IA`
            }
          ]
        },
        {
          value: 'modere',
          title: 'Risque Modéré Géré',
          content: [
            {
              type: 'markdown',
              content: `**🇺🇸 Plateformes Américaines (ChatGPT, Gemini, Claude, Perplexity)**
Usage : Données anonymisées uniquement`
            },
            {
              type: 'alert',
              variant: 'default',
              content: `Ces plateformes respectent des standards de sécurité élevés et ont des politiques claires sur l'utilisation des données. **Désactivez obligatoirement l'entraînement sur vos données** dans vos paramètres de compte.`
            },
            {
              type: 'markdown',
              content: `**Cas d'usage appropriés :**
- Cas cliniques parfaitement anonymisés
- Questions théoriques en pharmacologie
- Révision de cours
- Analyses de protocoles publics`
            }
          ]
        },
        {
          value: 'faible',
          title: 'Risque Faible Maîtrisé',
          content: [
            {
              type: 'markdown',
              content: `**💻 Hébergement Local (LM Studio, Ollama)**
Usage : Confidentialité maximale`
            },
            {
              type: 'alert',
              variant: 'default',
              content: `**Seule solution pour une confidentialité à 100%.** Vos données ne quittent jamais votre ordinateur. Nécessite des compétences techniques et limite aux modèles open-source.`
            },
            {
              type: 'markdown',
              content: `**Cas d'usage appropriés :**
- Données de recherche non publiées
- Informations stratégiques d'entreprise
- Prototypes confidentiels`
            }
          ]
        }
      ]
    },
    {
      type: 'markdown',
      content: `## Le Seul Vrai Coffre-Fort : L'Hébergement Local

La seule manière de garantir une confidentialité à 100% est de faire tourner un modèle d'IA **localement, sur votre propre machine**. Vos données ne quittent jamais votre ordinateur.

- **Comment ?** Des outils comme **LM Studio** ou **Ollama** permettent de télécharger et d'exécuter des modèles *open-source* (comme les modèles de la famille Llama, Mistral, ou même les versions open-source de Qwen) sur des ordinateurs portables récents (avec une bonne RAM).
- **Inconvénients :** Demande plus de compétences techniques, et vous serez limité à des modèles plus petits et moins puissants que les modèles propriétaires de pointe comme GPT-5 ou Gemini 2.5 Pro.
- **Quand l'utiliser ?** C'est la solution à envisager si un laboratoire vous confie des données de recherche confidentielles (non encore publiées) ou des informations stratégiques.

## Conclusion : Une Hygiène Numérique à Adopter

Votre stratégie de confidentialité doit être un réflexe, pas une réflexion :

1.  **Données Publiques / Apprentissage :** Plateformes gratuites (DeepSeek, etc.) -> **Risque Élevé accepté**.
2.  **Données de Travail Anonymisées :** Plateformes américaines (ChatGPT, Gemini) -> **Risque Modéré géré**.
3.  **Données de Recherche Confidentielles :** Hébergement Local (Ollama) -> **Risque Faible maîtrisé**.
4.  **Données d'Identification de Santé (PHI) :** **INTERDIT** sur toute IA grand public. Seules les solutions professionnelles validées dans un cadre hospitalier sont autorisées.

En appliquant cette grille de lecture, vous pouvez bénéficier de la puissance de l'IA tout en respectant scrupuleusement vos obligations éthiques et légales.`
    },
    {
      "type": "markdown",
      "content": "## Le Seul Vrai Coffre-Fort : L'Hébergement Local"
    },
    {
      "type": "guideRecommendation",
      "slug": "ia-en-local-confidentialite-totale",
      "reason": "Pour une confidentialité absolue, la seule solution est de faire tourner les modèles sur votre propre machine. Ce guide vous montre comment faire avec des modèles comme Qwen3-4B."
    }
  ]
} satisfies Guide;