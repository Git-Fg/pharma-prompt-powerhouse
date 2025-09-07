# UX Component Heuristics - Essential Guide

## Overview

Decision-making frameworks for choosing appropriate UI components based on cognitive load and user behavior patterns.

## Quick Decision Matrix

### Content Organization

| Scenario | Component | Key Benefit | Avoid When |
|----------|-----------|-------------|------------|
| **Related content, frequent switching** | `Tabs` | Quick access, minimal cognitive load | >7 tabs, mobile, content length varies |
| **Optional/progressive content** | `Accordion` | Space efficient, natural flow | Equal importance, cross-referencing needed |
| **Independent, equal content** | `Card Grid` | Clear separation, scannable | Sequential reading, space limited |

### Component Examples

```typescript
// ✅ Tabs for related content
<Tabs defaultValue="general">
  <TabsList>
    <TabsTrigger value="general">Général</TabsTrigger>
    <TabsTrigger value="details">Détails</TabsTrigger>
  </TabsList>
</Tabs>

// ✅ Accordion for optional details
<Accordion type="single" collapsible>
  <AccordionItem value="setup">
    <AccordionTrigger>Configuration</AccordionTrigger>
    <AccordionContent>Instructions détaillées...</AccordionContent>
  </AccordionItem>
</Accordion>

// ✅ Cards for independent content
<div className="grid gap-4 md:grid-cols-2">
  <Card>Contenu indépendant 1</Card>
  <Card>Contenu indépendant 2</Card>
</div>
```

## Essential Component Patterns

### Button Hierarchy
- **Primary**: `variant="default"` - Main actions
- **Secondary**: `variant="outline"` - Alternative actions  
- **Destructive**: `variant="destructive"` - Dangerous actions

### Input Selection
- **Short text**: `Input` component
- **Long text**: `Textarea` component
- **Options (≤5)**: `RadioGroup`
- **Options (>5)**: `Select`

### Mobile Adaptations
- **Tabs** → `Accordion` or `Select`
- **Sidebar** → `Sheet` (slide-out)
- **Multi-column** → Single column

## Quick Reference

| **Scenario** | **Component** | **Key Reason** |
|--------------|---------------|----------------|
| Related views switching | `Tabs` | Quick access |
| Optional details | `Accordion` | Progressive disclosure |
| Independent content | `Card Grid` | Clear separation |
| Form options (≤5) | `Radio Group` | All visible |
| Form options (>5) | `Select` | Space efficient |
| Yes/no toggle | `Switch` | Clear binary state |

**Remember**: These are guidelines, not absolute rules. Test with real users when possible.