import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist'
import { CacheFirst, ExpirationPlugin, NetworkFirst, Serwist, StaleWhileRevalidate } from 'serwist'

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined
  }
}

declare const self: ServiceWorkerGlobalScope

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  disableDevLogs: true,
  runtimeCaching: [
    // Google Fonts - Cache First Strategy
    {
      matcher: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      handler: new CacheFirst({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
          }),
        ],
      }),
    },
    {
      matcher: /^https:\/\/fonts\.gstatic\.com\/.*/i,
      handler: new CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
          }),
        ],
      }),
    },

    // Images - Stale While Revalidate
    {
      matcher: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/i,
      handler: new StaleWhileRevalidate({
        cacheName: 'images',
        plugins: [
          new ExpirationPlugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          }),
        ],
      }),
    },

    // Static Resources - Stale While Revalidate
    {
      matcher: /\.(?:js|css)$/i,
      handler: new StaleWhileRevalidate({
        cacheName: 'static-resources',
        plugins: [
          new ExpirationPlugin({
            maxEntries: 30,
            maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
          }),
        ],
      }),
    },

    // API Routes - Network First with fallback for reliability
    {
      matcher: /\/api\/.*$/i,
      handler: new NetworkFirst({
        cacheName: 'api-cache',
        plugins: [
          new ExpirationPlugin({
            maxEntries: 20,
            maxAgeSeconds: 5 * 60, // 5 minutes
          }),
        ],
      }),
    },

    // Critical Navigation - Network First for fresh content
    {
      matcher: ({ request, url }) => {
        return (
          request.mode === 'navigate'
          && !url.pathname.startsWith('/api/')
        )
      },
      handler: new NetworkFirst({
        cacheName: 'critical-pages',
        plugins: [
          new ExpirationPlugin({
            maxEntries: 25,
            maxAgeSeconds: 24 * 60 * 60, // 24 hours
          }),
          {
            // Modern offline experience - serve cached content or fallback to offline page
            handlerDidError: async ({ request }) => {
              try {
                // Try to serve from cache first
                const cache = await caches.open('critical-pages')
                const cachedResponse = await cache.match(request)

                if (cachedResponse) {
                  // Notify client that we're serving cached content
                  const clients = await self.clients.matchAll()
                  clients.forEach((client) => {
                    client.postMessage({
                      type: 'CACHE_ONLY_RESPONSE',
                      url: request.url,
                    })
                  })
                  return cachedResponse
                }

                // Fallback to home page if specific page not cached
                const homeResponse = await cache.match('/')
                if (homeResponse) {
                  return homeResponse
                }

                // Last resort - return minimal offline response
                return new Response(
                  JSON.stringify({
                    offline: true,
                    message: 'Contenu disponible hors ligne',
                  }),
                  {
                    headers: { 'Content-Type': 'application/json' },
                    status: 200,
                  },
                )
              }
              catch (error) {
                console.error('Cache fallback error:', error)
                return new Response('Service temporairement indisponible', { status: 503 })
              }
            },
          },
        ],
      }),
    },
  ],
})

// Performance monitoring using service worker events
self.addEventListener('install', (event) => {
  // eslint-disable-next-line no-console -- Debug logs acceptables pour le monitoring du service worker
  console.debug('Service worker installé:', event)
})

self.addEventListener('activate', (event) => {
  // eslint-disable-next-line no-console -- Debug logs acceptables pour le monitoring du service worker
  console.debug('Service worker activé:', event)
})

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

self.addEventListener('error', (event) => {
  console.error('Service worker error:', event)
})

serwist.addEventListeners()
