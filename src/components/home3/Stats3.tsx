import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ChatGptMark, ZoomMark } from '../Brand';

/* Home Three stats (review rows 8 + 9):
   - every card uses the same layout — a clear label, the count, one line saying what it means — all aligned top-left
   - animated: counts run up (data-count), cards stagger in, the product logos orbit, the 3D icons float,
     and the 40% card fills its bar when it scrolls into view. */

function Label({ children, dot }: { children: ReactNode; dot: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-[12px] font-semibold tracking-[0.1em] text-[#3c4650] uppercase backdrop-blur">
      <span className="size-2 rounded-full" style={{ background: dot }} />
      {children}
    </span>
  );
}

function Count({ value, className = '' }: { value: string; className?: string }) {
  return (
    <p data-count className={`font-bold tracking-[0.5px] text-[#14141f] tabular-nums ${className}`}>
      {value}
    </p>
  );
}

const ICON = 'stats3-float pointer-events-none absolute object-contain opacity-60';

const orbitInner: ReactNode[] = [
  <img key="g" src="/assets/brands/google.png" alt="" className="size-7 object-contain" />,
  <img key="n" src="/assets/brands/notion.png" alt="" className="size-7 object-contain" />,
  <img key="c" src="/assets/stats/clickup.svg" alt="" className="h-7 w-6 object-contain" />,
  <ChatGptMark key="o" size={26} />,
];
const orbitOuter: ReactNode[] = [
  <img key="a" src="/assets/brands/adobe-cc.png" alt="" className="size-8 object-contain" />,
  <img key="v" src="/assets/brands/canva.png" alt="" className="size-8 object-contain" />,
  <ZoomMark key="z" size={30} />,
  <img key="m" src="/assets/brands/microsoft365.png" alt="" className="size-8 object-contain" />,
  <img key="g2" src="/assets/brands/google.png" alt="" className="size-7 object-contain" />,
];

function Orbit({ items, r, dur, rev = false, tile }: { items: ReactNode[]; r: number; dur: number; rev?: boolean; tile: number }) {
  return (
    <div className="absolute top-1/2 left-1/2" style={{ width: r * 2, height: r * 2, marginLeft: -r, marginTop: -r }}>
      <div className="absolute inset-0 rounded-full border border-white/35" />
      <div className="stats3-spin absolute inset-0" style={{ animationDuration: `${dur}s`, animationDirection: rev ? 'reverse' : 'normal' }}>
        {items.map((it, i) => {
          const a = (i / items.length) * Math.PI * 2;
          return (
            <div key={i} className="absolute" style={{ left: r + Math.cos(a) * r - tile / 2, top: r + Math.sin(a) * r - tile / 2 }}>
              {/* counter-rotate so logos stay upright */}
              <div
                className="stats3-spin flex items-center justify-center rounded-[12px] bg-white shadow-[0_8px_18px_-8px_rgba(20,20,80,0.45)]"
                style={{ width: tile, height: tile, animationDuration: `${dur}s`, animationDirection: rev ? 'normal' : 'reverse' }}
              >
                {it}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DiscountBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="mt-3 h-2 w-full max-w-[220px] overflow-hidden rounded-full bg-white/80">
      <div className="h-full rounded-full bg-[linear-gradient(90deg,#7cc96b,#2f9e63)] transition-[width] delay-300 duration-[1600ms] ease-out" style={{ width: on ? '40%' : '0%' }} />
    </div>
  );
}

export function Stats3() {
  return (
    <section className="px-5 py-16 md:py-24 xl:py-[130px]">
      <style>{`
        @keyframes stats3-spin { to { transform: rotate(360deg); } }
        .stats3-spin { animation: stats3-spin linear infinite; }
        @keyframes stats3-float { 0%,100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-10px) rotate(-4deg); } }
        .stats3-float { animation: stats3-float 5.5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .stats3-spin, .stats3-float { animation: none; } }
      `}</style>
      <div className="mx-auto flex max-w-[846px] flex-col items-center gap-5 text-center md:gap-6">
        <h2 data-split className="text-[34px] leading-[1.1] font-bold tracking-[0.5909px] text-balance sm:text-[44px] lg:text-[56px]">
          Number comes after hardwork &amp; it doesn’t Tell a Lie
        </h2>
        <p data-anim="fade-up" className="max-w-[585px] text-[17px] leading-[1.5] text-balance text-muted md:text-[19px]">
          Every number here reflects our journey helping tech companies &amp; people grow smarter and faster.
        </p>
      </div>

      <div data-anim="stagger" data-stagger="0.12" className="mx-auto mt-10 grid max-w-[1496px] gap-5 md:mt-14 md:grid-cols-2 md:gap-6 lg:grid-cols-[1fr_2fr_1fr]">
        {/* Customers */}
        <div data-anim-item className="relative h-[320px] overflow-hidden rounded-[22px] bg-stat-blue p-8 transition-transform duration-500 hover:-translate-y-1.5 sm:h-[388px] sm:p-10">
          <Label dot="#3148ea">Customers</Label>
          <Count value="50K+" className="mt-5 text-[52px] leading-none sm:text-[60px]" />
          <p className="mt-3 max-w-[230px] text-[17px] leading-[1.45] text-[#3c4650]">teams already saving on premium SaaS</p>
          <img src="/assets/stats/savings-wallet.png" alt="" className={`${ICON} right-6 bottom-6 size-[120px] sm:size-[150px]`} />
        </div>

        {/* Products */}
        <div data-anim-item className="relative h-[460px] overflow-hidden rounded-[22px] bg-stat-indigo p-8 text-white transition-transform duration-500 hover:-translate-y-1.5 sm:h-[388px] sm:p-10 md:order-last md:col-span-2 lg:order-none lg:col-span-1">
          {/* orbit: below the copy on phones and on the narrow lg card, beside it where the card is wide */}
          <div
            aria-hidden
            className="absolute top-[70%] left-1/2 size-[440px] -translate-x-1/2 -translate-y-1/2 scale-[0.56] sm:top-1/2 sm:left-[calc(100%-210px)] sm:scale-[0.84] lg:top-[68%] lg:left-[calc(100%-112px)] lg:scale-[0.5] xl:top-1/2 xl:left-[calc(100%-230px)] xl:scale-[0.88]"
          >
            <Orbit items={orbitInner} r={110} dur={36} tile={48} />
            <Orbit items={orbitOuter} r={190} dur={52} rev tile={54} />
            <div className="absolute top-1/2 left-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/25 blur-xl" />
          </div>
          <div className="relative">
            <Label dot="#ffffff">SaaS products</Label>
            <Count value="100+" className="mt-5 text-[56px] leading-none !text-white sm:text-[70px]" />
            <p className="mt-3 max-w-[240px] text-[17px] leading-[1.45] text-white/80">official partner tools in one marketplace</p>
          </div>
        </div>

        <div data-anim-item className="grid gap-5 md:gap-6">
          {/* Saved */}
          <div className="relative h-[182px] overflow-hidden rounded-[22px] bg-stat-lilac px-7 py-6 transition-transform duration-500 hover:-translate-y-1.5 sm:px-9">
            <Label dot="#8b5cf6">Saved so far</Label>
            <Count value="$2M+" className="mt-3 text-[40px] leading-none" />
            <p className="mt-2 text-[15.5px] text-[#3c4650]">in renewal costs for our customers</p>
            <img src="/assets/stats/projects-folder.png" alt="" className={`${ICON} top-4 right-4 size-[72px] lg:max-xl:hidden`} style={{ animationDelay: '-1.8s' }} />
          </div>
          {/* Discount */}
          <div className="relative h-[182px] overflow-hidden rounded-[22px] bg-stat-lime px-7 py-6 transition-transform duration-500 hover:-translate-y-1.5 sm:px-9">
            <Label dot="#2f9e63">Max discount</Label>
            <Count value="40%" className="mt-3 text-[40px] leading-none" />
            <p className="mt-2 text-[15.5px] text-[#3c4650]">off list price on every renewal</p>
            <DiscountBar />
            <img src="/assets/stats/discount-percent.png" alt="" className={`${ICON} top-4 right-4 size-[72px] lg:max-xl:hidden`} style={{ animationDelay: '-3.2s' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
