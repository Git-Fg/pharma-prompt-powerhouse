import { MetadataRoute } from 'next';
import { content } from '@/lib/content-loader';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pharma-prompt-powerhouse.vercel.app'; // Update with your actual domain

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/par-ou-commencer`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/workflows`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/concepts`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/l-arsenal-ia`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/boite-a-outils`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];

  // Dynamic workflow pages
  const workflowPages = content.workflows.map((workflow) => ({
    url: `${baseUrl}/workflows/${workflow.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: workflow.isFavorite ? 0.9 : 0.7,
  }));

  // Dynamic guide pages
  const guidePages = content.guides.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: guide.isFavorite ? 0.8 : 0.6,
  }));

  // Dynamic concept pages
  const conceptPages = content.concepts.map((concept) => ({
    url: `${baseUrl}/concepts/${concept.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: concept.isFavorite ? 0.7 : 0.5,
  }));

  // Dynamic external tool pages
  const toolPages = content.externalTools.map((tool) => ({
    url: `${baseUrl}/l-arsenal-ia/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: tool.isFavorite ? 0.7 : 0.5,
  }));

  return [
    ...staticPages,
    ...workflowPages,
    ...guidePages,
    ...conceptPages,
    ...toolPages,
  ];
}