import { useLayoutEffect, useRef } from 'react';
import { initAnimations } from './animations';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Intro } from './components/Intro';
import { Divider } from './components/Container';
import { Stats } from './components/Stats';
import { Partners } from './components/Partners';
import { Apart } from './components/Apart';
import { ApartAccordion } from './components/ApartAccordion';
import { Testimonials } from './components/Testimonials';
import { Glance } from './components/Glance';
import { GlanceScroll } from './components/GlanceScroll';
import { Trusted } from './components/Trusted';
import { Calculator } from './components/Calculator';
import { Faq } from './components/Faq';
import { Cta } from './components/Cta';
import { CtaOrbit } from './components/CtaOrbit';
import { Footer } from './components/Footer';
import { ClientLogos } from './components/home2/ClientLogos';
import { BackToTop } from './components/home2/BackToTop';
import { Testimonials3 } from './components/home2/Testimonials3';
import { Calculator3 } from './components/home2/Calculator3';
import { Footer3 } from './components/home2/Footer3';
import type { PageId } from './pages';

/** Home One and Home Two share this layout; Home Two's section changes branch on `page`. */
export default function App({ page = 'home-1' }: { page?: PageId }) {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => (root.current ? initAnimations(root.current) : undefined), []);

  return (
    <div ref={root} className="relative overflow-x-clip">
      <Header page={page} overlay={page === 'home-2'} />
      <main>
        <Hero withHeader={page === 'home-2'} />
        {page === 'home-2' ? <ClientLogos className="py-12 md:py-16 xl:pt-[88px] xl:pb-[96px]" /> : <Intro />}
        <Divider />
        <Stats />
        <Divider />
        <Partners centered={page === 'home-2'} />
        {page === 'home-2' ? <ApartAccordion /> : <Apart />}
        {page === 'home-2' ? <Testimonials3 dark /> : <Testimonials />}
        {page === 'home-2' ? <GlanceScroll /> : <Glance />}
        <Divider />
        <Trusted centered={page === 'home-2'} pinkCta={page === 'home-2'} />
        <Divider />
        {page === 'home-2' ? <Calculator3 plain /> : <Calculator />}
        <Divider />
        <Faq seeMore={page === 'home-2'} />
        {page === 'home-2' ? <CtaOrbit /> : <Cta />}
      </main>
      {page === 'home-2' ? <Footer3 /> : <Footer />}
      {page === 'home-2' && <BackToTop />}
    </div>
  );
}
