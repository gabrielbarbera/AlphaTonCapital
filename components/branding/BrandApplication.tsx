import Image from 'next/image';
import CheckIcon from './icons/CheckIcon';

const guidelines = [
  'Use monochrome logo only',
  'Gradients limited to accents',
  'Always maintain minimum clear space',
];

const apparelItems = [
  { src: 'tshirt black.png', alt: 'Black T-Shirt Front' },
  { src: 'tshirt black back.png', alt: 'Black T-Shirt Back' },
  { src: 'tshirt white.png', alt: 'White T-Shirt Front' },
  { src: 'tshirt white back.png', alt: 'White T-Shirt Back' },
  { src: 'polo black.png', alt: 'Black Polo Front' },
  { src: 'polo black back.png', alt: 'Black Polo Back' },
  { src: 'polo white.png', alt: 'White Polo Front' },
  { src: 'polo white back.png', alt: 'White Polo Back' },
  { src: 'cap black.png', alt: 'Black Cap Front' },
  { src: 'cap black back.png', alt: 'Black Cap Back' },
  { src: 'cap white.png', alt: 'White Cap Front' },
  { src: 'cap white back.png', alt: 'White Cap Back' },
];

export default function BrandApplication() {
  return (
    <section className="w-full bg-[#E6E6E6]">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-24 xl:px-32 py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="space-y-12 lg:space-y-16">
          {/* Header Section */}
          <div className="space-y-6 max-w-4xl">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0a0a0a]">
                Brand Application
              </h2>
              <p className="text-xl sm:text-2xl md:text-3xl text-[#67707f]">
                Extend the brand with consistency.
              </p>
              <p className="text-base sm:text-lg text-[#67707f] leading-relaxed">
                Merch, signage, and banners should follow the core logo, color, and
                type rules without variation.
              </p>
            </div>
            
            {/* Guidelines */}
            <div className="space-y-3">
              {guidelines.map((guideline, index) => (
                <div key={index} className="flex items-start gap-4">
                  <CheckIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-base text-black flex-1 leading-relaxed">
                    {guideline}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Apparel Grid */}
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-medium text-[#0a0a0a] text-center">
              Apparel &amp; merch
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
              {apparelItems.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center w-full overflow-hidden rounded-lg bg-white border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="relative w-full aspect-square flex items-center justify-center p-4">
                    <Image
                      src={`/assets/media_kit/apparel and banners/${item.src}`}
                      alt={item.alt}
                      width={358}
                      height={358}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

