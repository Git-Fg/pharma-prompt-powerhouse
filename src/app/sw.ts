import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist'
import { defaultCache } from '@serwist/next/worker'
import { CacheFirst, ExpirationPlugin, Serwist, StaleWhileRevalidate } from 'serwist'

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
    // Extend default cache with our custom caching strategies
    ...defaultCache,

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

    // Navigation Requests - Stale While Revalidate for instant loading
    {
      matcher: ({ request }) => request.mode === 'navigate',
      handler: new StaleWhileRevalidate({
        cacheName: 'pages',
        plugins: [
          new ExpirationPlugin({
            maxEntries: 50,
            maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
          }),
          {
            // Modern offline experience - return cached content with notification
            handlerDidError: async () => {
              // Instead of redirecting to /offline, let the app handle it gracefully
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
            },
          },
        ],
      }),
    },
  ],
})

serwist.addEventListeners()
