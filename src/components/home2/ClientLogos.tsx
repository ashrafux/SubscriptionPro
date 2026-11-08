import type { ReactNode } from 'react';

/* Home Two: animated client-logo strip after the Trusted section.
   Placeholder wordmarks for fictional companies — swap in real client logos (with permission) before launch. */

const S = (d: ReactNode) => (
  <svg viewBox="0 0 32 32" className="size-7 shrink-0" fill="currentColor" aria-hidden>
    {d}
  </svg>
);

const clients: { name: string; mark: ReactNode; font: string }[] = [
  { name: 'Nordlab', mark: S(<path d="M6 26V6l20 20V6" stroke="currentColor" strokeWidth="4" fill="none" strokeLinejoin="round" />), font: 'font-bold tracking-tight' },
  { name: 'Brightdesk', mark: S(<><circle cx="16" cy="16" r="6" /><path d="M16 2v5M16 25v5M2 16h5M25 16h5M6 6l3.5 3.5M22.5 22.5 26 26M26 6l-3.5 3.5M9.5 22.5 6 26" stroke="currentColor" strokeWidth="2.5" /></>), font: 'font-semibold' },
  { name: 'fold', mark: S(<path d="M4 8h24L16 28z" />), font: 'font-display font-bold lowercase text-[26px]' },
  { name: 'Hausmann', mark: S(<path d="M4 28V12L16 4l12 8v16h-8v-9h-8v9z" />), font: 'font-semibold tracking-wide uppercase text-[18px]' },
  { name: 'Lumen', mark: S(<><circle cx="12" cy="16" r="9" opacity=".55" /><circle cx="20" cy="16" r="9" /></>), font: 'font-medium' },
  { name: 'Arcwise', mark: S(<path d="M4 26a12 12 0 0 1 24 0h-6a6 6 0 0 0-12 0z" />), font: 'font-bold italic' },
  { name: 'Kitepoint', mark: S(<path d="M16 3l11 13-11 13L5 16z" />), font: 'font-semibold' },
  { name: 'orbitly', mark: S(<><circle cx="16" cy="16" r="5" /><ellipse cx="16" cy="16" rx="13" ry="6" fill="none" stroke="currentColor" strokeWidth="2.5" transform="rotate(-25 16 16)" /></>), font: 'font-display font-semibold lowercase text-[25px]' },
  { name: 'Stackwell', mark: S(<path d="M4 9l12-5 12 5-12 5zM4 16l12 5 12-5M4 23l12 5 12-5" stroke="currentColor" strokeWidth="2.6" fill="none" strokeLinejoin="round" />), font: 'font-bold' },
  { name: 'Pebble&Co', mark: S(<ellipse cx="16" cy="17" rx="12" ry="9" />), font: 'font-medium' },
];

function Row({ reverse = false }: { reverse?: boolean }) {
  const list = reverse ? [...clients].reverse() : clients;
  return (
    <div className="group/row flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1}
          className="flex shrink-0 items-center gap-6 pr-6 group-hover/row:[animation-play-state:paused] md:gap-8 md:pr-8"
          style={{ animation: `logo-marquee ${reverse ? 46 : 40}s linear infinite ${reverse ? 'reverse' : ''}` }}
        >
          {list.map((c) => (
            <li
              key={c.name}
              className="flex h-[72px] items-center gap-3 rounded-[16px] border border-[#eef0f4] bg-white px-7 text-[22px] text-[#8a93a0] transition-colors duration-300 hover:text-[#14141f] md:h-[84px] md:px-9"
            >
              {c.mark}
              <span className={`whitespace-nowrap ${c.font}`}>{c.name}</span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

/** `className` sets the section spacing (Home Two places it straight after Trusted, which already has a deep bottom gap). */
export function ClientLogos({ className = 'pt-16 md:pt-24 xl:pt-[120px]' }: { className?: string }) {
  return (
    <section aria-label="Our clients" className={className}>
      <style>{'@keyframes logo-marquee{from{transform:translateX(0)}to{transform:translateX(-100%)}}@media (prefers-reduced-motion:reduce){[style*="logo-marquee"]{animation:none!important}}'}</style>
      <p data-anim="fade-up" className="px-5 text-center text-[15px] font-semibold tracking-[0.14em] text-muted uppercase md:text-[16px]">
        Chosen by <span className="text-pink">5,000+</span> teams to run their SaaS stack
      </p>
      <div data-anim="fade-in" className="mt-8 flex flex-col gap-4 md:mt-10 md:gap-5">
        <Row />
        <Row reverse />
      </div>
    </section>
  );
}
