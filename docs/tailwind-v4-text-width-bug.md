# Bug Tailwind v4 : Affichage "Un Mot Par Ligne"

## 🚨 Description du Problème

### Symptômes Observés
- **Texte illisible sur mobile** : Les paragraphes s'affichent avec un seul mot par ligne
- **Largeur excessive** : Les éléments avec `max-w-xs`, `max-w-md`, etc. deviennent étrangement étroits
- **Rupture de l'expérience utilisateur** : Impossible de lire le contenu sur appareils mobiles

### Cas Concrets Affectés Dans Notre Projet
- Page 404 : Texte d'explication illisible
- Footer : Description du site brisée
- Tout contenu utilisant les classes Tailwind `max-w-*`

## 🔍 Cause Technique

### Le Bug Tailwind v4
Tailwind CSS v4 (état Q3 2024) contient un bug dans le système de variables CSS où :

```css
/* CE QUI DEVRAIT SE PASSER */
.max-w-xs { max-width: var(--container-xs); } /* 20rem = 320px */

/* CE QUI SE PASSE RÉELLEMENT (BUG) */
.max-w-xs { max-width: var(--spacing-xs); } /* 0.25rem = 4px ! */
```

### Valeurs Problématiques
- `--spacing-xs: 0.25rem` (4px) au lieu de `--container-xs: 20rem` (320px)
- `--spacing-md: 1rem` (16px) au lieu de `--container-md: 28rem` (448px)
- Et ainsi de suite pour toutes les tailles...

### Pourquoi "Un Mot Par Ligne" ?
Avec une largeur maximale de seulement 4px ou 16px, le navigateur est forcé de passer à la ligne après chaque mot, créant l'effet "un mot par ligne".

## ✅ Solutions Implémentées

### 1. Redéfinition des Variables Container (globals.css)

```css
@theme inline {
  /* Correction explicite du bug Tailwind v4 */
  --container-3xs: 16rem; /* 256px */
  --container-2xs: 18rem; /* 288px */
  --container-xs: 20rem;  /* 320px */
  --container-sm: 24rem;  /* 384px */
  --container-md: 28rem;  /* 448px */
  --container-lg: 32rem;  /* 512px - CORRECTION PRINCIPALE */
  --container-xl: 36rem;  /* 576px */
  --container-2xl: 42rem; /* 672px */
  /* ... */
}
```

### 2. Utilitaires Sémantiques Personnalisés

Création d'utilitaires CSS qui contournent complètement le bug :

```css
@utility footer-description-width {
  max-width: 20rem; /* Valeur directe, contourne le bug */
  margin-left: auto;
  margin-right: auto;
}

@utility text-content-width {
  max-width: 28rem; /* Valeur directe, contourne le bug */
  margin-left: auto;
  margin-right: auto;
}
```

### 3. Remplacement Dans Les Composants

**Avant (Problématique) :**
```tsx
<p className="max-w-xs text-center mx-auto">
  Texte qui s'affiche un mot par ligne
</p>
```

**Après (Corrigé) :**
```tsx
<p className="footer-description-width text-center">
  Texte qui s'affiche correctement
</p>
```

## 🛡️ Comment Éviter Ce Problème à l'Avenir

### 1. Utiliser Les Utilitaires Sémantiques
Privilégier les utilitaires créés spécifiquement pour contourner le bug :
- `footer-description-width` pour descriptions courtes
- `text-content-width` pour contenus de taille moyenne
- `dialog-content-width` pour modales
- `offline-container-width` pour pages d'erreur

### 2. Vérification Systématique
Avant d'utiliser `max-w-*` :
1. **Tester sur mobile** d'abord
2. **Vérifier** que le texte ne s'affiche pas un mot par ligne
3. **Remplacer** par un utilitaire sémantique si nécessaire

### 3. Inspection Des Variables CSS
En cas de doute, utiliser les outils développeur pour vérifier :
```css
/* Inspecter la valeur réelle */
.max-w-xs {
  max-width: var(--container-xs); /* Doit être 20rem, pas 0.25rem */
}
```

### 4. Pattern de Remplacement
```tsx
// ❌ ÉVITER (peut être affecté par le bug)
className="max-w-xs mx-auto"
className="max-w-md mx-auto"
className="max-w-lg mx-auto"

// ✅ UTILISER (contourne le bug)
className="footer-description-width"
className="text-content-width"
className="dialog-content-width"
```

## 📱 Validation Visual

### Avant la Correction
![Texte brisé - un mot par ligne](https://github.com/user-attachments/assets/60d8ad1a-f567-4acc-b858-d4f6b263d44b)

### Après la Correction
![Texte corrigé - affichage naturel](https://github.com/user-attachments/assets/72fbfc89-1ca9-4d11-9988-d4cd968ded1f)

## 🔄 Perspective Long Terme

### Quand Tailwind v4 Sera Corrigé
- Les utilitaires sémantiques resteront **bénéfiques** pour la maintenabilité
- La redéfinition des variables `--container-*` pourra être **supprimée**
- Nos composants continueront de **fonctionner** sans modification

### Monitoring du Bug
- Suivre les releases de Tailwind CSS v4
- Tester régulièrement si le bug persiste
- Documenter tout changement de comportement

## 📚 Ressources Connexes

- [AGENTS.md - Section CSS Architecture](/AGENTS.md#css_architecture)
- [globals.css - Utilitaires personnalisés](/src/app/globals.css)
- [Footer.tsx - Exemple d'implémentation](/src/components/layout/Footer.tsx)
- [not-found.tsx - Autre exemple corrigé](/src/app/not-found.tsx)

---

**Date de création :** Septembre 2025  
**Dernière mise à jour :** Septembre 2025  
**Status du bug :** Toujours présent dans Tailwind v4 (Q3 2024)