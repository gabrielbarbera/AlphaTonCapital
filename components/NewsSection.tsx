import { getAllNewsArticles, transformNewsArticle, type NewsSource } from '@/lib/keystatic';
import NewsSectionClient from './NewsSectionClient';

interface NewsArticle {
  title: string;
  date: string;
  excerpt: string;
  sources: NewsSource[];
  sourceUrl?: string;
  slug: string;
  published: boolean;
  isInternal: boolean;
}

export default async function NewsSection() {
  let articles: NewsArticle[] = [];

  try {
    const keystaticArticles = await getAllNewsArticles();
    articles = keystaticArticles.map(transformNewsArticle);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching news articles:', error);
    }
  }

  return <NewsSectionClient articles={articles} />;
}
