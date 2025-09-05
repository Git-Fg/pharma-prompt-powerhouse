# Component Choice Heuristics - UX Design Guide

## Overview

This document provides clear decision-making frameworks for choosing the most appropriate UI components in different contexts. These heuristics are based on cognitive load theory, information architecture principles, and user behavior patterns.

## Decision Matrix: Component Selection

### 1. Content Organization Components

#### Tabs vs. Accordion vs. Card Layout

| Use Case | Component | Why | When NOT to Use |
|----------|-----------|-----|-----------------|
| **Related content sections** with **frequent switching** | `Tabs` | • Minimal cognitive load<br>• All options visible<br>• Quick navigation | • More than 6-7 tabs<br>• On mobile (narrow screens)<br>• Content varies significantly in length |
| **Optional/progressive content** with **vertical scanning** | `Accordion` | • Space efficient<br>• Natural reading flow<br>• Show/hide flexibility | • All sections equally important<br>• Frequent cross-referencing needed<br>• Very short content |
| **Independent content blocks** with **similar importance** | `Card Layout` | • Clear separation<br>• Scannable structure<br>• Flexible arrangement | • Sequential reading required<br>• Space is severely limited<br>• Strong content hierarchy needed |

#### Practical Application Examples

```typescript
// ✅ GOOD: Tabs for related settings
<Tabs defaultValue="general">
  <TabsList>
    <TabsTrigger value="general">Général</TabsTrigger>
    <TabsTrigger value="notifications">Notifications</TabsTrigger>
    <TabsTrigger value="privacy">Confidentialité</TabsTrigger>
  </TabsList>
  {/* Content tabs */}
</Tabs>

// ✅ GOOD: Accordion for FAQ or optional details
<Accordion type="single" collapsible>
  <AccordionItem value="setup">
    <AccordionTrigger>Configuration initiale</AccordionTrigger>
    <AccordionContent>Detailed setup instructions...</AccordionContent>
  </AccordionItem>
</Accordion>

// ✅ GOOD: Cards for independent content blocks
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <ToolCard tool={tool1} />
  <ToolCard tool={tool2} />
  <ToolCard tool={tool3} />
</div>
```

### 2. Information Hierarchy Components

#### When to Use Different Heading Levels

| Context | Heading Level | Visual Treatment | Purpose |
|---------|---------------|------------------|---------|
| **Page Title** | `h1` | `text-3xl md:text-4xl font-bold` | Single per page, main topic |
| **Major Sections** | `h2` | `text-2xl md:text-3xl font-semibold` | Primary content divisions |
| **Subsections** | `h3` | `text-xl md:text-2xl font-medium` | Secondary breakdowns |
| **Content Blocks** | `h4` | `text-lg font-medium` | Specific topics within subsections |
| **Minor Labels** | `h5` or `div` | `text-base font-medium` | Labels, captions, metadata |

### 3. Interactive Components

#### Button Hierarchy and Usage

| Priority | Component | Visual Style | Use Case |
|----------|-----------|-------------|----------|
| **Primary Action** | `Button variant="default"` | Solid primary color | Main CTA, form submissions |
| **Secondary Action** | `Button variant="outline"` | Border with transparent fill | Alternative actions, navigation |
| **Tertiary Action** | `Button variant="ghost"` | No border, subtle hover | Low-priority actions, icon buttons |
| **Destructive Action** | `Button variant="destructive"` | Red/warning color | Delete, remove, dangerous actions |

#### Input Component Selection

| Data Type | Component | When to Use | Considerations |
|-----------|-----------|-------------|----------------|
| **Short Text** | `Input` | Names, emails, URLs | Single line, predictable length |
| **Long Text** | `Textarea` | Descriptions, comments, feedback | Multi-line, variable length |
| **Predefined Options (≤5)** | `RadioGroup` | Exclusive selection, few options | All options should be visible |
| **Predefined Options (>5)** | `Select` | Exclusive selection, many options | Searchable for >10 options |
| **Multiple Selection** | `Checkbox` (few) or `Multi-Select` (many) | Non-exclusive choices | Consider cognitive load |
| **Boolean** | `Switch` or `Checkbox` | On/off states | Switch for immediate effect, Checkbox for form submission |

## Content-Specific Guidelines

### Medical/Healthcare Content

#### Information Density Management

```typescript
// ✅ GOOD: Progressive disclosure for complex medical information
<Card>
  <CardHeader>
    <CardTitle>Diagnostic Workflow</CardTitle>
    <CardDescription>Essential steps for AI-assisted diagnosis</CardDescription>
  </CardHeader>
  <CardContent>
    {/* High-level overview first */}
    <KeyTakeaways points={essentialSteps} variant="highlighted" />
    
    {/* Detailed steps in expandable sections */}
    <Accordion type="single" collapsible className="mt-6">
      {detailedSteps.map(step => (
        <AccordionItem key={step.id} value={step.id}>
          <AccordionTrigger>{step.title}</AccordionTrigger>
          <AccordionContent>{step.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </CardContent>
</Card>
```

#### Error States and Warnings

| Severity | Component | Visual Treatment | Use Case |
|----------|-----------|------------------|----------|
| **Critical** | `Alert variant="destructive"` | Red background, icon | Safety warnings, errors |
| **Warning** | `Alert variant="warning"` | Yellow/orange background | Cautions, important notes |
| **Info** | `Alert variant="default"` | Blue background | Additional information |
| **Success** | `Alert variant="success"` | Green background | Confirmations, completions |

## Responsive Design Decisions

### Mobile-First Component Adaptations

| Desktop Component | Mobile Alternative | Reasoning |
|-------------------|-------------------|-----------|
| **Tabs** | `Accordion` or `Select` | Limited horizontal space |
| **Sidebar Navigation** | `Sheet` (slide-out) | Touch-friendly, space efficient |
| **Hover Tooltips** | `Popover` (tap to reveal) | No hover state on touch devices |
| **Multi-column Cards** | `Single-column Stack` | Better readability on narrow screens |

### Breakpoint-Specific Layouts

```typescript
// ✅ GOOD: Responsive component selection
function ResponsiveContentLayout({ items }: { items: ContentItem[] }) {
  const isMobile = useMediaQuery('(max-width: 768px)')
  
  if (isMobile) {
    return (
      <Accordion type="single" collapsible>
        {items.map(item => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    )
  }
  
  return (
    <Tabs defaultValue={items[0]?.id}>
      <TabsList>
        {items.map(item => (
          <TabsTrigger key={item.id} value={item.id}>
            {item.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map(item => (
        <TabsContent key={item.id} value={item.id}>
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}
```

## Accessibility Considerations

### Cognitive Load Reduction

| Principle | Implementation | Impact |
|-----------|----------------|--------|
| **Progressive Disclosure** | Accordion for detailed content | Reduces initial overwhelm |
| **Chunking** | Card grids with consistent sizing | Easier visual scanning |
| **Clear Hierarchy** | Proper heading structure | Better screen reader navigation |
| **Consistent Patterns** | Standardized component usage | Reduced learning curve |

### Screen Reader Optimization

```typescript
// ✅ GOOD: Accessible component implementation
<Tabs defaultValue="overview" className="w-full">
  <TabsList className="grid w-full grid-cols-3">
    <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
    <TabsTrigger value="details">Détails</TabsTrigger>
    <TabsTrigger value="examples">Exemples</TabsTrigger>
  </TabsList>
  
  <TabsContent value="overview" className="space-y-4">
    <h2 className="sr-only">Vue d'ensemble du contenu</h2>
    {/* Content with proper heading structure */}
  </TabsContent>
</Tabs>
```

## Performance Considerations

### Component Loading Strategies

| Component Type | Loading Strategy | Reasoning |
|----------------|------------------|-----------|
| **Above-fold Components** | Immediate render | Critical for initial page load |
| **Interactive Components** | Lazy load on interaction | Reduces initial bundle size |
| **Heavy Data Components** | Skeleton + async loading | Better perceived performance |
| **Modal/Dialog Content** | Load on demand | Not needed until user action |

## Decision Flowcharts

### Content Organization Decision Tree

```
Content to Display?
├── Sequential Reading Required?
│   ├── Yes → Use Accordion or Vertical Stack
│   └── No → Continue to next question
├── Frequent Cross-Referencing?
│   ├── Yes → Use Tabs (desktop) or Select (mobile)
│   └── No → Continue to next question
├── Equal Importance Content?
│   ├── Yes → Use Card Grid
│   └── No → Use Hierarchical Layout (Accordion)
└── Space Constrained?
    ├── Yes → Use Compact Accordion
    └── No → Use Spacious Card Layout
```

### Form Component Selection

```
Input Required?
├── Predefined Options?
│   ├── Yes → How Many Options?
│   │   ├── ≤5 → Radio Group
│   │   └── >5 → Select Dropdown
│   └── No → Continue to next question
├── Multiple Lines Needed?
│   ├── Yes → Textarea
│   └── No → Single Line Input
└── Boolean Choice?
    ├── Immediate Effect → Switch
    └── Form Submission → Checkbox
```

## Testing Your Component Choices

### User Testing Checklist

- [ ] Users can complete primary tasks without confusion
- [ ] Information hierarchy is clear and logical
- [ ] Interactive elements are discoverable and accessible
- [ ] Mobile experience is touch-friendly
- [ ] Loading states provide appropriate feedback
- [ ] Error states are clear and actionable

### Metrics to Monitor

| Metric | Good Performance | Tools |
|--------|------------------|-------|
| **Task Completion Rate** | >90% | User testing, analytics |
| **Time to Complete Task** | Baseline -20% | User session recordings |
| **Error Rate** | <5% | Form analytics, error tracking |
| **User Satisfaction** | >4.5/5 | Surveys, feedback |

## Common Anti-Patterns to Avoid

### ❌ What NOT to Do

```typescript
// ❌ BAD: Too many tabs (cognitive overload)
<Tabs>
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
    <TabsTrigger value="tab4">Tab 4</TabsTrigger>
    <TabsTrigger value="tab5">Tab 5</TabsTrigger>
    <TabsTrigger value="tab6">Tab 6</TabsTrigger>
    <TabsTrigger value="tab7">Tab 7</TabsTrigger>
    <TabsTrigger value="tab8">Tab 8</TabsTrigger>
  </TabsList>
</Tabs>

// ❌ BAD: Accordion for frequently accessed content
<Accordion type="single">
  <AccordionItem value="navigation">
    <AccordionTrigger>Main Navigation</AccordionTrigger>
    <AccordionContent>
      {/* Primary navigation hidden by default */}
    </AccordionContent>
  </AccordionItem>
</Accordion>

// ❌ BAD: Cards for sequential content
<div className="grid grid-cols-3 gap-4">
  <Card>Step 1: Setup</Card>
  <Card>Step 2: Configuration</Card>
  <Card>Step 3: Deploy</Card>
</div>
```

### ✅ Better Alternatives

```typescript
// ✅ GOOD: Use Select for many options
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Choisir une catégorie" />
  </SelectTrigger>
  <SelectContent>
    {categories.map(category => (
      <SelectItem key={category.id} value={category.id}>
        {category.name}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

// ✅ GOOD: Always-visible navigation
<nav className="flex items-center space-x-4">
  <Link href="/guides">Guides</Link>
  <Link href="/concepts">Concepts</Link>
  <Link href="/tools">Outils</Link>
</nav>

// ✅ GOOD: Sequential steps with clear progression
<div className="space-y-6">
  <div className="flex items-center space-x-4">
    <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full">1</div>
    <h3>Setup</h3>
  </div>
  <div className="flex items-center space-x-4">
    <div className="flex items-center justify-center w-8 h-8 bg-muted text-muted-foreground rounded-full">2</div>
    <h3>Configuration</h3>
  </div>
  {/* etc. */}
</div>
```

---

## Quick Reference Card

Print this section and keep it handy during development:

### Component Decision Quick Reference

| **Scenario** | **Component** | **Key Reason** |
|--------------|---------------|----------------|
| Switching between related views | `Tabs` | Quick access, minimal cognitive load |
| Optional/detailed information | `Accordion` | Progressive disclosure, space efficient |
| Independent, equal content | `Card Grid` | Clear separation, scannable |
| Form with predefined options (≤5) | `Radio Group` | All options visible |
| Form with many predefined options | `Select` | Space efficient, searchable |
| Yes/no immediate toggle | `Switch` | Clear binary state |
| Complex information | `KeyTakeaways` + `Accordion` | Overview first, details on demand |
| Critical information | `Alert variant="destructive"` | High visibility, clear importance |

Remember: **When in doubt, test with real users.** These heuristics are guidelines, not absolute rules.