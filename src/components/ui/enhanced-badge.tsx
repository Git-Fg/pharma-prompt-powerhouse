// src/components/ui/enhanced-badge.tsx
'use client';

import { cn } from '@/lib/utils';
import { 
  categoryBadgeVariants,
  difficultyBadgeVariants,
  confidenceBadgeVariants,
  statusBadgeVariants,
  getCategoryVariant,
  getDifficultyVariant,
  getConfidenceVariant,
  type CategoryBadgeVariants,
  type DifficultyBadgeVariants,
  type ConfidenceBadgeVariants,
  type StatusBadgeVariants
} from './variants';
import { getCategoryLabel, getDifficultyLabel, getConfidenceInfo } from '@/lib/constants';

interface CategoryBadgeProps {
  category: string;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
}

interface DifficultyBadgeProps {
  difficulty: string;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
}

interface ConfidenceBadgeProps {
  score: number;
  showLabel?: boolean;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
}

interface StatusBadgeProps {
  status: 'available' | 'coming-soon' | 'development' | 'deprecated' | 'experimental' | 'beta';
  className?: string;
  size?: 'sm' | 'default' | 'lg';
}

/**
 * Enhanced Category Badge with semantic styling and type safety
 */
export function CategoryBadge({ category, className, size = 'default' }: CategoryBadgeProps) {
  const variant = getCategoryVariant(category);
  const label = getCategoryLabel(category);
  
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    default: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm'
  };

  return (
    <span
      className={cn(
        categoryBadgeVariants({ category: variant }),
        sizeStyles[size],
        className
      )}
      title={`Catégorie: ${label}`}
    >
      {label}
    </span>
  );
}

/**
 * Enhanced Difficulty Badge with semantic styling and accessibility
 */
export function DifficultyBadge({ difficulty, className, size = 'default' }: DifficultyBadgeProps) {
  const variant = getDifficultyVariant(difficulty);
  const label = getDifficultyLabel(difficulty);
  
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    default: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm'
  };

  const icons = {
    'débutant': '🌱',
    'intermédiaire': '🚀',
    'avancé': '⭐'
  };

  return (
    <span
      className={cn(
        difficultyBadgeVariants({ difficulty: variant }),
        sizeStyles[size],
        className
      )}
      title={`Niveau: ${label}`}
    >
      <span className="mr-1" aria-hidden="true">
        {icons[variant]}
      </span>
      {label}
    </span>
  );
}

/**
 * Enhanced Confidence Badge with visual score indicator
 */
export function ConfidenceBadge({ score, showLabel = true, className, size = 'default' }: ConfidenceBadgeProps) {
  const variant = getConfidenceVariant(score);
  const confidenceInfo = getConfidenceInfo(score);
  
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    default: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm'
  };

  return (
    <span
      className={cn(
        confidenceBadgeVariants({ confidence: variant }),
        sizeStyles[size],
        className
      )}
      title={confidenceInfo.description}
    >
      <span className="mr-1" aria-hidden="true">
        {confidenceInfo.label}
      </span>
      {showLabel && `Confiance ${score}/5`}
    </span>
  );
}

/**
 * Enhanced Status Badge with semantic meaning
 */
export function StatusBadge({ status, className, size = 'default' }: StatusBadgeProps) {
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    default: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm'
  };

  const statusLabels = {
    available: 'Disponible',
    'coming-soon': 'Bientôt',
    development: 'En développement',
    deprecated: 'Déprécié',
    experimental: 'Expérimental',
    beta: 'Beta'
  };

  const statusIcons = {
    available: '✅',
    'coming-soon': '⏳',
    development: '🚧',
    deprecated: '❌',
    experimental: '🧪',
    beta: '🔬'
  };

  return (
    <span
      className={cn(
        statusBadgeVariants({ status }),
        sizeStyles[size],
        className
      )}
      title={`Status: ${statusLabels[status]}`}
    >
      <span className="mr-1" aria-hidden="true">
        {statusIcons[status]}
      </span>
      {statusLabels[status]}
    </span>
  );
}

// =================================================================
// COMPOSITE BADGE COMPONENT FOR CONTENT ITEMS
// =================================================================

interface ContentBadgeGroupProps {
  category?: string;
  difficulty?: string;
  confidence?: number;
  status?: StatusBadgeProps['status'];
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  layout?: 'inline' | 'stacked';
}

/**
 * Composite badge group for content items (guides, concepts, tools, etc.)
 */
export function ContentBadgeGroup({ 
  category, 
  difficulty, 
  confidence, 
  status,
  className,
  size = 'default',
  layout = 'inline'
}: ContentBadgeGroupProps) {
  const layoutStyles = {
    inline: 'flex flex-wrap gap-2',
    stacked: 'flex flex-col gap-1'
  };

  return (
    <div className={cn(layoutStyles[layout], className)}>
      {category && <CategoryBadge category={category} size={size} />}
      {difficulty && <DifficultyBadge difficulty={difficulty} size={size} />}
      {confidence && <ConfidenceBadge score={confidence} size={size} />}
      {status && <StatusBadge status={status} size={size} />}
    </div>
  );
}