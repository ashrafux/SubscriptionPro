import type { ReactNode } from 'react';
import { PillButton } from './PillButton';
import { ChatGptMark, ZoomMark } from './Brand';
import { Band, BandInner } from './Container';
import { LogoMark } from './Logo';

const img = (src: string, alt: string, w = 64, h = w) => <img src={src} alt={alt} style={{ width: w, height: h }} className="object-contain" />;

const left: ReactNode[][] = [
  [<img key="c" src="/assets/products/clickup.svg" alt="ClickUp" width={52} height={62} />, img('/assets/brands/microsoft365.png', 'Microsoft 365', 60, 66), img('/assets/brands/google.png', 'Google', 62)],
  [img('/assets/brands/canva.png', 'Canva', 66), <ChatGptMark key="g" size={64} />, img('/assets/brands/adobe-cc.png', 'Adobe', 62, 60)],
  [img('/assets/brands/notion.png', 'Notion', 58), <ZoomMark key="z" size={64} />],
];
const right: ReactNode[][] = [
  [img('/assets/cta/d-app.png', 'App', 64), img('/assets/cta/bubble.png', 'App', 92)],
  [img('/assets/cta/stripes.png', 'App', 120, 60), img('/assets/cta/dropbox.png', 'Dropbox', 61, 57), img('/assets/cta/chat-green.png', 'App', 62)],
  [img('/assets/cta/filmora.png', 'Filmora', 58), img('/assets/cta/u-app.png', 'App', 112, 63), img('/assets/cta/check.png', 'App', 84, 59)],
];

function Tile({ children, size = 130 }: { children: ReactNode; size?: number }) {
  const s = size / 130;
  return (
    <div
      className="flex shrink-0 items-center justify-center bg-white shadow-[0_8px_24px_rgba(40,40,90,0.06)] transition-transform duration-300 hover:-translate-y-1.5 hover:rotate-[-4deg]"
      style={{ width: size, height: size, borderRadius: 20 * s }}
    >
      <span className="flex items-center justify-center" style={{ transform: `scale(${s})` }}>
        {children}
      </span>
    </div>
  );
}

function Column({ tiles, offset }: { tiles: ReactNode[]; offset: number }) {
  return (
    <div className="flex flex-col gap-5" style={{ marginTop: offset }}>
      {tiles.map((t, i) => (
        <Tile key={i}>{t}</Tile>
      ))}
    </div>
  );
}

function Hub({ size = 173 }: { size?: number }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#f7a8d6,#e15aab_45%,#f1b13b_100%)] shadow-[0_18px_40px_rgba(225,90,171,0.35)]"
      style={{ width: size, height: size }}
    >
      <LogoMark height={size * 0.38} white />
    </div>
  );
}

const dash = 'border-dashed border-[#3b3b55]/80';

export function Cta() {
  return (
    <Band className="py-16 md:py-24 xl:pt-[144px] xl:pb-[161px]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <img src="/assets/cta/cta-bg.jpg" alt="" data-speed="-0.06" className="absolute inset-0 size-full scale-110 object-cover" />
      </div>

      <BandInner>
        <div className="mx-auto flex max-w-[797px] flex-col items-center text-center">
          <h2 data-split className="font-display text-[34px] leading-[1.1] font-bold text-title sm:text-[44px] lg:text-[60px]">
            Get the Best of SaaS Without Breaking the Bank
          </h2>
          <p data-anim="fade-up" className="mt-5 max-w-[435px] text-[17px] leading-[1.4] text-body md:text-[18px]">
            Stop Overspending on Software. Save Big on Every Tool You Use.
          </p>
          <div data-anim="fade-up" data-delay="0.15" className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-5 md:mt-[56px]">
            <PillButton variant="pink" arrow className="justify-center">Get Started</PillButton>
            <PillButton variant="light" className="justify-center">Talk to Sale</PillButton>
          </div>
        </div>

        {/* Wide screens: two tile clusters bracketed into the hub */}
        <div className="relative mx-auto mt-[98px] hidden h-[463px] max-w-[1494px] items-start xl:flex">
          <div className="flex gap-5">
            <Column tiles={left[0]} offset={0} />
            <Column tiles={left[1]} offset={33} />
            <Column tiles={left[2]} offset={100} />
          </div>

          <div aria-hidden className="relative h-full flex-1">
            <span className={`absolute top-[163px] left-0 h-[140px] w-[70px] border-y-[1.5px] border-r-[1.5px] ${dash}`} />
            <span className={`absolute top-[163px] right-0 h-[140px] w-[70px] border-y-[1.5px] border-l-[1.5px] ${dash}`} />
            <span data-anim="draw" className={`absolute top-[233px] right-[70px] left-[70px] border-t-[1.5px] ${dash}`} />
            <div className="absolute top-[147px] left-1/2 -translate-x-1/2">
              <Hub />
            </div>
          </div>

          <div className="flex gap-5">
            <Column tiles={right[0]} offset={100} />
            <Column tiles={right[1]} offset={33} />
            <Column tiles={right[2]} offset={0} />
          </div>
        </div>

        {/* Smaller screens: hub with a logo cloud */}
        <div className="mx-auto mt-14 flex max-w-[290px] flex-col items-center gap-8 sm:max-w-[640px] xl:hidden">
          <Hub size={120} />
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
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
