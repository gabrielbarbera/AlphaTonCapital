'use client';

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const edges = [
  {
    title: 'Institutional Grade',
    description: 'Founded in partnership with Chardan, our team combines deep crypto infrastructure experience with public market expertise.',
  },
  {
    title: 'Technical Ownership',
    description: 'We don\'t just hold assets—we build, operate, and improve TON-native protocols. This gives us direct access to MEV flows, staking yield, and protocol fees.',
  },
  {
    title: 'Crypto Native Access',
    description: 'From token-based exposure to structured yield products, AlphaTon provides multiple vehicles for participating in the TON economy.',
  },
];

export default function OurEdge() {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
  });

  return (
    <section
      ref={elementRef}
      className={`w-full py-16 md:py-24 bg-white transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-12">
          <div className="flex items-center justify-center w-full md:w-1/2 order-2 md:order-1">
            <div className="relative w-full max-w-md aspect-[443/398]">
              <Image
                src="/assets/graphics/Our Edge.svg"
                alt="Diamond with arrow graphic representing precision and direction"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 sm:gap-8 w-full md:w-1/2 order-1 md:order-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-neutral-950">
              Our Edge
            </h2>
            <div className="flex flex-col gap-4 sm:gap-6">
              {edges.map((edge, index) => {
                const { elementRef: edgeRef, isVisible: edgeVisible } = useScrollAnimation({
                  threshold: 0.1,
                  rootMargin: '0px 0px -50px 0px',
                });
                
                return (
                <div
                  key={index}
                  ref={edgeRef as React.RefObject<HTMLDivElement>}
                  className={`flex flex-col gap-2 transition-all duration-700 ease-out ${
                    edgeVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  <h4 className="text-base sm:text-lg md:text-xl font-medium text-neutral-950">
                    {edge.title}
                  </h4>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                    {edge.description}
                  </p>
                </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

