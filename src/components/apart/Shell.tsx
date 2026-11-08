import { createContext, useContext, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
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

/** 'v2' = the 2026 customer-portal chrome (Home Three). Everything else keeps the original chrome. */
const ShellStyle = createContext<'v1' | 'v2'>('v1');
export const ShellV2 = ({ children }: { children: ReactNode }) => <ShellStyle.Provider value="v2">{children}</ShellStyle.Provider>;

// 2026 portal navigation, with the old item names mapped onto it
const navV2: { group: string; items: string[] }[] = [
  { group: 'Main', items: ['Dashboard', 'Products', 'Integrations'] },
  { group: 'Payments', items: ['Deposit Fund', 'Due Bills', 'Billing History', 'Transactions'] },
  { group: 'Orders', items: ['Purchase Request', 'Subscription'] },
  { group: 'Earnings', items: ['Referrals', 'Rewards'] },
];
const aliasV2: Record<string, string> = { Billing: 'Billing History', 'Starter Deals': 'Products', Support: '' };

const V2Icon = ({ i }: { i: number }) => {
  const paths = [
    'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
    'M5 6h14l-1.5 9h-11zM8 19.5a1 1 0 1 0 0-.01M16 19.5a1 1 0 1 0 0-.01',
    'M9 3v4M15 3v4M7 7h10v5a5 5 0 0 1-10 0zM12 17v4',
    'M6 3h9l3 3v15H6zM9 11h6M9 15h4',
    'M7 3h10v18l-2.5-1.5L12 21l-2.5-1.5L7 21zM10 8h4M10 12h4',
    'M5 4h14v16H5zM9 8h6M9 12h6M9 16h3',
    'M4 7h16M4 12h16M4 17h10',
  ];
  return (
    <svg viewBox="0 0 24 24" className="size-[15px] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={paths[i % paths.length]} />
    </svg>
  );
};

function AppShellV2({ active, title, actions, children }: { active: string; title: string; actions?: ReactNode; children: ReactNode }) {
  const on = aliasV2[active] ?? active;
  let k = 0;
  return (
    <div className="flex size-full overflow-hidden rounded-[14px] bg-white font-sans text-[#1d1d2b] shadow-[0_30px_80px_rgba(10,10,40,0.3)]">
      <aside className="flex w-[188px] shrink-0 flex-col border-r border-[#eef0f3] bg-white">
        <div className="flex h-[52px] items-center justify-between border-b border-[#eef0f3] px-4">
          <span className="flex items-center gap-2">
            <LogoMark height={20} />
            <span className="text-[14.5px] font-medium tracking-[-0.01em]">
              Subscription<span className="text-pink">Pro</span>
            </span>
          </span>
          <span className="h-[12px] w-[14px] rounded-[3px] border-[1.5px] border-[#9aa1ad]" />
        </div>
        <div className="px-3 pt-2">
          {navV2.map((g) => (
            <div key={g.group} className="mt-3">
              <p className="px-2 text-[10.5px] text-[#9aa1ad]">{g.group}</p>
              <ul className="mt-1 flex flex-col gap-[1px]">
                {g.items.map((it) => {
                  const isOn = it === on;
                  return (
                    <li key={it} className={`relative flex items-center gap-2.5 rounded-[7px] px-2 py-[6px] text-[12px] ${isOn ? 'bg-[#f2f3f6] font-medium text-[#111827]' : 'text-[#4b5563]'}`}>
                      {isOn && <span className="absolute top-1 bottom-1 -left-3 w-[3px] rounded-r bg-[#3148ea]" />}
                      <V2Icon i={k++} />
                      {it}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col bg-[#f7f8fa]">
        <header className="flex h-[52px] shrink-0 items-center justify-end gap-3 border-b border-[#eef0f3] bg-white px-5">
          <span className="flex size-[28px] items-center justify-center rounded-full border border-[#e5e7eb]">
            <svg viewBox="0 0 24 24" className="size-[14px]" fill="none" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15zM10 20.5a2 2 0 0 0 4 0" />
            </svg>
          </span>
          <span className="h-5 w-px bg-[#e5e7eb]" />
          <span className="flex items-center gap-2 text-[12px] text-[#374151]">
            <img src="/assets/intro/user1.png" alt="" className="size-[26px] rounded-full object-cover" />
            <span className="leading-tight">
              <span className="block font-semibold">Alex Carter</span>
              <span className="block text-[10px] text-[#9aa1ad]">alex@example.com</span>
            </span>
            <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="#6b7280" strokeWidth="2" aria-hidden>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </header>
        <div className="min-h-0 flex-1 overflow-hidden p-5">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-[18px] font-semibold">{title}</h4>
            {actions}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

/** SubscriptionPro app chrome: sidebar + top bar, with the page content in the slot. */
export function AppShell({ active, title, actions, children }: { active: string; title: string; actions?: ReactNode; children: ReactNode }) {
  const style = useContext(ShellStyle);
  if (style === 'v2') return <AppShellV2 active={active} title={title} actions={actions}>{children}</AppShellV2>;
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
