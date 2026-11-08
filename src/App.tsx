import { useLayoutEffect, useRef } from 'react';
import { initAnimations } from './animations';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Intro } from './components/Intro';
import { Divider } from './components/Container';
import { Stats } from './components/Stats';
import { Partners } from './components/Partners';
import { Apart } from './components/Apart';
import { Testimonials } from './components/Testimonials';
import { Glance } from './components/Glance';
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
        <Intro />
        <Divider />
        <Stats />
        <Divider />
        <Partners />
        <Apart />
        <Testimonials />
        <Glance />
        <Divider />
        <Trusted />
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
