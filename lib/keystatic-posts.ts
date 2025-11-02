import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '@/keystatic.config';

export const reader = createReader(process.cwd(), keystaticConfig);

// Get all published blog posts, sorted by date (newest first)
export async function getAllPosts() {
  if (!('posts' in reader.collections)) {
    return [];
  }
  
  const allPosts = await (reader.collections.posts as any).all();
  
  return allPosts
    .filter((post: any) => post.entry.published !== false && post.entry.date)
    .sort((a: any, b: any) => {
      const dateA = a.entry.date ? new Date(a.entry.date).getTime() : 0;
      const dateB = b.entry.date ? new Date(b.entry.date).getTime() : 0;
      return dateB - dateA;
    });
}

// Get single post by slug
export async function getPost(slug: string) {
  if (!('posts' in reader.collections)) {
    return null;
  }
  
  try {
    return await (reader.collections.posts as any).read(slug);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`Error fetching post ${slug}:`, error);
    }
    return null;
  }
}

// Transform Keystatic post to component-friendly format
export function transformPost(post: {
  entry: {
    [x: string]: any;
  };
  slug: string;
}) {
  const entry = post.entry;
  
  // Convert date to readable format (e.g., "October 29, 2025")
  const formattedDate = entry.date
    ? new Date(entry.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return {
    title: entry.title || '',
    date: formattedDate,
    dateRaw: entry.date || '',
    excerpt: entry.excerpt || '',
    content: entry.content || null, // Can be function, array, or string
    featuredImage: entry.featuredImage || null,
    slug: post.slug,
  };
}

