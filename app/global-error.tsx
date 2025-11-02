'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error('Global error:', error);
    }
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-alphaton-dark flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <h1 className="text-4xl font-semibold text-white mb-4">Something went wrong</h1>
            <p className="text-gray-400 mb-8">
              A critical error occurred. Please refresh the page or try again later.
            </p>
            <button
              onClick={reset}
              className="bg-gradient-cta backdrop-blur-md border border-white/20 py-3 px-6 rounded-xl text-white font-medium hover:opacity-90 transition-all"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

