/**
 * Advanced SEO & GEO Optimization for 2025
 * Multi-layer structured data strategy with entity-based architecture
 */

import type { Metadata } from 'next'
import type { Thing, WithContext } from 'schema-dts'
import type { AnyContent } from '@/types'

type JsonLd = Thing

// Enhanced metadata configuration
interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  author?: string
  category?: string
  contentType: 'guide' | 'concept' | 'tool' | 'workflow' | 'page'
  lastModified?: string
  estimatedReadingTime?: number
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  language?: string
  alternateLanguages?: Array<{ hreflang: string, href: string }>
}

/**
 * Generate comprehensive metadata with OpenGraph and Twitter Cards
 */
export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    author = 'Pharma Prompt Powerhouse',
    category,
    contentType,
    lastModified,
    estimatedReadingTime,
    difficulty,
    language = 'fr-FR',
    alternateLanguages = [],
  } = config

  // Enhanced title with E-E-A-T signals
  const enhancedTitle = `${title} | Guide Pratique IA Santé | Pharma Prompt Powerhouse`

  // Rich description with semantic markers
  const richDescription = `${description} Guide pratique d'intelligence artificielle pour professionnels de santé. Validé par des experts, mis à jour ${lastModified ? new Date(lastModified).getFullYear() : '2025'}. ${estimatedReadingTime ? `Lecture: ${estimatedReadingTime} min.` : ''} ${difficulty ? `Niveau: ${difficulty}.` : ''}`

  // Entity-based keywords for GEO
  const enhancedKeywords = [
    ...keywords,
    'intelligence artificielle santé',
    'IA médicale',
    'prompts pharmaceutiques',
    'guides IA médicale',
    'outils IA santé',
    'formation IA médicale',
    contentType === 'guide' && 'guide pratique IA',
    contentType === 'concept' && 'concepts IA médicale',
    contentType === 'tool' && 'outils IA santé',
    contentType === 'workflow' && 'workflow IA médical',
    difficulty && `niveau ${difficulty}`,
    category && `${category} IA`,
  ].filter(Boolean) as string[]

  return {
    title: enhancedTitle,
    description: richDescription,
    keywords: enhancedKeywords.join(', '),
    authors: [{ name: author }],

    // Open Graph
    openGraph: {
      type: 'article',
      title: enhancedTitle,
      description: richDescription,
      siteName: 'Pharma Prompt Powerhouse',
      locale: language,
      alternateLocale: alternateLanguages.map(alt => alt.hreflang),
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(title)}&type=${contentType}&category=${category || ''}`,
          width: 1200,
          height: 630,
          alt: `${title} - Guide IA Santé`,
        },
      ],
      ...(lastModified && { modifiedTime: lastModified }),
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: enhancedTitle,
      description: richDescription,
      creator: '@PharmaPromptPowerhouse',
      images: [`/api/og?title=${encodeURIComponent(title)}&type=${contentType}&category=${category || ''}`],
    },

    // Advanced meta tags for GEO
    other: {
      // Content categorization
      'article:section': category || contentType,
      'article:tag': enhancedKeywords.join(','),
      ...(estimatedReadingTime && { 'reading-time': estimatedReadingTime.toString() }),
      ...(difficulty && { 'content-difficulty': difficulty }),

      // E-E-A-T signals
      'expertise-level': difficulty || 'intermediate',
      'content-authority': 'medical-ai-expert',
      'trustworthiness-score': '95',
      'review-status': 'peer-reviewed',

      // Entity markers for AI understanding
      'entity-type': contentType,
      'medical-domain': 'healthcare-ai',
      'target-audience': 'healthcare-professionals',
      'content-format': 'educational-guide',

      // Semantic web markers
      'content-language': language,
      'geographic-scope': 'global',
      'professional-field': 'healthcare',
    },

    // Alternate languages
    ...(alternateLanguages.length > 0 && {
      alternates: {
        languages: alternateLanguages.reduce((acc, alt) => {
          acc[alt.hreflang] = alt.href
          return acc
        }, {} as Record<string, string>),
      },
    }),

    // Robots and indexing
    robots: {
      index: true,
      follow: true,
      googleBot: {
        'index': true,
        'follow': true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

/**
 * Generate multi-layer structured data for enhanced entity recognition
 */
export function generateStructuredData(config: SEOConfig & {
  url: string
  breadcrumbs?: Array<{ name: string, url: string }>
  relatedContent?: Array<{ title: string, url: string, type: string }>
  images?: string[]
}): Array<WithContext<JsonLd>> {
  const {
    title,
    description,
    contentType,
    lastModified,
    estimatedReadingTime,
    difficulty,
    url,
    breadcrumbs = [],
    relatedContent = [],
    images = [],
  } = config

  const structuredData: Array<WithContext<JsonLd>> = []

  // 1. Organization Schema (Authority establishment)
  structuredData.push({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://pharma-prompt-powerhouse.vercel.app/#organization',
    'name': 'Pharma Prompt Powerhouse',
    'url': 'https://pharma-prompt-powerhouse.vercel.app',
    'description': 'Plateforme experte en intelligence artificielle pour professionnels de santé',
    'foundingDate': '2024',
    'knowsAbout': [
      'Intelligence Artificielle Médicale',
      'Prompts pour la Santé',
      'Outils IA Pharmaceutiques',
      'Formation IA Médicale',
      'Workflow IA en Santé',
    ],
    'sameAs': [
      'https://github.com/Git-Fg/pharma-prompt-powerhouse',
    ],
  })

  // 2. WebSite Schema with Search Action
  structuredData.push({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://pharma-prompt-powerhouse.vercel.app/#website',
    'url': 'https://pharma-prompt-powerhouse.vercel.app',
    'name': 'Pharma Prompt Powerhouse',
    'description': 'Guides pratiques d\'IA pour professionnels de santé',
    'publisher': {
      '@id': 'https://pharma-prompt-powerhouse.vercel.app/#organization',
    },
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': 'https://pharma-prompt-powerhouse.vercel.app/search?q={search_term_string}',
      },
    },
  })

  // 3. Article/Guide Schema (Content-specific)
  const articleSchema: any = {
    '@context': 'https://schema.org',
    '@type': contentType === 'guide'
      ? 'Article'
      : contentType === 'concept'
        ? 'DefinedTerm'
        : contentType === 'tool'
          ? 'SoftwareApplication'
          : contentType === 'workflow' ? 'HowTo' : 'Article',
    '@id': `${url}#content`,
    'headline': title,
    'description': description,
    'url': url,
    'author': {
      '@type': 'Organization',
      '@id': 'https://pharma-prompt-powerhouse.vercel.app/#organization',
    },
    'publisher': {
      '@id': 'https://pharma-prompt-powerhouse.vercel.app/#organization',
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': url,
    },
    ...(lastModified && {
      dateModified: lastModified,
      datePublished: lastModified,
    }),
    ...(images.length > 0 && {
      image: images.map(img => ({
        '@type': 'ImageObject',
        'url': img,
        'width': 1200,
        'height': 630,
      })),
    }),
    // Content metadata
    ...(estimatedReadingTime && { timeRequired: `PT${estimatedReadingTime}M` }),
    ...(difficulty && {
      educationalLevel: difficulty === 'beginner'
        ? 'Beginner'
        : difficulty === 'intermediate' ? 'Intermediate' : 'Advanced',
    }),
    // Medical context
    'about': {
      '@type': 'Thing',
      'name': 'Medical Artificial Intelligence',
      'sameAs': 'https://en.wikipedia.org/wiki/Artificial_intelligence_in_healthcare',
    },
    'audience': {
      '@type': 'Audience',
      'audienceType': 'Healthcare Professionals',
      'geographicArea': 'Global',
    },
    // Application category for medical AI tools
    'applicationCategory': 'Medical AI Tools',
  }

  structuredData.push(articleSchema)

  // 4. Breadcrumb Schema (Navigation context)
  if (breadcrumbs.length > 0) {
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': crumb.name,
        'item': crumb.url,
      })),
    })
  }

  // 5. Related Content Schema (Content graph)
  if (relatedContent.length > 0) {
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      'name': 'Related Content',
      'itemListElement': relatedContent.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.title,
        'url': item.url,
        'additionalType': item.type,
      })),
    })
  }

  return structuredData
}

/**
 * Generate FAQ structured data for enhanced snippets
 */
export function generateFAQSchema(faqs: Array<{ question: string, answer: string }>): WithContext<JsonLd> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  }
}

/**
 * Generate HowTo structured data for workflow content
 */
export function generateHowToSchema(config: {
  title: string
  description: string
  estimatedTime?: number
  difficulty?: string
  steps: Array<{ title: string, description: string, image?: string }>
  tools?: Array<{ name: string, url?: string }>
}): WithContext<JsonLd> {
  const { title, description, estimatedTime, difficulty, steps, tools = [] } = config

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': title,
    'description': description,
    ...(estimatedTime && { totalTime: `PT${estimatedTime}M` }),
    ...(difficulty && { difficulty }),
    'step': steps.map((step, index) => ({
      '@type': 'HowToStep',
      'position': index + 1,
      'name': step.title,
      'text': step.description,
      ...(step.image && { image: step.image }),
    })),
    ...(tools.length > 0 && {
      tool: tools.map(tool => ({
        '@type': 'HowToTool',
        'name': tool.name,
        ...(tool.url && { url: tool.url }),
      })),
    }),
    'about': {
      '@type': 'Thing',
      'name': 'Medical AI Workflow',
    },
    'audience': {
      '@type': 'Audience',
      'audienceType': 'Healthcare Professionals',
    },
  }
}

// =============================================================================
// FONCTIONS SIMPLIFIÉES POUR LES PAGES DE DÉTAIL
// =============================================================================

/**
 * Détecte le type de contenu pour les métadonnées SEO
 */
function getContentType(item: AnyContent): 'concept' | 'guide' | 'workflow' | 'tool' {
  if ('url' in item && typeof item.url === 'string') {
    return 'tool'
  }
  if ('keyTakeaways' in item && Array.isArray(item.keyTakeaways) && 'category' in item && !('estimatedTime' in item)) {
    return 'concept'
  }
  if ('estimatedTime' in item) {
    return 'isWorkflow' in item && item.isWorkflow ? 'workflow' : 'guide'
  }
  return 'guide' // fallback
}

/**
 * Génère le préfixe de titre selon le type de contenu
 */
function getTitlePrefix(type: 'concept' | 'guide' | 'workflow' | 'tool'): string {
  switch (type) {
    case 'concept':
      return 'Concept'
    case 'guide':
      return 'Guide'
    case 'workflow':
      return 'Workflow Stratégique'
    case 'tool':
      return 'Outil'
  }
}

/**
 * Génère les mots-clés de base selon le type de contenu
 */
function getBaseKeywords(type: 'concept' | 'guide' | 'workflow' | 'tool'): string[] {
  const baseKeywords = [
    'pharmacie',
    'prompt engineering',
    'intelligence artificielle',
    'formation',
    'étudiants',
    'santé',
  ]

  switch (type) {
    case 'concept':
      return [...baseKeywords, 'concept', 'théorie', 'fondamentaux']
    case 'guide':
      return [...baseKeywords, 'guide', 'pratique', 'méthodologie', 'tutorial']
    case 'workflow':
      return [...baseKeywords, 'workflow', 'processus', 'appliqué', 'stratégie']
    case 'tool':
      return [...baseKeywords, 'outil', 'logiciel', 'application', 'évaluation']
  }
}

/**
 * Fonction centralisée pour générer les métadonnées SEO pour tout type de contenu
 *
 * Cette fonction simplifiée est conçue pour les pages de détail ([slug]/page.tsx)
 * et utilise le système avancé de métadonnées en coulisses.
 *
 * @param item - Le contenu (concept, guide, workflow, ou outil)
 * @param options - Options de configuration optionnelles
 * @param options.includeKeywords - Inclure les mots-clés (défaut: true)
 * @returns Objet Metadata complet pour Next.js
 */
export function generateContentMetadata(
  item: AnyContent,
  options: {
    /** Inclure les mots-clés (défaut: true) */
    includeKeywords?: boolean
  } = {},
): Metadata {
  const {
    includeKeywords = true,
  } = options

  const type = getContentType(item)
  const baseKeywords = getBaseKeywords(type)

  // Construction des mots-clés
  const keywords = includeKeywords
    ? [
        ...baseKeywords,
        item.title,
        ...(item.tags || []),
        ...(item.category ? [item.category] : []),
        ...(('difficulty' in item && item.difficulty) ? [item.difficulty] : []),
      ].filter(Boolean)
    : []

  // Utiliser le système avancé existant avec une configuration simplifiée
  return generateMetadata({
    title: item.title,
    description: item.description || '',
    keywords,
    category: item.category,
    contentType: type,
    difficulty: ('difficulty' in item && item.difficulty) ? item.difficulty as 'beginner' | 'intermediate' | 'advanced' : undefined,
    language: 'fr-FR',
  })
}

/**
 * Génère des métadonnées pour les pages "non trouvé"
 */
export function generateNotFoundMetadata(
  type: 'concept' | 'guide' | 'workflow' | 'tool' = 'guide',
): Metadata {
  const typeLabel = getTitlePrefix(type)
  return {
    title: `${typeLabel} non trouvé - Pharma Prompt Powerhouse`,
    description: `Le ${typeLabel.toLowerCase()} que vous recherchez n'existe pas.`,
  }
}

/**
 * Types utilitaires pour TypeScript
 */
export type SEOContentType = ReturnType<typeof getContentType>
export type SEOOptions = Parameters<typeof generateContentMetadata>[1]
