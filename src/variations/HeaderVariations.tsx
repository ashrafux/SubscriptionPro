import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { Logo, LogoMark } from '../components/Logo';
import { RollIcon, RollText } from '../components/Roll';
import { ChatGptMark } from '../components/Brand';

/* Ten header / menu variations for SubscriptionPro, shown on a stage that mimics the top of the hero. */

const links = ['Products', 'Submit Your Product', 'Resources'];
const resources = ['Blog', 'Guides', 'Help Center', 'Changelog'];

const Chevron = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`size-[14px] ${className}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);
const Arrow = ({ dark = false }: { dark?: boolean }) => (
  <RollIcon size={18}>
    <img src="/assets/hero/arrow-up-right.svg" alt="" width={18} height={18} className={dark ? 'invert' : ''} />
  </RollIcon>
);

function Dropdown({ label, tone = 'light', className = '' }: { label: string; tone?: 'light' | 'dark'; className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`relative ${className}`} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button type="button" className="flex items-center gap-1.5" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        {label}
        <Chevron className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-1/2 z-20 w-48 -translate-x-1/2 pt-3">
          <ul className={`rounded-2xl p-2 text-[15px] shadow-[0_16px_40px_rgba(20,20,43,0.14)] ${tone === 'dark' ? 'bg-[#1d1d2b] text-white' : 'border border-neutral-100 bg-white text-ink'}`}>
            {resources.map((r) => (
              <li key={r}>
                <a href="#" className={`block rounded-xl px-3 py-2 ${tone === 'dark' ? 'hover:bg-white/10' : 'hover:bg-neutral-50'}`}>{r}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const Btn = ({ children, className = '', arrow = false, darkArrow = false }: { children: ReactNode; className?: string; arrow?: boolean; darkArrow?: boolean }) => (
  <a href="#" className={`btn-roll inline-flex items-center gap-2 rounded-full text-[14px] font-semibold whitespace-nowrap ${className}`}>
    <RollText>{children}</RollText>
    {arrow && <Arrow dark={darkArrow} />}
  </a>
);

/* 01 · Classic — current layout, refined */
function V1() {
  return (
    <header className="flex h-[88px] items-center justify-between bg-white px-10">
      <Logo className="w-[210px]" />
      <nav className="flex items-center gap-8 text-[17px] text-ink">
        <a href="#" className="hover:text-black">Products</a>
        <a href="#" className="hover:text-black">Submit Your Product</a>
        <Dropdown label="Resources" />
      </nav>
      <Btn className="bg-black px-6 py-3 text-white hover:bg-neutral-800">My account</Btn>
    </header>
  );
}

/* 02 · Floating glass pill */
function V2() {
  return (
    <header className="mx-auto mt-5 flex h-[68px] max-w-[1080px] items-center justify-between rounded-full border border-white/60 bg-white/55 pr-2 pl-6 shadow-[0_10px_40px_rgba(30,40,120,0.12)] backdrop-blur-xl">
      <Logo className="w-[180px]" />
      <nav className="flex items-center gap-7 text-[16px] text-ink">
        <a href="#">Products</a>
        <a href="#">Submit Your Product</a>
        <Dropdown label="Resources" />
      </nav>
      <Btn arrow className="bg-pink py-3 pr-4 pl-6 text-white hover:brightness-95">Get Started</Btn>
    </header>
  );
}

/* 03 · Split pills */
function V3() {
  return (
    <header className="flex items-center justify-between px-8 pt-5">
      <span className="rounded-full bg-white px-5 py-3 shadow-[0_6px_20px_rgba(20,20,43,0.06)]">
        <Logo className="w-[170px]" />
      </span>
      <nav className="flex items-center gap-1 rounded-full bg-white/70 p-1.5 text-[15px] text-ink shadow-[0_6px_20px_rgba(20,20,43,0.06)] backdrop-blur">
        {['Products', 'Submit Your Product'].map((l) => (
          <a key={l} href="#" className="rounded-full px-4 py-2 hover:bg-white">{l}</a>
        ))}
        <Dropdown label="Resources" className="rounded-full px-4 py-2 hover:bg-white" />
      </nav>
      <span className="flex gap-2 rounded-full bg-white p-1.5 shadow-[0_6px_20px_rgba(20,20,43,0.06)]">
        <Btn className="px-5 py-2.5 text-ink hover:bg-neutral-100">Log in</Btn>
        <Btn className="bg-black px-5 py-2.5 text-white">My account</Btn>
      </span>
    </header>
  );
}

/* 04 · Dark bar */
function V4() {
  return (
    <header className="flex h-[84px] items-center justify-between bg-forest px-10 text-white">
      <Logo onDark className="w-[200px]" />
      <nav className="flex items-center gap-8 text-[16px] text-white/80">
        <a href="#" className="hover:text-white">Products</a>
        <a href="#" className="hover:text-white">Submit Your Product</a>
        <Dropdown label="Resources" tone="dark" className="hover:text-white" />
      </nav>
      <div className="flex items-center gap-3">
        <Btn className="px-4 py-3 text-white/80 hover:text-white">Sign in</Btn>
        <Btn arrow className="bg-pink py-3 pr-4 pl-6 text-white hover:brightness-95">Get Started</Btn>
      </div>
    </header>
  );
}

/* 05 · Announcement strip + header */
function V5() {
  return (
    <header>
      <a href="#" className="group flex h-10 items-center justify-center gap-2 rounded-t-[20px] bg-[linear-gradient(90deg,#e15aab,#8b5cf6,#3148ea)] text-[13.5px] font-medium text-white">
        <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-bold tracking-wide uppercase">New</span>
        Save up to 40% on Google Workspace renewals this month
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </a>
      <div className="flex h-[80px] items-center justify-between bg-white px-10">
        <Logo className="w-[200px]" />
        <nav className="flex items-center gap-8 text-[16px] text-ink">
          <a href="#">Products</a>
          <a href="#">Submit Your Product</a>
          <Dropdown label="Resources" />
          <a href="#" className="flex items-center gap-1.5">
            Deals <span className="rounded-full bg-[#fdeff7] px-1.5 py-0.5 text-[10.5px] font-bold text-pink">HOT</span>
          </a>
        </nav>
        <Btn className="bg-black px-6 py-3 text-white hover:bg-neutral-800">My account</Btn>
      </div>
    </header>
  );
}

/* 06 · Centred logo, split navigation */
function V6() {
  return (
    <header className="grid h-[88px] grid-cols-[1fr_auto_1fr] items-center bg-white px-10 text-[16px] text-ink">
      <nav className="flex items-center gap-8">
        <a href="#">Products</a>
        <a href="#">Submit Your Product</a>
      </nav>
      <Logo className="w-[220px]" />
      <div className="flex items-center justify-end gap-8">
        <Dropdown label="Resources" />
        <Btn className="border border-black px-6 py-3 hover:bg-black hover:text-white">My account</Btn>
      </div>
    </header>
  );
}

/* 07 · Mega menu */
function V7() {
  const [open, setOpen] = useState(false);
  const img = (src: string) => <img src={src} alt="" className="size-6 object-contain" />;
  const cats: [string, string, ReactNode][] = [
    ['Productivity', 'Notion, ClickUp, Microsoft 365', img('/assets/brands/notion.png')],
    ['Design', 'Adobe CC, Canva', img('/assets/brands/adobe-cc.png')],
    ['Communication', 'Zoom, Google Workspace', img('/assets/brands/google.png')],
    ['AI tools', 'ChatGPT Team & Enterprise', <ChatGptMark key="g" size={24} />],
  ];
  return (
    <header className="relative bg-white" onMouseLeave={() => setOpen(false)}>
      <div className="flex h-[84px] items-center justify-between px-10">
        <Logo className="w-[200px]" />
        <nav className="flex items-center gap-8 text-[16px] text-ink">
          <button type="button" onMouseEnter={() => setOpen(true)} onClick={() => setOpen((v) => !v)} className={`flex items-center gap-1.5 ${open ? 'text-pink' : ''}`}>
            Products <Chevron className={`transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
          <a href="#" onMouseEnter={() => setOpen(false)}>Submit Your Product</a>
          <span onMouseEnter={() => setOpen(false)}>
            <Dropdown label="Resources" />
          </span>
        </nav>
        <Btn className="bg-black px-6 py-3 text-white hover:bg-neutral-800">My account</Btn>
      </div>
      <div
        className={`absolute inset-x-6 top-full z-30 grid grid-cols-[1fr_1fr_300px] gap-6 rounded-[20px] border border-neutral-100 bg-white p-6 shadow-[0_30px_60px_rgba(20,20,43,0.14)] transition-all duration-300 ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
        }`}
      >
        {cats.map(([t, d, icon]) => (
          <a key={t} href="#" className="flex items-center gap-3 rounded-2xl p-3 hover:bg-neutral-50">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-neutral-100 bg-white">
              {icon}
            </span>
            <span>
              <span className="block text-[15px] font-semibold">{t}</span>
              <span className="block text-[13px] text-muted">{d}</span>
            </span>
          </a>
        ))}
        <a href="#" className="col-start-3 row-span-2 row-start-1 flex flex-col justify-end rounded-2xl bg-[linear-gradient(150deg,#e15aab,#8b5cf6)] p-5 text-white">
          <span className="text-[12px] font-bold tracking-wide uppercase opacity-80">Featured</span>
          <span className="mt-1 text-[20px] leading-tight font-bold">Save 40% on your next renewal</span>
          <span className="mt-3 text-[13px] font-semibold">Explore 100+ products →</span>
        </a>
      </div>
    </header>
  );
}

/* 08 · Sliding underline */
function V8() {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const refs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [bar, setBar] = useState({ left: 0, width: 0 });
  const items = ['Products', 'Submit Your Product', 'Resources', 'Pricing'];
  const target = hover ?? active;
  useLayoutEffect(() => {
    const el = refs.current[target];
    if (el) setBar({ left: el.offsetLeft, width: el.offsetWidth });
  }, [target]);
  return (
    <header className="flex h-[88px] items-center justify-between border-b border-neutral-100 bg-white px-10">
      <Logo className="w-[200px]" />
      <nav className="relative flex items-center gap-9 text-[16px]" onMouseLeave={() => setHover(null)}>
        {items.map((l, i) => (
          <a
            key={l}
            ref={(el) => void (refs.current[i] = el)}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActive(i);
            }}
            onMouseEnter={() => setHover(i)}
            className={`py-2 transition-colors ${i === target ? 'text-black' : 'text-[#6b7280]'}`}
          >
            {l}
          </a>
        ))}
        <span className="absolute -bottom-[1px] h-[2.5px] rounded-full bg-pink transition-all duration-300 ease-out" style={{ left: bar.left, width: bar.width }} />
      </nav>
      <div className="flex items-center gap-3">
        <Btn className="border border-neutral-200 px-5 py-3 text-ink hover:border-black">Log in</Btn>
        <Btn arrow darkArrow className="bg-[#f3f4f6] py-3 pr-4 pl-5 text-black hover:bg-[#e5e7eb]">Get Started</Btn>
      </div>
    </header>
  );
}

/* 09 · Segmented control */
function V9() {
  const [active, setActive] = useState(0);
  const items = ['Products', 'Submit Your Product', 'Resources'];
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = useState({ left: 4, width: 0 });
  useLayoutEffect(() => {
    const el = refs.current[active];
    if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth });
  }, [active]);
  return (
    <header className="flex h-[88px] items-center justify-between bg-white px-10">
      <Logo className="w-[200px]" />
      <nav className="relative flex rounded-full bg-[#f1f1f3] p-1 text-[15px]">
        <span className="absolute top-1 bottom-1 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out" style={{ left: pill.left, width: pill.width }} />
        {items.map((l, i) => (
          <button
            key={l}
            ref={(el) => void (refs.current[i] = el)}
            type="button"
            onClick={() => setActive(i)}
            className={`relative rounded-full px-5 py-2.5 transition-colors ${i === active ? 'text-black' : 'text-[#6b7280] hover:text-black'}`}
          >
            {l}
          </button>
        ))}
      </nav>
      <Btn className="bg-black px-6 py-3 text-white hover:bg-neutral-800">My account</Btn>
    </header>
  );
}

/* 10 · App-style with search and account chip */
function V10() {
  return (
    <header className="flex h-[84px] items-center gap-6 bg-white px-10">
      <Logo className="w-[190px] shrink-0" />
      <label className="flex h-11 max-w-[380px] flex-1 items-center gap-2.5 rounded-full border border-neutral-200 bg-[#fafafa] px-4 text-[14px] text-[#9aa1ad] focus-within:border-pink">
        <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <input placeholder="Search 100+ SaaS tools…" className="w-full bg-transparent text-ink outline-none placeholder:text-[#9aa1ad]" />
        <kbd className="rounded-md border border-neutral-200 bg-white px-1.5 text-[11px] text-[#6b7280]">⌘K</kbd>
      </label>
      <nav className="ml-auto flex items-center gap-7 text-[15.5px] text-ink">
        <a href="#">Products</a>
        <a href="#">Submit</a>
        <Dropdown label="Resources" />
      </nav>
      <a href="#" className="flex items-center gap-2.5 rounded-full border border-neutral-200 py-1 pr-3 pl-1 hover:border-neutral-300">
        <img src="/assets/intro/user1.png" alt="" className="size-9 rounded-full object-cover" />
        <span className="text-[14px] font-semibold">My account</span>
        <Chevron />
      </a>
    </header>
  );
}

const variants: { name: string; note: string; El: () => JSX.Element; stage?: 'hero' | 'plain' }[] = [
  { name: 'Classic', note: 'Today’s layout, tightened: logo left, centred links, black account pill.', El: V1 },
  { name: 'Floating glass pill', note: 'A detached, blurred pill floating over the hero, with a pink Get Started CTA.', El: V2, stage: 'hero' },
  { name: 'Split pills', note: 'Logo, links and actions each in their own soft pill; Log in + My account.', El: V3, stage: 'hero' },
  { name: 'Dark bar', note: 'Forest-green bar (footer colour) with a white wordmark, Sign in + pink CTA.', El: V4 },
  { name: 'Announcement strip', note: 'A gradient promo bar above a classic header, plus a “Deals · HOT” link.', El: V5 },
  { name: 'Centred logo', note: 'Logo in the middle, links split either side, outlined account button.', El: V6 },
  { name: 'Mega menu', note: 'Hover Products for a categories panel with a featured promo card.', El: V7 },
  { name: 'Sliding underline', note: 'A pink underline glides to whichever link you hover or click.', El: V8 },
  { name: 'Segmented control', note: 'Links inside a grey track with a sliding white pill, like the dashboard tabs.', El: V9 },
  { name: 'App-style with search', note: 'Search bar with ⌘K, compact links and an avatar account chip.', El: V10 },
];

export function HeaderVariations() {
  return (
    <div className="min-h-screen bg-[#f4f4f6] px-5 py-12 font-sans">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark height={34} />
              <h1 className="text-[34px] font-bold tracking-tight">Header variations</h1>
            </div>
            <p className="mt-2 text-[16px] text-muted">Ten directions for the site menu. All are live: hover the links, open Resources, try the indicators.</p>
          </div>
          <a href="/" className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-[14px] font-semibold hover:border-black">← Back to site</a>
        </div>

        <ol className="mt-10 flex flex-col gap-10">
          {variants.map(({ name, note, El, stage }, i) => (
            <li key={name} id={`v${i + 1}`}>
              <div className="mb-3 flex items-baseline gap-3">
                <span className="text-[14px] font-bold text-pink">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="text-[20px] font-bold">{name}</h2>
                <p className="text-[14px] text-muted">{note}</p>
              </div>
              <div className="relative overflow-visible rounded-[20px] bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)]">
                <div className="relative h-[230px] overflow-hidden rounded-[20px]">
                  {stage === 'hero' ? (
                    <img src="/assets/hero/hero-bg.jpg" alt="" className="absolute inset-0 size-full object-cover object-top" />
                  ) : (
                    <div className="absolute inset-x-0 top-[100px] bottom-0 m-3 mt-0 overflow-hidden rounded-[16px]">
                      <img src="/assets/hero/hero-bg.jpg" alt="" className="size-full object-cover object-top" />
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-6 text-center font-display text-[40px] font-bold text-title/90">Manage Your 100+ Subscription</div>
                </div>
                {/* header sits on top, outside the clipped stage so dropdowns can overflow */}
                <div className="absolute inset-x-0 top-0 z-10 [&>header]:rounded-t-[20px]">
                  <El />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
