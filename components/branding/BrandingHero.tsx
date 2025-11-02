import Link from 'next/link';

export default function BrandingHero() {
  return (
    <div className="w-full bg-[#18121f]">
      <div className="flex flex-col items-center justify-center px-6 sm:px-8 md:px-12 lg:px-24 xl:px-32 py-20 sm:py-24 md:py-32 lg:py-36 bg-[#0a0a0a]">
        <div className="w-full max-w-7xl mx-auto space-y-12">
          {/* Branding Text */}
          <div className="flex flex-col items-center gap-8">
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight text-center">
              Branding Guide
            </h1>
          </div>
          
          {/* Description Section */}
          <div className="space-y-6 max-w-4xl mx-auto">
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-relaxed text-center">
              The bridge between institutional capital and Telegram&apos;s financial layer.
            </p>
            
            <div className="space-y-4 text-base sm:text-lg text-gray-300 leading-relaxed">
              <p className="text-center">
                AlphaTON Capital is a NASDAQ-listed digital asset company building the
                infrastructure that connects traditional finance with TON — Telegram&apos;s
                blockchain ecosystem. We exist to make the TON economy accessible,
                investable, and institutional-grade.
              </p>
              <ul className="space-y-3 list-none pl-0 text-center max-w-3xl mx-auto">
                <li className="flex items-center justify-center gap-2 flex-wrap">
                  <span className="text-[#67707f] font-medium">One-liner:</span>
                  <span>Institutional access to Telegram&apos;s financial layer.</span>
                </li>
                <li className="flex items-center justify-center gap-2 flex-wrap">
                  <span className="text-[#67707f] font-medium">Public identity:</span>
                  <span>NASDAQ-listed digital asset company on TON.</span>
                </li>
                <li className="flex items-center justify-center gap-2 flex-wrap">
                  <span className="text-[#67707f] font-medium">Proof:</span>
                  <span>We build and acquire yield-generating TON infrastructure and translate onchain value to public markets.</span>
                </li>
                <li className="flex items-center justify-center gap-2 flex-wrap">
                  <span className="text-[#67707f] font-medium">Brand attributes:</span>
                  <span>Institutional · Precise · Crypto-native · Composed · Forward-looking.</span>
                </li>
              </ul>
            </div>
            
            {/* Media Kit Download Link */}
            <div className="pt-4 flex justify-center">
              <Link
                href="/media-kit"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Download Media Kit (ZIP)
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

