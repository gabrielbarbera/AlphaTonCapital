'use client';

import { useMemo, useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface NewsSource {
  name: string;
  url?: string;
}

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

interface NewsSectionClientProps {
  articles: NewsArticle[];
}

const ITEMS_PER_PAGE = 3;

export default function NewsSectionClient({ articles }: NewsSectionClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const displayedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return articles.slice(startIndex, endIndex);
  }, [currentPage, articles]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage(page);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 150);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = isMobile ? 3 : 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (isMobile) {
        if (currentPage <= 2) {
          for (let i = 1; i <= 2; i++) pages.push(i);
          pages.push('ellipsis');
          pages.push(totalPages);
        } else if (currentPage >= totalPages - 1) {
          pages.push(1);
          pages.push('ellipsis');
          for (let i = totalPages - 1; i <= totalPages; i++) pages.push(i);
        } else {
          pages.push(1);
          if (currentPage > 2) pages.push('ellipsis');
          pages.push(currentPage);
          if (currentPage < totalPages - 1) pages.push('ellipsis');
          pages.push(totalPages);
        }
      } else {
        if (currentPage <= 3) {
          for (let i = 1; i <= 3; i++) pages.push(i);
          pages.push('ellipsis');
          pages.push(totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push(1);
          pages.push('ellipsis');
          for (let i = totalPages - 2; i <= totalPages; i++) pages.push(i);
        } else {
          pages.push(1);
          pages.push('ellipsis');
          pages.push(currentPage - 1);
          pages.push(currentPage);
          pages.push(currentPage + 1);
          pages.push('ellipsis');
          pages.push(totalPages);
        }
      }
    }
    
    return pages;
  };

  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
  });

  return (
    <section
      ref={elementRef}
      className={`w-full py-16 md:py-24 bg-alphaton-dark transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 sm:gap-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-white">
          In the News
        </h2>
        
        {articles.length === 0 ? (
          <div className="text-gray-400 text-center py-12">
            <p>No news articles available.</p>
            <p className="text-sm mt-2">
              <a href="/keystatic" className="text-violet-400 hover:text-violet-300 underline">
                Add news articles
              </a>
            </p>
          </div>
        ) : (
          <>
            <div 
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full transition-opacity duration-300 ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {displayedArticles.map((article, index) => (
                <article
                  key={`${currentPage}-${index}`}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-4 sm:p-6 hover:bg-white/10 hover:border-white/20 transition-all flex flex-col gap-3 sm:gap-4 shadow-lg shadow-violet-500/5 hover:shadow-violet-500/10"
                >
                  <header className="flex flex-col gap-1.5 sm:gap-2">
                    {article.isInternal ? (
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white leading-snug hover:text-violet-300 transition-colors">
                        <a 
                          href={`/news/${article.slug}`}
                          className="hover:underline"
                        >
                          {article.title}
                        </a>
                      </h3>
                    ) : article.sourceUrl ? (
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white leading-snug hover:text-violet-300 transition-colors">
                        <a 
                          href={article.sourceUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {article.title}
                        </a>
                      </h3>
                    ) : (
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white leading-snug">
                        {article.title}
                      </h3>
                    )}
                    <time className="text-xs sm:text-sm text-gray-400">{article.date}</time>
                  </header>
                  <div className="flex flex-col gap-2">
                    {article.sources.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {article.sources.map((source, idx) => (
                          source.url ? (
                            <a
                              key={idx}
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide hover:text-violet-400 transition-colors underline"
                            >
                              {source.name}
                            </a>
                          ) : (
                            <span
                              key={idx}
                              className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide"
                            >
                              {source.name}
                            </span>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <nav className="flex justify-center items-center gap-1.5 sm:gap-2 flex-wrap mt-6 sm:mt-8" aria-label="News pagination">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className={`px-3 sm:px-4 py-2 rounded-lg backdrop-blur-md border border-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-white/50 min-w-[70px] sm:min-w-[80px] text-xs sm:text-sm touch-manipulation active:opacity-75 ${
                    currentPage === 1
                      ? 'bg-white/5 text-gray-500 cursor-not-allowed opacity-50'
                      : 'bg-white/10 text-white hover:bg-white/20 hover:border-white/30'
                  }`}
                  aria-label="Previous page"
                >
                  Previous
                </button>
                {getPageNumbers().map((page, idx) => {
                  if (page === 'ellipsis') {
                    return (
                      <span key={`ellipsis-${idx}`} className="px-3 py-2 text-gray-400">
                        ...
                      </span>
                    );
                  }
                  const pageNum = page as number;
                  const isActive = pageNum === currentPage;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 sm:px-4 py-2 rounded-lg backdrop-blur-md border transition-all focus:outline-none focus:ring-2 focus:ring-white/50 min-w-[36px] sm:min-w-[44px] text-xs sm:text-sm touch-manipulation active:opacity-75 ${
                        isActive
                          ? 'bg-white/20 text-violet-300 font-semibold border-white/40 shadow-lg shadow-violet-500/20'
                          : 'bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/30'
                      }`}
                      aria-label={isActive ? `Current page, page ${pageNum}` : `Go to page ${pageNum}`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className={`px-3 sm:px-4 py-2 rounded-lg backdrop-blur-md border border-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-white/50 min-w-[70px] sm:min-w-[80px] text-xs sm:text-sm touch-manipulation active:opacity-75 ${
                    currentPage === totalPages
                      ? 'bg-white/5 text-gray-500 cursor-not-allowed opacity-50'
                      : 'bg-white/10 text-white hover:bg-white/20 hover:border-white/30'
                  }`}
                  aria-label="Next page"
                >
                  Next
                </button>
              </nav>
            )}
          </>
        )}
      </div>
    </section>
  );
}

