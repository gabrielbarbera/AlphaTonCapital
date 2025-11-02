'use client';

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const services = [
  {
    title: 'Build and Acquire Yield-Generating Protocols',
    description: 'We invest in and operate revenue-producing projects on TON across MEV, staking, DEXs, and tokenized products.',
  },
  {
    title: 'Bridge Onchain Value to Public Markets',
    description: 'As a public company, we offer institutional investors transparent access to TON-native assets and infrastructure—fully regulated, fully aligned.',
  },
  {
    title: 'Set the Standard for Crypto Treasury Management',
    description: 'We hold and deploy TON as our treasury base, allocate capital strategically, and return value to shareholders through yield, appreciation, and structured returns.',
  },
];

export default function WhatWeDo() {
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
          <div className="flex flex-col gap-6 sm:gap-8 w-full md:w-1/2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-neutral-950">
              What We Do
            </h2>
            <div className="flex flex-col gap-4 sm:gap-6">
              {services.map((service, index) => {
                const { elementRef: serviceRef, isVisible: serviceVisible } = useScrollAnimation({
                  threshold: 0.1,
                  rootMargin: '0px 0px -50px 0px',
                });
                
                return (
                <div
                  key={index}
                  ref={serviceRef as React.RefObject<HTMLDivElement>}
                  className={`flex flex-col gap-2 transition-all duration-700 ease-out ${
                    serviceVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  <h4 className="text-base sm:text-lg md:text-xl font-medium text-neutral-950">
                    {service.title}
                  </h4>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-center w-full md:w-1/2">
            <div className="relative w-full max-w-md aspect-[436/425]">
              <Image
                src="/assets/graphics/What We Do.svg"
                alt="Upward arrows and rockets graphic representing growth and upward movement"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

