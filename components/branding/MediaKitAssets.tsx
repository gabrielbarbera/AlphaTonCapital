import Link from 'next/link';
import Image from 'next/image';

export default function MediaKitAssets() {
  return (
    <section className="w-full bg-[#0a0a0a]">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-24 xl:px-32 py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="flex flex-col items-center gap-12">
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white">
              Media Kit Assets
            </h2>
            <p className="text-xl sm:text-2xl md:text-3xl text-[#67707f]">
              Download our complete branding assets package.
            </p>
            <p className="text-base sm:text-lg text-[#67707f] leading-relaxed">
              All logos, color guides, social banners, and merchandise mockups in one convenient package.
            </p>
          </div>
          
          {/* Download CTA */}
          <div className="flex flex-col items-center gap-6">
            <Link
              href="/media-kit"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold text-lg rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Download Complete Media Kit (ZIP)
            </Link>
            <p className="text-sm text-[#67707f] text-center max-w-2xl">
              Includes all logo variants, color specifications, social media banners, and brand guidelines
            </p>
          </div>
          
          {/* Asset Preview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
            {/* Logo Assets */}
            <div className="flex flex-col gap-4 p-6 bg-white/5 rounded-lg border border-white/10">
              <h3 className="text-white font-semibold text-lg text-center">Logo Files</h3>
              <p className="text-sm text-[#67707f] text-center">SVG and PNG formats</p>
              <div className="flex items-center justify-center h-32 bg-white/5 rounded border border-white/10">
                <Image
                  src="/assets/logos/Primary Logo Horizontal White.svg"
                  alt="Logo preview"
                  width={200}
                  height={60}
                  className="w-auto h-12 opacity-80"
                />
              </div>
            </div>
            
            {/* Social Banners */}
            <div className="flex flex-col gap-4 p-6 bg-white/5 rounded-lg border border-white/10">
              <h3 className="text-white font-semibold text-lg text-center">Social Media Banners</h3>
              <p className="text-sm text-[#67707f] text-center">LinkedIn, Twitter headers</p>
              <div className="flex items-center justify-center h-32 bg-white/5 rounded border border-white/10 overflow-hidden">
                <Image
                  src="/assets/media_kit/AlphaTon Social Banners/social.jpg"
                  alt="Social Banner Preview"
                  width={300}
                  height={128}
                  className="object-cover w-full h-full opacity-80"
                />
              </div>
            </div>
            
            {/* Apparel */}
            <div className="flex flex-col gap-4 p-6 bg-white/5 rounded-lg border border-white/10">
              <h3 className="text-white font-semibold text-lg text-center">Apparel & Merchandise</h3>
              <p className="text-sm text-[#67707f] text-center">T-shirts, polos, caps mockups</p>
              <div className="flex items-center justify-center h-32 bg-white/5 rounded border border-white/10 overflow-hidden">
                <Image
                  src="/assets/media_kit/apparel and banners/banners.png"
                  alt="Merchandise Preview"
                  width={300}
                  height={128}
                  className="object-cover w-full h-full opacity-80"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

