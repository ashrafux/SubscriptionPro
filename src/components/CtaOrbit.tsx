import type { ReactNode } from 'react';
import { PillButton } from './PillButton';
import { Band, BandInner } from './Container';
import { ScaledScreen } from './apart/Shell';
import { Hub, Tile, left, right } from './Cta';

/* Home Two CTA, "Orbit" layout: the pink SubscriptionPro hub in the middle and every tool on two slowly turning
   dashed rings (the tiles counter-rotate so the logos stay upright). Tablet and up draw the orbit at a fixed
   1100×560 stage and scale it to fit; phones get the hub with a logo cloud. */

const logos = [...left.flat(), ...right.flat()];
const inner = logos.slice(0, 6);
const outer = logos.slice(6);

function Ring({ items, r, duration, reverse = false, size }: { items: ReactNode[]; r: number; duration: number; reverse?: boolean; size: number }) {
  const spin = (rev: boolean) => `orbit-spin ${duration}s linear infinite ${rev ? 'reverse' : ''}`;
  return (
    <div className="absolute top-1/2 left-1/2" style={{ width: r * 2, height: r * 2, marginLeft: -r, marginTop: -r, animation: spin(reverse) }}>
      <div className="absolute inset-0 rounded-full border border-dashed border-[#3b3b55]/25" />
      {items.map((logo, i) => {
        const a = (i / items.length) * Math.PI * 2 - Math.PI / 2;
        return (
          <div key={i} className="absolute" style={{ left: r + Math.cos(a) * r - size / 2, top: r + Math.sin(a) * r - size / 2 }}>
            <div style={{ animation: spin(!reverse) }}>
              <Tile size={size}>{logo}</Tile>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function CtaOrbit() {
  return (
    <Band className="pt-16 pb-12 md:pt-24 md:pb-0 xl:pt-[130px]">
      <style>{'@keyframes orbit-spin{to{transform:rotate(360deg)}}@keyframes orbit-pulse{0%{transform:scale(1);opacity:.45}100%{transform:scale(1.9);opacity:0}}@media (prefers-reduced-motion:reduce){[style*="orbit-"]{animation:none!important}}'}</style>
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <img src="/assets/cta/cta-bg.jpg" alt="" data-speed="-0.06" className="absolute inset-0 size-full scale-110 object-cover" />
      </div>

      <BandInner>
        <div className="mx-auto flex max-w-[800px] flex-col items-center text-center">
          <h2 data-split className="font-display text-[34px] leading-[1.1] font-bold text-title sm:text-[44px] lg:text-[60px]">
            Get the Best of SaaS Without Breaking the Bank
          </h2>
          <p data-anim="fade-up" className="mt-5 max-w-[435px] text-[17px] leading-[1.45] text-body md:text-[18px]">
            Stop Overspending on Software. Save Big on Every Tool You Use.
          </p>
          <div data-anim="fade-up" data-delay="0.15" className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-5 md:mt-12">
            <PillButton variant="pink" arrow className="justify-center">Get Started</PillButton>
            <PillButton variant="light" className="justify-center">Talk to Sale</PillButton>
          </div>
        </div>

        {/* Tablet and up: the orbit, scaled from a fixed stage so ring spacing never changes */}
        <div
          data-anim="fade-up"
          data-delay="0.2"
          className="mx-auto mt-4 hidden max-w-[1100px] [mask-image:linear-gradient(transparent,#000_14%,#000_86%,transparent)] md:block"
        >
          <ScaledScreen width={1100} height={560}>
            <div className="absolute inset-x-0 top-[-220px] h-[1000px]">
              <Ring items={inner} r={230} duration={60} size={84} />
              <Ring items={outer} r={420} duration={90} reverse size={92} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {/* soft pulses behind the hub */}
                {[0, 1.6].map((d) => (
                  <span
                    key={d}
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-[#e15aab]/40"
                    style={{ animation: `orbit-pulse 3.2s ease-out ${d}s infinite` }}
                  />
                ))}
                <div className="relative">
                  <Hub size={170} />
                </div>
              </div>
            </div>
          </ScaledScreen>
        </div>

        {/* Phones: hub with a logo cloud */}
        <div className="mx-auto mt-12 flex max-w-[320px] flex-col items-center gap-8 md:hidden">
          <Hub size={110} />
          <div className="flex flex-wrap justify-center gap-3">
            {logos.map((t, i) => (
              <Tile key={i} size={60}>
                {t}
              </Tile>
            ))}
          </div>
        </div>
      </BandInner>
    </Band>
  );
}
