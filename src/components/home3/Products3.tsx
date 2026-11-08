import type { ReactNode } from 'react';
import { PillButton } from '../PillButton';
import { ChatGptMark, ZoomMark } from '../Brand';
import { RollIcon, RollText } from '../Roll';

/* Home Three "Official Partner of Global SaaS Platforms":
   centred, balanced title + subtitle; product cards follow the review mockup —
   one-line description, price + savings chip, "View Details" (primary) and "Buy Now" (secondary). */

type P = { name: string; desc: string; logo: ReactNode; price: string; save: string; tint: string };
const img = (src: string, s = 52) => <img src={src} alt="" className="rounded-[10px] object-contain" style={{ width: s, height: s }} />;

const products: P[] = [
  { name: 'ClickUp', desc: 'Tasks, docs and goals for every team in one workspace.', logo: <img src="/assets/products/clickup.svg" alt="" width={40} height={48} />, price: '$300–$500', save: '20%', tint: '#f3e8ff' },
  { name: 'Adobe', desc: 'Creative Cloud apps for design, video and photo teams.', logo: img('/assets/brands/adobe-cc.png'), price: '$600–$900', save: '15%', tint: '#ffe4ec' },
  { name: 'Zoom', desc: 'Video meetings for your team with secure, reliable access.', logo: <ZoomMark size={52} />, price: '$150–$250', save: '20%', tint: '#e0ecff' },
  { name: 'ChatGPT', desc: 'Team and Enterprise seats with admin controls built in.', logo: <ChatGptMark size={50} />, price: '$300–$600', save: '10%', tint: '#e3f6ee' },
  { name: 'Notion', desc: 'Wikis, docs and projects your whole company can share.', logo: img('/assets/brands/notion.png', 46), price: '$96–$180', save: '20%', tint: '#efefef' },
  { name: 'Google', desc: 'Workspace email, storage and meetings on your domain.', logo: img('/assets/brands/google.png', 48), price: '$168–$264', save: '16%', tint: '#fff4d6' },
];

function Card({ p }: { p: P }) {
  return (
    <div data-anim-item>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-[#eef0f4] bg-[#f7f8fb] p-7 transition-[transform,box-shadow,background-color] duration-500 ease-out hover:-translate-y-2 hover:bg-white hover:shadow-[0_30px_60px_-28px_rgba(20,20,60,0.35)] sm:p-8 xl:p-9">
        {/* soft colour blob, as in the mockup */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-16 -right-16 size-56 rounded-full opacity-70 blur-2xl transition-transform duration-700 group-hover:scale-125"
          style={{ background: `radial-gradient(circle, ${p.tint}, transparent 70%)` }}
        />
        <div className="relative flex items-center gap-5">
          <span className="flex size-[72px] shrink-0 items-center justify-center rounded-[18px] bg-white shadow-[0_6px_18px_-8px_rgba(20,20,60,0.18)] transition-transform duration-500 group-hover:-rotate-6">
            {p.logo}
          </span>
          <h3 className="leading-[1.2]">
            <span className="block text-[26px] font-bold text-[#14141f] xl:text-[28px]">{p.name}</span>
            <span className="block text-[18px] font-medium text-[#6d7e8a] xl:text-[20px]">Subscription</span>
          </h3>
        </div>
        <p className="relative mt-6 text-[16px] leading-[1.55] text-pretty text-[#5d6b75] xl:text-[17px]">{p.desc}</p>
        <div className="relative mt-auto flex items-center justify-between gap-4 pt-8">
          <p className="flex items-baseline gap-1">
            <span className="text-[28px] font-bold tracking-[0.3px] text-pink xl:text-[32px]">{p.price}</span>
            <span className="text-[14px] text-muted">/yr</span>
          </p>
          <span className="rounded-full bg-[#dcf6ea] px-3 py-1.5 text-[13px] font-semibold whitespace-nowrap text-[#0f8a5f]">Save {p.save}</span>
        </div>
        <div className="relative mt-6 grid grid-cols-2 gap-2 sm:gap-3">
          <a
            href={`#product-${p.name.toLowerCase()}`}
            className="btn-roll flex items-center justify-center gap-2 rounded-full bg-[#14141f] px-3 py-[14px] text-[14px] font-semibold whitespace-nowrap text-white hover:bg-black sm:px-4 sm:text-[15px] xl:text-[16px]"
          >
            <RollText>View Details</RollText>
            <RollIcon size={16}>
              <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </RollIcon>
          </a>
          <a
            href="#buy"
            className="btn-roll flex items-center justify-center gap-2 rounded-full border-[1.5px] border-[#c9ccd6] bg-white px-3 py-[13px] text-[14px] font-semibold whitespace-nowrap text-[#14141f] transition-colors hover:border-[#14141f] sm:px-4 sm:text-[15px] xl:text-[16px]"
          >
            <RollText>Buy Now</RollText>
            <RollIcon size={17}>
              <svg viewBox="0 0 24 24" width={17} height={17} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M3 4h2.5l2.2 10.5h10.6L20.5 7H7M9.5 19.5a1 1 0 1 0 0 .01M17 19.5a1 1 0 1 0 0 .01" />
              </svg>
            </RollIcon>
          </a>
        </div>
      </article>
    </div>
  );
}

export function Products3() {
  return (
    <section id="products" className="px-5 pt-16 md:pt-24 xl:pt-[130px]">
      <div className="mx-auto max-w-[1496px]">
        <div className="mx-auto flex max-w-[760px] flex-col items-center gap-5 text-center md:gap-6">
          <h2 data-split className="text-[34px] leading-[1.1] font-bold tracking-[0.5909px] text-balance sm:text-[44px] lg:text-[60px]">
            Official Partner of Global SaaS Platforms
          </h2>
          <p data-anim="fade-up" className="max-w-[560px] text-[17px] leading-[1.5] text-balance text-muted md:text-[20px]">
            Unlock partner-exclusive SaaS deals, save on renewals, and manage your stack from one dashboard.
          </p>
        </div>

        <div data-anim="stagger" data-stagger="0.08" className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-14 md:gap-6 lg:grid-cols-3">
          {products.map((p) => (
            <Card key={p.name} p={p} />
          ))}
        </div>

        <div data-anim="fade-up" className="mt-10 flex justify-center md:mt-14">
          <PillButton variant="pink" arrow>
            Explore 100+ Products
          </PillButton>
        </div>
      </div>
    </section>
  );
}
