import type { Metadata, Viewport } from 'next';
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

const APP_NAME = "Pharma Prompt Powerhouse";
const APP_DEFAULT_TITLE = "Pharma Prompt Powerhouse - Maîtrisez l'ingénierie de prompts";
const APP_TITLE_TEMPLATE = "%s - Pharma PWA";
const APP_DESCRIPTION = "Plateforme d'apprentissage dédiée à l'ingénierie de prompts appliquée aux sciences pharmaceutiques et de la santé.";

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
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": APP_NAME,
    "application-name": APP_NAME,
    "msapplication-TileColor": "#2563eb",
    "msapplication-tap-highlight": "no",
  },
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
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
