import Image from 'next/image';

const avatars = [
  { src: 'Avatar White.png', alt: 'Avatar White', rounded: 'rounded-lg' },
  { src: 'Avatar Black.png', alt: 'Avatar Black', rounded: 'rounded-lg' },
  { src: 'Avatar Gradient.png', alt: 'Avatar Gradient', rounded: 'rounded-lg' },
  { src: 'Avatar Gradient Icon.png', alt: 'Avatar Gradient Icon', rounded: 'rounded-lg' },
  { src: 'Avatar White Circle.png', alt: 'Avatar White Circle', rounded: 'rounded-full' },
  { src: 'Avatar Black Circle.png', alt: 'Avatar Black Circle', rounded: 'rounded-full' },
  { src: 'Avatar Gradient Circle.png', alt: 'Avatar Gradient Circle', rounded: 'rounded-full' },
  { src: 'Avatar Gradient Icon Circle.png', alt: 'Avatar Gradient Icon Circle', rounded: 'rounded-full' },
];

export default function AvatarsIcons() {
  return (
    <section className="w-full bg-white">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-24 xl:px-32 py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="space-y-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0a0a0a] text-center">
            Avatars &amp; Icons
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {avatars.map((avatar) => (
              <div
                key={avatar.alt}
                className={`flex items-center justify-center w-full aspect-square bg-transparent ${avatar.rounded || 'rounded-lg'} overflow-hidden shadow-md transition-transform hover:scale-105 duration-200`}
              >
                <Image
                  src={`/assets/media_kit/Avatars and Icons/${avatar.src}`}
                  alt={avatar.alt}
                  width={232}
                  height={232}
                  className="object-contain w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

