import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Band, BandInner } from '../Container';

/* Testimonial slider (originally built for the review sheet, rows 12 + 23; Home Two uses the dark mode):
   - new, softer background instead of the royal-blue grid
   - three cards in a row; the rest slide in as the next page (arrows, dots, auto-advance, swipe)
   - justified quotes, star rating, and the customer block highlighted at the bottom of each card.
   Quotes and names are sample copy. */

type T = { quote: string; name: string; role: string; logo: string; photo: string };
const items: T[] = [
  { quote: 'We moved fourteen renewals onto SubscriptionPro and cut our yearly SaaS bill by almost a third. Finance finally has one invoice to reconcile every month.', name: 'Martin Iyooh', role: 'Tech Influencer, South Africa', logo: '/assets/products/clickup.svg', photo: '/assets/intro/user2.png' },
  { quote: 'Same Google Workspace licenses and the same support we had before, just cheaper every single year. Switching took one afternoon.', name: 'Sara Lindqvist', role: 'Ops Lead, Nordlab', logo: '/assets/brands/google.png', photo: '/assets/testimonials/sara.jpg' },
  { quote: 'The renewal alerts alone paid for themselves. No more surprise charges on a company card that nobody remembers owning.', name: 'Daniel Okafor', role: 'Founder, Brightdesk', logo: '/assets/brands/canva.png', photo: '/assets/intro/user1.png' },
  { quote: 'Buying Adobe seats for a forty-person studio used to take a week of back-and-forth with sales. Now it is two clicks and the seats are live.', name: 'Priya Raman', role: 'Studio Manager, Fold', logo: '/assets/brands/adobe-cc.png', photo: '/assets/testimonials/priya.jpg' },
  { quote: 'One dashboard for every tool, seat and renewal date. In the first month I cancelled three apps we were quietly paying for twice.', name: 'Tom Becker', role: 'IT Admin, Hausmann', logo: '/assets/brands/notion.png', photo: '/assets/testimonials/tom.jpg' },
  { quote: 'Our Microsoft 365 seats renew on time from the wallet, with the discount applied automatically. It is the least stressful line in our budget.', name: 'Rahul Mehta', role: 'CTO, Kitepoint', logo: '/assets/brands/microsoft365.png', photo: '/assets/intro/user3.png' },
];

const Stars = () => (
  <span className="flex gap-[3px] text-[#f5a524]" aria-label="Rated 5 out of 5">
    {Array.from({ length: 5 }, (_, i) => (
      <svg key={i} viewBox="0 0 20 20" className="size-[17px]" fill="currentColor" aria-hidden>
        <path d="M10 1.8l2.5 5.2 5.7.8-4.1 4 1 5.7L10 14.8l-5.1 2.7 1-5.7-4.1-4 5.7-.8z" />
      </svg>
    ))}
  </span>
);

function Card({ t, dark }: { t: T; dark: boolean }) {
  return (
    <figure className={`flex h-full flex-col overflow-hidden rounded-[22px] transition-transform duration-500 hover:-translate-y-1.5 ${dark ? 'bg-[#15151f] ring-1 ring-white/10' : 'bg-white shadow-[0_24px_50px_-30px_rgba(30,40,120,0.35)] ring-1 ring-[#e6e9f5]'}`}>
      <div className="flex flex-1 flex-col p-7 md:p-8">
        <div className="flex items-center justify-between">
          <Stars />
          <span className={`flex size-10 items-center justify-center rounded-[12px] ${dark ? 'bg-white' : 'bg-[#f5f6fb]'}`}>
            <img src={t.logo} alt="" className="size-[22px] object-contain" />
          </span>
        </div>
        <blockquote className={`mt-6 text-left text-[16.5px] leading-[1.7] md:text-[17px] ${dark ? 'text-pretty text-white/80' : 'text-[#3c4650] md:text-justify'}`}>“{t.quote}”</blockquote>
      </div>
      {/* highlighted customer block */}
      <figcaption className={`flex items-center gap-4 border-t px-7 py-5 md:px-8 ${dark ? 'border-white/10 bg-[#1c1c28]' : 'border-[#eef0f6] bg-[linear-gradient(90deg,#f6f4ff,#fdf3f9)]'}`}>
        <img src={t.photo} alt="" className={`size-[54px] shrink-0 rounded-full object-cover ${dark ? 'ring-[#15151f]' : 'ring-white'} ring-[3px] shadow-[0_4px_12px_rgba(30,40,120,0.18)]`} />
        <span className="min-w-0 flex-1">
          <span className={`block font-poppins text-[17px] font-semibold ${dark ? 'text-white' : 'text-[#14141f]'}`}>{t.name}</span>
          <span className={`block font-poppins text-[13px] ${dark ? 'text-white/60' : 'text-[#6d7e8a]'}`}>{t.role}</span>
        </span>
        <span className={`hidden items-center gap-1 rounded-full px-2.5 py-1 text-[11.5px] font-semibold sm:flex ${dark ? 'bg-white/10 text-[#6ee7b7]' : 'bg-white text-[#0f8a5f]'}`}>
          <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
          Verified
        </span>
      </figcaption>
    </figure>
  );
}

const perViewFor = (w: number) => (w >= 1024 ? 3 : w >= 680 ? 2 : 1);

/** `dark`: Home Two — same slider on the rich-black band with logo-colour glows. */
export function Testimonials3({ dark = false }: { dark?: boolean }) {
  const [perView, setPerView] = useState(3);
  const [page, setPage] = useState(0);
  const [hover, setHover] = useState(false);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const pages = Math.ceil(items.length / perView);

  useLayoutEffect(() => {
    const el = viewport.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setPerView(perViewFor(window.innerWidth)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  useEffect(() => setPage((p) => Math.min(p, pages - 1)), [pages]);

  // slide to the page (the last page aligns its last card to the right edge, so a page of 2 never leaves a gap)
  useLayoutEffect(() => {
    const vp = viewport.current;
    const tr = track.current;
    if (!vp || !tr) return;
    const cards = tr.children;
    const first = Math.min(page * perView, items.length - perView);
    const target = cards[Math.max(0, first)] as HTMLElement | undefined;
    gsap.to(tr, { x: -(target?.offsetLeft ?? 0), duration: 0.8, ease: 'power3.inOut', overwrite: true });
  }, [page, perView]);

  useEffect(() => {
    if (hover || pages < 2) return;
    const t = window.setTimeout(() => setPage((p) => (p + 1) % pages), 7000);
    return () => window.clearTimeout(t);
  }, [page, hover, pages]);

  // swipe
  const startX = useRef<number | null>(null);
  const go = (d: number) => setPage((p) => (p + d + pages) % pages);

  return (
    <Band
      outer="mt-5"
      className={`py-16 md:py-24 xl:pt-[130px] xl:pb-[120px] ${dark ? '' : 'bg-[#eef1ff]'}`}
      style={
        dark
          ? { backgroundColor: '#0b0b12' } // solid rich black, no glows or grid
          : {
              backgroundImage:
                'radial-gradient(60% 50% at 0% 0%, rgba(225,90,171,0.12), transparent 70%), radial-gradient(55% 60% at 100% 100%, rgba(49,72,234,0.14), transparent 70%)',
            }
      }
    >
      <BandInner>
        <div className="flex flex-col items-center text-center">
          <span data-anim="scale-in" className={`rounded-full px-4 py-1.5 text-[13px] font-semibold tracking-[0.12em] uppercase ${dark ? 'bg-white/10 text-white ring-1 ring-white/15' : 'bg-white text-royal shadow-[0_4px_14px_-6px_rgba(49,72,234,0.35)]'}`}>
            Testimonials
          </span>
          <h2 data-split className={`mt-5 max-w-[760px] text-[34px] leading-[1.1] font-bold tracking-[0.5909px] text-balance sm:text-[44px] lg:text-[56px] ${dark ? 'text-white' : 'text-[#14141f]'}`}>
            Globally Brilliant always wants to save cost by us
          </h2>
          <p data-anim="fade-up" className={`mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[16px] ${dark ? 'text-white/65' : 'text-[#5d6b75]'}`}>
            <Stars /> <b className={dark ? 'text-white' : 'text-[#14141f]'}>4.9/5</b> from 12,000+ verified reviews
          </p>
        </div>

        <div
          data-anim="fade-up"
          className="mx-auto mt-10 max-w-[1420px] md:mt-14"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onPointerDown={(e) => (startX.current = e.clientX)}
          onPointerUp={(e) => {
            if (startX.current === null) return;
            const d = e.clientX - startX.current;
            if (Math.abs(d) > 50) go(d < 0 ? 1 : -1);
            startX.current = null;
          }}
        >
          <div ref={viewport} className="-my-8 overflow-hidden py-8">
            <div ref={track} className="flex gap-6">
              {items.map((t) => (
                <div key={t.name} className="shrink-0 grow-0" style={{ flexBasis: `calc((100% - ${(perView - 1) * 24}px) / ${perView})` }}>
                  <Card t={t} dark={dark} />
                </div>
              ))}
            </div>
          </div>

          {dark ? (
            /* dark (Home Two): two square outline arrows only, no dots */
            <div className="mt-8 flex items-center justify-center gap-3 md:mt-10">
              {[
                { d: -1, label: 'Previous testimonials', path: 'M19 12H5M11 6l-6 6 6 6' },
                { d: 1, label: 'Next testimonials', path: 'M5 12h14M13 6l6 6-6 6' },
              ].map((b) => (
                <button
                  key={b.d}
                  type="button"
                  onClick={() => go(b.d)}
                  aria-label={b.label}
                  className="flex h-12 w-16 items-center justify-center rounded-[14px] border border-white/20 bg-[#15151f] text-white transition duration-300 hover:border-white hover:bg-white hover:text-[#0b0b12]"
                >
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d={b.path} />
                  </svg>
                </button>
              ))}
            </div>
          ) : (
          <div className="mt-8 flex items-center justify-center gap-6 md:mt-10">
              <button type="button" onClick={() => go(-1)} aria-label="Previous testimonials" className={`flex size-12 items-center justify-center rounded-full transition ${dark ? 'bg-white/10 text-white ring-1 ring-white/15 hover:bg-white hover:text-[#14141f]' : 'bg-white text-[#14141f] shadow-[0_6px_18px_-8px_rgba(30,40,120,0.35)] hover:bg-[#14141f] hover:text-white'}`}>
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M15 6l-6 6 6 6" />
                </svg>
              </button>
              <div className="flex gap-2">
                {Array.from({ length: pages }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Page ${i + 1}`}
                    aria-current={i === page}
                    onClick={() => setPage(i)}
                    className={`h-2.5 rounded-full transition-all duration-500 ${i === page ? (dark ? 'w-8 bg-pink' : 'w-8 bg-royal') : dark ? 'w-2.5 bg-white/25 hover:bg-white/45' : 'w-2.5 bg-[#c9cfee] hover:bg-[#a9b2e6]'}`}
                  />
                ))}
              </div>
              <button type="button" onClick={() => go(1)} aria-label="Next testimonials" className={`flex size-12 items-center justify-center rounded-full transition ${dark ? 'bg-white text-[#14141f] hover:bg-pink hover:text-white' : 'bg-[#14141f] text-white shadow-[0_6px_18px_-8px_rgba(30,40,120,0.35)] hover:bg-royal'}`}>
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </BandInner>
    </Band>
  );
}
