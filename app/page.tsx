import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhatWeDo from '@/components/WhatWeDo';
import OurEdge from '@/components/OurEdge';
import InvestorRelations from '@/components/InvestorRelations';
import Leadership from '@/components/Leadership';
import NewsSection from '@/components/NewsSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen bg-neutral-950">
      <Header />
      <Hero />
      <WhatWeDo />
      <OurEdge />
      <InvestorRelations />
      <Leadership />
      <NewsSection />
      <Footer />
    </main>
  );
}

