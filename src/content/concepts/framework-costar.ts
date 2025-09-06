import type { Concept } from '@/lib/content-schema'

export const concept = {
  slug: 'framework-costar',
  title: 'Framework CO-STAR',
  description: 'Une introduction au framework de prompting CO-STAR (Context, Objective, Style, Tone, Audience, Response), une méthode complète pour des instructions détaillées.',
  area: 'Prompting',
  tags: ['méthodologie', 'prompting', 'framework'],
  isExternal: false,
  content: [
    {
      type: 'markdown',
      content: `### 1. L\'Analogie Simple : Le Brief Créatif

Imaginez que vous briefez un assistant pour une tâche complexe, comme la création d\'une brochure pour un nouveau médicament. Vous ne lui diriez pas juste "fais une brochure". Vous lui donneriez :

- Le **Contexte** (nouveau produit, concurrents...).
- L'**Objectif** (convaincre les médecins de le prescrire).
- Le **Style** (professionnel, scientifique).
- Le **Ton** (informatif, confiant).
- L'**Audience** (les médecins généralistes).
- Le **Format** de la réponse attendue (une brochure A4 en 3 volets).

CO-STAR, c\'est simplement la formalisation de ce brief pour une IA.`,
    },
    {
      type: 'markdown',
      content: `### 2. La Définition Formelle

CO-STAR est un acronyme pour un framework de prompting qui vise à maximiser la clarté et la complétude d\'une instruction donnée à une IA. Il se décompose en six parties :

- **C (Context) :** Le contexte, les informations de fond nécessaires pour comprendre la demande.
- **O (Objective) :** L\'objectif, le "pourquoi" de la tâche. Quelle est l\'intention finale ?
- **S (Style) :** Le style d'écriture (académique, journalistique, familier...).
- **T (Tone) :** Le ton émotionnel (formel, enthousiaste, neutre, rassurant...).
- **A (Audience) :** À qui la réponse est-elle destinée ? (expert, patient, étudiant...).
- **R (Response) :** La réponse attendue, son format et sa structure (tableau, liste, JSON...).`,
    },
    {
      type: 'markdown',
      content: `### 3. Pourquoi c\'est important pour vous ?

Notre méthode des **6 Piliers** est une adaptation et une extension de frameworks comme CO-STAR, spécifiquement conçue pour le domaine de la santé.

- **Rôle, Tâche, Contexte** correspondent au **C** et **O** de CO-STAR.
- **Ton & Style** reprennent directement le **S** et le **T**.
- L'**Audience (A)** est implicitement contenue dans notre pilier **Ton & Style** (on n\'utilise pas le même ton pour un patient que pour un confrère).
- **Format** est notre équivalent de **R (Response)**.
- Notre 6ème pilier, **Métacognition & Fiabilisation**, est un ajout qui va plus loin que CO-STAR, en exigeant de l\'IA qu\'elle justifie et auto-critique son travail.

Connaître CO-STAR vous permet de comprendre la logique universelle derrière les bons prompts. C\'est un excellent complément pour penser vos instructions de manière encore plus structurée.`,
    },
    {
      type: 'markdown',
      content: `### 4. Pour aller plus loin

CO-STAR est un des nombreux frameworks de prompting. D\'autres existent, comme **APE (Action, Purpose, Expectation)** ou **RTF (Role, Task, Format)**. Notre méthode des 6 Piliers s\'en inspire pour créer une approche complète et adaptée à notre domaine.`,
    },
  ],
} satisfies Concept

export default guide || concept || workflow
