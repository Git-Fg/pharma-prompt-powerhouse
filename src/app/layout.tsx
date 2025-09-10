import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import React from 'react'
import { ConsentBanner } from '@/components/consent/ConsentBanner'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { InstallPrompt } from '@/components/pwa/InstallPrompt'
import { PWALifecycle } from '@/components/pwa/PWALifecycle'
import { PWAOfflineManager } from '@/components/pwa/PWAOfflineManager'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { ConsentProvider } from '@/hooks/useConsent'
import { env } from '@/lib/env'
import './globals.css'

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
})

const APP_NAME = 'Pharma Prompt Powerhouse'
const APP_DEFAULT_TITLE = 'Pharma Prompt Powerhouse - Maîtrisez l\'ingénierie de prompts'
const APP_TITLE_TEMPLATE = '%s - Pharma PWA'
const APP_DESCRIPTION = 'Plateforme d\'apprentissage dédiée à l\'ingénierie de prompts appliquée aux sciences pharmaceutiques et de la santé.'

export const metadata: Metadata = {
  metadataBase: new URL(env.publicBaseUrl),
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  keywords: [
    'prompt engineering',
    'pharmacie',
    'IA',
    'apprentissage',
    'santé',
    'ingénierie de prompts',
  ],
  authors: [{ name: 'Pharma Prompt Team' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': APP_NAME,
    'application-name': APP_NAME,
    'msapplication-TileColor': '#2563eb',
    'msapplication-tap-highlight': 'no',
  },
}

export const viewport: Viewport = {
  themeColor: '#2563eb',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased font-sans`}
      >
        <ConsentProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen flex flex-col">
              <Header />
              {/* Page content container with modern 2025 design: subtle borders and shadow */}
              <div className="flex-1 page-container bg-background/95 backdrop-blur-sm border-x border-border/50 shadow-lg shadow-black/5 dark:shadow-black/20">
                <main className="pb-20 md:pb-0">{children}</main>
              </div>
              <Footer />
              <MobileBottomNav />
            </div>
            {env.isProduction && <ConsentBanner />}
            <Toaster />
            <PWALifecycle />
            <PWAOfflineManager />
            {env.isProduction && <InstallPrompt />}
          </ThemeProvider>
        </ConsentProvider>
      </body>
    </html>
  )
}
