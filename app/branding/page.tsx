import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BrandingHero from '@/components/branding/BrandingHero';
import LogoSystem from '@/components/branding/LogoSystem';
import UsageGuidelines from '@/components/branding/UsageGuidelines';
import ColorGuidelines from '@/components/branding/ColorGuidelines';
import TypographySystem from '@/components/branding/TypographySystem';
import BackgroundImagery from '@/components/branding/BackgroundImagery';
import SocialBanners from '@/components/branding/SocialBanners';
import AvatarsIcons from '@/components/branding/AvatarsIcons';
import BrandApplication from '@/components/branding/BrandApplication';
import MediaKitAssets from '@/components/branding/MediaKitAssets';

export const metadata: Metadata = {
  title: 'Branding Guide | AlphaTON Capital',
  description: 'AlphaTON Capital branding guide, logo system, color guidelines, and media kit downloads.',
  openGraph: {
    title: 'Branding Guide | AlphaTON Capital',
    description: 'AlphaTON Capital branding guide, logo system, color guidelines, and media kit downloads.',
  },
};

export default function BrandingPage() {
  return (
    <main className="flex flex-col w-full min-h-screen">
      <Header />
      <BrandingHero />
      <LogoSystem />
      <UsageGuidelines />
      <ColorGuidelines />
      <TypographySystem />
      <BackgroundImagery />
      <SocialBanners />
      <AvatarsIcons />
      <BrandApplication />
      <MediaKitAssets />
      <Footer />
    </main>
  );
}

