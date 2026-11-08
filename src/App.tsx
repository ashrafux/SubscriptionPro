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
import { Footer } from './components/Footer';
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
        {page === 'home-2' ? <IntroKicker /> : <Intro />}
        <Divider />
        <Stats />
        <Divider />
        <Partners centered={page === 'home-2'} />
        {page === 'home-2' ? <ApartAccordion /> : <Apart />}
        {page === 'home-2' ? <TestimonialsPortrait /> : <Testimonials />}
        {page === 'home-2' ? <GlanceScroll /> : <Glance />}
        <Divider />
        <Trusted centered={page === 'home-2'} />
        <Divider />
        <Calculator />
        <Divider />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
