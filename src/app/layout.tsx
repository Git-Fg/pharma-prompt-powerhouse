import type { Metadata, Viewport } from "next";
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
  display: 'swap', // 2025 best practice for font loading
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: false, // Only preload essential fonts
});

export const metadata: Metadata = {
  title: {
    default: "Pharma Prompt Powerhouse - Maîtrisez l'ingénierie de prompts",
    template: "%s | Pharma Prompt Powerhouse"
  },
  description: "Plateforme d'apprentissage dédiée à l'ingénierie de prompts moderne appliquée aux sciences pharmaceutiques et de la santé. Techniques XML, Tree-of-Thought, et Self-Consistency optimisées pour les modèles SOTA 2025.",
  keywords: [
    "prompt engineering", 
    "pharmacie", 
    "IA", 
    "apprentissage", 
    "santé", 
    "ingénierie de prompts",
    "XML prompting",
    "Tree-of-Thought",
    "Self-Consistency",
    "SOTA 2025"
  ],
  authors: [{ name: "Pharma Prompt Team", url: "https://pharmaprompt.com" }],
  creator: "Pharma Prompt Team",
  publisher: "Pharma Prompt Powerhouse",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://pharmaprompt.com",
    siteName: "Pharma Prompt Powerhouse",
    title: "Pharma Prompt Powerhouse - Maîtrisez l'ingénierie de prompts",
    description: "Plateforme d'apprentissage dédiée à l'ingénierie de prompts moderne appliquée aux sciences pharmaceutiques et de la santé",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pharma Prompt Powerhouse - Plateforme d'apprentissage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pharma Prompt Powerhouse",
    description: "Plateforme d'apprentissage dédiée à l'ingénierie de prompts appliquée aux sciences pharmaceutiques",
    images: ["/twitter-image.png"],
    creator: "@pharmaprompt",
  },
  category: "education",
  classification: "Education, Healthcare Technology, AI Learning",
  // 2025 metadata standards
  other: {
    "google-site-verification": process.env.GOOGLE_SITE_VERIFICATION || "",
  }
};

// 2025 Viewport configuration with safe areas support
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5, // Allow more zoom for accessibility
  userScalable: true, // Always allow zoom for accessibility
  viewportFit: 'cover', // Support notched devices
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#8b5cf6' },
    { media: '(prefers-color-scheme: dark)', color: '#a855f7' },
  ],
  colorScheme: 'light dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="fr" 
      suppressHydrationWarning
      className="scroll-smooth"
    >
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false} // Enable smooth transitions
        >
          {/* Skip links for accessibility - 2025 standards */}
          <SkipLink href="#main-content">
            Aller au contenu principal
          </SkipLink>
          <SkipLink href="#navigation" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:border focus:rounded-md">
            Aller à la navigation
          </SkipLink>
          
          {/* Main layout with improved semantic structure */}
          <div className="min-h-screen-safe flex flex-col relative">
            <Header />
            <main 
              id="main-content" 
              className="flex-1 focus:outline-none" 
              tabIndex={-1}
              role="main"
              aria-label="Contenu principal"
            >
              {children}
            </main>
            <Footer />
          </div>
          
          {/* Toast notifications with proper ARIA live region */}
          <Toaster 
            richColors
            position="bottom-right"
            expand={false}
            visibleToasts={5}
            closeButton
          />
          
          {/* Screen reader only content for app status */}
          <div 
            id="app-status" 
            className="sr-only" 
            role="status" 
            aria-live="polite" 
            aria-atomic="true"
          />
        </ThemeProvider>
        
        {/* Structured Data for SEO - 2025 best practice */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Pharma Prompt Powerhouse",
              "description": "Plateforme d'apprentissage dédiée à l'ingénierie de prompts appliquée aux sciences pharmaceutiques",
              "url": "https://pharmaprompt.com",
              "logo": "https://pharmaprompt.com/logo.png",
              "sameAs": [
                "https://twitter.com/pharmaprompt",
                "https://github.com/pharmaprompt",
                "https://linkedin.com/company/pharmaprompt"
              ],
              "educationalCredentialAwarded": "Certificate in Pharmaceutical Prompt Engineering"
            })
          }}
        />
      </body>
    </html>
  );
}
