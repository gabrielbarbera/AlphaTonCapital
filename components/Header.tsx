'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ContactMediaModal from './modals/ContactMediaModal';

export default function Header() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full h-[60px] z-[9999] bg-black/60 backdrop-blur-md">
        <nav className="max-w-[1200px] mx-auto h-full px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex items-center justify-between w-full h-full gap-4">
            <Link href="/" className="inline-block flex-shrink-0" aria-label="AlphaTON Capital Home">
              <Image
                src="/assets/logos/Primary Logo Horizontal White.svg"
                alt="AlphaTON Capital Logo"
                width={140}
                height={50}
                className="h-7 sm:h-8 md:h-10 w-auto"
                priority
              />
            </Link>

            <button
              onClick={() => setIsContactModalOpen(true)}
              className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/30 active:opacity-75 text-white font-medium text-xs sm:text-sm py-2 sm:py-1.5 px-3 sm:px-4 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:ring-offset-2 focus:ring-offset-black/60 shadow-lg shadow-violet-500/10 min-h-[36px] sm:min-h-[40px] flex items-center justify-center touch-manipulation whitespace-nowrap"
            >
              Contact Us
            </button>
          </div>
        </nav>
      </header>

      <ContactMediaModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
}

