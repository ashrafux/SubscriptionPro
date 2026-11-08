import type { ReactNode } from 'react';
import { PillButton } from './PillButton';
import { ChatGptMark, ZoomMark } from './Brand';

/** White circular badge floating over the hero gradient. x is Figma px in the 1639px card, applied as a % so it scales with the card. */
function Float({ x, y, size, children }: { x: number; y: number; size: number; children: ReactNode }) {
  return (
    <div className="absolute" style={{ left: `${(x / 1639) * 100}%`, top: y }}>
      <div data-float className="flex items-center justify-center rounded-full bg-white" style={{ width: size, height: size }}>
        {children}
      </div>
    </div>
  );
}

const roundImg = (src: string, alt: string, w: number, h = w) => (
  <img src={src} alt={alt} width={w} height={h} className="rounded-full object-cover" style={{ width: w, height: h }} />
);

/** `withHeader`: Home Two — the card starts 20px from the top and the header floats inside it, so the copy starts lower. */
export function Hero({ withHeader = false }: { withHeader?: boolean }) {
  return (
    <section data-hero className={`px-5 ${withHeader ? 'pt-5' : ''}`}>
      <div data-hero-card className="relative mx-auto max-w-[1880px] overflow-hidden rounded-[20px]">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <img src="/assets/hero/hero-bg.jpg" alt="" className="absolute inset-0 size-full object-cover" />
          {/* Home Two: soft white haze in the top-left corner so the logo reads clearly over the pink */}
          {withHeader && <div className="absolute -top-[140px] -left-[160px] h-[320px] w-[620px] rounded-full bg-white/70 blur-[70px]" />}
        </div>

        {/* Floating partner logos (wide screens only). The layer follows the card width but keeps ≥40px from each edge. */}
        <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 hidden h-full w-[min(1639px,calc(100%-80px))] -translate-x-1/2 xl:block">
          <Float x={139} y={427} size={60}>
            <ZoomMark />
          </Float>
          <Float x={109} y={586} size={60}>{roundImg('/assets/brands/google.png', 'Google', 45.617)}</Float>
          <Float x={292} y={542} size={60}>{roundImg('/assets/brands/notion.png', 'Notion', 40.885)}</Float>
          <Float x={793.16} y={576.16} size={48.842}>{roundImg('/assets/brands/canva.png', 'Canva', 39.932)}</Float>
          <Float x={1273} y={544} size={62.368}>
            <img src="/assets/hero/clickup.svg" alt="ClickUp" width={35.7804} height={42.8532} />
          </Float>
          <Float x={1425} y={438} size={60}>
            <ChatGptMark size={43.32} />
          </Float>
          <Float x={1446} y={592} size={60}>{roundImg('/assets/brands/microsoft365.png', 'Microsoft 365', 41.195, 45.315)}</Float>
        </div>

        <div className={`relative flex flex-col items-center px-5 ${withHeader ? 'pt-[120px] sm:pt-[140px] lg:pt-[225px]' : 'pt-14 sm:pt-20 lg:pt-[130px]'}`}>
          <div className="flex max-w-[951px] flex-col items-center gap-8 text-center md:gap-14">
            <div className="relative isolate flex flex-col items-center gap-4 md:gap-7">
              {/* Soft light behind the copy so it stays readable over the darker parts of the gradient */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-x-24 -inset-y-20 -z-10 bg-[radial-gradient(closest-side,rgba(255,255,255,0.88),rgba(255,255,255,0.72)_62%,rgba(255,255,255,0))] blur-[6px] sm:bg-[radial-gradient(closest-side,rgba(255,255,255,0.82),rgba(255,255,255,0.55)_55%,rgba(255,255,255,0))] sm:-inset-y-16"
              />
              <h1
                data-hero-item
                className="font-display text-[38px] leading-[1.1] font-bold text-title sm:text-[52px] lg:text-[72px] lg:leading-[80px]"
              >
                Manage Your 100+ Subscription for Free Forever
              </h1>
              <p data-hero-item className="text-[17px] leading-[1.5] text-body sm:text-[20px] lg:text-[26px]">
                100+ premium B2B SaaS tools at lower costs, save up to 40% on every renewals, and manage everything from
                one dashboard. As simple as that.
              </p>
            </div>
            <div data-hero-item className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-5">
              <PillButton arrow className="justify-center">Get Started</PillButton>
              <PillButton variant="light" className="justify-center">Book A Demo Call</PillButton>
            </div>
          </div>

          {/* Product screenshot: 1107 of the 1639px card in Figma (67.54%), so the side gaps scale with the card; flush with the card bottom */}
          <div
            data-hero-shot
            className="relative mt-12 aspect-[1107/631] w-full [container-type:inline-size] overflow-hidden md:w-[calc((100%+40px)*0.82)] lg:w-[calc((100%+40px)*0.6754)] rounded-t-[12px] bg-white sm:rounded-t-[17.84px] md:mt-20 lg:mt-[142px]"
          >
            {/* Latest dashboard (2000×1140, same 1107:631 ratio as this frame) */}
            <img
              src="/assets/hero/dashboard-2026.jpg"
              alt="SubscriptionPro dashboard: account balance, total paid, savings, earnings, bills and connected tools"
              width={2000}
              height={1140}
              className="absolute inset-0 size-full object-cover object-top"
            />
            {/* Demo profile chip, drawn over the blanked one in the screenshot.
                Positions are the screenshot's own pixels (2000 wide), so it scales with the image. */}
            <div
              className="absolute flex -translate-y-1/2 items-center font-inter"
              style={{ left: `${(1681 / 2000) * 100}%`, top: `${(58 / 1140) * 100}%`, gap: '0.6cqw' }}
            >
              <img src="/assets/intro/user1.png" alt="" className="shrink-0 rounded-full object-cover" style={{ width: '2.6cqw', height: '2.6cqw' }} />
              <span className="flex flex-col whitespace-nowrap">
                <span className="font-semibold text-[#111827]" style={{ fontSize: '0.96cqw', lineHeight: 1.35 }}>
                  Alex Carter
                </span>
                <span className="text-[#6b7280]" style={{ fontSize: '0.8cqw', lineHeight: 1.35 }}>
                  alex@example.com
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
