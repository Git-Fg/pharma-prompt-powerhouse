# Design System Guidelines

## 🎯 Mission

Établir une source unique de vérité pour le design de Pharma Prompt Powerhouse, garantissant cohérence visuelle et maintenabilité à travers toute l'application.

## 📋 Règles Fondamentales

### 1. Utilisation Obligatoire des Tokens
```typescript
// ✅ CORRECT: Utiliser les tokens
import { designTokens } from '@/design-system/tokens'

function MyComponent() {
  return React.createElement('div', { style: { padding: designTokens.spacing.md } }, React.createElement('p', { style: { fontSize: designTokens.typography.fontSize.base } }, 'Content'))
}

// ❌ INCORRECT: Valeurs codées en dur
React.createElement('div', { className: 'p-4 text-base' }, // Éviter les valeurs magiques
  'Content')
```

### 2. Variants Uniques
Tous les composants doivent utiliser `tailwind-variants` via le fichier centralisé `/src/design-system/variants.ts`

### 3. Conteneurs Sémantiques
Utiliser les classes de conteneur sémantiques pour contourner le bug Tailwind v4 :

```typescript
// ✅ CORRECT: Utiliser les tokens de conteneur
import { containerTokens } from '@/design-system/tokens'

<div style={{ maxWidth: containerTokens.md }}>Content</div>

// ❌ INCORRECT: Classes Tailwind v4 problématiques
<div className="max-w-md">Content</div> // Provoque le bug "un mot par ligne"
```

### 4. Typographie Contrôlée
Tous les éléments textuels doivent utiliser les classes sémantiques définies :

```typescript
/* Classes sémantiques disponibles */
.prose-title     /* Titres principaux */
.prose-slogan    /* Slogan (taille fixe text-sm) */
.prose-heading   /* Titres de section */
.prose-body      /* Texte de contenu */
.prose-caption   /* Légendes et petits textes */
```

## 🛠️ Architecture du Design System

### Structure des Fichiers
```
/src/design-system/
├── tokens.ts           # Export centralisé de tous les tokens CSS
├── variants.ts         # Tous les variants tailwind-variants
├── components.ts       # Alias vers composants shadcn/ui + customs
└── guidelines.md       # Ce fichier de guidelines
```

### Flux de Travail
1. **Besoin d'un nouveau style** → Vérifier si un token existe déjà
2. **Token manquant** → Ajouter dans `globals.css` puis exporter dans `tokens.ts`
3. **Besoin d'un variant** → Créer dans `variants.ts` avec tailwind-variants
4. **Nouveau composant** → Utiliser les variants existants ou en créer de nouveaux

## 🚨 Interdictions Critiques

### Tailwind v4 Bugs à Éviter
```typescript
/* ❌ INTERDIT: Classes max-width problématiques */
.max-w-xs, .max-w-sm, .max-w-md, .max-w-lg, .max-w-xl, .max-w-2xl
/* Ces classes provoquent le bug "un mot par ligne" */

/* ✅ ALTERNATIVE: Utiliser les tokens de conteneur */
container-sm, container-md, container-lg, etc.
```

### Valeurs Codées en Dur
```typescript
// ❌ INTERDIT: Valeurs magiques
padding: 16px
margin: 1rem
fontSize: '14px'
borderRadius: '8px'

// ✅ OBLIGATOIRE: Utiliser les tokens
padding: designTokens.spacing.md
margin: designTokens.spacing.sm
fontSize: designTokens.typography.fontSize.sm
borderRadius: designTokens.radius.md
```

### Variants Multiples
```typescript
// ❌ INTERDIT: Plusieurs librairies de variants
import { cva } from 'class-variance-authority'
import { tv } from 'tailwind-variants'

// ✅ OBLIGATOIRE: Uniquement tailwind-variants
import { tv } from 'tailwind-variants'
```

## 📐 Standards Visuels

### Espacement
- **Unité de base** : 4px (1rem = 16px)
- **Échelle** : 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64px
- **Utilisation** : Via tokens `designTokens.spacing.*`

### Typographie
- **Échelle mobile-first** : 12px à 24px
- **Line height** : 1.25 à 2.0
- **Font weights** : 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Couleurs
- **Palette sémantique** : primary, secondary, destructive
- **States** : muted, accent, foreground
- **Accessibilité** : Contraste minimum 4.5:1 pour le texte

### Bordures
- **Rayons** : 0, 4, 8, 12, 16px, et full
- **Épaisseur** : 1px standard
- **Couleurs** : border et input tokens

## 🔧 Processus de Développement

### Pour les Nouveaux Composants
1. Analyser les composants existants similaires
2. Déterminer si des variants existent
3. Créer le composant en utilisant les tokens et variants existants
4. Ajouter des variants uniquement si nécessaire

### Pour les Modifications
1. Identifier tous les composants affectés
2. Mettre à jour les tokens si nécessaire
3. Appliquer les changements via les variants
4. Tester sur mobile et desktop

### Review Checklist
- [ ] Utilisation des tokens CSS (pas de valeurs codées)
- [ ] Utilisation de tailwind-variants uniquement
- [ ] Conteneurs sémantiques (pas de max-width problématiques)
- [ ] Typographie cohérente avec les classes sémantiques
- [ ] Accessibilité vérifiée (contraste, tailles de cibles)
- [ ] Responsive design mobile-first
- [ ] Tests automatisés passants

## 📊 Metrics de Qualité

### Objectifs
- **100%** des composants utilisent les tokens CSS
- **100%** des composants utilisent tailwind-variants
- **0%** de valeurs codées en dur
- **0%** de classes max-width problématiques

### Monitoring
- Tests ESLint automatisés
- Tests visuels réguliers
- Audits trimestriels du design system

## 🚀 Mise à Jour du Design System

### Ajout de Nouveaux Tokens
1. Ajouter dans `/src/app/globals.css`
2. Exporter dans `/src/design-system/tokens.ts`
3. Mettre à jour la documentation
4. Annoncer dans les notes de version

### Dépréciation
- Taguer les anciens composants avec `@deprecated`
- Fournir des chemins de migration
- Maintenir la compatibilité pendant une version mineure

---

**Rappel :** Ce design system existe pour prévenir des problèmes comme l'incohérence de tailles de texte (ex: slogan trop grand). En suivant ces guidelines, nous garantissons une expérience utilisateur cohérente et une maintenance simplifiée.
