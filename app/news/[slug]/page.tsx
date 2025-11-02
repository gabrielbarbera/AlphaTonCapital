import { getAllNewsArticles, getNewsArticle, transformNewsArticle } from '@/lib/keystatic';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { renderMarkdoc } from '@/lib/markdoc-renderer';

interface NewsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const articles = await getAllNewsArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: NewsPageProps) {
  const { slug } = await params;
  
  let articleData;
  try {
    articleData = await getNewsArticle(slug);
  } catch (error) {
    return {
      title: 'Article Not Found',
    };
  }

  if (!articleData || !articleData.published) {
    return {
      title: 'Article Not Found',
    };
  }

  const article = transformNewsArticle({ entry: articleData, slug });

  return {
    title: `${article.title} | AlphaTON Capital`,
    description: article.excerpt,
  };
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { slug } = await params;
  
  let articleData;
  try {
    articleData = await getNewsArticle(slug);
  } catch (error) {
    notFound();
  }

  if (!articleData || !articleData.published) {
    notFound();
  }

  const article = transformNewsArticle({ entry: articleData, slug });

  if (!article.isInternal) {
    notFound();
  }

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
        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-400 text-sm flex-wrap">
            <time dateTime={articleData.date || undefined}>{article.date}</time>
            <span className="text-xs text-gray-500 uppercase tracking-wide">
              Slug: {article.slug}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded ${
              article.published 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-red-500/20 text-red-400'
            }`}>
              {article.published ? 'Published' : 'Draft'}
            </span>
          </div>
        </header>

        {/* Sources (if any) */}
        {article.sources.length > 0 && (
          <div className="mb-8 flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                Sources:
              </span>
              {article.sources.map((source, idx) => (
                source.url ? (
                  <a
                    key={idx}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-400 uppercase tracking-wide hover:text-violet-400 transition-colors underline"
                  >
                    {source.name}
                  </a>
                ) : (
                  <span
                    key={idx}
                    className="text-xs text-gray-400 uppercase tracking-wide"
                  >
                    {source.name}
                  </span>
                )
              ))}
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-gray-500">
              {article.sources.map((source, idx) => (
                source.url && (
                  <a
                    key={idx}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-400/70 hover:text-violet-400 transition-colors underline"
                  >
                    {source.url}
                  </a>
                )
              ))}
            </div>
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
          {renderMarkdoc(articleData.content)}
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

