import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { LogoMark } from '../Logo';

const BASE_W = 960;
const BASE_H = 600;

/** Renders its child at a fixed "screen" size (960×600 by default) and scales it to the available width, so text stays sharp. */
export function ScaledScreen({ children, width = BASE_W, height = BASE_H }: { children: ReactNode; width?: number; height?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.6);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);
  return (
    <div ref={ref} className="relative w-full" style={{ aspectRatio: `${width} / ${height}` }}>
      <div className="absolute top-0 left-0 origin-top-left" style={{ width, height, transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}

const nav: { group: string; items: string[] }[] = [
  { group: 'General', items: ['Dashboard', 'Products', 'Integrations', 'Starter Deals'] },
  { group: 'Payments', items: ['Deposit Fund', 'Billing', 'Transactions', 'Paid Invoices'] },
  { group: 'Growth', items: ['Referrals', 'Support'] },
];

const NavIcon = ({ active }: { active: boolean }) => (
  <span className={`size-[14px] rounded-[4px] ${active ? 'bg-pink' : 'bg-[#c9ced6]'}`} />
);

/** SubscriptionPro app chrome: sidebar + top bar, with the page content in the slot. */
export function AppShell({ active, title, actions, children }: { active: string; title: string; actions?: ReactNode; children: ReactNode }) {
  return (
    <div className="flex size-full overflow-hidden rounded-[14px] bg-white font-sans text-[#1d1d2b] shadow-[0_30px_80px_rgba(10,10,40,0.35)]">
      <aside className="flex w-[196px] shrink-0 flex-col border-r border-[#eef0f3] px-3 pt-5">
        <div className="flex items-center gap-2 px-2">
          <LogoMark height={24} />
          <span className="text-[16px] font-medium tracking-[-0.01em]">
            Subscription<span className="text-pink">Pro</span>
          </span>
        </div>
        {nav.map((g) => (
          <div key={g.group} className="mt-5">
            <p className="px-2 text-[11px] text-[#9aa1ad]">{g.group}</p>
            <ul className="mt-1.5 flex flex-col gap-0.5">
              {g.items.map((it) => (
                <li
                  key={it}
                  className={`flex items-center gap-2.5 rounded-[8px] px-2 py-[7px] text-[12.5px] ${
                    it === active ? 'bg-[#fdeff7] font-medium text-[#c2398b]' : 'text-[#4b5563]'
                  }`}
                >
                  <NavIcon active={it === active} />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col bg-[#f8f9fb]">
        <header className="flex h-[52px] shrink-0 items-center justify-between border-b border-[#eef0f3] bg-white px-5">
          <span className="flex flex-col gap-[3px]">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-[1.5px] w-[14px] bg-[#9aa1ad]" />
            ))}
          </span>
          <div className="flex items-center gap-4 text-[12px] text-[#4b5563]">
            <span className="relative size-4 rounded-full border-[1.5px] border-[#374151]">
              <span className="absolute -top-0.5 -right-0.5 size-[7px] rounded-full bg-pink" />
            </span>
            <span className="flex items-center gap-2">
              <span className="flex size-[26px] items-center justify-center rounded-full bg-[#1d1d2b] text-[11px] font-semibold text-white">AC</span>
              Alex Carter
            </span>
          </div>
        </header>
        <div className="min-h-0 flex-1 overflow-hidden p-5">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-[19px] font-bold">{title}</h4>
            {actions}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export const Pill = ({ children, tone = 'green' }: { children: ReactNode; tone?: 'green' | 'pink' | 'amber' | 'blue' | 'gray' }) => {
  const tones = {
    green: 'bg-[#e7f8f1] text-[#0f8a5f]',
    pink: 'bg-[#fdeff7] text-[#c2398b]',
    amber: 'bg-[#fff4e5] text-[#b45309]',
    blue: 'bg-[#eaf1ff] text-[#2557d6]',
    gray: 'bg-[#f1f2f4] text-[#4b5563]',
  };
  return <span className={`inline-flex items-center rounded-full px-2 py-[3px] text-[10.5px] font-semibold whitespace-nowrap ${tones[tone]}`}>{children}</span>;
};

export const Card = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`rounded-[12px] border border-[#eef0f3] bg-white ${className}`}>{children}</div>
);
