import Image from 'next/image';

const banners = [
  {
    title: 'X / Twitter',
    src: '/assets/media_kit/AlphaTon Social Banners/Twitter header - 1.jpg',
    alt: 'Twitter header banner for AlphaTON Capital',
  },
  {
    title: 'LinkedIn',
    src: '/assets/media_kit/AlphaTon Social Banners/LinkedIn cover - 1.jpg',
    alt: 'LinkedIn cover banner for AlphaTON Capital',
  },
  {
    title: 'OpenGraph',
    src: '/assets/media_kit/AlphaTon Social Banners/social.jpg',
    alt: 'OpenGraph social banner for AlphaTON Capital',
  },
];

export default function SocialBanners() {
  return (
    <section className="w-full bg-white">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-24 xl:px-32 py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="space-y-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0a0a0a]">
            Social Banners
          </h2>
          
          {/* Banners Grid */}
          <div className="grid grid-cols-1 gap-12">
            {banners.map((banner) => (
              <div key={banner.title} className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-medium text-[#0a0a0a] text-center">
                  {banner.title}
                </h3>
                <div className="w-full relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                  <Image
                    src={banner.src}
                    alt={banner.alt}
                    width={1200}
                    height={400}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

