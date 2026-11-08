import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { PillButton } from '../PillButton';
import { ChatGptMark, ZoomMark } from '../Brand';

/* Home Three hero.
   - Fits the screen: on laptops/desktops the card is exactly one viewport tall (minus the sticky header),
     type and spacing scale with the viewport height, and the latest dashboard fills whatever space is left.
   - Floating product badges idle-float (data-float) and also drift with the pointer at different depths. */

type F = { x: number; y: number; size: number; depth: number; node: ReactNode };
const round = (src: string, w: number, h = w) => <img src={src} alt="" className="rounded-full object-cover" style={{ width: w, height: h }} />;
const floats: F[] = [
  { x: 5, y: 14, size: 60, depth: 18, node: <ZoomMark /> },
  { x: 8, y: 50, size: 66, depth: 30, node: round('/assets/brands/notion.png', 44) },
  { x: 3, y: 80, size: 58, depth: 12, node: round('/assets/brands/google.png', 44) },
  { x: 24, y: 92, size: 50, depth: 22, node: round('/assets/brands/canva.png', 40) },
  { x: 91, y: 12, size: 60, depth: 20, node: <ChatGptMark size={43} /> },
  { x: 88.5, y: 48, size: 66, depth: 32, node: <img src="/assets/hero/clickup.svg" alt="" width={36} height={43} /> },
  { x: 94, y: 80, size: 58, depth: 14, node: round('/assets/brands/microsoft365.png', 41, 45) },
];

export function Hero3() {
  const card = useRef<HTMLDivElement>(null);

  // Pointer parallax on the badge wrappers (the inner [data-float] keeps its own idle loop).
  useEffect(() => {
    const el = card.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>('[data-depth]')).map((n) => ({
      d: Number(n.dataset.depth),
      x: gsap.quickTo(n, 'x', { duration: 0.9, ease: 'power3.out' }),
      y: gsap.quickTo(n, 'y', { duration: 0.9, ease: 'power3.out' }),
    }));
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width - 0.5;
      const dy = (e.clientY - r.top) / r.height - 0.5;
      items.forEach((it) => {
        it.x(-dx * it.d * 2);
        it.y(-dy * it.d * 2);
      });
    };
    const reset = () => items.forEach((it) => (it.x(0), it.y(0)));
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', reset);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', reset);
    };
  }, []);

  return (
    <section data-hero className="px-5">
      <div
        ref={card}
        data-hero-card
        className="relative mx-auto flex max-w-[1880px] flex-col overflow-hidden rounded-[20px] lg:h-[calc(100svh-116px)] lg:max-h-[1080px] lg:min-h-[640px]"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <img src="/assets/hero/hero-bg.jpg" alt="" className="absolute inset-0 size-full object-cover" />
        </div>

        <div className="relative flex min-h-0 flex-1 flex-col items-center px-5 pt-14 [container-type:inline-size] sm:pt-20 lg:pt-[clamp(36px,7vh,104px)]">
          <div className="relative flex w-full justify-center">
            {/* floating badges: wide screens only (≥1400px, where the side gutters clear the copy) */}
            <div aria-hidden className="pointer-events-none absolute inset-0 hidden min-[1400px]:block">
              {floats.map((f, i) => (
                <div key={i} data-depth={f.depth} className="absolute" style={{ left: `${f.x}%`, top: `${f.y}%` }}>
                  <div>
                    <div data-float className="flex items-center justify-center rounded-full bg-white shadow-[0_10px_30px_-8px_rgba(40,40,90,0.25)]" style={{ width: f.size, height: f.size }}>
                      {f.node}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex max-w-[980px] flex-col items-center gap-7 text-center lg:gap-[clamp(20px,4.4vh,52px)]">
              <div className="relative isolate flex flex-col items-center gap-4 lg:gap-[clamp(12px,2.6vh,28px)]">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-x-24 -inset-y-16 -z-10 bg-[radial-gradient(closest-side,rgba(255,255,255,0.85),rgba(255,255,255,0.55)_55%,rgba(255,255,255,0))] blur-[6px]"
                />
                <h1 data-hero-item className="font-display text-[38px] leading-[1.1] font-bold text-title sm:text-[52px] lg:text-[clamp(44px,7.2vh,76px)]">
                  Manage Your 100+ Subscription for Free Forever
                </h1>
                <p data-hero-item className="text-[17px] leading-[1.5] text-body sm:text-[20px] lg:text-[clamp(18px,2.6vh,26px)]">
                  100+ premium B2B SaaS tools at lower costs, save up to 40% on every renewals, and manage everything from one dashboard. As simple as
                  that.
                </p>
              </div>
              <div data-hero-item className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-5">
                <PillButton arrow className="justify-center">Get Started</PillButton>
                <PillButton variant="light" className="justify-center">Book A Demo Call</PillButton>
              </div>
            </div>
          </div>

          {/* Latest dashboard: fills the rest of the card on laptops (cropped from the bottom), keeps its ratio elsewhere */}
          <div
            data-hero-shot
            className="relative mt-12 aspect-[1107/631] w-full overflow-hidden rounded-t-[12px] bg-white sm:rounded-t-[17.84px] md:mt-16 md:w-[calc((100%+40px)*0.82)] lg:mt-[clamp(28px,6vh,96px)] lg:aspect-auto lg:max-h-[calc((100cqw+40px)*0.385)] lg:min-h-[200px] lg:w-[calc((100%+40px)*0.6754)] lg:flex-1"
          >
            <div className="absolute inset-x-0 top-0 [container-type:inline-size]">
              <img
                src="/assets/hero/dashboard-2026.jpg"
                alt="SubscriptionPro dashboard: account balance, total paid, savings, earnings, bills and connected tools"
                width={2000}
                height={1140}
                className="block w-full"
              />
              <div className="absolute flex -translate-y-1/2 items-center font-inter" style={{ left: `${(1681 / 2000) * 100}%`, top: `${(58 / 2000) * 100}cqw`, gap: '0.6cqw' }}>
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
      </div>
    </section>
  );
}
