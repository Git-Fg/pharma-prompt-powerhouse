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
  sm: '640px',   // Mobile
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px' // Extra large desktop
} as const

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  // Mobile-first responsive spacing
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

export const typography = {
  h1: 'text-4xl font-bold tracking-tight',
  h2: 'text-3xl font-semibold tracking-tight',
  h3: 'text-2xl font-semibold tracking-tight',
  body: 'text-base',
  small: 'text-sm',
}

export const container = {
  mobile: 'max-w-full',
  tablet: 'max-w-4xl',
  desktop: 'max-w-7xl'
} as const

export const grid = {
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
    hideColumns: 'hidden sm:table-cell',
    cardView: 'block md:hidden',
    tableView: 'hidden md:block'
  },
  responsive: {
    container: 'overflow-x-auto',
    table: 'w-full min-w-full',
    cell: {
      compact: 'px-3 py-2 text-sm',
      normal: 'px-4 py-3',
      large: 'px-6 py-4'
    }
  }
} as const