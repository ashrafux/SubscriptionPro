import { useState, type ReactNode } from 'react';
import { TiltBadge } from '../../components/Badge';
import { features, type Feature } from '../../components/apart/features';
import { FeatureVisual } from '../../components/apart/FeatureVisual';
import { Option } from './Option';

/* "What Sets SubscriptionPro Apart" — six layouts that leave the pinned number stepper behind. */

const pad = (i: number) => String(i + 1).padStart(2, '0');
const sub = 'Unlock partner-exclusive SaaS deals, save on renewals, and manage your stack from one dashboard.';

function Band({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className="px-5 py-5">
      <div className={`mx-auto max-w-[1880px] overflow-hidden rounded-[20px] bg-apart px-5 py-20 ${className}`}>
        <div className="mx-auto max-w-[1496px]">{children}</div>
      </div>
    </div>
  );
}

function Heading({ align = 'center', light = false }: { align?: 'center' | 'left'; light?: boolean }) {
  return (
    <div className={align === 'center' ? 'mx-auto flex max-w-[640px] flex-col items-center text-center' : 'flex max-w-[560px] flex-col items-start'}>
      <TiltBadge className="mb-3 bg-mint">Why choose</TiltBadge>
      <h2 className={`text-[52px] leading-[1.1] font-bold tracking-[0.5px] ${light ? 'text-white' : ''}`}>What Sets SubscriptionPro Apart</h2>
      <p className={`mt-5 text-[17px] leading-[1.5] ${light ? 'text-white/70' : 'text-black/65'}`}>{sub}</p>
    </div>
  );
}

const Check = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`size-[14px] ${className}`} fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

function Points({ f, className = '' }: { f: Feature; className?: string }) {
  return (
    <ul className={`flex flex-col gap-2 text-[15px] leading-[1.45] text-black/70 ${className}`}>
      {f.points.map((p) => (
        <li key={p} className="flex items-start gap-3">
          <span className="mt-[2px] flex size-[22px] shrink-0 items-center justify-center rounded-full bg-white">
            <Check className="text-black" />
          </span>
          {p}
        </li>
      ))}
    </ul>
  );
}

/** A — Bento grid: two big screen tiles, four compact text tiles. */
function A() {
  const [f0, f1, f2, f3, f4, f5] = features;
  const Small = ({ f, i }: { f: Feature; i: number }) => (
    <div className="flex flex-col justify-between rounded-[20px] bg-white/70 p-7 backdrop-blur">
      <span className="text-[14px] font-semibold text-[#6d1b62]">{pad(i)}</span>
      <div>
        <h3 className="text-[22px] leading-[1.25] font-bold">{f.title}</h3>
        <p className="mt-2 text-[15px] leading-[1.5] text-black/65">{f.headline}</p>
      </div>
    </div>
  );
  const Big = ({ f, i, className }: { f: Feature; i: number; className: string }) => (
    <div className={`flex flex-col overflow-hidden rounded-[20px] bg-white ${className}`}>
      <div className="flex items-start justify-between gap-6 p-7 pb-5">
        <div>
          <span className="text-[14px] font-semibold text-[#6d1b62]">{pad(i)}</span>
          <h3 className="mt-2 text-[26px] leading-[1.2] font-bold">{f.title}</h3>
        </div>
        <p className="max-w-[300px] text-[15px] leading-[1.5] text-black/65">{f.headline}</p>
      </div>
      <div className="relative min-h-0 flex-1 px-4 pb-4">
        <FeatureVisual feature={f} />
      </div>
    </div>
  );
  return (
    <Band>
      <div className="flex items-end justify-between">
        <Heading align="left" />
      </div>
      <div className="mt-12 grid grid-cols-4 grid-rows-[260px_260px_260px] gap-5">
        <Big f={f0} i={0} className="col-span-2 row-span-2" />
        <Small f={f1} i={1} />
        <Small f={f2} i={2} />
        <Big f={f3} i={3} className="col-span-2 row-span-2" />
        <Small f={f4} i={4} />
        <Small f={f5} i={5} />
      </div>
    </Band>
  );
}

/** B — Horizontal accordion: hover a slim column and it opens into the full feature. */
function B() {
  const [open, setOpen] = useState(0);
  return (
    <Band>
      <Heading />
      <div className="mt-14 flex h-[560px] gap-3">
        {features.map((f, i) => {
          const on = i === open;
          return (
            <div
              key={f.title}
              onMouseEnter={() => setOpen(i)}
              className={`relative overflow-hidden rounded-[20px] transition-[flex-grow] duration-700 ease-[cubic-bezier(.62,.05,.32,1)] ${on ? 'grow-[6] bg-white' : 'grow bg-white/55 hover:bg-white/80'}`}
              style={{ flexBasis: 0 }}
            >
              {on ? (
                <div className="grid size-full grid-cols-[300px_1fr] gap-6 p-6">
                  <div className="flex flex-col justify-between py-3 pl-3">
                    <span className="text-[56px] leading-none font-light text-[#6d1b62]">{pad(i)}</span>
                    <div>
                      <h3 className="text-[28px] leading-[1.2] font-bold">{f.title}</h3>
                      <p className="mt-3 text-[16px] leading-[1.5] text-black/65">{f.headline}</p>
                      <Points f={f} className="mt-5 [&_span]:bg-apart" />
                    </div>
                  </div>
                  <FeatureVisual feature={f} />
                </div>
              ) : (
                <div className="flex size-full flex-col items-center justify-between py-7">
                  <span className="text-[18px] font-semibold text-[#6d1b62]">{pad(i)}</span>
                  <span className="text-[20px] font-bold whitespace-nowrap [writing-mode:vertical-rl] rotate-180">{f.title}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Band>
  );
}

/** C — Comparison table: SubscriptionPro vs buying every tool direct. */
function C() {
  const direct = ['Mixed resellers, unclear license origin', 'Full list price at every renewal', 'A card per vendor, a bill per tool', 'Logins and invoices across a dozen portals', 'Nothing back for recommending tools', 'Ticket queues at each vendor'];
  return (
    <Band>
      <Heading />
      <div className="relative mx-auto mt-14 max-w-[1180px]">
        {/* highlighted column */}
        <div className="absolute top-[-18px] right-0 bottom-[-18px] w-[38%] rounded-[24px] bg-white shadow-[0_30px_60px_-30px_rgba(109,27,98,0.45)]" />
        <div className="relative grid grid-cols-[26%_36%_38%] items-center text-[16px]">
          <span />
          <span className="px-8 pb-6 text-[15px] font-semibold tracking-wide text-black/45 uppercase">Buying direct</span>
          <span className="flex items-center gap-2 px-8 pb-6 text-[18px] font-bold">
            Subscription<span className="text-pink">Pro</span>
          </span>
          {features.map((f, i) => (
            <div key={f.title} className="contents">
              <span className={`py-6 pr-6 text-[19px] font-bold ${i ? 'border-t border-black/10' : ''}`}>{f.title}</span>
              <span className={`flex items-center gap-3 px-8 py-6 text-black/50 ${i ? 'border-t border-black/10' : ''}`}>
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-black/10 text-[13px] text-black/50">✕</span>
                {direct[i]}
              </span>
              <span className={`flex items-center gap-3 px-8 py-6 text-black ${i ? 'border-t border-black/5' : ''}`}>
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-green text-white">
                  <Check />
                </span>
                {f.points[0]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Band>
  );
}

/** D — Hub: three features either side of one central product screen. */
function D() {
  const Side = ({ f, i, right }: { f: Feature; i: number; right?: boolean }) => (
    <div className={`relative flex flex-col gap-2 rounded-[18px] bg-white/60 p-6 ${right ? 'text-left' : 'text-right'}`}>
      <span className={`absolute top-1/2 size-3 -translate-y-1/2 rounded-full border-[3px] border-apart bg-[#6d1b62] ${right ? '-left-[34px]' : '-right-[34px]'}`} />
      <span className="text-[13px] font-semibold text-[#6d1b62]">{pad(i)}</span>
      <h3 className="text-[20px] font-bold">{f.title}</h3>
      <p className="text-[14px] leading-[1.5] text-black/60">{f.headline}</p>
    </div>
  );
  return (
    <Band>
      <Heading />
      <div className="mt-14 grid grid-cols-[1fr_minmax(0,1.5fr)_1fr] items-center gap-[56px]">
        <div className="relative flex flex-col gap-5">
          <span className="absolute top-8 -right-[29px] bottom-8 w-px border-r-2 border-dashed border-[#6d1b62]/25" />
          {features.slice(0, 3).map((f, i) => (
            <Side key={f.title} f={f} i={i} />
          ))}
        </div>
        <div className="aspect-[4/3.3]">
          <FeatureVisual feature={features[3]} />
        </div>
        <div className="relative flex flex-col gap-5">
          <span className="absolute top-8 bottom-8 -left-[29px] w-px border-l-2 border-dashed border-[#6d1b62]/25" />
          {features.slice(3).map((f, i) => (
            <Side key={f.title} f={f} i={i + 3} right />
          ))}
        </div>
      </div>
    </Band>
  );
}

/** E — Card rail: a horizontal strip of tall cards, screen on top, copy below, arrows to browse. */
function E() {
  return (
    <Band className="!pr-0">
      <div className="flex items-end justify-between gap-10 pr-5">
        <Heading align="left" />
        <div className="flex gap-3">
          {['M15 6l-6 6 6 6', 'M9 6l6 6-6 6'].map((d, i) => (
            <span key={d} className={`flex size-14 items-center justify-center rounded-full ${i ? 'bg-black text-white' : 'bg-white text-black'}`}>
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d={d} />
              </svg>
            </span>
          ))}
        </div>
      </div>
      <div className="mt-12 -mr-[400px] flex gap-5">
        {features.map((f, i) => (
          <article key={f.title} className="flex w-[430px] shrink-0 flex-col overflow-hidden rounded-[22px] bg-white">
            <div className="h-[270px] p-3">
              <FeatureVisual feature={f} />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-7 pt-4">
              <span className="text-[13px] font-semibold text-[#6d1b62]">
                {pad(i)} / {pad(features.length - 1)}
              </span>
              <h3 className="text-[24px] font-bold">{f.title}</h3>
              <p className="text-[15px] leading-[1.5] text-black/65">{f.headline}</p>
            </div>
          </article>
        ))}
      </div>
    </Band>
  );
}

/** F — Index list: full-width rows with a big outlined number, copy, and a small screen thumbnail. */
function F() {
  return (
    <Band>
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-16">
        <div className="sticky top-10 self-start">
          <Heading align="left" />
        </div>
        <ol className="border-t border-black/15">
          {features.map((f, i) => (
            <li key={f.title} className="group grid grid-cols-[110px_minmax(0,1fr)_220px] items-center gap-8 border-b border-black/15 py-7">
              <span className="text-[64px] leading-none font-bold text-transparent [-webkit-text-stroke:1.5px_#6d1b62] group-first:text-[#6d1b62]">{pad(i)}</span>
              <div>
                <h3 className="text-[24px] font-bold">{f.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.5] text-black/65">{f.headline}</p>
              </div>
              <div className="aspect-[16/10] overflow-hidden rounded-[14px]">
                <FeatureVisual feature={f} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Band>
  );
}

export const apartOptions = [
  { code: 'A', name: 'Bento grid', note: 'Two large tiles with live screens and four compact text tiles — the whole story visible at once, no scrolling through steps.', C: A },
  { code: 'B', name: 'Horizontal accordion', note: 'Six slim columns with vertical titles; hover one and it opens into number, copy, points and its screen (try it).', C: B },
  { code: 'C', name: 'Comparison table', note: '“Buying direct” vs SubscriptionPro, row by row, with the SubscriptionPro column lifted on a white card.', C: C },
  { code: 'D', name: 'Hub', note: 'One product screen in the middle with three features on each side, linked by dotted rails.', C: D },
  { code: 'E', name: 'Card rail', note: 'Tall cards (screen on top, copy below) that run off the right edge, with arrows to browse.', C: E },
  { code: 'F', name: 'Index list', note: 'Heading stays on the left; the right is an editorial list with big outlined numbers and a small screen per row.', C: F },
];

export function ApartOptions() {
  return (
    <>
      {apartOptions.map(({ code, name, note, C }) => (
        <Option key={code} id={`apart-${code.toLowerCase()}`} code={code} name={name} note={note}>
          <C />
        </Option>
      ))}
    </>
  );
}
