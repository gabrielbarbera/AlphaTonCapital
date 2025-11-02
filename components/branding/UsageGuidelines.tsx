import Image from 'next/image';
import CheckIcon from './icons/CheckIcon';

const XIcon = () => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    aria-hidden="true"
  >
    <path
      opacity="0.3"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0ZM14.7071 6.70711C15.0976 6.31658 15.0976 5.68342 14.7071 5.29289C14.3166 4.90237 13.6834 4.90237 13.2929 5.29289L10 8.58579L6.70711 5.29289C6.31658 4.90237 5.68342 4.90237 5.29289 5.29289C4.90237 5.68342 4.90237 6.31658 5.29289 6.70711L8.58579 10L5.29289 13.2929C4.90237 13.6834 4.90237 14.3166 5.29289 14.7071C5.68342 15.0976 6.31658 15.0976 6.70711 14.7071L10 11.4142L13.2929 14.7071C13.6834 15.0976 14.3166 15.0976 14.7071 14.7071C15.0976 14.3166 15.0976 13.6834 14.7071 13.2929L11.4142 10L14.7071 6.70711Z"
      fill="#EF4444"
    />
    <path
      d="M14.7071 5.29289C15.0976 5.68342 15.0976 6.31658 14.7071 6.70711L11.4142 10L14.7071 13.2929C15.0976 13.6834 15.0976 14.3166 14.7071 14.7071C14.3166 15.0976 13.6834 15.0976 13.2929 14.7071L10 11.4142L6.70711 14.7071C6.31658 15.0976 5.68342 15.0976 5.29289 14.7071C4.90237 14.3166 4.90237 13.6834 5.29289 13.2929L8.58579 10L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C6.31658 4.90237 6.70711 5.29289 6.70711 5.29289L10 8.58579L13.2929 5.29289C13.6834 4.90237 14.3166 4.90237 14.7071 5.29289Z"
      fill="#EF4444"
    />
  </svg>
);

const dos = [
  'Maintain clear space equal to the "A" height.',
  'Only use black (#000000) or white (#FFFFFF) logos.',
  'Place on clean, contrasting backgrounds.',
  'No effects, shadows, outlines, or distortions.',
  'Do not place over photography unless a scrim or solid backing is used.',
];

const minimumSizes = [
  'Horizontal: 200 px (digital) / 50 mm (print)',
  'Wordmark: 120 px (digital) / 30 mm (print)',
  'Badge: 48 px (digital) / 12 mm (print)',
  'Ticker Pill: 140 px (digital)',
];

const donts = [
  'Do not stretch or distort the logo.',
  'Do not rotate the logo.',
  'Do not add effects or filters.',
  'Do not use colored versions (only black/white).',
  'Do not place on busy backgrounds without proper contrast.',
];

export default function UsageGuidelines() {
  return (
    <section className="w-full bg-[#0a0a0a]">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-24 xl:px-32 py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Do's and Minimum Sizes */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-medium text-white">
                Usage Guidelines
              </h2>
              
              {/* Do's */}
              <div className="space-y-3">
                {dos.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <CheckIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-base text-white flex-1 leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* Minimum Sizes */}
              <div className="space-y-4 pt-6">
                <h3 className="text-xl sm:text-2xl font-medium text-white">
                  Minimum Sizes
                </h3>
                <div className="space-y-3">
                  {minimumSizes.map((size, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <CheckIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <p className="text-base text-white flex-1 leading-relaxed">
                        {size}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Don'ts and Examples */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-medium text-white">
                Don&apos;ts
              </h3>
              <div className="space-y-3">
                {donts.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <XIcon />
                    <p className="text-base text-white flex-1 leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
              {/* Visual Examples */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-6">
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center justify-center w-full h-24 sm:h-32 bg-green-500/10 border-2 border-green-500/50 rounded-lg p-4">
                  <Image
                    src="/assets/logos/Primary Logo Horizontal White.svg"
                    alt="Correct usage example - properly proportioned logo"
                    width={180}
                    height={40}
                    className="w-auto h-full max-h-[40px]"
                  />
                </div>
                <p className="text-sm font-medium text-white">Correct</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center justify-center w-full h-24 sm:h-32 bg-red-500/10 border-2 border-red-500/50 rounded-lg p-2">
                  <Image
                    src="/assets/logos/Primary Logo Horizontal White.svg"
                    alt="Incorrect usage example - stretched logo"
                    width={180}
                    height={80}
                    className="w-auto h-[80px] object-cover opacity-50"
                  />
                </div>
                <p className="text-sm font-medium text-white">Incorrect</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

