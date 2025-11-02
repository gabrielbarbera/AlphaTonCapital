'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import ContactInvestorModal from './modals/ContactInvestorModal';
import SubscribeModal from './modals/SubscribeModal';

const investorCards = [
  { 
    title: 'Join The Newsletter', 
    action: 'subscribe',
    icon: '/assets/icons/svgexport-37.svg',
    iconWidth: 33,
    iconHeight: 32,
  },
  { 
    title: 'Contact Investor Relations', 
    action: 'contact-investor',
    icon: '/assets/icons/svgexport-38.svg',
    iconWidth: 35,
    iconHeight: 34,
  },
  { 
    title: 'Stock Quote', 
    action: 'stock-quote',
    icon: '/assets/icons/svgexport-38.svg',
    iconWidth: 35,
    iconHeight: 34,
  },
];

export default function InvestorRelations() {
  const [isContactInvestorOpen, setIsContactInvestorOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);

  const handleCardClick = (action: string) => {
    if (action === 'subscribe') {
      setIsSubscribeOpen(true);
    } else if (action === 'contact-investor') {
      setIsContactInvestorOpen(true);
    } else if (action === 'stock-quote') {
      window.open('https://www.nasdaq.com/market-activity/stocks/aton', '_blank');
    }
  };

  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
  });

  return (
    <>
    <section
      id="investor-relations"
      ref={elementRef}
      className={`w-full py-16 md:py-24 bg-gradient-investor transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 sm:gap-12 md:gap-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-white">
          Investor Relations
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 w-full">
          {investorCards.map((card, index) => {
            const { elementRef: cardRef, isVisible: cardVisible } = useScrollAnimation({
              threshold: 0.1,
              rootMargin: '0px 0px -50px 0px',
            });
            
            return (
            <button
              key={index}
              ref={cardRef as React.RefObject<HTMLButtonElement>}
              onClick={() => handleCardClick(card.action)}
              className={`flex flex-col items-start justify-between gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 active:opacity-75 transition-all text-left min-h-[180px] sm:h-[200px] shadow-lg shadow-violet-500/5 hover:shadow-violet-500/10 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:ring-offset-2 focus:ring-offset-alphaton-dark w-full duration-700 ease-out touch-manipulation ${
                cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <span className="text-base sm:text-lg md:text-xl text-white font-medium">{card.title}</span>
              <Image
                src={card.icon}
                alt=""
                width={card.iconWidth}
                height={card.iconHeight}
                className="w-auto h-8 opacity-90"
                aria-hidden="true"
              />
            </button>
            );
          })}
        </div>
      </div>

    </section>

    <ContactInvestorModal
      isOpen={isContactInvestorOpen}
      onClose={() => setIsContactInvestorOpen(false)}
    />
    <SubscribeModal
      isOpen={isSubscribeOpen}
      onClose={() => setIsSubscribeOpen(false)}
    />
    </>
  );
}

