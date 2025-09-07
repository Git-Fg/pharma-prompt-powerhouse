import type { NextConfig } from 'next'
import withSerwistInit from '@serwist/next'

// Déterminer si nous sommes dans un environnement de développement ou de prévisualisation Vercel
const isDevEnvironment = process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'preview'

// Sources fiables pour Vercel (uniquement en dev/preview)
const vercelSources = [
  'https://vercel.live', // Vercel Toolbar
  'https://vercel.com',
  'https://assets.vercel.com',
  'https://vercel-insights.com',
]

// Construction de la CSP
const cspDirectives = [
  `default-src 'self'`,
  // On retire 'unsafe-eval' qui n'est plus nécessaire et dangereux.
  // On ajoute les sources Vercel uniquement en environnement de développement/preview.
  `script-src 'self' 'unsafe-inline' ${isDevEnvironment ? vercelSources.join(' ') : ''}`,
  `style-src 'self' 'unsafe-inline'`,
  // On ajoute les sources Vercel pour les images (avatars de la toolbar, etc.)
  `img-src 'self' data: https: blob: ${isDevEnvironment ? '*.vercel.com *.vercel-insights.com' : ''}`,
  `font-src 'self' data: ${isDevEnvironment ? 'assets.vercel.com' : ''}`,
  // On ajoute les sources Vercel pour les connexions (analytics, etc.)
  `connect-src 'self' https://api.github.com ${isDevEnvironment ? vercelSources.join(' ') : ''}`,
  `media-src 'self'`,
  `worker-src 'self' blob:`,
  `child-src 'self'`,
  `object-src 'none'`,
  `base-uri 'self'`,
  `form-action 'self'`,
  `frame-ancestors 'none'`,
  `block-all-mixed-content`,
  `upgrade-insecure-requests`,
].join('; ')

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // Réactiver la validation TypeScript pour la qualité du code
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
  eslint: {
    // Réactiver le linting pour maintenir la qualité
    ignoreDuringBuilds: false,
  },

  // React Compiler pour les optimisations automatiques
  experimental: {
    reactCompiler: true,
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
    ],
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    // Optimisations pour Vercel
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: 'default-src \'self\'; script-src \'none\'; sandbox;',
  },

  // Compression
  compress: true,

  // Optimisations de performance
  poweredByHeader: false,

  // Configuration Turbopack pour éviter les warnings
  turbopack: {
    root: __dirname,
  },

  // Headers de sécurité
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Content-Security-Policy',
            value: cspDirectives, // Utilisation de notre CSP dynamique
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
}

const withSerwist = withSerwistInit({
  swSrc: 'src/app/sw.ts',
  swDest: 'public/sw.js',
  cacheOnNavigation: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV !== 'production',
})

export default withSerwist(nextConfig)
