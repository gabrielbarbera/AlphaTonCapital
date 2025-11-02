import CheckIcon from './icons/CheckIcon';

export default function TypographySystem() {
  return (
    <section className="w-full bg-[#E6E6E6]">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-24 xl:px-32 py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.5fr] gap-12 lg:gap-16 items-start">
          {/* Left Column - Content */}
          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0a0a0a]">
                Typography System
              </h2>
              <p className="text-xl sm:text-2xl md:text-3xl text-[#67707f]">
                Red Hat Display as a modern institutional voice.
              </p>
              <p className="text-base sm:text-lg text-[#67707f] leading-relaxed">
                Typography reinforces AlphaTON&apos;s identity: modern, composed, and
                legible across digital and print contexts.
              </p>
            </div>
            
            {/* Typography Rules */}
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <CheckIcon className="flex-shrink-0" />
                <p className="text-base text-black flex-1">
                  700 (Bold) for H1–H3
                </p>
              </div>
              <div className="flex items-center gap-4">
                <CheckIcon className="flex-shrink-0" />
                <p className="text-base text-black flex-1">
                  600 (SemiBold) for subheads
                </p>
              </div>
              <div className="flex items-center gap-4">
                <CheckIcon className="flex-shrink-0" />
                <p className="text-base text-black flex-1">
                  400 (Regular) — Text, labels/UI
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Column - Alphabet Display */}
          <div className="flex items-center justify-center lg:justify-start">
            <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#0a0a0a] font-sans leading-tight">
              Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
