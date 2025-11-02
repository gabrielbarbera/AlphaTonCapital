import { MetadataRoute } from 'next';
import { getAllNewsArticles } from '@/lib/keystatic';
import { getAllPosts } from '@/lib/keystatic-posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://alphatoncapital.com';
  const baseUrl = siteUrl.replace(/\/$/, '');

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/branding`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  try {
    const newsArticles = await getAllNewsArticles();
    newsArticles.forEach((article: any) => {
      if (article.entry.published) {
        routes.push({
          url: `${baseUrl}/news/${article.slug}`,
          lastModified: article.entry.date ? new Date(article.entry.date) : new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      }
    });

    const posts = await getAllPosts();
    posts.forEach((post: any) => {
      if (post.entry.published) {
        routes.push({
          url: `${baseUrl}/posts/${post.slug}`,
          lastModified: post.entry.date ? new Date(post.entry.date) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      }
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error generating sitemap:', error);
    }
  }

  return routes;
}

