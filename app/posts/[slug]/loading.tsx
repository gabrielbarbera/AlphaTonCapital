export default function PostLoading() {
  return (
    <div className="min-h-screen bg-alphaton-dark">
      <header className="w-full border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="h-6 w-32 bg-white/10 rounded animate-pulse" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="mb-8">
          <div className="h-64 w-full bg-white/10 rounded-lg mb-8 animate-pulse" />
        </div>

        <div className="mb-8">
          <div className="h-12 w-3/4 bg-white/10 rounded mb-4 animate-pulse" />
          <div className="h-12 w-1/2 bg-white/10 rounded mb-4 animate-pulse" />
          <div className="h-4 w-48 bg-white/5 rounded animate-pulse" />
        </div>

        <div className="mb-8 p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="h-6 w-full bg-white/10 rounded mb-2 animate-pulse" />
          <div className="h-6 w-4/5 bg-white/10 rounded animate-pulse" />
        </div>

        <div className="space-y-4">
          <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
          <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-white/10 rounded animate-pulse" />
          <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
          <div className="h-4 w-4/5 bg-white/10 rounded animate-pulse" />
          <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-white/10 rounded animate-pulse" />
        </div>
      </main>
    </div>
  );
}

