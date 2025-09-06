# Exemples d'utilisation de SectionCard

Le composant `SectionCard` est conçu pour fournir une structure cohérente pour toutes les sections de contenu qui nécessitent un titre, une description et une icône.

## Utilisation de base

```tsx
import { SectionCard } from '@/components/shared/SectionCard'
import { BookOpen } from 'lucide-react'

<SectionCard
  title="Concepts fondamentaux"
  description="Ce contenu s'appuie sur les concepts suivants"
  icon={BookOpen}
>
  <div className="grid gap-4 md:grid-cols-2">
    {/* Contenu de la section */}
  </div>
</SectionCard>
```

## Avec différentes tailles d'icône

```tsx
import { SectionCard } from '@/components/shared/SectionCard'
import { Settings, User, Home } from 'lucide-react'

// Icône petite
<SectionCard
  title="Paramètres"
  icon={Settings}
  iconSize="sm"
>
  {/* Contenu */}
</SectionCard>

// Icône moyenne (défaut)
<SectionCard
  title="Profil utilisateur"
  icon={User}
  iconSize="md"
>
  {/* Contenu */}
</SectionCard>

// Icône grande
<SectionCard
  title="Accueil"
  icon={Home}
  iconSize="lg"
>
  {/* Contenu */}
</SectionCard>
```

## Avec classes CSS personnalisées

```tsx
import { SectionCard } from '@/components/shared/SectionCard'
import { AlertTriangle } from 'lucide-react'

<SectionCard
  title="Points de vigilance"
  description="Informations importantes à considérer"
  icon={AlertTriangle}
  className="border-orange-200 bg-orange-50"
  titleClassName="text-orange-700"
  iconClassName="bg-orange-200"
>
  <div className="space-y-2">
    <p className="text-sm text-orange-700">
      • Vérifiez toujours les sources
    </p>
    <p className="text-sm text-orange-700">
      • Consultez un professionnel de santé
    </p>
  </div>
</SectionCard>
```

## Utilisation avec des animations

```tsx
import { SectionCard } from '@/components/shared/SectionCard'
import { AnimatedElement } from '@/components/ui/css-animations'
import { Sparkles } from 'lucide-react'

<AnimatedElement variant="slideUp" delay={200}>
  <SectionCard
    title="Contenu similaire"
    description="Découvrez d'autres contenus qui partagent des thématiques communes"
    icon={Sparkles}
  >
    <div className="grid gap-4">
      {/* Cartes de recommandation */}
    </div>
  </SectionCard>
</AnimatedElement>
```

## Composants refactoriés utilisant SectionCard

### 1. ConceptListSection
```tsx
// Avant
<Card>
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <BookOpen className="size-5" />
      Concepts fondamentaux abordés
    </CardTitle>
    <p className="text-sm text-muted-foreground">Description...</p>
  </CardHeader>
  <CardContent>
    {/* Contenu */}
  </CardContent>
</Card>

// Après
<SectionCard
  title="Concepts fondamentaux abordés"
  description="Ce contenu s'appuie sur les concepts suivants"
  icon={BookOpen}
>
  <div className="grid gap-4 md:grid-cols-2">
    {/* Contenu */}
  </div>
</SectionCard>
```

### 2. PointsBlock
```tsx
// Avant
<Card className="my-6">
  <CardHeader>
    <CardTitle className="text-lg font-semibold text-foreground">
      Points clés
    </CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    {/* Points */}
  </CardContent>
</Card>

// Après
<SectionCard
  title="Points clés"
  className="my-6"
>
  <div className="space-y-4">
    {/* Points */}
  </div>
</SectionCard>
```

### 3. ActionChecklist (variante card)
```tsx
// Avant
<Card className="mb-8">
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <CheckCircle2 className="size-5" />
      Plan d'action
    </CardTitle>
  </CardHeader>
  <CardContent>
    {/* Checklist */}
  </CardContent>
</Card>

// Après
<SectionCard
  title="Plan d'action"
  description="Transformez ces connaissances en actions concrètes"
  icon={CheckCircle2}
  className="mb-8"
>
  {/* Checklist */}
</SectionCard>
```

## Composants complexes qui ne sont pas adaptés

Certains composants ont des structures trop complexes ou personnalisées pour être utilisés avec `SectionCard` :

- **KeyTakeaways** : Variantes multiples avec styles personnalisés et décorations
- **SectionBlock** : Système complexe avec badges, icônes emoji et styles dynamiques
- **ToolRecommendation** : Structure avec actions multiples et contenu spécialisé
- **Example** : Variants multiples avec onglets et gestion complexe du contenu

## Bonnes pratiques

1. **Utiliser pour les sections simples** : SectionCard est idéal pour les sections avec une structure titre + contenu simple
2. **Personnaliser avec les props** : Utiliser les props de customization plutôt que d'écraser les styles
3. **Garder la cohérence** : Utiliser le même style d'icône et de titrage dans toute l'application
4. **Combiner avec des animations** : Utiliser AnimatedElement pour des transitions fluides
5. **Tests** : Utiliser la prop `testId` pour les tests automatisés