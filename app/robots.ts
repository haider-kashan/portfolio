import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://kashanhaider.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // SECURITY & SEO:
      // 1. Don't let Google index your Admin Panel (/studio)
      // 2. Don't let Google try to index your API endpoints (/api)
      disallow: ['/studio/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}