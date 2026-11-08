import { useLayoutEffect, useRef, useState } from 'react';
import { PillButton } from '../PillButton';
import { Band, BandInner } from '../Container';
import { Hub, Tile, left, right } from '../Cta';

/* Home Three CTA (review row 17): colour-corrected and animated.
   - Clean light brand gradient instead of the muddy purple/navy photo background.
   - Tiles drift gently, the dashed connectors flow toward the hub, data dots travel along them, and the hub pulses. */

const H = 463;
const HUB_Y = 233;

function Connectors() {
  const box = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const c = w / 2;
  const routes = w
    ? [
        `M0,163 H70 V${HUB_Y} H${c - 92}`,
        `M0,303 H70 V${HUB_Y} H${c - 92}`,
        `M${w},163 H${w - 70} V${HUB_Y} H${c + 92}`,
        `M${w},303 H${w - 70} V${HUB_Y} H${c + 92}`,
      ]
    : [];
  return (
    <div ref={box} aria-hidden className="absolute inset-0">
      {w > 0 && (
        <svg width={w} height={H} className="absolute inset-0 overflow-visible">
          <defs>
            <linearGradient id="cta3-line" x1="0" x2="1">
              <stop offset="0" stopColor="#7c6cf2" />
              <stop offset="0.5" stopColor="#e15aab" />
              <stop offset="1" stopColor="#7c6cf2" />
            </linearGradient>
          </defs>
          {routes.map((d, i) => (
            <path key={d} d={d} fill="none" stroke="url(#cta3-line)" strokeOpacity="0.55" strokeWidth="1.6" strokeDasharray="6 7" className="cta3-flow" style={{ animationDelay: `${i * -0.4}s` }} />
          ))}
          {routes.map((d, i) => (
            <circle key={`dot-${i}`} r="4.5" fill="#e15aab" className="drop-shadow-[0_0_6px_rgba(225,90,171,0.9)]">
              <animateMotion dur="3.2s" repeatCount="indefinite" begin={`${i * 0.8}s`} path={d} keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="3.2s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </svg>
      )}
    </div>
  );
}

function Column({ tiles, offset, base }: { tiles: React.ReactNode[]; offset: number; base: number }) {
  return (
    <div className="flex flex-col gap-5" style={{ marginTop: offset }}>
      {tiles.map((t, i) => (
        <div key={i} className="cta3-bob" style={{ animationDelay: `${(base + i) * -0.7}s`, animationDuration: `${5 + ((base + i) % 3)}s` }}>
          <Tile>{t}</Tile>
        </div>
      ))}
    </div>
  );
}

export function Cta3() {
  return (
    <Band
      className="bg-[#fbf7fd] py-16 md:py-24 xl:pt-[130px] xl:pb-[140px]"
      style={{
        backgroundImage:
          'radial-gradient(45% 55% at 12% 20%, rgba(246,179,217,0.55), transparent 70%), radial-gradient(45% 55% at 90% 15%, rgba(167,180,255,0.5), transparent 70%), radial-gradient(60% 50% at 50% 110%, rgba(196,181,253,0.45), transparent 70%)',
      }}
    >
      <style>{`
        @keyframes cta3-flow { to { stroke-dashoffset: -26; } }
        .cta3-flow { animation: cta3-flow 1.1s linear infinite; }
        @keyframes cta3-bob { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-9px) rotate(-1.5deg); } }
        .cta3-bob { animation: cta3-bob 5s ease-in-out infinite; }
        @keyframes cta3-pulse { 0% { transform: scale(1); opacity: .55; } 100% { transform: scale(1.9); opacity: 0; } }
        .cta3-pulse { animation: cta3-pulse 2.6s cubic-bezier(.2,.6,.3,1) infinite; }
        @media (prefers-reduced-motion: reduce) { .cta3-flow, .cta3-bob, .cta3-pulse { animation: none; } }
      `}</style>
      <BandInner>
        <div className="mx-auto flex max-w-[797px] flex-col items-center text-center">
          <h2 data-split className="font-display text-[34px] leading-[1.1] font-bold text-title sm:text-[44px] lg:text-[60px]">Get the Best of SaaS Without Breaking the Bank</h2>
          <p data-anim="fade-up" className="mt-5 max-w-[460px] text-[17px] leading-[1.45] text-balance text-body md:text-[19px]">
            Stop overspending on software. Save big on every tool you use.
          </p>
          <div data-anim="fade-up" data-delay="0.15" className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-5 md:mt-[52px]">
            <PillButton variant="pink" arrow className="justify-center">Get Started</PillButton>
            <PillButton variant="light" className="justify-center">Talk to Sales</PillButton>
          </div>
        </div>

        {/* Wide screens: two tile clusters wired into the hub */}
        <div className="relative mx-auto mt-[90px] hidden h-[463px] max-w-[1494px] items-start xl:flex">
          <div data-anim="slide-left" className="flex gap-5">
            <Column tiles={left[0]} offset={0} base={0} />
            <Column tiles={left[1]} offset={33} base={3} />
            <Column tiles={left[2]} offset={100} base={6} />
          </div>
          <div className="relative h-full flex-1">
            <Connectors />
            <div className="absolute left-1/2 -translate-x-1/2" style={{ top: HUB_Y - 86 }}>
              <span aria-hidden className="cta3-pulse absolute inset-0 rounded-full bg-pink/40" />
              <span aria-hidden className="cta3-pulse absolute inset-0 rounded-full bg-[#7c6cf2]/30" style={{ animationDelay: '1.3s' }} />
              <div className="relative">
                <Hub />
              </div>
            </div>
          </div>
          <div data-anim="slide-right" className="flex gap-5">
            <Column tiles={right[0]} offset={100} base={8} />
            <Column tiles={right[1]} offset={33} base={10} />
            <Column tiles={right[2]} offset={0} base={13} />
          </div>
        </div>

        {/* Smaller screens: pulsing hub with a logo cloud */}
        <div className="mx-auto mt-14 flex max-w-[290px] flex-col items-center gap-8 sm:max-w-[640px] xl:hidden">
          <div className="relative">
            <span aria-hidden className="cta3-pulse absolute inset-0 rounded-full bg-pink/40" />
            <div className="relative">
              <Hub size={120} />
            </div>
          </div>
          <div data-anim="stagger" data-stagger="0.04" className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {[...left.flat(), ...right.flat()].map((t, i) => (
              <Tile key={i} size={62}>
                {t}
              </Tile>
            ))}
          </div>
        </div>
      </BandInner>
    </Band>
  );
}
