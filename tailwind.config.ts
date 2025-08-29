import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
    darkMode: "class",
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		// 2025 Design System: Enhanced spacing scale
  		spacing: {
  		  'safe-top': 'env(safe-area-inset-top)',
  		  'safe-bottom': 'env(safe-area-inset-bottom)',
  		  'safe-left': 'env(safe-area-inset-left)',
  		  'safe-right': 'env(safe-area-inset-right)',
  		  '3xs': 'var(--space-3xs)',
  		  '2xs': 'var(--space-2xs)',
  		  'xs': 'var(--space-xs)',
  		  'sm': 'var(--space-sm)',
  		  'md': 'var(--space-md)',
  		  'lg': 'var(--space-lg)',
  		  'xl': 'var(--space-xl)',
  		  '2xl': 'var(--space-2xl)',
  		  '3xl': 'var(--space-3xl)',
  		},
  		// Nouvelles unités viewport dynamiques
  		height: {
  		  'screen-safe': '100svh',
  		  'screen-dynamic': '100dvh',
  		  'screen-safe-inset': 'calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
  		},
  		minHeight: {
  		  'screen-safe': '100svh',
  		  'screen-dynamic': '100dvh',
  		  'screen-safe-inset': 'calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
  		},
  		maxHeight: {
  		  'screen-safe': '100svh',
  		  'screen-dynamic': '100dvh',
  		},
  		// 2025 Fluid Typography
  		fontSize: {
  		  '2xs': 'var(--font-size-2xs)',
  		  'xs': 'var(--font-size-xs)',
  		  'sm': 'var(--font-size-sm)',
  		  'base': 'var(--font-size-base)',
  		  'lg': 'var(--font-size-lg)',
  		  'xl': 'var(--font-size-xl)',
  		  '2xl': 'var(--font-size-2xl)',
  		  '3xl': 'var(--font-size-3xl)',
  		  '4xl': 'var(--font-size-4xl)',
  		  '5xl': 'var(--font-size-5xl)',
  		},
  		// Container queries breakpoints améliorés
  		container: {
  		  '2xs': 'var(--container-2xs)',
  		  'xs': 'var(--container-xs)',
  		  'sm': 'var(--container-sm)',
  		  'md': 'var(--container-md)',
  		  'lg': 'var(--container-lg)',
  		  'xl': 'var(--container-xl)',
  		  '2xl': 'var(--container-2xl)',
  		  '3xl': 'var(--container-3xl)',
  		  '4xl': 'var(--container-4xl)',
  		  '5xl': 'var(--container-5xl)',
  		  '6xl': 'var(--container-6xl)',
  		  '7xl': 'var(--container-7xl)',
  		},
  		// Animation améliorée
  		animation: {
  		  'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
  		  'scale-in': 'scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
  		  'slide-in-left': 'slideInLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
  		  'bounce-gentle': 'bounceGentle 2s cubic-bezier(0.16, 1, 0.3, 1) infinite',
  		  'shimmer': 'shimmer 1.5s ease-in-out infinite',
  		  'pulse-gentle': 'pulse-gentle 2s ease-in-out infinite',
  		  'rotate-gentle': 'rotate-gentle 2s linear infinite',
  		},
  		// Courbes de Bézier modernes
  		transitionTimingFunction: {
  		  'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  		  'ease-in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
  		  'ease-out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
  		  'ease-in-out-back': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  		  'modern': 'cubic-bezier(0.16, 1, 0.3, 1)',
  		},
  		// Grilles modernes
  		gridTemplateColumns: {
  		  'auto-fit-xs': 'repeat(auto-fit, minmax(16rem, 1fr))',
  		  'auto-fit-sm': 'repeat(auto-fit, minmax(20rem, 1fr))',
  		  'auto-fit-md': 'repeat(auto-fit, minmax(28rem, 1fr))',
  		  'auto-fit-lg': 'repeat(auto-fit, minmax(32rem, 1fr))',
  		  'auto-fill-xs': 'repeat(auto-fill, minmax(16rem, 1fr))',
  		  'auto-fill-sm': 'repeat(auto-fill, minmax(20rem, 1fr))',
  		  'auto-fill-md': 'repeat(auto-fill, minmax(28rem, 1fr))',
  		  'auto-fill-lg': 'repeat(auto-fill, minmax(32rem, 1fr))',
  		},
  		// Aspect ratios modernes
  		aspectRatio: {
  		  'golden': '1.618',
  		  'video': '16/9',
  		  'portrait': '3/4',
  		  'landscape': '4/3',
  		},
  	}
  },
  plugins: [
    tailwindcssAnimate,
    // Plugin amélioré pour les container queries
    function({ addVariant, matchVariant }) {
      // Container query variants standards
      const containerVariants = [
        ['@2xs', '(min-width: 16rem)'],
        ['@xs', '(min-width: 20rem)'],
        ['@sm', '(min-width: 24rem)'],
        ['@md', '(min-width: 28rem)'],
        ['@lg', '(min-width: 32rem)'],
        ['@xl', '(min-width: 36rem)'],
        ['@2xl', '(min-width: 42rem)'],
        ['@3xl', '(min-width: 48rem)'],
        ['@4xl', '(min-width: 56rem)'],
        ['@5xl', '(min-width: 64rem)'],
        ['@6xl', '(min-width: 72rem)'],
        ['@7xl', '(min-width: 80rem)'],
      ];

      const maxContainerVariants = [
        ['@max-2xs', '(max-width: 15.9375rem)'],
        ['@max-xs', '(max-width: 19.9375rem)'],
        ['@max-sm', '(max-width: 23.9375rem)'],
        ['@max-md', '(max-width: 27.9375rem)'],
        ['@max-lg', '(max-width: 31.9375rem)'],
        ['@max-xl', '(max-width: 35.9375rem)'],
        ['@max-2xl', '(max-width: 41.9375rem)'],
        ['@max-3xl', '(max-width: 47.9375rem)'],
        ['@max-4xl', '(max-width: 55.9375rem)'],
        ['@max-5xl', '(max-width: 63.9375rem)'],
        ['@max-6xl', '(max-width: 71.9375rem)'],
        ['@max-7xl', '(max-width: 79.9375rem)'],
      ];

      // Ajouter les variants de container query
      containerVariants.forEach(([variant, query]) => {
        addVariant(variant, `@container ${query}`);
      });

      maxContainerVariants.forEach(([variant, query]) => {
        addVariant(variant, `@container ${query}`);
      });

      // Support pour les container queries nommés
      matchVariant(
        '@',
        (value, { modifier }) => {
          if (modifier) {
            return `@container ${modifier} ${value}`;
          }
          return `@container ${value}`;
        },
        {
          values: {
            'xs': '(min-width: 20rem)',
            'sm': '(min-width: 24rem)',
            'md': '(min-width: 28rem)',
            'lg': '(min-width: 32rem)',
            'xl': '(min-width: 36rem)',
            '2xl': '(min-width: 42rem)',
          }
        }
      );

      // Support pour les orientation queries
      addVariant('portrait', '@media (orientation: portrait)');
      addVariant('landscape', '@media (orientation: landscape)');
      
      // Support pour les hover capabilities
      addVariant('hover-hover', '@media (hover: hover)');
      addVariant('hover-none', '@media (hover: none)');
      
      // Support pour les pointer capabilities
      addVariant('pointer-fine', '@media (pointer: fine)');
      addVariant('pointer-coarse', '@media (pointer: coarse)');
      addVariant('pointer-none', '@media (pointer: none)');

      // Support pour les préférences utilisateur
      addVariant('motion-safe', '@media (prefers-reduced-motion: no-preference)');
      addVariant('motion-reduce', '@media (prefers-reduced-motion: reduce)');
      addVariant('contrast-more', '@media (prefers-contrast: more)');
      addVariant('contrast-less', '@media (prefers-contrast: less)');
      addVariant('contrast-high', '@media (prefers-contrast: high)');
    }
  ],
};
export default config;
