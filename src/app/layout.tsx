import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import React from 'react';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { Toaster } from '@/components/ui/sonner';
import { ConsentProvider } from '@/hooks/useConsent';
import { ConsentBanner } from '@/components/consent/ConsentBanner';
import { PWALifecycle } from '@/components/pwa/PWALifecycle';
import { InstallPrompt } from '@/components/pwa/InstallPrompt';
import { env } from '@/lib/env';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(env.publicBaseUrl),
  title: "Pharma Prompt Powerhouse - Maîtrisez l'ingénierie de prompts",
  description:
    "Plateforme d'apprentissage dédiée à l'ingénierie de prompts appliquée aux sciences pharmaceutiques et de la santé.",
  keywords: [
    'prompt engineering',
    'pharmacie',
    'IA',
    'apprentissage',
    'santé',
    'ingénierie de prompts',
  ],
  authors: [{ name: 'Pharma Prompt Team' }],
  manifest: "/manifest.json",
  openGraph: {
    title: 'Pharma Prompt Powerhouse',
    description:
      "Plateforme d'apprentissage dédiée à l'ingénierie de prompts appliquée aux sciences pharmaceutiques",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pharma Prompt Powerhouse',
    description:
      "Plateforme d'apprentissage dédiée à l'ingénierie de prompts appliquée aux sciences pharmaceutiques",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Pharma PWA",
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Pharma PWA",
    "application-name": "Pharma PWA",
    "msapplication-TileColor": "#2563eb",
    "msapplication-tap-highlight": "no",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='fr' suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased font-sans`}
      >
        <ConsentProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <div className='min-h-screen flex flex-col'>
              <Header />
              <main className='flex-1 pb-20 md:pb-0'>{children}</main>
              <Footer />
              <MobileBottomNav />
            </div>
            <ConsentBanner />
            <Toaster />
            <PWALifecycle />
            <InstallPrompt />
          </ThemeProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
