import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import React from 'react';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
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
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
