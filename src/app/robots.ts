import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://pharma-prompt-powerhouse.vercel.app'; // Update with your actual domain

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Block crawling of potentially sensitive paths
      disallow: [
        '/api/*',
        '/_next/*',
        '/favicon.ico',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}