import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl' | 'full';
}

export function Container({ 
  children, 
  className = '',
  maxWidth = '7xl'
}: ContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md', 
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full'
  };

  return (
    <div className={cn(
      'w-full container mx-auto px-4 text-pretty',
      maxWidthClasses[maxWidth],
      className
    )}>
      {children}
    </div>
  );
}

// Composant pour les sections avec marges standardisées 
interface SectionProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Section({ 
  children, 
  className = '',
  size = 'md'
}: SectionProps) {
  const sizeClasses = {
    sm: 'py-6 md:py-8',
    md: 'py-8 md:py-12',
    lg: 'py-12 md:py-16'
  };

  return (
    <section className={cn(
      sizeClasses[size],
      className
    )}>
      {children}
    </section>
  );
}