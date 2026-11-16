import type { ReactNode } from 'react';
import { PillButton } from './PillButton';
import { ChatGptMark, ZoomMark } from './Brand';
import { RollIcon, RollText } from './Roll';

type Product = { name: string; logo: ReactNode; save: string };

const img = (src: string, alt: string, size: number) => (
  <img src={src} alt={alt} className="rounded-full object-cover" style={{ width: size, height: size }} />
);

const products: Product[] = [
  {
    name: 'ClickUp',
    save: '20%',
    logo: <img src="/assets/products/clickup.svg" alt="ClickUp" width={43.5703} height={52.1832} />,
  },
  { name: 'Adobe', save: '20%', logo: <img src="/assets/brands/adobe-cc.png" alt="Adobe" className="h-[54px] w-[55.08px] rounded-full object-cover" /> },
  { name: 'Zoom', save: '20%', logo: <ZoomMark size={54} /> },
  { name: 'ChatGPT', save: '20%', logo: <ChatGptMark size={54} /> },
  { name: 'Notion', save: '20%', logo: img('/assets/brands/notion.png', 'Notion', 50) },
  { name: 'Google', save: '20%', logo: img('/assets/brands/google.png', 'Google', 54) },
];

/** Light by default; the design's dark card is the hover / keyboard-focus state, shared by every card. */
function ProductCard({ name, logo, save }: Product) {
  return (
    // Outer element belongs to the scroll animation (GSAP writes its transform); hover styles live on the article.
    <div data-anim-item>
      <article className="group flex h-[340px] flex-col justify-between rounded-[20px] bg-card p-7 text-black transition-[background-color,color,transform,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:bg-forest hover:text-white hover:shadow-[0_24px_50px_rgba(18,29,18,0.25)] focus-within:-translate-y-2 focus-within:bg-forest focus-within:text-white sm:h-[420px] sm:p-8 xl:h-[468px] xl:p-[50px]">
        <div className="flex items-center gap-5 sm:gap-[29px]">
          <span className="flex size-[64px] shrink-0 items-center justify-center rounded-[15px] bg-white transition-transform duration-500 group-hover:rotate-[-8deg] sm:size-[76px] sm:rounded-[17.025px]">
            <span className="flex scale-[0.85] items-center justify-center sm:scale-100">{logo}</span>
          </span>
          <h3 className="text-[24px] leading-[1.2] font-bold tracking-[0.5909px] sm:text-[26px] xl:text-[30px]">
            {name}
            <br />
            Subscription
          </h3>
        </div>

        <div className="flex flex-col items-start gap-[27px]">
          <div className="flex flex-wrap items-center gap-x-[15px] gap-y-2">
            <p className="flex items-baseline gap-[1px]">
              <span className="text-[28px] leading-[1.35] font-bold tracking-[0.5909px] text-pink sm:text-[30px] xl:text-[35px]">$300-$500</span>
              <span className="text-[14px] leading-[1.2] text-muted transition-colors duration-500 group-hover:text-white/70 group-focus-within:text-white/70">/yr</span>
            </p>
            <span className="flex h-[39.089px] items-center rounded-[25.537px] bg-green px-4 text-[12px] font-semibold tracking-[0.1455px] whitespace-nowrap text-white">
              Save {save}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:gap-x-7">
            <a
              href="#buy"
              className="btn-roll flex items-center gap-[12.796px] rounded-full bg-black px-[39.242px] py-[17.062px] text-[17.06px] leading-[1.35] font-bold tracking-[0.5909px] text-white !duration-500 group-hover:bg-white group-hover:text-forest group-focus-within:bg-white group-focus-within:text-forest"
            >
              <RollText>Buy now</RollText>
              <RollIcon size={20.4739}>
                <span className="relative block size-[20.4739px]">
                  <img src="/assets/products/cart.svg" alt="" width={20.4739} height={20.4739} className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0 group-focus-within:opacity-0" />
                  <img src="/assets/products/cart-dark.svg" alt="" width={20.4739} height={20.4739} className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100" />
                </span>
              </RollIcon>
            </a>
            {/* tertiary: text + arrow, same label roll; colour follows the card's dark hover state */}
            <a
              href={`/product-details.html?product=${name.toLowerCase()}`}
              className="btn-roll flex items-center gap-2 text-[17.06px] leading-[1.35] font-bold tracking-[0.5909px] text-black transition-colors duration-500 group-hover:text-white group-focus-within:text-white"
            >
              <RollText>View details</RollText>
              <RollIcon size={18}>
                <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </RollIcon>
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}

/** `centered`: Home Two stacks the heading and description in the middle instead of left/right. */
export function Partners({ centered = false }: { centered?: boolean }) {
  return (
    <section id="products" className="px-5 pt-16 pb-0 md:pt-24 xl:pt-[144px]">
      <div className="mx-auto max-w-[1496px]">
        <div
          className={
            centered
              ? 'mx-auto flex max-w-[760px] flex-col items-center gap-5 text-center md:gap-6'
              : 'flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10'
          }
        >
          <h2 data-split className={`max-w-[621px] text-[34px] leading-[1.1] font-bold tracking-[0.5909px] sm:text-[44px] lg:text-[60px] ${centered ? 'text-balance' : ''}`}>
            Official Partner of Global SaaS Platforms
          </h2>
          <p
            data-anim="fade-up"
            className={`text-[17px] leading-[1.5] text-muted md:text-[20px] ${centered ? 'max-w-[560px] text-balance' : 'max-w-[352px] min-[1560px]:mr-[-27px]'}`}
          >
            Unlock partner-exclusive SaaS deals, save on renewals, and manage your stack from one dashboard.
          </p>
        </div>

        <div data-anim="stagger" data-stagger="0.1" className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-[60px] md:gap-7 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.name} {...p} />
          ))}
        </div>

        <div data-anim="fade-up" className="mt-10 flex justify-center md:mt-[74px]">
          <PillButton variant="pink" arrow>
            Explore 100+ Products
          </PillButton>
        </div>
      </div>
    </section>
  );
}
