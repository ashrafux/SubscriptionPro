import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TiltBadge } from './Badge';
import { BandInner } from './Container';
import { features } from './apart/features';
import { FeatureVisual } from './apart/FeatureVisual';

gsap.registerPlugin(ScrollTrigger);

/** Must match the `pin:` variant in index.css. */
const PIN_QUERY = '(min-width: 1024px) and (min-height: 680px)';
const STEPS = features.length - 1;
const pad = (i: number) => String(i + 1).padStart(2, '0');
const stateOf = (i: number, active: number) => (i === active ? 'active' : i < active ? 'past' : 'next');

function Points({ points, className = '' }: { points: readonly string[]; className?: string }) {
  return (
    <ul className={`flex flex-col gap-3 text-[16px] leading-[1.45] text-black/70 ${className}`}>
      {points.map((t) => (
        <li key={t} className="flex items-center gap-4">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white">
            <svg viewBox="0 0 24 24" className="size-[15px] text-black" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
          </span>
          {t}
        </li>
      ))}
    </ul>
  );
}

export function Apart() {
  const [active, setActive] = useState(0);
  const pinRef = useRef<HTMLElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [numTop, setNumTop] = useState(0);

  // Keep the big number level with the active heading (re-measured on resize, since sizes use vh).
  useLayoutEffect(() => {
    const ul = listRef.current;
    if (!ul) return;
    const measure = () => {
      const btn = ul.querySelectorAll('button')[active];
      if (btn) setNumTop(btn.offsetTop + btn.offsetHeight / 2 - 28);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(ul);
    return () => ro.disconnect();
  }, [active]);

  // Pin the whole card in the viewport; scrolling steps through the six features, snapping one per scroll.
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(PIN_QUERY, () => {
      stRef.current = ScrollTrigger.create({
        trigger: pinRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * 0.75 * STEPS}`,
        pin: true,
        anticipatePin: 1,
        snap: { snapTo: 1 / STEPS, duration: { min: 0.3, max: 0.7 }, delay: 0.08, ease: 'power2.inOut' },
        onUpdate: (self) => setActive(Math.round(self.progress * STEPS)),
      });
      return () => {
        stRef.current = null;
      };
    });
    return () => mm.revert();
  }, []);

  const goTo = (i: number) => {
    const st = stRef.current;
    if (!st) return setActive(i);
    window.scrollTo({ top: st.start + ((st.end - st.start) * i) / STEPS, behavior: 'smooth' });
  };

  return (
    <div className="mt-16 md:mt-24 xl:mt-[172px]">
      <section ref={pinRef} data-pin className="px-5 pin:h-svh pin:py-5">
        <div
          data-anim="card"
          className="relative mx-auto flex max-w-[1880px] flex-col overflow-hidden rounded-[20px] bg-apart py-16 md:py-24 pin:h-full pin:py-[clamp(28px,5.5vh,72px)]"
        >
          <BandInner className="flex min-h-0 flex-1 flex-col">
            {/* Heading */}
            <div className="mx-auto flex max-w-[621px] flex-col items-center gap-5 text-center md:gap-7 pin:gap-[clamp(12px,2.4vh,28px)]">
              <div className="relative flex flex-col items-center">
                <h2
                  data-split
                  className="text-[34px] leading-[1.1] font-bold tracking-[0.5909px] sm:text-[44px] pin:text-[min(60px,5.6vh)] pin:leading-[1.13]"
                >
                  What Sets <br />
                  SubscriptionPro Apart
                </h2>
                <TiltBadge className="order-first mb-3 bg-mint !px-3 !py-1 !text-[12px] sm:absolute sm:top-[8px] sm:left-[calc(50%+86px)] sm:mb-0 pin:top-[1.6vh] pin:left-[calc(50%+min(124px,11.5vh))] lg:!px-[18px] lg:!py-[6px] lg:!text-[14px]">
                  Why choose
                </TiltBadge>
              </div>
              <p data-anim="fade-up" className="max-w-[529px] text-[16px] leading-[1.45] text-black/70">
                Unlock partner-exclusive SaaS deals, save on renewals, and manage your stack from one dashboard.
              </p>
            </div>

            {/* Pinned stepper (wide, tall screens) */}
            <div className="mx-auto mt-[clamp(24px,5vh,68px)] hidden min-h-0 w-full max-w-[1487px] flex-1 grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-x-10 pin:grid 2xl:grid-cols-[636px_minmax(0,1fr)] 2xl:gap-x-[126px]">
              <div className="relative self-start pl-[clamp(72px,7vw,127px)]">
                {/* active number: sits level with the active heading and rolls to the new digit as it moves */}
                <span
                  aria-hidden
                  className="absolute left-0 h-[56px] overflow-hidden text-[min(44px,4.6vh)] leading-[56px] font-light text-[#6d1b62] transition-[top] duration-700 ease-[cubic-bezier(.62,.05,.32,1)]"
                  style={{ top: numTop }}
                >
                  <span className="block transition-transform duration-700 ease-[cubic-bezier(.62,.05,.32,1)]" style={{ transform: `translateY(-${active * 56}px)` }}>
                    {features.map((_, i) => (
                      <span key={i} className="block h-[56px]">{pad(i)}</span>
                    ))}
                  </span>
                </span>
                <ul ref={listRef} className="flex flex-col justify-start gap-[min(30px,2.7vh)]" role="tablist" aria-label="Why SubscriptionPro">
                  {features.map((f, i) => (
                    <li key={f.title}>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={i === active}
                        onClick={() => goTo(i)}
                        className={`text-left text-[min(36px,3.9vh)] leading-[1.42] transition-colors duration-500 ${
                          i === active ? 'font-bold text-black' : 'font-light text-black/50 hover:text-black'
                        }`}
                      >
                        {f.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex min-h-0 min-w-0 flex-col">
                {/* image: fits whatever height is left, keeping 725:450 */}
                <div className="max-h-[450px] min-h-0 flex-1 [container-type:size]">
                  <div className="relative aspect-[725/450]" style={{ width: 'min(100cqw, 100cqh * 1.611)' }}>
                    {features.map((f, i) => (
                      <div key={f.title} className="apart-panel absolute inset-0" data-state={stateOf(i, active)} aria-hidden={i !== active}>
                        <FeatureVisual feature={f} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-[clamp(16px,3.4vh,44px)] grid">
                  {features.map((f, i) => (
                    <div key={f.title} className="apart-copy col-start-1 row-start-1 max-w-[430px]" data-state={stateOf(i, active)} aria-hidden={i !== active}>
                      <p className="text-[min(22px,2.3vh)] leading-[1.4] font-semibold text-black/80">{f.headline}</p>
                      <Points points={f.points} className="mt-[clamp(12px,2.4vh,30px)] pin:text-[min(16px,1.8vh)]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stacked list (phones, tablets, short screens) */}
            <ol className="mt-12 flex flex-col gap-14 md:gap-20 pin:hidden">
              {features.map((f, i) => (
                <li key={f.title} className="grid items-center gap-6 md:grid-cols-2 md:gap-10">
                  <div data-anim="reveal" className={`aspect-[725/450] ${i % 2 ? 'md:order-last' : ''}`}>
                    <FeatureVisual feature={f} />
                  </div>
                  <div data-anim="fade-up">
                    <p className="text-[15px] font-light text-[#6d1b62]">{pad(i)}</p>
                    <h3 className="mt-1 text-[26px] leading-[1.25] font-bold md:text-[32px]">{f.title}</h3>
                    <p className="mt-3 text-[18px] leading-[1.45] font-semibold md:text-[20px]">{f.headline}</p>
                    <Points points={f.points} className="mt-5" />
                  </div>
                </li>
              ))}
            </ol>
          </BandInner>
        </div>
      </section>
    </div>
  );
}
