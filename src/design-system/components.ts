/**
 * Design System Components
 *
 * Central aliases and exports for all UI components.
 * Provides single import point for consistent component usage.
 */

export {
  ActionChecklist,
  actionChecklistVariants,
  type ActionChecklistVariants,
} from '@/components/ui/action-checklist'

// Legacy exports for backward compatibility
// These will be deprecated in future versions
export {
  Alert,
  AlertDescription,
  AlertTitle,
  alertVariants,
} from '@/components/ui/alert'

export {
  Badge,
  badgeVariants,
  type BadgeVariants,
} from '@/components/ui/badge'

// shadcn/ui Core Components
export {
  Button,
  buttonVariants,
  type ButtonVariants,
} from '@/components/ui/button'

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  cardVariants,
  type CardVariants,
} from '@/components/ui/card'

// Layout Components
export {
  Container,
  containerVariants,
  type ContainerVariants,
} from '@/components/ui/container'

// Content Components
export {
  ContentCard,
  contentCardVariants,
  type ContentCardVariants,
} from '@/components/ui/content-card'

export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  dialogVariants,
} from '@/components/ui/dialog'

export {
  EmptyState,
  emptyStateVariants,
  type EmptyStateVariants,
} from '@/components/ui/empty-state'

// Form Components
export {
  FormField,
  formFieldVariants,
  type FormFieldVariants,
} from '@/components/ui/form-field'

export {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  hoverCardVariants,
} from '@/components/ui/hover-card'

export {
  Input,
  inputVariants,
  type InputVariants,
} from '@/components/ui/input'

// Interactive Components
export {
  InteractiveCard,
  interactiveCardVariants,
  type InteractiveCardVariants,
} from '@/components/ui/interactive-card'

// Utility Components
export {
  LoadingSpinner,
  loadingSpinnerVariants,
  type LoadingSpinnerVariants,
} from '@/components/ui/loading-spinner'

// Navigation Components
export {
  Navigation,
  navigationVariants,
  type NavigationVariants,
} from '@/components/ui/navigation'

export {
  Section,
  sectionVariants,
  type SectionVariants,
} from '@/components/ui/section'

export {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  sheetVariants,
} from '@/components/ui/sheet'

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  tableVariants,
} from '@/components/ui/table'

export {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  tabsVariants,
} from '@/components/ui/tabs'

export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  tooltipVariants,
} from '@/components/ui/tooltip'

// Design System Hooks
export { useDesignTokens } from '@/hooks/use-design-tokens'

// Theme and Styling
export { cn } from '@/lib/utils'

// Re-export commonly used types and utilities
export type {
  CVAProps,
  VariantProps,
} from 'class-variance-authority'

// Component mapping for easy access
export const components = {
  // Core
  button: Button,
  card: Card,
  badge: Badge,
  input: Input,

  // Layout
  container: Container,
  section: Section,

  // Content
  contentCard: ContentCard,
  actionChecklist: ActionChecklist,

  // Interactive
  interactiveCard: InteractiveCard,

  // Forms
  formField: FormField,

  // Navigation
  navigation: Navigation,

  // Utility
  loadingSpinner: LoadingSpinner,
  emptyState: EmptyState,
} as const

// Type helpers for component mapping
export type ComponentName = keyof typeof components
export type ComponentProps<T extends ComponentName>
  = React.ComponentProps<typeof components[T]>

// Default export for easy importing
export default {
  // Core components
  Button,
  Card,
  Badge,
  Input,

  // Layout
  Container,
  Section,

  // Content
  ContentCard,
  ActionChecklist,

  // Interactive
  InteractiveCard,

  // Forms
  FormField,

  // Navigation
  Navigation,

  // Utility
  LoadingSpinner,
  EmptyState,

  // Variants
  buttonVariants,
  cardVariants,
  badgeVariants,
  inputVariants,
  containerVariants,
  sectionVariants,
  contentCardVariants,
  actionChecklistVariants,
  interactiveCardVariants,
  formFieldVariants,
  navigationVariants,
  loadingSpinnerVariants,
  emptyStateVariants,

  // Utilities
  cn,
  useDesignTokens,

  // Component mapping
  components,
}
