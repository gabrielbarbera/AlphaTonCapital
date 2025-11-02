'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error:', error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-alphaton-dark flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-semibold text-white mb-4">Something went wrong</h1>
        <p className="text-gray-400 mb-8">
          We encountered an unexpected error. Please try again.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-gradient-cta backdrop-blur-md border border-white/20 py-3 px-6 rounded-xl text-white font-medium hover:opacity-90 transition-all"
          >
            Try again
          </button>
          <Link
            href="/"
            className="bg-white/10 backdrop-blur-md border border-white/20 py-3 px-6 rounded-xl text-white font-medium hover:bg-white/20 transition-all"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

