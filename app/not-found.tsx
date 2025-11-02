import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-alphaton-dark flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-semibold text-white mb-4">404</h1>
        <h2 className="text-2xl font-medium text-gray-300 mb-4">Page not found</h2>
        <p className="text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-gradient-cta backdrop-blur-md border border-white/20 py-3 px-6 rounded-xl text-white font-medium hover:opacity-90 transition-all"
        >
          Go to homepage
        </Link>
      </div>
    </div>
  );
}

