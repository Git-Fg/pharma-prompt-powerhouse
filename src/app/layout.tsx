import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { SkipLink } from "@/components/ui/skip-link";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pharma Prompt Powerhouse - Maîtrisez l'ingénierie de prompts",
  description: "Plateforme d'apprentissage dédiée à l'ingénierie de prompts appliquée aux sciences pharmaceutiques et de la santé.",
  keywords: ["prompt engineering", "pharmacie", "IA", "apprentissage", "santé", "ingénierie de prompts"],
  authors: [{ name: "Pharma Prompt Team" }],
  openGraph: {
    title: "Pharma Prompt Powerhouse",
    description: "Plateforme d'apprentissage dédiée à l'ingénierie de prompts appliquée aux sciences pharmaceutiques",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pharma Prompt Powerhouse",
    description: "Plateforme d'apprentissage dédiée à l'ingénierie de prompts appliquée aux sciences pharmaceutiques",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SkipLink href="#main-content">Aller au contenu principal</SkipLink>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
