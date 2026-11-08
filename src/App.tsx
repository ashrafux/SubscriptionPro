import { useLayoutEffect, useRef } from 'react';
import { initAnimations } from './animations';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Intro } from './components/Intro';
import { IntroKicker } from './components/IntroKicker';
import { Divider } from './components/Container';
import { Stats } from './components/Stats';
import { Partners } from './components/Partners';
import { Apart } from './components/Apart';
import { ApartAccordion } from './components/ApartAccordion';
import { Testimonials } from './components/Testimonials';
import { TestimonialsPortrait } from './components/TestimonialsPortrait';
import { Glance } from './components/Glance';
import { GlanceScroll } from './components/GlanceScroll';
import { Trusted } from './components/Trusted';
import { Calculator } from './components/Calculator';
import { Faq } from './components/Faq';
import { Cta } from './components/Cta';
import { CtaOrbit } from './components/CtaOrbit';
import { Footer } from './components/Footer';
import { ShellV2 } from './components/apart/Shell';
import { Hero3 } from './components/home3/Hero3';
import { Products3 } from './components/home3/Products3';
import { Intro3 } from './components/home3/Intro3';
import { Stats3 } from './components/home3/Stats3';
import { ClientLogos } from './components/home3/ClientLogos';
import { Apart3 } from './components/home3/Apart3';
import { Testimonials3 } from './components/home3/Testimonials3';
import { Calculator3 } from './components/home3/Calculator3';
import { Faq3 } from './components/home3/Faq3';
import { Cta3 } from './components/home3/Cta3';
import { Footer3 } from './components/home3/Footer3';
import type { PageId } from './pages';

/**
 * Home Three: Home One rebuilt from the review sheet. The 1M+ strip and the stats are back in improved form (rows 7–9;
 * row 19 had asked to remove them, the user chose to keep them);
 * a client-logo strip follows the products (row 20); every other section carries its row's changes.
 */
function HomeThree() {
  return (
    <ShellV2>
      <Header page="home-3" sticky />
      <main>
        <Hero3 />
        <Intro3 />
        <Divider />
        <Stats3 />
        <Divider />
        <Products3 />
        <ClientLogos />
        <Apart3 />
        <Testimonials3 />
        <Glance centered compact />
        <Divider />
        <Trusted centered pinkCta />
        <Divider />
        <Calculator3 />
        <Divider />
        <Faq3 />
        <Cta3 />
      </main>
      <Footer3 />
    </ShellV2>
  );
}

/** Home One and Home Two share this layout; Home Two's section changes branch on `page`. Home Three has its own layout. */
export default function App({ page = 'home-1' }: { page?: PageId }) {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => (root.current ? initAnimations(root.current) : undefined), []);

  return (
    <div ref={root} className="relative overflow-x-clip">
      {page === 'home-3' ? (
        <HomeThree />
      ) : (
        <>
          <Header page={page} overlay={page === 'home-2'} />
          <main>
            <Hero withHeader={page === 'home-2'} />
            {page === 'home-2' ? <IntroKicker /> : <Intro />}
            <Divider />
            <Stats />
            <Divider />
            <Partners centered={page === 'home-2'} />
            {page === 'home-2' ? <ApartAccordion /> : <Apart />}
            {page === 'home-2' ? <TestimonialsPortrait /> : <Testimonials />}
            {page === 'home-2' ? <GlanceScroll /> : <Glance />}
            <Divider />
            <Trusted centered={page === 'home-2'} pinkCta={page === 'home-2'} />
            <Divider />
            <Calculator />
            <Divider />
            <Faq />
            {page === 'home-2' ? <CtaOrbit /> : <Cta />}
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
