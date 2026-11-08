import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ChatGptMark } from './Brand';
import { Container } from './Container';
import { Logo } from './Logo';
import { RollText } from './Roll';
import { pages, type PageId } from '../pages';


const logo = (src: string) => <img src={src} alt="" className="size-6 object-contain" />;
const categories: { name: string; tools: string; icon: ReactNode }[] = [
  { name: 'Productivity', tools: 'Notion, ClickUp, Microsoft 365', icon: logo('/assets/brands/notion.png') },
  { name: 'Design', tools: 'Adobe Creative Cloud, Canva', icon: logo('/assets/brands/adobe-cc.png') },
  { name: 'Communication', tools: 'Zoom, Google Workspace', icon: logo('/assets/brands/google.png') },
  { name: 'AI tools', tools: 'ChatGPT Team & Enterprise', icon: <ChatGptMark size={24} /> },
];

const ico = (bg: string, color: string, d: ReactNode) => (
  <span className="flex size-full items-center justify-center rounded-xl" style={{ background: bg, color }}>
    <svg viewBox="0 0 24 24" className="size-[22px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {d}
    </svg>
  </span>
);
const resources: { name: string; tools: string; icon: ReactNode }[] = [
  { name: 'Blog', tools: 'SaaS buying tips, savings and news', icon: ico('#fdeff7', '#c2398b', <path d="M4 20h4L19 9l-4-4L4 16v4zM13.5 6.5l4 4" />) },
  { name: 'Guides', tools: 'Step-by-step playbooks for teams', icon: ico('#eaf1ff', '#2557d6', <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 20.5A2.5 2.5 0 0 0 6.5 23H20" />) },
  { name: 'Help Center', tools: 'Answers to the most common questions', icon: ico('#e7f8f1', '#0f8a5f', <><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01" /></>) },
  { name: 'Changelog', tools: 'What’s new in SubscriptionPro', icon: ico('#fff4e5', '#b45309', <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 16l.9 2.1L22 19l-2.1.9L19 22l-.9-2.1L16 19l2.1-.9z" />) },
];

type Item = { name: string; tools: string; icon: ReactNode };

const Chevron = ({ open }: { open: boolean }) => (
  <svg viewBox="0 0 24 24" className={`size-[14px] transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

type Menu = 'home' | 'products' | 'resources' | null;

/** `overlay`: the header floats transparently inside the hero card (Home Two) instead of sitting on a white strip. */
export function Header({ page = 'home-1', overlay = false }: { page?: PageId; overlay?: boolean }) {
  const current = pages.find((p) => p.id === page) ?? pages[0];
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [menu, setMenu] = useState<Menu>(null);
  const closeTimer = useRef<number>();
  const headerRef = useRef<HTMLElement>(null);

  // Hover intent: open at once, close after a short grace period so the pointer can travel into the panel.
  const openMenu = (m: Menu) => {
    window.clearTimeout(closeTimer.current);
    setMenu(m);
  };
  const closeSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMenu(null), 140);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(null);
    const onClick = (e: MouseEvent) => !headerRef.current?.contains(e.target as Node) && setMenu(null);
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, []);

  const trigger = (m: Exclude<Menu, null>, label: string) => (
    <button
      type="button"
      className={`flex items-center gap-[8px] transition-colors hover:text-black ${menu === m ? 'text-black' : ''}`}
      aria-expanded={menu === m}
      aria-haspopup="true"
      onMouseEnter={() => openMenu(m)}
      onMouseLeave={closeSoon}
      onClick={() => setMenu((cur) => (cur === m ? null : m))}
    >
      {label}
      <Chevron open={menu === m} />
    </button>
  );

  return (
    <header ref={headerRef} className={overlay ? 'absolute inset-x-0 top-0 z-40 px-5 pt-5' : 'relative z-40 bg-white'}>
      <Container
        className={`relative flex items-center justify-between gap-6 ${overlay ? 'mt-4 h-[48px] lg:mt-[30px] lg:h-[43px] lg:pr-[30px] lg:pl-[33px]' : 'h-[88px] lg:h-[105px]'}`}
        // mega panels hang just below the menu row; the overlay row is shorter, so anchor them a bit lower
        style={overlay ? ({ '--menu-top': 'calc(100% + 6px)' } as React.CSSProperties) : undefined}
      >
        <div data-header-item>
          <Logo className={overlay ? 'w-[180px] lg:w-[200px] min-[1800px]:!w-[246px]' : 'w-[180px] lg:w-[200px] xl:w-[246px]'} />
        </div>

        <nav data-header-item aria-label="Main" className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-[22px] text-[16px] leading-[1.3] whitespace-nowrap text-ink lg:flex xl:gap-[30px] xl:text-[18px]">
          {/* Home One / Home Two switcher */}
          <div className="relative">
            {trigger('home', current.label)}
            <div
              onMouseEnter={() => openMenu('home')}
              onMouseLeave={closeSoon}
              className={`absolute top-full left-1/2 w-48 -translate-x-1/2 pt-4 transition-[opacity,margin,visibility] duration-200 ${
                menu === 'home' ? 'visible mt-0 opacity-100' : 'invisible -mt-1 opacity-0'
              }`}
            >
              <ul className="rounded-2xl border border-neutral-100 bg-white p-2 text-[16px] shadow-[0_30px_60px_-16px_rgba(20,20,43,0.3),0_10px_24px_-8px_rgba(20,20,43,0.12)]">
                {pages.map((p) => (
                  <li key={p.id}>
                    <a
                      href={p.href}
                      aria-current={p.id === page ? 'page' : undefined}
                      className={`flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-[#fbf3f8] ${p.id === page ? 'font-semibold text-black' : 'text-ink'}`}
                    >
                      {p.label}
                      {p.id === page && (
                        <svg viewBox="0 0 24 24" className="size-4 text-pink" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <path d="M5 12.5l4.5 4.5L19 7.5" />
                        </svg>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {trigger('products', 'Products')}
          <a href="#submit" className="transition-colors hover:text-black" onMouseEnter={() => setMenu(null)}>
            Submit Your Product
          </a>
          {trigger('resources', 'Resources')}
        </nav>

        <div data-header-item className="flex items-center gap-3">
          <a
            href="#account"
            className="btn-roll hidden rounded-full bg-black px-[25px] py-3 text-[14px] font-semibold tracking-[0.1455px] whitespace-nowrap text-white hover:bg-neutral-800 sm:inline-block"
          >
            <RollText>My account</RollText>
          </a>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-full border border-neutral-200 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 h-0.5 w-4 bg-black transition ${mobileOpen ? 'top-[5px] rotate-45' : 'top-0'}`} />
              <span className={`absolute top-[5px] left-0 h-0.5 w-4 bg-black transition ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`absolute left-0 h-0.5 w-4 bg-black transition ${mobileOpen ? 'top-[5px] -rotate-45' : 'top-[10px]'}`} />
            </span>
          </button>
        </div>

        {/* Mega menus (desktop): same centred panel, deep shadow */}
        {(
          [
            ['products', 'Browse by category', categories, '#products', 'Browse all 100+ products →', {
              img: '/assets/glance/bg-2.jpg', kicker: 'Featured', title: 'Save up to 40% on your next renewal', cta: 'Explore deals →',
            }],
            ['resources', 'Learn & get help', resources, '#resources', 'Browse all resources →', {
              img: '/assets/glance/bg-5.jpg', kicker: 'Guide · 6 min read', title: 'How to cut your SaaS spend by 30% this year', cta: 'Read the guide →', dark: true,
            }],
          ] as [Exclude<Menu, null>, string, Item[], string, string, { img: string; kicker: string; title: string; cta: string; dark?: boolean }][]
        ).map(([id, heading, items, href, more, feat]) => (
          <div
            key={id}
            onMouseEnter={() => openMenu(id)}
            onMouseLeave={closeSoon}
            className={`absolute top-[var(--menu-top,calc(100%-14px))] left-1/2 hidden w-[min(860px,calc(100%-40px))] -translate-x-1/2 pt-3 transition-[opacity,margin,visibility] duration-300 ease-out lg:block ${
              menu === id ? 'visible mt-0 opacity-100' : 'invisible -mt-2 opacity-0'
            }`}
          >
            <div className="grid grid-cols-[1fr_1fr_250px] gap-x-3 gap-y-1 rounded-[22px] border border-neutral-100 bg-white p-4 shadow-[0_50px_100px_-20px_rgba(20,20,43,0.35),0_24px_48px_-12px_rgba(20,20,43,0.18),0_2px_6px_rgba(20,20,43,0.04)]">
              <p className="col-span-2 px-3 pt-1 pb-2 text-[12px] font-semibold tracking-[0.08em] text-muted uppercase">{heading}</p>
              {items.map((c, i) => (
                <a
                  key={c.name}
                  href={href}
                  onClick={() => setMenu(null)}
                  className="group flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-[#fbf3f8]"
                  style={{ gridColumn: (i % 2) + 1, gridRow: Math.floor(i / 2) + 2 }}
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-neutral-100 bg-white transition-transform duration-300 group-hover:-rotate-6">
                    {c.icon}
                  </span>
                  <span>
                    <span className="block text-[16px] font-semibold text-black">{c.name}</span>
                    <span className="block text-[13.5px] text-muted">{c.tools}</span>
                  </span>
                </a>
              ))}
              <a href={href} onClick={() => setMenu(null)} className="col-span-2 mx-3 mt-1 border-t border-neutral-100 pt-3 text-[14px] font-semibold text-pink hover:underline">
                {more}
              </a>
              <a
                href={href}
                onClick={() => setMenu(null)}
                className={`group relative col-start-3 row-span-4 row-start-1 flex flex-col justify-end overflow-hidden rounded-2xl p-5 ${feat.dark ? 'text-[#1d1d2b]' : 'text-white'}`}
              >
                <img src={feat.img} alt="" className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="relative text-[12px] font-bold tracking-[0.08em] uppercase opacity-85">{feat.kicker}</span>
                <span className="relative mt-1.5 text-[19px] leading-tight font-bold">{feat.title}</span>
                <span className="relative mt-3 text-[14px] font-semibold">{feat.cta}</span>
              </a>
            </div>
          </div>
        ))}
      </Container>

      {/* Mobile menu */}
      {mobileOpen && (
        <Container className={`lg:hidden ${overlay ? 'pt-3' : 'pb-4'}`}>
          <nav aria-label="Mobile" className="flex flex-col rounded-2xl border border-neutral-100 bg-white p-2 text-[18px] text-ink shadow-[0_20px_50px_-12px_rgba(20,20,43,0.25)]">
            <div>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 hover:bg-neutral-50"
                aria-expanded={mobileSection === 'home'}
                onClick={() => setMobileSection((v) => (v === 'home' ? null : 'home'))}
              >
                {current.label}
                <Chevron open={mobileSection === 'home'} />
              </button>
              {mobileSection === 'home' && (
                <div className="mb-1 flex flex-col gap-1 px-1">
                  {pages.map((p) => (
                    <a
                      key={p.id}
                      href={p.href}
                      aria-current={p.id === page ? 'page' : undefined}
                      className={`rounded-xl px-3 py-2 text-[16px] hover:bg-[#fbf3f8] ${p.id === page ? 'bg-[#fbf3f8] font-semibold text-black' : ''}`}
                    >
                      {p.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
            {(
              [
                ['products', 'Products', categories, '#products'],
                ['resources', 'Resources', resources, '#resources'],
              ] as [string, string, Item[], string][]
            ).map(([id, label, items, href], k) => (
              <div key={id}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 hover:bg-neutral-50"
                  aria-expanded={mobileSection === id}
                  onClick={() => setMobileSection((v) => (v === id ? null : id))}
                >
                  {label}
                  <Chevron open={mobileSection === id} />
                </button>
                {mobileSection === id && (
                  <div className="mb-1 grid gap-1 px-1 sm:grid-cols-2">
                    {items.map((c) => (
                      <a key={c.name} href={href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 rounded-xl p-2 hover:bg-[#fbf3f8]">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-neutral-100 bg-white">{c.icon}</span>
                        <span>
                          <span className="block text-[15px] font-semibold text-black">{c.name}</span>
                          <span className="block text-[12.5px] text-muted">{c.tools}</span>
                        </span>
                      </a>
                    ))}
                  </div>
                )}
                {k === 0 && (
                  <a href="#submit" className="block rounded-xl px-3 py-2.5 hover:bg-neutral-50">
                    Submit Your Product
                  </a>
                )}
              </div>
            ))}
            <a href="#account" className="btn-roll mt-2 flex justify-center rounded-full bg-black px-5 py-3 text-[15px] font-semibold text-white sm:hidden">
              <RollText>My account</RollText>
            </a>
          </nav>
        </Container>
      )}
    </header>
  );
}
