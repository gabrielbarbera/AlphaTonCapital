import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full py-12 sm:py-16 bg-alphaton-dark">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 md:gap-12">
          <div className="flex flex-col gap-3 sm:gap-4 w-full md:w-auto">
            <Image
              src="/assets/icons/Avatar Gradient Circle.png"
              alt="AlphaTON Capital"
              width={32}
              height={32}
              className="w-8 h-8 grayscale opacity-60"
            />
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <h5 className="text-white font-medium text-sm sm:text-base">
                AlphaTON Capital Corp
              </h5>
              <div className="flex flex-col gap-1 text-xs sm:text-sm text-gray-400 leading-relaxed">
                <p>Institutional Access to Telegram&apos;s Financial Layer</p>
                <p>© 2025 ALPHATON CAPITAL</p>
                <p>All rights reserved.</p>
              </div>
            </div>
          </div>

          <nav className="flex flex-row flex-wrap gap-3 sm:gap-4 md:gap-6 w-full md:w-auto" aria-label="Footer navigation">
            <a
              href="https://www.sec.gov/edgar/browse/?CIK=1095435&owner=exclude"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors text-sm sm:text-base focus:outline-none focus:underline min-h-[44px] flex items-center touch-manipulation"
            >
              SEC Filings
            </a>
            <Link
              href="/branding"
              className="text-white hover:text-gray-300 transition-colors text-sm sm:text-base focus:outline-none focus:underline min-h-[44px] flex items-center touch-manipulation"
            >
              Branding
            </Link>
            <Link
              href="/media-kit"
              className="text-white hover:text-gray-300 transition-colors text-sm sm:text-base focus:outline-none focus:underline min-h-[44px] flex items-center touch-manipulation"
            >
              Media Kit
            </Link>
            <Link
              href="#contact"
              className="text-white hover:text-gray-300 transition-colors text-sm sm:text-base focus:outline-none focus:underline min-h-[44px] flex items-center touch-manipulation"
            >
              Contact
            </Link>
            <a
              href="mailto:info@alphatoncapital.com"
              className="text-white hover:text-gray-300 transition-colors text-sm sm:text-base focus:outline-none focus:underline min-h-[44px] flex items-center touch-manipulation"
            >
              Legal
            </a>
          </nav>

          <div className="flex flex-col gap-3 sm:gap-4 w-full md:w-auto">
            <div className="flex items-center gap-3 sm:gap-4" aria-label="Social media links">
              <Link
                href="https://x.com/AlphaTONCapital"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded p-2 -m-2 touch-manipulation"
                aria-label="X (Twitter)"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                  aria-hidden="true"
                >
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                </svg>
              </Link>
              <Link
                href="https://t.me/AlphaTONCapital"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded p-2 -m-2 touch-manipulation"
                aria-label="Telegram"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 448 512"
                  aria-hidden="true"
                >
                  <path d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z" />
                </svg>
              </Link>
              <Link
                href="https://www.linkedin.com/company/alphaton-capital/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded p-2 -m-2 touch-manipulation"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 448 512"
                  aria-hidden="true"
                >
                  <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                </svg>
              </Link>
            </div>
            <a
              href="mailto:ir@alphatoncapital.com"
              className="text-white text-sm sm:text-base hover:text-gray-300 transition-colors focus:outline-none focus:underline break-all sm:break-normal"
            >
              ir@alphatoncapital.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

