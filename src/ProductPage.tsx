import { useLayoutEffect, useRef } from 'react';
import { initAnimations } from './animations';
import { Header } from './components/Header';
import { Faq } from './components/Faq';
import { Cta } from './components/Cta';
import { Footer } from './components/Footer';
import { ProductHero } from './components/product/ProductHero';
import { Gallery } from './components/product/Gallery';
import { Article } from './components/product/Article';
import { Pricing } from './components/product/Pricing';
import { Trust } from './components/product/Trust';

/** Product details page (Figma "Product Details Page", node 6812:1647). Content is Zoom's. */
export default function ProductPage() {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => (root.current ? initAnimations(root.current) : undefined), []);

  return (
    <div ref={root} className="relative overflow-x-clip">
      <Header />
      <main>
        <ProductHero />
        <Gallery />
        <Article />
        <Pricing />
        <div className="xl:pt-[47px] xl:pb-[132px]">
          <Faq />
        </div>
        <Trust />
        <div className="h-[30px]" />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
