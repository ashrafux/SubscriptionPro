import type { CSSProperties, ReactNode } from 'react';
import { PillButton } from '../../components/PillButton';
import { ChatGptMark, ZoomMark } from '../../components/Brand';
import { LogoMark } from '../../components/Logo';
import { Option } from './Option';

/* "Get the Best of SaaS Without Breaking the Bank" CTA — six totally different layouts, same copy and logos. */

const im = (src: string, w = 60, h = w) => <img src={src} alt="" style={{ width: w, height: h }} className="object-contain" />;
const LOGOS: ReactNode[] = [
  <img key="c" src="/assets/products/clickup.svg" alt="" width={46} height={55} />,
  im('/assets/brands/microsoft365.png', 56, 60),
  im('/assets/brands/google.png', 56),
  im('/assets/brands/canva.png', 60),
  <ChatGptMark key="g" size={58} />,
  im('/assets/brands/adobe-cc.png', 56, 54),
  im('/assets/brands/notion.png', 52),
  <ZoomMark key="z" size={58} />,
  im('/assets/cta/d-app.png', 58),
  im('/assets/cta/bubble.png', 80),
  im('/assets/cta/stripes.png', 100, 50),
  im('/assets/cta/dropbox.png', 56, 52),
  im('/assets/cta/chat-green.png', 56),
  im('/assets/cta/filmora.png', 54),
  im('/assets/cta/u-app.png', 96, 56),
  im('/assets/cta/check.png', 74, 52),
];

function Tile({ children, size = 110, className = '', style }: { children: ReactNode; size?: number; className?: string; style?: CSSProperties }) {
  const s = size / 130;
  return (
    <div className={`flex shrink-0 items-center justify-center bg-white shadow-[0_8px_24px_rgba(40,40,90,0.08)] ${className}`} style={{ width: size, height: size, borderRadius: 22 * s, ...style }}>
      <span className="flex items-center justify-center" style={{ transform: `scale(${s})` }}>
        {children}
      </span>
    </div>
  );
}

function Hub({ size = 150 }: { size?: number }) {
  return (
    <div className="flex shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#f7a8d6,#e15aab_45%,#f1b13b_100%)] shadow-[0_18px_40px_rgba(225,90,171,0.35)]" style={{ width: size, height: size }}>
      <LogoMark height={size * 0.38} white />
    </div>
  );
}

function Copy({ align = 'center', dark = false }: { align?: 'center' | 'left'; dark?: boolean }) {
  return (
    <div className={align === 'center' ? 'mx-auto flex max-w-[800px] flex-col items-center text-center' : 'flex max-w-[560px] flex-col items-start'}>
      <h2 className={`font-display text-[54px] leading-[1.1] font-bold ${dark ? 'text-white' : 'text-title'}`}>Get the Best of SaaS Without Breaking the Bank</h2>
      <p className={`mt-5 max-w-[440px] text-[18px] leading-[1.45] ${dark ? 'text-white/70' : 'text-body'}`}>Stop Overspending on Software. Save Big on Every Tool You Use.</p>
      <div className="mt-9 flex gap-4">
        <PillButton variant="pink" arrow>Get Started</PillButton>
        <PillButton variant="light">Talk to Sale</PillButton>
      </div>
    </div>
  );
}

function Band({ children, className = '', bg = true }: { children: ReactNode; className?: string; bg?: boolean }) {
  return (
    <div className="px-5 py-5">
      <div className={`relative mx-auto max-w-[1880px] overflow-hidden rounded-[20px] ${className}`}>
        {bg && <img src="/assets/cta/cta-bg.jpg" alt="" className="pointer-events-none absolute inset-0 size-full object-cover" />}
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}

/** A — Logo marquee: copy on top, two rows of tiles drifting in opposite directions underneath. */
function A() {
  const Row = ({ items, reverse }: { items: ReactNode[]; reverse?: boolean }) => (
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <div className="flex w-max gap-5 py-2" style={{ animation: `cta-marquee 40s linear infinite ${reverse ? 'reverse' : ''}` }}>
        {[...items, ...items].map((l, i) => (
          <Tile key={i}>{l}</Tile>
        ))}
      </div>
    </div>
  );
  return (
    <Band className="py-24">
      <style>{'@keyframes cta-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}'}</style>
      <Copy />
      <div className="mt-20 flex flex-col gap-4">
        <Row items={LOGOS.slice(0, 8)} />
        <Row items={LOGOS.slice(8)} reverse />
      </div>
    </Band>
  );
}

/** B — Orbit: the SubscriptionPro hub in the middle with every tool on two slowly turning rings; copy above. */
function B() {
  const ring = (items: ReactNode[], r: number, dur: number, rev = false, size = 84) => (
    <div className="absolute top-1/2 left-1/2" style={{ width: r * 2, height: r * 2, marginLeft: -r, marginTop: -r, animation: `cta-spin ${dur}s linear infinite ${rev ? 'reverse' : ''}` }}>
      <div className="absolute inset-0 rounded-full border border-dashed border-[#3b3b55]/25" />
      {items.map((l, i) => {
        const a = (i / items.length) * Math.PI * 2;
        return (
          <div key={i} className="absolute" style={{ left: r + Math.cos(a) * r - size / 2, top: r + Math.sin(a) * r - size / 2, animation: `cta-spin ${dur}s linear infinite ${rev ? '' : 'reverse'}` }}>
            <Tile size={size}>{l}</Tile>
          </div>
        );
      })}
    </div>
  );
  return (
    <Band className="pt-24">
      <style>{'@keyframes cta-spin{to{transform:rotate(360deg)}}'}</style>
      <Copy />
      <div className="relative mx-auto mt-6 h-[560px] max-w-[1100px] overflow-hidden [mask-image:linear-gradient(transparent,#000_14%,#000_86%,transparent)]">
        <div className="absolute inset-x-0 top-[-220px] h-[1000px]">
          {ring(LOGOS.slice(0, 6), 230, 60)}
          {ring(LOGOS.slice(6), 420, 90, true, 92)}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Hub size={170} />
          </div>
        </div>
      </div>
    </Band>
  );
}

/** C — Split: copy and buttons left, a 4×4 logo wall right with the pink hub as one of the tiles. */
function C() {
  const wall = [...LOGOS.slice(0, 5), 'hub', ...LOGOS.slice(5, 15)] as (ReactNode | 'hub')[];
  return (
    <Band className="px-16 py-24">
      <div className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)_auto] items-center gap-20">
        <div className="relative">
          <div aria-hidden className="absolute -inset-x-16 -inset-y-14 rounded-full bg-white/70 blur-3xl" />
          <div className="relative">
            <Copy align="left" />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 [transform:perspective(1400px)_rotateY(-14deg)_rotateX(6deg)]">
          {wall.map((l, i) =>
            l === 'hub' ? (
              <div key={i} className="flex size-[110px] items-center justify-center rounded-[19px] bg-[radial-gradient(circle_at_35%_30%,#f7a8d6,#e15aab_45%,#f1b13b_100%)] shadow-[0_18px_40px_rgba(225,90,171,0.4)]">
                <LogoMark height={42} white />
              </div>
            ) : (
              <Tile key={i}>{l}</Tile>
            ),
          )}
        </div>
      </div>
    </Band>
  );
}

/** D — Constellation: tiles scattered around the centred copy at different sizes and tilts, nothing below. */
function D() {
  const spots = [
    { l: '6%', t: '10%', s: 96, r: -8 }, { l: '17%', t: '42%', s: 120, r: 6 }, { l: '4%', t: '70%', s: 88, r: 10 },
    { l: '22%', t: '78%', s: 76, r: -6 }, { l: '25%', t: '8%', s: 72, r: 4 }, { l: '12%', t: '-4%', s: 64, r: 0 },
    { l: '86%', t: '8%', s: 100, r: 8 }, { l: '76%', t: '38%', s: 118, r: -6 }, { l: '89%', t: '66%', s: 90, r: -10 },
    { l: '70%', t: '78%', s: 78, r: 6 }, { l: '68%', t: '6%', s: 70, r: -4 }, { l: '80%', t: '-4%', s: 62, r: 0 },
  ];
  return (
    <Band className="py-32">
      <div className="pointer-events-none absolute inset-0 hidden xl:block">
        {spots.map((p, i) => (
          <div key={i} className="absolute" style={{ left: p.l, top: p.t }}>
            <Tile size={p.s} style={{ transform: `rotate(${p.r}deg)` }}>{LOGOS[i]}</Tile>
          </div>
        ))}
      </div>
      <div className="relative py-10">
        <div className="mb-8 flex justify-center">
          <Hub size={96} />
        </div>
        <Copy />
      </div>
    </Band>
  );
}

/** E — Dark card: a deep navy panel with a pink glow, logos as a faded wall behind the copy. */
function E() {
  return (
    <Band bg={false} className="bg-[#14152b] py-28">
      <div aria-hidden className="absolute inset-0 grid grid-cols-8 content-center gap-5 px-10 opacity-[0.16] [mask-image:radial-gradient(ellipse_at_center,transparent_25%,#000_75%)]">
        {[...LOGOS, ...LOGOS].map((l, i) => (
          <Tile key={i} size={120}>{l}</Tile>
        ))}
      </div>
      <div aria-hidden className="absolute top-1/2 left-1/2 h-[420px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(225,90,171,0.45),transparent)] blur-2xl" />
      <div className="relative">
        <div className="mb-8 flex justify-center">
          <Hub size={90} />
        </div>
        <Copy dark />
      </div>
    </Band>
  );
}

/** F — Savings banner: a compact two-column strip with a big “40%” and a row of tool faces; lowest height. */
function F() {
  return (
    <Band className="px-16 py-16">
      <div className="mx-auto grid max-w-[1400px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-14 rounded-[28px] bg-white/70 p-12 backdrop-blur-md">
        <div className="text-center">
          <p className="font-display text-[110px] leading-none font-bold text-pink">40%</p>
          <p className="mt-2 font-poppins text-[14px] tracking-[0.2em] text-muted uppercase">Up to, on renewals</p>
        </div>
        <div>
          <h2 className="font-display text-[40px] leading-[1.15] font-bold text-title">Get the Best of SaaS Without Breaking the Bank</h2>
          <div className="mt-6 flex items-center gap-4">
            <span className="flex">
              {LOGOS.slice(0, 7).map((l, i) => (
                <span key={i} className="-mr-3 rounded-full border-[3px] border-white">
                  <span className="flex size-12 items-center justify-center overflow-hidden rounded-full bg-white">
                    <span className="scale-[0.6]">{l}</span>
                  </span>
                </span>
              ))}
            </span>
            <span className="ml-3 text-[15px] text-body">100+ tools at partner prices</span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <PillButton variant="pink" arrow className="justify-center">Get Started</PillButton>
          <PillButton variant="light" className="justify-center">Talk to Sale</PillButton>
        </div>
      </div>
    </Band>
  );
}

export const ctaOptions = [
  { code: 'A', name: 'Logo marquee', note: 'Copy and buttons on top; two rows of logo tiles drift in opposite directions underneath. Always moving.', C: A },
  { code: 'B', name: 'Orbit', note: 'The pink SubscriptionPro hub in the middle with every tool on two slowly turning dashed rings.', C: B },
  { code: 'C', name: 'Split + logo wall', note: 'Copy left; a 4×4 wall of tiles in light 3D perspective on the right, with the hub as one tile.', C: C },
  { code: 'D', name: 'Constellation', note: 'Tiles scattered around the centred copy at different sizes and tilts; nothing underneath, shorter section.', C: D },
  { code: 'E', name: 'Dark card', note: 'Deep navy panel with a pink glow; the logos become a faded wall behind the copy. Strong contrast before the footer.', C: E },
  { code: 'F', name: 'Savings banner', note: 'Compact strip: a big pink “40%”, the headline with a row of tool faces, and stacked buttons. Lowest height.', C: F },
];

export function CtaOptions() {
  return (
    <>
      {ctaOptions.map(({ code, name, note, C }) => (
        <Option key={code} id={`cta-${code.toLowerCase()}`} code={code} name={name} note={note}>
          <C />
        </Option>
      ))}
    </>
  );
}
