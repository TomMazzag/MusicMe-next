import { MetadataRoute } from 'next';
import { BASE_URL } from '../lib/util';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = BASE_URL;
  const routes: string[] = [
    '',
    '/about',
    '/account',
    '/discover',
    '/create-account',
    '/register'
  ];

  const staticRoutesSitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...staticRoutesSitemap];
}
