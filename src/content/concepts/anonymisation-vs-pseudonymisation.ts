import type { Concept } from '@/lib/content-schema'

export const concept = {
  slug: 'anonymisation-vs-pseudonymisation',
  title: 'Anonymisation vs. Pseudonymisation',
  description: 'Comprendre la différence juridique et technique cruciale entre l\'anonymisation (irréversible) et la pseudonymisation (réversible) sous le RGPD.',
  icon: 'Scale',
  category: 'concepts-fondamentaux',
  difficulty: 'intermédiaire',
  tags: ['rgpd', 'confidentialite', 'donnees', 'juridique'],
  keyTakeaways: [
    'L\'anonymisation rend l\'identification d\'une personne \"raisonnablement impossible\", sortant les données du champ d\'application du RGPD.',
    'La pseudonymisation remplace les identifiants directs mais permet une ré-identification via une clé : les données restent personnelles et sous le RGPD.',
    'Une donnée pseudonymisée reste une donnée personnelle. Une donnée anonymisée ne l\'est plus.',
    'Des techniques modernes comme le Data Masking ou la génération de données synthétiques sont souvent nécessaires pour une anonymisation robuste.',
  ],
  content: [
    {
      type: 'markdown',
      content: `## L\'Analogie Simple : Le Masque vs. Le Surnom`,
    },
    {
      type: 'markdown',
      content: `- **Anonymisation :** C\'est comme donner à quelqu\'un un masque complètement neutre, sans aucun signe distinctif, et le fondre dans une foule immense. Il devient impossible de savoir qui se cache derrière le masque. Il n\'est plus identifiable.
- **Pseudonymisation :** C\'est comme donner à quelqu\'un un surnom, par exemple "Le grand blond". Dans un petit groupe, tout le monde sait de qui on parle. Si on a la "liste des surnoms", on peut immédiatement retrouver son identité. Le lien existe toujours.`,
    },
    {
      type: 'markdown',
      content: `## La Définition Formelle`,
    },
    {
      type: 'table',
      caption: 'Comparaison Juridique et Technique',
      headers: ['Critère', 'Pseudonymisation', 'Anonymisation'],
      rows: [
        ['**Objectif**', 'Réduire le risque de fuite de données, sécuriser le traitement.', 'Empêcher de manière irréversible toute ré-identification.'],
        ['**Statut RGPD**', 'Les données restent des **données personnelles**.', 'Les données **ne sont plus des données personnelles**.'],
        ['**Ré-identification**', '**Possible** avec une information additionnelle (une "clé").', '**Raisonnablement impossible** par qui que ce soit.'],
        ['**Exemple Technique**', 'Remplacer le nom \'Jean Dupont\' par un identifiant unique \'A4B8-X92F\'.', 'Supprimer le nom, agréger l\'âge dans une tranche (40-50 ans), généraliser la ville à une région.'],
        ['**Droit des Personnes**', 'Tous les droits (accès, rectification, etc.) s\'appliquent toujours.', 'Les droits des personnes ne s\'appliquent plus.'],
      ],
    },
    {
      type: 'markdown',
      content: `## Pourquoi c\'est important pour vous`,
    },
    {
      type: 'alert',
      variant: 'default',
      title: 'Impact Pratique pour un Projet Étudiant ou Clinique',
      content: `Si vous pseudonymisez simplement un cas clinique (ex: en remplaçant le nom par "Patient X"), vous manipulez toujours des données personnelles au sens du RGPD. Vous avez l\'obligation de les protéger avec un niveau de sécurité maximal et de respecter les droits du patient. 

Ce n\'est qu\'avec une anonymisation robuste, où même vous ne pourriez plus retrouver le patient d\'origine, que les données sortent du cadre légal le plus strict. C\'est pourquoi la **génération de données synthétiques** (créer un patient fictif mais réaliste) est une méthode de plus en plus prisée pour l\'entraînement de modèles.`,
    },
    {
      type: 'markdown',
      content: `## Pour aller plus loin (Notions Avancées)`,
    },
    {
      type: 'card',
      title: 'Techniques Modernes d\'Anonymisation',
      content: `- **k-Anonymisation :** Garantit qu\'un individu ne peut être distingué d\'au moins k-1 autres individus dans le jeu de données.
- **l-Diversité :** Assure que pour chaque groupe d\'individus indiscernables, il y a au moins l formes différentes de l\'attribut sensible.
- **t-Closeness :** Une amélioration de la l-diversité qui exige que la distribution d\'un attribut sensible dans un groupe soit proche de sa distribution dans l\'ensemble des données.
- **Confidentialité Différentielle :** Une approche mathématique qui ajoute du "bruit" statistique aux données pour protéger la vie privée tout en préservant l\'utilité des analyses.`,
    },
  ],
} satisfies Concept

export default guide || concept || workflow
