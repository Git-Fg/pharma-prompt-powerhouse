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
  		// Système d'espacement amélioré pour la responsivité
  		spacing: {
  		  'safe-top': 'env(safe-area-inset-top)',
  		  'safe-bottom': 'env(safe-area-inset-bottom)',
  		  'safe-left': 'env(safe-area-inset-left)',
  		  'safe-right': 'env(safe-area-inset-right)',
  		},
  		// Nouvelles unités viewport dynamiques
  		height: {
  		  'screen-safe': '100svh',
  		  'screen-dynamic': '100dvh',
  		},
  		minHeight: {
  		  'screen-safe': '100svh',
  		  'screen-dynamic': '100dvh',
  		},
  		// Container queries breakpoints
  		container: {
  		  '2xs': '16rem',
  		  'xs': '20rem',
  		  'sm': '24rem',
  		  'md': '28rem',
  		  'lg': '32rem',
  		  'xl': '36rem',
  		  '2xl': '42rem',
  		  '3xl': '48rem',
  		  '4xl': '56rem',
  		  '5xl': '64rem',
  		  '6xl': '72rem',
  		  '7xl': '80rem',
  		}
  	}
  },
  plugins: [
    tailwindcssAnimate,
    // Plugin pour les container queries
    function({ addVariant }) {
      // Container query variants
      addVariant('container-xs', '@container (min-width: 20rem)');
      addVariant('container-sm', '@container (min-width: 24rem)');
      addVariant('container-md', '@container (min-width: 28rem)');
      addVariant('container-lg', '@container (min-width: 32rem)');
      addVariant('container-xl', '@container (min-width: 36rem)');
      
      // Container query shorthand
      addVariant('cq-xs', '@container (min-width: 20rem)');
      addVariant('cq-sm', '@container (min-width: 24rem)');
      addVariant('cq-md', '@container (min-width: 28rem)');
      addVariant('cq-lg', '@container (min-width: 32rem)');
      addVariant('cq-xl', '@container (min-width: 36rem)');
    }
  ],
};
export default config;
