# Design System Decision Matrix

## When to Use Different Styling Approaches

This guide helps developers choose the right styling approach for different scenarios in the Pharma Prompt Powerhouse application.

### 🎯 Quick Decision Tree

```
Need styling for... → Use this approach
├── One-off custom component → tailwind-variants + @layer components
├── Repeated visual pattern → @utility (semantic utility)
├── Base element styling → @layer base
├── Design token value → @theme inline (tokens.css)
└── Complex interactive state → React component with tailwind-variants
```

### 📊 Detailed Decision Matrix

| Scenario | Approach | Location | Example |
|----------|----------|----------|---------|
| **Design Tokens** | `@theme inline` | `src/styles/tokens.css` | Colors, spacing, typography scale |
| **Global Base Styles** | `@layer base` | `src/styles/base.css` | Element defaults, focus states |
| **Reusable Components** | `@layer components` | `src/styles/components.css` | Card variants, button base styles |
| **Semantic Patterns** | `@utility` | `src/styles/utilities.css` | `prose-title`, `section-spacing` |
| **Complex Variants** | `tailwind-variants` | Component files | Button variants with multiple states |
| **Animation Patterns** | `@keyframes` + `@utility` | `src/styles/animations.css` | Entrance animations, hover effects |

### 🔧 Implementation Guidelines

#### 1. Use `@theme inline` for:
- Design tokens (colors, spacing, typography)
- CSS custom properties that need to be inherited
- Values that change between themes

```css
@theme inline {
  --color-primary: hsl(220 98% 61%);
  --spacing-md: 1rem;
}
```

#### 2. Use `@layer base` for:
- Global element styling
- Focus state standardization
- Typography defaults

```css
@layer base {
  h1, h2, h3 {
    @apply font-semibold leading-tight;
  }
}
```

#### 3. Use `@layer components` for:
- Complex component patterns
- Multi-element components
- Base component classes

```css
@layer components {
  .card-interactive {
    @apply bg-card rounded-lg border shadow-sm;
    @apply hover:shadow-md transition-shadow;
  }
}
```

#### 4. Use `@utility` for:
- Semantic business patterns
- Frequently repeated combinations
- Responsive patterns

```css
@utility prose-title {
  @apply text-3xl md:text-4xl font-bold tracking-tight;
}
```

#### 5. Use `tailwind-variants` for:
- Component variants in React
- Complex conditional styling
- Type-safe variant systems

```ts
const buttonVariants = tv({
  base: "btn-base",
  variants: {
    variant: {
      primary: "btn-primary",
      secondary: "btn-secondary"
    }
  }
})
```

### 🎨 Styling Strategy by Component Type

#### UI Components (src/components/ui/)
- **Base styling**: `@layer components` in `components.css`
- **Variants**: `tailwind-variants` in component files
- **Interactive states**: CSS transitions + React state

#### Layout Components (src/components/layout/)
- **Structure**: `@utility` semantic classes
- **Responsive behavior**: CSS Grid/Flexbox with utilities
- **Spacing**: Design token utilities

#### Content Components (src/components/*)
- **Typography**: `@utility` prose classes
- **Layout patterns**: Semantic utility combinations
- **Interactions**: `tailwind-variants` for state management

### 🚀 Modern CSS Features Integration

#### Color Mixing (2025)
```css
/* Use color-mix for theme-aware colors */
.hover-tint {
  background: color-mix(in oklch, var(--background) 90%, var(--primary) 10%);
}
```

#### Container Queries
```css
/* Use @container for component-based responsive design */
@container (min-width: 300px) {
  .card-compact {
    @apply grid-cols-2;
  }
}
```

#### View Transitions API
```css
/* Prepare for view transitions */
.page-transition {
  view-transition-name: main-content;
}
```

### 🧪 Testing Guidelines

- **Accessibility**: All interactive components must pass axe-core tests
- **Performance**: Monitor CSS bundle size with each addition
- **Browser support**: Test modern CSS features with fallbacks
- **Responsive**: Verify layouts on all breakpoints

### 📝 Documentation Standards

When adding new styles:

1. **Document intent**: Explain why this approach was chosen
2. **Provide examples**: Show usage in context
3. **Consider alternatives**: Note what wasn't chosen and why
4. **Update decision matrix**: Add new patterns to this guide

### 🔄 Migration Strategy

When refactoring existing styles:

1. **Identify pattern**: Categorize the styling need
2. **Choose approach**: Use this matrix to decide
3. **Extract gradually**: Move styles incrementally
4. **Test thoroughly**: Verify visual consistency
5. **Update usage**: Update component implementations

---

This decision matrix ensures consistent, maintainable, and scalable styling across the entire application while leveraging the full power of Tailwind CSS v4's modern features.