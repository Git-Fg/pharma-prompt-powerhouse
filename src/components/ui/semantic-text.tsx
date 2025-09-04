'use client';

import { cn } from '@/lib/utils';
import { 
  parseEmphasisText, 
  renderTextSegments, 
  applySemantitPatterns,
  type EmphasisLevel,
  type TextRole 
} from '@/lib/content-formatting';

interface SemanticTextProps {
  children: string;
  /**
   * Default emphasis level for **bold** text
   */
  defaultEmphasis?: EmphasisLevel;
  /**
   * Text role for contextual styling
   */
  role?: TextRole;
  /**
   * Apply automatic semantic patterns (pharmacy terms, warnings, etc.)
   */
  autoPatterns?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Render as specific HTML element
   */
  as?: 'span' | 'p' | 'div';
}

/**
 * SemanticText Component
 * 
 * Renders text content with semantic formatting instead of raw markdown bold.
 * Automatically converts **text** into properly styled emphasis based on context.
 * 
 * @example
 * ```tsx
 * // Instead of: **Attention** c'est important
 * <SemanticText role="warning">**Attention** c'est important</SemanticText>
 * 
 * // For pharmacy content with auto-patterns
 * <SemanticText autoPatterns>
 *   **DCI** : Paracétamol, **Contre-indication** : allergie
 * </SemanticText>
 * ```
 */
export function SemanticText({ 
  children, 
  defaultEmphasis = 'moderate',
  role,
  autoPatterns = false,
  className,
  as: Component = 'span'
}: SemanticTextProps) {
  let processedText = children;
  
  // Apply automatic semantic patterns if enabled
  if (autoPatterns) {
    processedText = applySemantitPatterns(processedText);
  }
  
  // Parse emphasis and render with semantic styling
  const segments = parseEmphasisText(processedText, defaultEmphasis);
  
  // Apply role to all segments if specified
  const segmentsWithRole = segments.map(segment => ({
    ...segment,
    role: segment.role || role
  }));
  
  const renderedContent = renderTextSegments(segmentsWithRole);
  
  return (
    <Component 
      className={cn(className)}
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  );
}

// =================================================================
// SPECIALIZED SEMANTIC COMPONENTS
// =================================================================

/**
 * For important warnings and critical information
 */
export function WarningText({ children, className, ...props }: Omit<SemanticTextProps, 'role'>) {
  return (
    <SemanticText
      role="warning"
      defaultEmphasis="critical"
      className={cn("text-amber-700 dark:text-amber-300", className)}
      {...props}
    >
      {children}
    </SemanticText>
  );
}

/**
 * For concept definitions and key terms
 */
export function ConceptText({ children, className, ...props }: Omit<SemanticTextProps, 'role'>) {
  return (
    <SemanticText
      role="concept"
      defaultEmphasis="strong"
      className={cn("text-blue-700 dark:text-blue-300", className)}
      {...props}
    >
      {children}
    </SemanticText>
  );
}

/**
 * For step-by-step instructions
 */
export function InstructionText({ children, className, ...props }: Omit<SemanticTextProps, 'role'>) {
  return (
    <SemanticText
      role="instruction"
      defaultEmphasis="moderate"
      className={cn("text-emerald-700 dark:text-emerald-300", className)}
      {...props}
    >
      {children}
    </SemanticText>
  );
}

/**
 * For examples and illustrations
 */
export function ExampleText({ children, className, ...props }: Omit<SemanticTextProps, 'role'>) {
  return (
    <SemanticText
      role="example"
      defaultEmphasis="subtle"
      className={cn("text-cyan-700 dark:text-cyan-300", className)}
      {...props}
    >
      {children}
    </SemanticText>
  );
}

/**
 * For pharmaceutical content with automatic term recognition
 */
export function PharmacyText({ children, className, ...props }: Omit<SemanticTextProps, 'autoPatterns'>) {
  return (
    <SemanticText
      autoPatterns={true}
      className={cn("leading-relaxed", className)}
      {...props}
    >
      {children}
    </SemanticText>
  );
}