import type { NextConfig } from 'next'
import withSerwistInit from '@serwist/next'

// Construction de la CSP adaptée selon l'environnement
const isDevelopment = process.env.NODE_ENV === 'development'

const cspDirectives = [
  `default-src 'self'`,
  // Scripts: plus permissif en développement pour permettre Turbopack et HMR
  `script-src 'self'${isDevelopment ? ' \'unsafe-eval\' \'unsafe-inline\'' : ''}`,
  `style-src 'self' 'unsafe-inline'`,
  `img-src 'self' data: https: blob:`,
  `font-src 'self' data:`,
  `connect-src 'self' https://api.github.com *.vercel-insights.com${isDevelopment ? ' ws://localhost:* wss://localhost:*' : ''}`,
  `media-src 'self'`,
  `worker-src 'self' blob:`,
  `child-src 'self'`,
  `object-src 'none'`,
  `base-uri 'self'`,
  `form-action 'self'`,
  `frame-ancestors 'none'`,
  ...(isDevelopment ? [] : ['block-all-mixed-content', 'upgrade-insecure-requests']),
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
