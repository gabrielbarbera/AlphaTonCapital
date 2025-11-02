import { getAllPosts, transformPost } from '@/lib/keystatic-posts';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Blog Posts | AlphaTON Capital',
  description: 'Latest blog posts and articles from AlphaTON Capital',
};

export default async function PostsPage() {
  let posts: ReturnType<typeof transformPost>[] = [];

  try {
    const keystaticPosts = await getAllPosts();
    posts = keystaticPosts.map(transformPost);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching posts:', error);
    }
  }

  return (
    <div className="min-h-screen bg-alphaton-dark">
      {/* Header */}
      <header className="w-full border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            href="/"
            className="text-violet-400 hover:text-violet-300 transition-colors text-sm mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white">
            Blog Posts
          </h1>
          <p className="text-gray-400 mt-2">
            Insights, updates, and articles from AlphaTON Capital
          </p>
        </div>
      </header>

      {/* Posts List */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg mb-4">No blog posts available yet.</p>
            <p className="text-gray-500 text-sm">
              <Link href="/keystatic" className="text-violet-400 hover:text-violet-300 underline">
                Add a post
              </Link>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all shadow-lg shadow-violet-500/5 hover:shadow-violet-500/10 flex flex-col"
              >
                {post.featuredImage && (
                  <Link href={`/posts/${post.slug}`}>
                    <div className="relative w-full h-48">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </Link>
                )}
                
                <div className="p-6 flex flex-col flex-grow">
                  <time className="text-xs text-gray-500 mb-2">{post.date}</time>
                  
                  <Link href={`/posts/${post.slug}`}>
                    <h2 className="text-xl font-semibold text-white mb-3 leading-tight hover:text-violet-300 transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  
                  {post.excerpt && (
                    <p className="text-sm text-gray-300 line-clamp-3 mb-4 flex-grow">
                      {post.excerpt}
                    </p>
                  )}
                  
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors mt-auto"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

