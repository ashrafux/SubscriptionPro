import { useEffect, useRef, useState } from 'react';
import { TiltBadge } from '../Badge';
import { Band, BandInner } from '../Container';
import { features } from '../apart/features';
import { FeatureVisual } from '../apart/FeatureVisual';

/* Home Three "What Sets SubscriptionPro Apart" (review row 11): simpler and cleaner.
   - A plain list of six features in regular/semibold weights (no thin 300 type), the open one shows its copy.
   - It advances on its own every few seconds (with a progress line), pauses on hover, and any row can be clicked.
   - Screens use the 2026 customer-portal chrome (the page wraps them in <ShellV2>). */

const pad = (i: number) => String(i + 1).padStart(2, '0');
const DURATION = 6000;
const stateOf = (i: number, a: number) => (i === a ? 'active' : i < a ? 'past' : 'next');

export function Apart3() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [seen, setSeen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // only run the timer while the section is on screen
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (paused || !seen) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % features.length), DURATION);
    return () => window.clearTimeout(t);
  }, [active, paused, seen]);

  return (
    <Band outer="mt-16 md:mt-24 xl:mt-[150px]" className="bg-[#f8eef5] py-16 md:py-24 xl:py-[120px]">
      <BandInner>
        <div className="mx-auto flex max-w-[680px] flex-col items-center text-center">
          <span data-anim="scale-in">
            <TiltBadge className="mb-4 bg-mint !px-3 !py-1 !text-[12px] lg:!px-[18px] lg:!py-[6px] lg:!text-[14px]" angle={-4}>Why choose</TiltBadge>
          </span>
          <h2 data-split className="text-[34px] leading-[1.1] font-bold tracking-[0.5909px] sm:text-[44px] lg:text-[56px]">
            What Sets SubscriptionPro Apart
          </h2>
          <p data-anim="fade-up" className="mt-5 max-w-[540px] text-[17px] leading-[1.5] text-balance text-[#5d6b75]">
            Unlock partner-exclusive SaaS deals, save on renewals, and manage your stack from one dashboard.
          </p>
        </div>

        <div
          ref={ref}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="mx-auto mt-12 grid max-w-[1400px] gap-8 md:mt-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-14 xl:gap-20"
        >
          <ul role="tablist" aria-label="Why SubscriptionPro" data-anim="stagger" data-stagger="0.06" className="flex flex-col">
            {features.map((f, i) => {
              const on = i === active;
              return (
                <li key={f.title} className="border-b border-black/[0.08] last:border-b-0">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActive(i)}
                    className="group flex w-full items-baseline gap-5 py-5 text-left md:py-6"
                  >
                    <span className={`w-7 shrink-0 text-[15px] font-semibold tabular-nums transition-colors ${on ? 'text-pink' : 'text-black/35'}`}>{pad(i)}</span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-[20px] leading-[1.3] transition-colors md:text-[23px] ${on ? 'font-semibold text-[#14141f]' : 'font-medium text-black/55 group-hover:text-black/80'}`}>
                        {f.title}
                      </span>
                      <span className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${on ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <span className="min-h-0 overflow-hidden">
                          <span className="block pt-3 text-[16px] leading-[1.55] text-[#5d6b75]">{f.headline}</span>
                          <span className="mt-3 flex flex-col gap-1.5">
                            {f.points.map((p) => (
                              <span key={p} className="flex items-center gap-2.5 text-[15px] text-[#3c4650]">
                                <span className="size-1.5 shrink-0 rounded-full bg-pink" />
                                {p}
                              </span>
                            ))}
                          </span>
                        </span>
                      </span>
                      {/* progress line for the open row */}
                      <span className={`mt-4 block h-[2px] overflow-hidden rounded-full bg-black/[0.06] ${on ? '' : 'invisible'}`}>
                        <span
                          key={`${active}-${paused}-${seen}`}
                          className="block h-full origin-left bg-pink"
                          style={on && seen && !paused ? { animation: `apart3-progress ${DURATION}ms linear forwards` } : { transform: 'scaleX(0)' }}
                        />
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div data-anim="reveal" className="relative order-first aspect-[16/11] overflow-hidden rounded-[22px] lg:order-none lg:aspect-[5/4] xl:aspect-[16/12]">
            {features.map((f, i) => (
              <div key={f.title} className="apart-panel absolute inset-0" data-state={stateOf(i, active)} aria-hidden={i !== active}>
                <FeatureVisual feature={f} />
              </div>
            ))}
          </div>
        </div>
      </BandInner>
      <style>{'@keyframes apart3-progress{from{transform:scaleX(0)}to{transform:scaleX(1)}}'}</style>
    </Band>
  );
}
