import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://alphatoncapital.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AlphaTON Capital",
  description: "A Public Digital Asset Company on TON - Bridging institutional capital with the Telegram-based crypto ecosystem.",
  keywords: ["AlphaTON Capital", "TON", "Telegram", "Cryptocurrency", "Digital Assets", "Blockchain", "NASDAQ", "ATON"],
  authors: [{ name: "AlphaTON Capital" }],
  creator: "AlphaTON Capital",
  publisher: "AlphaTON Capital",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: "/assets/icons/Avatar Gradient Icon.png",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/assets/icons/Avatar Gradient Icon.png",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "AlphaTON Capital",
    title: "AlphaTON Capital - A Public Digital Asset Company on TON",
    description: "Bridging institutional capital with the Telegram-based crypto ecosystem. A public digital asset company on TON.",
    images: [
      {
        url: "/assets/media_kit/AlphaTon Social Banners/social.jpg",
        alt: "AlphaTON Capital - A Public Digital Asset Company on TON",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AlphaTON Capital",
    description: "A Public Digital Asset Company on TON - Bridging institutional capital with the Telegram-based crypto ecosystem.",
    images: [
      {
        url: "/assets/media_kit/AlphaTon Social Banners/Twitter header - 1.jpg",
        alt: "AlphaTON Capital - A Public Digital Asset Company on TON",
      },
    ],
    creator: "@AlphaTONCapital",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

