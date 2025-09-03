export const colors = {
  primary: {
    50: 'hsl(var(--primary-50))',
    100: 'hsl(var(--primary-100))',
    500: 'hsl(var(--primary-500))',
    600: 'hsl(var(--primary-600))',
    900: 'hsl(var(--primary-900))',
  },
  semantic: {
    success: 'hsl(var(--success))',
    warning: 'hsl(var(--warning))',
    error: 'hsl(var(--error))',
    info: 'hsl(var(--info))',
  }
}

export const breakpoints = {
  sm: '640px',   // Mobile large
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px' // Extra large desktop
} as const

// Mobile-first responsive spacing système unifié
export const spacing = {
  // Espacement de base
  xs: '0.25rem',
  sm: '0.5rem', 
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  
  // Système mobile-first pour layouts
  layout: {
    // Sections principales
    section: {
      mobile: 'py-8',      // 32px vertical sur mobile
      desktop: 'md:py-12'  // 48px vertical sur desktop+
    },
    // Container padding
    container: {
      mobile: 'px-4',      // 16px horizontal sur mobile
      desktop: 'px-4'      // Même padding, mais plus d'espace grâce au container
    },
    // Gaps entre éléments  
    gap: {
      mobile: 'gap-6',     // 24px gap sur mobile
      desktop: 'md:gap-8'  // 32px gap sur desktop+
    }
  },
  
  // Système legacy (à migrer progressivement)
  mobile: {
    section: 'py-8',
    container: 'px-4',
    gap: 'gap-6',
    card: 'p-4',
    text: {
      heading: 'text-2xl',
      subheading: 'text-lg'
    }
  },
  desktop: {
    section: 'py-12',
    container: 'px-4',
    gap: 'gap-8',
    card: 'p-6',
    text: {
      heading: 'text-4xl',
      subheading: 'text-xl'
    }
  }
} as const

// Typographie mobile-first
export const typography = {
  h1: {
    mobile: 'text-2xl font-bold tracking-tight',
    desktop: 'md:text-4xl'
  },
  h2: {
    mobile: 'text-xl font-semibold tracking-tight', 
    desktop: 'md:text-3xl'
  },
  h3: {
    mobile: 'text-lg font-semibold tracking-tight',
    desktop: 'md:text-2xl'
  },
  body: {
    mobile: 'text-sm',
    desktop: 'md:text-base'
  },
  lead: {
    mobile: 'text-base',
    desktop: 'md:text-lg'
  }
} as const

export const container = {
  mobile: 'max-w-full',
  tablet: 'max-w-4xl', 
  desktop: 'max-w-7xl'
} as const

export const grid = {
  // Grilles responsive mobile-first
  responsive: {
    cols1to2: 'grid-cols-1 md:grid-cols-2',
    cols1to3: 'grid-cols-1 md:grid-cols-3',
    cols2to4: 'grid-cols-2 md:grid-cols-4',
    cols1to2to3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    gap: 'gap-4 md:gap-6'
  },
  // Système legacy
  mobile: {
    cols1: 'grid-cols-1',
    cols2: 'grid-cols-2',
    gap: 'gap-4'
  },
  tablet: {
    cols2: 'md:grid-cols-2',
    cols3: 'md:grid-cols-3',
    cols4: 'md:grid-cols-4',
    gap: 'md:gap-6'
  },
  desktop: {
    cols3: 'lg:grid-cols-3',
    cols4: 'lg:grid-cols-4',
    cols6: 'lg:grid-cols-6',
    gap: 'lg:gap-8'
  }
} as const

export const table = {
  mobile: {
    // Masquer certaines colonnes sur mobile
    hideColumns: 'hidden sm:table-cell',
    // Vue carte sur mobile, tableau sur desktop
    cardView: 'block md:hidden',
    tableView: 'hidden md:block'
  },
  responsive: {
    container: 'overflow-x-auto',
    table: 'w-full min-w-full',
    // Cellules adaptatives
    cell: {
      compact: 'px-3 py-2 text-sm',
      normal: 'px-4 py-3',
      large: 'px-6 py-4'
    }
  },
  // Améliorations pour mobile
  enhanced: {
    // Container avec scroll horizontal fluide
    container: 'overflow-x-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent',
    // Table avec largeur minimale
    table: 'w-full min-w-[600px]',
    // Cellules optimisées pour la lecture
    cell: {
      mobile: 'px-2 py-3 text-sm',
      desktop: 'md:px-4 md:py-3 md:text-base'
    }
  }
} as const

// Cards responsive
export const card = {
  mobile: {
    padding: 'p-4',
    spacing: 'space-y-3'
  },
  desktop: {
    padding: 'md:p-6',
    spacing: 'md:space-y-4'
  }
} as const