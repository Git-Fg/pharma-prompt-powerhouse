# Architecture du Hub de Concepts

## Vue d'ensemble

Le **Hub de Concepts** est le cœur de l'expérience d'apprentissage sur Pharma Prompt Powerhouse. Il représente une refonte majeure de l'architecture, transformant le site d'une "bibliothèque avec des fiches" à un "réseau de connaissances sémantique" où chaque concept est un dossier complet reliant la théorie, la pratique et les outils.

## Philosophie de la Nouvelle Architecture

### Avant : Approche Silos

- L'utilisateur naviguait entre des sections isolées (`/guides`, `/prompts`, `/concepts`)
- Les concepts étaient découverts "après coup" en bas de page
- L'expérience était fragmentée et nécessitait une navigation complexe

### Maintenant : Approche Centrée sur les Concepts

- **Le Concept est l'entité centrale** - point de départ de l'apprentissage
- Chaque concept est un "dossier complet" qui centralise tout
- L'utilisateur suit un parcours logique : **Concept → Guide/Prompts → Outils**

## Structure des Données

### Schéma des Concepts (Enrichi)

```typescript
export const conceptSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
  content: z.string(),
  keyTakeaways: z.array(z.string()).max(3).optional(),

  // NOUVEAUX CHAMPS
  mainGuideSlug: z.string().optional(), // Slug du guide principal pour ce concept
  category: z
    .enum(["Fondamentaux", "Techniques Avancées", "Méthodologie"])
    .optional(),
});
```

### Catégorisation des Concepts

- **Fondamentaux** : Concepts de base (Context Engineering, Température, etc.)
- **Techniques Avancées** : Méthodes sophistiquées (XML Prompting, Tree-of-Thought, etc.)
- **Méthodologie** : Workflows et processus (Chaîne de Prompts, etc.)

## Architecture des Pages

### 1. Page d'Accueil (`/`)

- **Call-to-action principal** : "Commencer par un concept"
- **Philosophie** : Chaque concept est un dossier complet
- **Navigation** : Concepts en premier, puis outils

### 2. Hub de Concepts (`/concepts`)

- **Organisation par catégories** : Fondamentaux, Techniques Avancées, Méthodologie
- **Statistiques** : Nombre de guides et prompts liés à chaque concept
- **Interface** : Cartes avec icônes, descriptions et métadonnées

### 3. Dossier de Concept (`/concepts/[slug]`)

- **Guide Fondamental** : Le guide théorique principal (mis en avant)
- **Prompts d'Application** : Exemples pratiques à tester
- **Outil pour Pratiquer** : Lien direct vers l'éditeur
- **Guides d'Approfondissement** : Autres guides liés au concept

## Refonte du Contenu

### Guides Transformés en Tutoriels Pratiques

- **Avant** : Documents théoriques avec redéfinition des concepts
- **Maintenant** : Tutoriels "Comment faire" orientés action
- **Exemples** :
  - "Comment Construire un Prompt Pharmaceutique Efficace"
  - "Guide Pratique : Optimiser le Contexte de vos Prompts"
  - "Guide Pratique : Résoudre un Cas Clinique Complexe avec Tree-of-Thought"

### Nouveaux Guides Créés

- **Workflow : Automatiser la Création de Fiches de Révision**
- **Workflow d'Investigation : Analyser un Signal de Pharmacovigilance avec ToT**
- **Guide de Précision : Obtenir des Données Fiables avec XML et Température Basse**

## Navigation et UX

### Header Refactorisé

```typescript
const navigation = [
  {
    name: "Concepts",
    href: "/concepts",
    icon: Brain,
    description: "Point de départ : chaque concept est un dossier complet",
  },
  {
    name: "Guides",
    href: "/guides",
    icon: BookOpen,
    description: "Apprendre les bases du prompting",
  },
  // ... autres éléments
];
```

### Parcours Utilisateur Optimisé

1. **Arrivée** : Page d'accueil avec CTA "Commencer par un concept"
2. **Exploration** : Navigation dans le Hub de Concepts par catégorie
3. **Sélection** : Choix d'un concept d'intérêt
4. **Découverte** : Page "Dossier de Concept" avec tout centralisé
5. **Action** : Utilisation des outils et mise en pratique

## Avantages de la Nouvelle Architecture

### 1. **Expérience Utilisateur Améliorée**

- Parcours clair et logique
- Plus de navigation complexe entre sections
- Découverte guidée et progressive

### 2. **Contenu Mieux Structuré**

- Chaque concept a un guide principal identifié
- Liens explicites entre théorie et pratique
- Hiérarchisation claire des informations

### 3. **Maintenance Simplifiée**

- Logique centralisée sur les concepts
- Métadonnées structurées et cohérentes
- Évolutivité facilitée

### 4. **Apprentissage Optimisé**

- Approche "résolution de problème" plutôt que "lecture passive"
- Connexions explicites entre concepts et applications
- Workflows pratiques et reproductibles

## Implémentation Technique

### Content Collections

- **Concepts** : Collection pivot avec nouveaux champs
- **Guides** : Liens vers concepts via `concepts: string[]`
- **Prompts** : Liens vers concepts via `concepts: string[]`

### Composants React

- **ConceptsPage** : Listing organisé par catégories
- **ConceptDetailPage** : Dossier complet avec sections structurées
- **Navigation** : Header refactorisé avec concepts en premier

### Génération Statique

- **SSG** pour toutes les pages de concepts
- **Métadonnées** générées automatiquement
- **Liens** créés dynamiquement entre contenus

## Métriques de Succès

### 1. **Engagement Utilisateur**

- Temps passé sur les pages de concepts
- Navigation entre concepts et guides
- Utilisation des outils après consultation

### 2. **Qualité du Contenu**

- Couverture des concepts par des guides
- Liens entre concepts et ressources
- Cohérence des métadonnées

### 3. **Expérience Utilisateur**

- Facilité de navigation
- Clarté du parcours d'apprentissage
- Satisfaction globale

## Évolutions Futures

### 1. **Recommandations Intelligentes**

- Suggestions de concepts basées sur l'historique
- Parcours personnalisés selon le niveau
- Détection automatique des prérequis

### 2. **Contenu Dynamique**

- Génération automatique de résumés
- Mise à jour en temps réel des liens
- Adaptation du contenu selon l'utilisateur

### 3. **Analytics Avancés**

- Tracking des parcours d'apprentissage
- Analyse des concepts les plus consultés
- Optimisation continue de l'expérience

## Conclusion

Le Hub de Concepts transforme fondamentalement l'expérience d'apprentissage sur Pharma Prompt Powerhouse. En passant d'une approche "silos" à une approche "centrée sur les concepts", nous créons un écosystème d'apprentissage plus intuitif, plus efficace et plus engageant.

Cette architecture place l'utilisateur au centre de l'expérience, lui permettant de commencer par ce qui l'intéresse (un concept) et de découvrir naturellement tout ce qui s'y rapporte (guides, prompts, outils). C'est une approche moderne qui correspond aux attentes des apprenants d'aujourd'hui.
