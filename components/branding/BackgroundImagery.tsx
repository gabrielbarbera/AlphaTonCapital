import Image from 'next/image';
import CheckIcon from './icons/CheckIcon';

export default function BackgroundImagery() {
  const guidelines = [
    'Use black or deep blue gradients as the base for layouts.',
    'Keep imagery minimal, with subtle light effects and geometric motifs.',
    'Partner logos must be displayed in monochrome.',
    'Avoid excessive illustration or meme imagery.',
  ];

  return (
    <section className="w-full bg-white">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-24 xl:px-32 py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="space-y-12 lg:space-y-16">
          {/* Header */}
          <div className="space-y-4 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0a0a0a]">
              Background &amp; Imagery
            </h2>
            <p className="text-xl sm:text-2xl md:text-3xl text-[#67707f]">
              High-contrast, institutional, and crypto-native.
            </p>
            <p className="text-base sm:text-lg text-[#67707f] leading-relaxed">
              The AlphaTON brand relies on strong monochrome foundations, clean
              gradients, and symbolic visual language that reflects the scale of
              the TON network.
            </p>
          </div>
          
          {/* Guidelines List */}
          <div className="space-y-3 max-w-3xl mx-auto">
            {guidelines.map((guideline, index) => (
              <div key={index} className="flex items-start gap-4">
                <CheckIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-base text-black flex-1 leading-relaxed">
                  {guideline}
                </p>
              </div>
            ))}
          </div>
          
          {/* Background Example */}
          <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[600px] relative overflow-hidden rounded-lg">
            <Image
              src="/assets/media_kit/Backgrounds/background.jpg"
              alt="AlphaTON Capital background imagery example"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

