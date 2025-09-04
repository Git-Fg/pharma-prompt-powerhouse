import { MetadataRoute } from 'next';
import { env } from '@/lib/env';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = env.baseUrl;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Block crawling of potentially sensitive paths
      disallow: [
        '/api/*',
        '/_next/*',
        '/favicon.ico',
        '/.well-known/*',
        '/tmp/*',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}