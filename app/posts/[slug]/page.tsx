import { getAllPosts, getPost, transformPost } from '@/lib/keystatic-posts';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { renderMarkdoc } from '@/lib/markdoc-renderer';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  
  let postData;
  try {
    postData = await getPost(slug);
  } catch (error) {
    return {
      title: 'Post Not Found',
    };
  }

  if (!postData || !postData.published) {
    return {
      title: 'Post Not Found',
    };
  }

  const post = transformPost({ entry: postData, slug });

  return {
    title: `${post.title} | AlphaTON Capital`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  
  let postData;
  try {
    postData = await getPost(slug);
  } catch (error) {
    notFound();
  }

  if (!postData || !postData.published) {
    notFound();
  }

  const post = transformPost({ entry: postData, slug });

  return (
    <div className="min-h-screen bg-alphaton-dark">
      {/* Header */}
      <header className="w-full border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/"
            className="text-violet-400 hover:text-violet-300 transition-colors text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        {/* Featured Image */}
        {post.featuredImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.featuredImage}
              alt={post.title}
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        )}

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-400 text-sm">
            <time dateTime={post.dateRaw}>{post.date}</time>
          </div>
        </header>

        {/* Excerpt */}
        {post.excerpt && (
          <div className="mb-8 p-4 bg-white/5 rounded-lg border border-white/10">
            <p className="text-gray-300 text-lg leading-relaxed">{post.excerpt}</p>
          </div>
        )}

        {/* Article Content */}
        <article 
          className="prose prose-invert prose-lg max-w-none
                     prose-headings:text-white prose-headings:font-semibold
                     prose-p:text-gray-300 prose-p:leading-relaxed
                     prose-a:text-violet-400 prose-a:no-underline hover:prose-a:underline
                     prose-strong:text-white prose-strong:font-semibold
                     prose-ul:text-gray-300 prose-ol:text-gray-300
                     prose-li:text-gray-300
                     prose-img:rounded-lg prose-img:my-8
                     prose-blockquote:border-violet-400 prose-blockquote:text-gray-300
                     prose-code:text-violet-300 prose-code:bg-white/10 prose-code:px-1 prose-code:rounded
                     prose-hr:border-white/10"
        >
          {renderMarkdoc(post.content)}
        </article>
      </main>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/"
            className="inline-block text-violet-400 hover:text-violet-300 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </footer>
    </div>
  );
}

