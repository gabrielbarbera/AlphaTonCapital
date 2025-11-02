"use client";

import Image from "next/image";
import { useState } from "react";
import PlaneAnimation from "./PlaneAnimation";
import ContactInvestorModal from "./modals/ContactInvestorModal";
import ContactMediaModal from "./modals/ContactMediaModal";
import SubscribeModal from "./modals/SubscribeModal";

const partners = [
  { name: "BitGo", src: "/assets/partners/bitgo.svg", width: 200, height: 40 },
  {
    name: "DWFLABS",
    src: "/assets/partners/dwflabs.png",
    width: 164,
    height: 40,
  },
  {
    name: "Kraken",
    src: "/assets/partners/kraken.svg",
    width: 164,
    height: 40,
  },
  {
    name: "Animoca Brands",
    src: "/assets/partners/animocabrands.svg",
    width: 164,
    height: 40,
  },
  {
    name: "Crypto.com",
    src: "/assets/partners/cryptocom.svg",
    width: 164,
    height: 40,
  },
  {
    name: "NASDAQ",
    src: "/assets/partners/NASDAQ_Logo.svg",
    width: 164,
    height: 40,
  },
  {
    name: "Alpha Sigma Capital",
    src: "/assets/partners/Alpha-Sigma-Capital-Logo@2x.png",
    width: 200,
    height: 56,
  },
  {
    name: "SkyBridge",
    src: "/assets/partners/Skybridge.svg",
    width: 164,
    height: 40,
  },
  {
    name: "Chardan",
    src: "/assets/partners/chardan.svg",
    width: 200,
    height: 56,
  },
  { name: "DNA", src: "/assets/partners/DNA.svg", width: 164, height: 48 },
  { name: "RSV", src: "/assets/partners/rsv.png", width: 164, height: 40 },
];

export default function Hero() {
  const [isContactMediaOpen, setIsContactMediaOpen] = useState(false);
  const [isContactInvestorOpen, setIsContactInvestorOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);

  return (
    <>
      <section className="relative w-full min-h-screen overflow-hidden bg-gradient-hero">
        <PlaneAnimation />

        <div className="relative z-[1000] max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-24 md:pt-36 md:pb-28">
          <div className="flex flex-col items-start md:items-end gap-4 sm:gap-6 w-full md:w-[70%] md:ml-auto">
            <div className="flex items-center gap-0 mb-2 md:mb-0">
              <div className="bg-white/10 backdrop-blur-md rounded-bl-lg rounded-tl-lg border-2 border-white/30 p-2 sm:p-2.5 transition-all hover:bg-white/15 hover:border-white/40">
                <h5 className="text-xs sm:text-sm font-medium text-white/70">
                  NASDAQ
                </h5>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-br-lg rounded-tr-lg border-2 border-white/40 border-l-0 p-2 sm:p-2.5 transition-all hover:bg-white/25 hover:border-white/50 shadow-lg shadow-violet-500/10">
                <h5 className="text-xs sm:text-sm font-medium text-white">
                  ATON
                </h5>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-left md:text-right text-white leading-tight sm:leading-[1.1]">
              <span className="block">A Public</span>
              <span className="block">Digital Asset</span>
              <span className="block">Company on TON</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-left md:text-right text-gray-300 leading-relaxed max-w-2xl mt-2 sm:mt-3">
              Bridging institutional capital with the
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              Telegram-based crypto ecosystem.
            </p>

            <div className="flex flex-col md:flex-row items-stretch md:items-end gap-3 sm:gap-2 w-full mt-6 sm:mt-8 md:mt-10">
              <button
                onClick={() => setIsContactMediaOpen(true)}
                className="w-full md:w-1/3 bg-gradient-cta backdrop-blur-md border border-white/20 py-3.5 sm:py-3 px-6 rounded-xl text-white text-center text-sm sm:text-base font-medium hover:opacity-90 hover:border-white/30 active:opacity-75 transition-all shadow-lg shadow-violet-500/20 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:ring-offset-2 focus:ring-offset-transparent min-h-[44px] touch-manipulation"
              >
                Contact Media Relations
              </button>

              <button
                onClick={() => setIsContactInvestorOpen(true)}
                className="w-full md:w-1/3 bg-white/10 backdrop-blur-md border border-white/20 py-3.5 sm:py-3 px-6 rounded-xl text-white hover:bg-white/20 hover:border-white/30 active:opacity-75 transition-all text-center text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:ring-offset-2 focus:ring-offset-transparent min-h-[44px] touch-manipulation"
              >
                Contact Investor Relations
              </button>

              <button
                onClick={() => setIsSubscribeOpen(true)}
                className="w-full md:w-1/3 bg-white/10 backdrop-blur-md border border-white/20 py-3.5 sm:py-3 px-6 rounded-xl text-white hover:bg-white/20 hover:border-white/30 active:opacity-75 transition-all text-center text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:ring-offset-2 focus:ring-offset-transparent min-h-[44px] touch-manipulation"
              >
                Subscribe for Updates
              </button>
            </div>

            <div className="flex flex-col items-start md:items-end gap-4 sm:gap-5 w-full mt-8 sm:mt-10 md:mt-12">
              <h3 className="text-lg sm:text-xl text-white font-medium text-left md:text-right">
                Strategic Relationships and Investors
              </h3>
              <div className="flex flex-wrap items-center justify-start md:justify-end gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-3 sm:gap-y-4 w-full">
                {partners.map((partner) => (
                  <div
                    key={partner.name}
                    className="flex items-center justify-center grayscale hover:grayscale-0 transition-all px-1"
                  >
                    <Image
                      src={partner.src}
                      alt={`${partner.name} logo`}
                      width={partner.width}
                      height={partner.height}
                      className="object-contain h-8 sm:h-10 md:h-12 w-auto max-w-[140px] sm:max-w-[180px] md:max-w-[200px]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 sm:gap-6 w-full mt-12 sm:mt-16 md:mt-20 lg:mt-28 text-white">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-left">
              Our Thesis
            </h2>

            <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-left mt-1 sm:mt-2">
              Telegram is crypto&apos;s distribution layer.
            </h3>

            <div className="flex flex-col gap-3 sm:gap-4 text-sm sm:text-base md:text-lg text-gray-300 text-left max-w-3xl mt-1 sm:mt-2">
              <p>
                With 1bn+ monthly active users, native wallets, and seamless
                onboarding, TON is positioned to bring digital assets to the
                masses. AlphaTon exists to capitalize on that moment.
              </p>
              <p>
                We acquire and build high-performance infrastructure on
                TON—staking, MEV, liquidity, and applications—and provide
                investors with direct exposure to this rapidly growing
                ecosystem.
              </p>
            </div>

            <div className="flex flex-col items-start gap-4 sm:gap-6 w-full mt-8 sm:mt-10">
              <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-left">
                Telegram by the Numbers
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 sm:gap-x-12 md:gap-x-16 gap-y-4 sm:gap-y-6 w-full mt-2">
                <div className="flex flex-col items-start gap-2">
                  <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-none">
                    Top 10
                  </span>
                  <span className="text-sm sm:text-base md:text-lg text-gray-300 mt-1">
                    App Globally
                  </span>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-none">
                    1B+
                  </span>
                  <span className="text-sm sm:text-base md:text-lg text-gray-300 mt-1">
                    Downloads
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactMediaModal
        isOpen={isContactMediaOpen}
        onClose={() => setIsContactMediaOpen(false)}
      />
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
