import { useLayoutEffect, useRef, useState } from 'react';
import { TiltBadge } from './Badge';
import { Band, BandInner } from './Container';
import { features, type Feature } from './apart/features';
import { FeatureVisual } from './apart/FeatureVisual';

/* Home Two "What Sets SubscriptionPro Apart": a horizontal accordion. Six slim columns with vertical
   titles; hovering, focusing or clicking one opens it into number, copy, points and its screen.
   Below xl it becomes a vertical accordion. */

const pad = (i: number) => String(i + 1).padStart(2, '0');
const GROW = 8; // open column = 8 shares, closed ones = 1 share each
const GAP = 12;

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="size-[13px] text-black" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

function Points({ f }: { f: Feature }) {
  return (
    <ul className="flex flex-col gap-[10px] text-[15px] leading-[1.45] text-black/70">
      {f.points.map((p) => (
        <li key={p} className="flex items-start gap-3">
          <span className="mt-[1px] flex size-[22px] shrink-0 items-center justify-center rounded-full bg-apart">
            <Check />
          </span>
          {p}
        </li>
      ))}
    </ul>
  );
}

export function ApartAccordion() {
  const [open, setOpen] = useState(0);
  const row = useRef<HTMLDivElement>(null);
  const [openW, setOpenW] = useState(0);

  // The open column's final width, so its content is laid out at full size while the column is still growing
  // (the column clips it), instead of squeezing and re-flowing during the transition.
  useLayoutEffect(() => {
    const el = row.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const free = e.contentRect.width - GAP * (features.length - 1);
      setOpenW((free * GROW) / (GROW + features.length - 1));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <Band outer="mt-16 md:mt-24 xl:mt-[172px]" className="bg-apart py-16 md:py-24 xl:pt-[110px] xl:pb-[120px]">
      <BandInner>
        <div className="mx-auto flex max-w-[640px] flex-col items-center text-center">
          <span data-anim="scale-in">
            <TiltBadge className="mb-3 bg-mint !px-3 !py-1 !text-[12px] lg:!px-[18px] lg:!py-[6px] lg:!text-[14px]">Why choose</TiltBadge>
          </span>
          <h2 data-split className="text-[34px] leading-[1.1] font-bold tracking-[0.5909px] sm:text-[44px] lg:text-[56px]">
            What Sets <br />
            SubscriptionPro Apart
          </h2>
          <p data-anim="fade-up" className="mt-5 max-w-[529px] text-[16px] leading-[1.5] text-black/70 md:text-[17px]">
            Unlock partner-exclusive SaaS deals, save on renewals, and manage your stack from one dashboard.
          </p>
        </div>

        {/* xl+: horizontal accordion */}
        <div
          ref={row}
          data-anim="stagger"
          data-stagger="0.07"
          role="tablist"
          aria-label="Why SubscriptionPro"
          className="mx-auto mt-14 hidden h-[560px] max-w-[1420px] xl:flex 2xl:h-[600px]"
          style={{ gap: GAP }}
        >
          {features.map((f, i) => {
            const on = i === open;
            return (
              <div
                key={f.title}
                data-anim-item
                role="tab"
                tabIndex={0}
                aria-selected={on}
                onMouseEnter={() => setOpen(i)}
                onFocus={() => setOpen(i)}
                onClick={() => setOpen(i)}
                className={`group relative min-w-0 cursor-pointer overflow-hidden rounded-[20px] outline-none transition-[flex-grow,background-color] duration-[800ms] ease-[cubic-bezier(.62,.05,.32,1)] focus-visible:ring-2 focus-visible:ring-[#6d1b62] ${
                  on ? 'bg-white' : 'bg-white/55 hover:bg-white/80'
                }`}
                style={{ flexGrow: on ? GROW : 1, flexBasis: 0 }}
              >
                {/* closed: number on top, vertical title at the bottom */}
                <div
                  aria-hidden={on}
                  className={`absolute inset-0 flex flex-col items-center justify-between py-7 transition-opacity duration-300 ${on ? 'opacity-0' : 'opacity-100 delay-300'}`}
                >
                  <span className="text-[18px] font-semibold text-[#6d1b62]">{pad(i)}</span>
                  <span className="rotate-180 text-[20px] font-bold whitespace-nowrap [writing-mode:vertical-rl] transition-transform duration-500 group-hover:-translate-y-2">
                    {f.title}
                  </span>
                </div>

                {/* open: full feature, laid out at the column's final width */}
                <div
                  aria-hidden={!on}
                  className={`absolute inset-y-0 left-0 grid grid-cols-[minmax(0,300px)_minmax(0,1fr)] gap-6 p-6 ${on ? 'pointer-events-auto' : 'pointer-events-none'}`}
                  style={{ width: openW || undefined }}
                >
                  <div className="flex flex-col justify-between py-3 pl-3">
                    <span
                      className={`text-[56px] leading-none font-light text-[#6d1b62] transition-[opacity,transform] duration-500 ${on ? 'translate-y-0 opacity-100 delay-300' : '-translate-y-3 opacity-0'}`}
                    >
                      {pad(i)}
                    </span>
                    <div className={`transition-[opacity,transform] duration-600 ${on ? 'translate-y-0 opacity-100 delay-[380ms]' : 'translate-y-5 opacity-0'}`}>
                      <h3 className="text-[28px] leading-[1.2] font-bold">{f.title}</h3>
                      <p className="mt-3 text-[16px] leading-[1.5] text-black/65">{f.headline}</p>
                      <div className="mt-5">
                        <Points f={f} />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(.62,.05,.32,1)] ${on ? 'translate-x-0 scale-100 opacity-100 delay-200' : 'translate-x-10 scale-95 opacity-0'}`}
                  >
                    <FeatureVisual feature={f} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* below xl: vertical accordion */}
        <div data-anim="stagger" data-stagger="0.06" className="mx-auto mt-10 flex max-w-[860px] flex-col gap-3 md:mt-14 xl:hidden">
          {features.map((f, i) => {
            const on = i === open;
            return (
              <div key={f.title} data-anim-item className={`overflow-hidden rounded-[18px] transition-colors duration-500 ${on ? 'bg-white' : 'bg-white/55'}`}>
                <button type="button" aria-expanded={on} onClick={() => setOpen(i)} className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-7">
                  <span className="w-8 text-[16px] font-semibold text-[#6d1b62]">{pad(i)}</span>
                  <span className="flex-1 text-[19px] font-bold sm:text-[21px]">{f.title}</span>
                  <svg viewBox="0 0 24 24" className={`size-5 transition-transform duration-500 ${on ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.62,.05,.32,1)] ${on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="min-h-0 overflow-hidden">
                    <div className="flex flex-col gap-5 px-5 pb-5 sm:px-7 sm:pb-7">
                      <p className="text-[16px] leading-[1.5] text-black/65">{f.headline}</p>
                      <Points f={f} />
                      <div className="aspect-[16/10]">
                        <FeatureVisual feature={f} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </BandInner>
    </Band>
  );
}
