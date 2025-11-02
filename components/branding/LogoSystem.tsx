import Image from 'next/image';

export default function LogoSystem() {
  return (
    <section className="w-full bg-white">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-24 xl:px-32 py-16 sm:py-20 md:py-24 lg:py-32">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0a0a0a]">
            Logo System
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl text-[#67707f] max-w-3xl mx-auto">
            A clean, institutional mark designed for flexibility.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-[#67707f] max-w-3xl mx-auto">
            The AlphaTON Capital logo reflects trust, clarity, and technical
            precision. It should be used consistently across all media to maintain
            a strong and unified brand presence.
          </p>
        </div>
        
        {/* Logo Variants Grid - Light Background */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          {/* Primary Logo - Light Background */}
          <div className="flex flex-col space-y-12">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-medium text-[#0a0a0a] mb-4">
                Primary Logo
              </h3>
            </div>
            
            <div className="space-y-8">
              <div className="flex flex-col items-center space-y-4">
                <p className="text-lg sm:text-xl md:text-2xl text-center text-[#67707f]">
                  Horizontal (preferred)
                </p>
                <div className="flex items-center justify-center w-full min-h-[80px] p-6 bg-white border border-gray-200 rounded-lg">
                  <Image
                    src="/assets/logos/Primary Logo Horizontal.svg"
                    alt="AlphaTON Capital Primary Logo - Horizontal"
                    width={350}
                    height={68}
                    className="w-auto h-full max-w-full"
                    priority
                  />
                </div>
              </div>
              
              <div className="flex flex-col items-center space-y-4">
                <p className="text-lg sm:text-xl md:text-2xl text-center text-[#67707f]">
                  Vertical lockup for constrained spaces
                </p>
                <div className="flex items-center justify-center w-full min-h-[200px] p-6 bg-white border border-gray-200 rounded-lg">
                  <Image
                    src="/assets/logos/Primary Logo Vertical.svg"
                    alt="AlphaTON Capital Primary Logo - Vertical"
                    width={100}
                    height={200}
                    className="w-auto h-full max-h-[200px]"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Secondary Logo - Light Background */}
          <div className="flex flex-col space-y-12">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-medium text-[#0a0a0a] mb-4">
                Secondary Logo
              </h3>
            </div>
            
            <div className="space-y-8">
              <div className="flex flex-col items-center space-y-4">
                <p className="text-lg sm:text-xl md:text-2xl text-center text-[#67707f]">
                  Horizontal
                </p>
                <div className="flex items-center justify-center w-full min-h-[80px] p-6 bg-white border border-gray-200 rounded-lg">
                  <Image
                    src="/assets/logos/Secondary Logo Horizontal.svg"
                    alt="AlphaTON Capital Secondary Logo - Horizontal"
                    width={350}
                    height={68}
                    className="w-auto h-full max-w-full"
                    priority
                  />
                </div>
              </div>
              
              <div className="flex flex-col items-center space-y-4">
                <p className="text-lg sm:text-xl md:text-2xl text-center text-[#67707f]">
                  Vertical lockup for constrained spaces
                </p>
                <div className="flex items-center justify-center w-full min-h-[200px] p-6 bg-white border border-gray-200 rounded-lg">
                  <Image
                    src="/assets/logos/Secondary Logo Vertical.svg"
                    alt="AlphaTON Capital Secondary Logo - Vertical"
                    width={100}
                    height={200}
                    className="w-auto h-full max-h-[200px]"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      
        {/* Wordmark Only Section */}
        <div className="flex flex-col items-center space-y-6 w-full max-w-4xl mx-auto mb-16">
          <div className="text-center space-y-2">
            <p className="text-xl sm:text-2xl md:text-3xl text-[#67707f]">
              Wordmark Only
            </p>
            <p className="text-sm sm:text-base text-[#67707f]">
              Minimal use for digital or monochrome contexts
            </p>
          </div>
          <div className="flex items-center justify-center w-full h-36 p-8 bg-white border border-gray-200 rounded-lg">
            <Image
              src="/assets/logos/Wordmark.svg"
              alt="AlphaTON Capital Wordmark Only"
              width={300}
              height={149}
              className="w-auto h-full max-h-[120px]"
              priority
            />
          </div>
        </div>
      </div>
      
      {/* Dark Background Variants */}
      <div className="w-full bg-[#0a0a0a]">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-24 xl:px-32 py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white">
              Dark Background Variants
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Primary Logo on Dark */}
            <div className="flex flex-col space-y-12">
              <div className="text-center">
                <h3 className="text-2xl sm:text-3xl font-medium text-white mb-4">
                  Primary Logo
                </h3>
              </div>
              
              <div className="space-y-8">
                <div className="flex flex-col items-center space-y-4">
                  <p className="text-lg sm:text-xl md:text-2xl text-center text-[#67707f]">
                    Horizontal (preferred)
                  </p>
                  <div className="flex items-center justify-center w-full min-h-[80px] p-6 bg-[#0a0a0a] rounded-lg border border-gray-800">
                    <Image
                      src="/assets/logos/Primary Logo Horizontal White.svg"
                      alt="AlphaTON Capital Primary Logo - Horizontal on Dark Background"
                      width={350}
                      height={68}
                      className="w-auto h-full max-w-full"
                      priority
                    />
                  </div>
                </div>
                
                <div className="flex flex-col items-center space-y-4">
                  <p className="text-lg sm:text-xl md:text-2xl text-center text-[#67707f]">
                    Vertical lockup for constrained spaces
                  </p>
                  <div className="flex items-center justify-center w-full min-h-[200px] p-6 bg-[#0a0a0a] rounded-lg border border-gray-800">
                    <Image
                      src="/assets/logos/Primary Logo Vertical White.svg"
                      alt="AlphaTON Capital Primary Logo - Vertical on Dark Background"
                      width={100}
                      height={200}
                      className="w-auto h-full max-h-[200px]"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Secondary Logo on Dark */}
            <div className="flex flex-col space-y-12">
              <div className="text-center">
                <h3 className="text-2xl sm:text-3xl font-medium text-white mb-4">
                  Secondary Logo
                </h3>
              </div>
              
              <div className="space-y-8">
                <div className="flex flex-col items-center space-y-4">
                  <p className="text-lg sm:text-xl md:text-2xl text-center text-[#67707f]">
                    Horizontal
                  </p>
                  <div className="flex items-center justify-center w-full min-h-[80px] p-6 bg-[#0a0a0a] rounded-lg border border-gray-800">
                    <Image
                      src="/assets/logos/Secondary Logo Horizontal White.svg"
                      alt="AlphaTON Capital Secondary Logo - Horizontal on Dark Background"
                      width={350}
                      height={68}
                      className="w-auto h-full max-w-full"
                      priority
                    />
                  </div>
                </div>
                
                <div className="flex flex-col items-center space-y-4">
                  <p className="text-lg sm:text-xl md:text-2xl text-center text-[#67707f]">
                    Vertical lockup for constrained spaces
                  </p>
                  <div className="flex items-center justify-center w-full min-h-[200px] p-6 bg-[#0a0a0a] rounded-lg border border-gray-800">
                    <Image
                      src="/assets/logos/Secondary Logo Vertical White.svg"
                      alt="AlphaTON Capital Secondary Logo - Vertical on Dark Background"
                      width={100}
                      height={200}
                      className="w-auto h-full max-h-[200px]"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

