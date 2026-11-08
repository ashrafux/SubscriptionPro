import { useState, type CSSProperties, type ReactNode } from 'react';
import { TiltBadge } from '../../components/Badge';
import { Option, users } from './Option';

/* Testimonials — same royal-blue band and grid lines, six new layouts. Sample quotes and names. */

type T = { quote: string; name: string; role: string; logo: string; photo?: string };
const items: T[] = [
  { quote: 'We moved 14 renewals onto SubscriptionPro and cut our yearly SaaS bill by almost a third. Finance finally has one invoice to reconcile.', name: 'Martin Iyooh', role: 'Tech Influencer, South Africa', logo: '/assets/products/clickup.svg', photo: users[1] },
  { quote: 'Same Google Workspace licenses, same support — just cheaper every single year.', name: 'Sara Lindqvist', role: 'Ops Lead, Nordlab', logo: '/assets/brands/google.png', photo: users[0] },
  { quote: 'The renewal alerts alone paid for themselves. No more surprise charges on a card nobody remembers.', name: 'Daniel Okafor', role: 'Founder, Brightdesk', logo: '/assets/brands/canva.png', photo: users[2] },
  { quote: 'Buying Adobe seats for a 40-person studio used to take a week of back-and-forth. Now it is two clicks.', name: 'Priya Raman', role: 'Studio Manager, Fold', logo: '/assets/brands/adobe-cc.png' },
  { quote: 'One dashboard for every tool, seat and renewal date. I cancelled three apps we were paying for twice.', name: 'Tom Becker', role: 'IT Admin, Hausmann', logo: '/assets/brands/notion.png' },
];

const gridBg: CSSProperties = {
  backgroundImage: 'linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px)',
  backgroundSize: '92px 92px',
  backgroundPosition: '-34px -22px',
};

function Band({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className="px-5 py-5">
      <div className={`mx-auto max-w-[1880px] overflow-hidden rounded-[20px] bg-testimonial px-5 py-24 ${className}`} style={gridBg}>
        <div className="mx-auto max-w-[1496px]">{children}</div>
      </div>
    </div>
  );
}

function Heading({ align = 'center' }: { align?: 'center' | 'left' }) {
  return (
    <div className={align === 'center' ? 'mx-auto flex max-w-[700px] flex-col items-center text-center' : 'flex max-w-[560px] flex-col items-start'}>
      <TiltBadge className="bg-mint" angle={-7}>Testimonials</TiltBadge>
      <h2 className="mt-2 text-[54px] leading-[1.12] font-bold tracking-[0.5px] text-white">Globally Brilliant always wants to save cost by us</h2>
    </div>
  );
}

const Avatar = ({ t, size = 48 }: { t: T; size?: number }) =>
  t.photo ? (
    <img src={t.photo} alt="" className="shrink-0 rounded-full object-cover" style={{ width: size, height: size }} />
  ) : (
    <span className="flex shrink-0 items-center justify-center rounded-full bg-[#e7ebff] font-poppins text-[15px] font-semibold text-royal" style={{ width: size, height: size }}>
      {t.name.split(' ').map((w) => w[0]).join('')}
    </span>
  );

function Person({ t, light = false }: { t: T; light?: boolean }) {
  return (
    <span className="flex items-center gap-4">
      <Avatar t={t} />
      <span className="flex flex-col">
        <span className={`font-poppins text-[16px] font-semibold ${light ? 'text-white' : ''}`}>{t.name}</span>
        <span className={`font-poppins text-[12px] ${light ? 'text-white/65' : 'text-muted'}`}>{t.role}</span>
      </span>
    </span>
  );
}

const Stars = ({ className = 'text-amber' }: { className?: string }) => (
  <span className={`flex gap-[2px] ${className}`} aria-label="5 out of 5">
    {Array.from({ length: 5 }, (_, i) => (
      <svg key={i} viewBox="0 0 20 20" className="size-[18px]" fill="currentColor">
        <path d="M10 1.8l2.5 5.2 5.7.8-4.1 4 1 5.7L10 14.8l-5.1 2.7 1-5.7-4.1-4 5.7-.8z" />
      </svg>
    ))}
  </span>
);

const Logo = ({ t, size = 34 }: { t: T; size?: number }) => <img src={t.logo} alt="" className="object-contain" style={{ width: size, height: size }} />;

/** A — Spotlight: one big quote, the others as a row of faces you click through. */
function A() {
  const [i, setI] = useState(0);
  const t = items[i];
  return (
    <Band>
      <Heading />
      <div className="mx-auto mt-14 max-w-[1080px] rounded-[28px] bg-white px-16 py-14">
        <div className="flex items-start justify-between">
          <span className="font-serif text-[120px] leading-[0.6] text-royal/15">“</span>
          <Logo t={t} size={44} />
        </div>
        <blockquote className="mt-2 text-[32px] leading-[1.35] font-medium tracking-[-0.01em] text-title">{t.quote}</blockquote>
        <div className="mt-10 flex items-center justify-between">
          <Person t={t} />
          <Stars />
        </div>
      </div>
      <div className="mt-10 flex justify-center gap-4">
        {items.map((x, k) => (
          <button key={k} onClick={() => setI(k)} className={`rounded-full p-[3px] transition ${k === i ? 'bg-white' : 'bg-white/20 opacity-70 hover:opacity-100'}`}>
            <Avatar t={x} size={52} />
          </button>
        ))}
      </div>
    </Band>
  );
}

/** B — Masonry: three columns of uneven cards plus a rating card. */
function B() {
  const Card = ({ t, big }: { t: T; big?: boolean }) => (
    <figure className="mb-6 break-inside-avoid rounded-[18px] bg-white p-8">
      <Logo t={t} size={30} />
      <blockquote className={`mt-5 leading-[1.5] text-copy ${big ? 'text-[22px] font-medium' : 'text-[17px]'}`}>{t.quote}</blockquote>
      <figcaption className="mt-7">
        <Person t={t} />
      </figcaption>
    </figure>
  );
  return (
    <Band>
      <Heading />
      <div className="mt-14 columns-3 gap-6">
        <Card t={items[0]} big />
        <Card t={items[1]} />
        <figure className="mb-6 break-inside-avoid rounded-[18px] bg-[#16289c] p-8 text-white">
          <p className="text-[64px] leading-none font-bold">4.9</p>
          <Stars className="mt-3 text-[#ffd166]" />
          <p className="mt-4 text-[16px] text-white/70">Average rating from 12,000+ reviews</p>
        </figure>
        <Card t={items[2]} />
        <Card t={items[3]} big />
        <Card t={items[4]} />
      </div>
    </Band>
  );
}

/** C — Two marquee rows drifting in opposite directions. */
function C() {
  const Row = ({ reverse }: { reverse?: boolean }) => (
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div className="flex w-max gap-6" style={{ animation: `t-marquee 46s linear infinite ${reverse ? 'reverse' : ''}` }}>
        {[...items, ...items].map((t, k) => (
          <figure key={k} className="flex w-[420px] shrink-0 flex-col justify-between gap-6 rounded-[18px] bg-white p-7">
            <blockquote className="text-[16px] leading-[1.55] text-copy">{t.quote}</blockquote>
            <figcaption className="flex items-center justify-between">
              <Person t={t} />
              <Logo t={t} size={28} />
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
  return (
    <Band className="!px-0">
      <style>{'@keyframes t-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}'}</style>
      <Heading />
      <div className="mt-14 flex flex-col gap-6">
        <Row />
        <Row reverse />
      </div>
    </Band>
  );
}

/** D — Split with a card deck: heading, rating and arrows left; a stack of tilted cards right. */
function D() {
  const [i, setI] = useState(0);
  const order = items.map((_, k) => items[(i + k) % items.length]);
  return (
    <Band>
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] items-center gap-16">
        <div>
          <Heading align="left" />
          <div className="mt-8 flex items-center gap-4 text-white">
            <Stars className="text-[#ffd166]" />
            <span className="text-[15px] text-white/75">4.9 average · 12,000+ reviews</span>
          </div>
          <div className="mt-10 flex gap-3">
            {[-1, 1].map((d) => (
              <button key={d} onClick={() => setI((i + d + items.length) % items.length)} className={`flex size-14 items-center justify-center rounded-full ${d > 0 ? 'bg-white text-royal' : 'border border-white/40 text-white'}`}>
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d={d > 0 ? 'M9 6l6 6-6 6' : 'M15 6l-6 6 6 6'} />
                </svg>
              </button>
            ))}
          </div>
        </div>
        <div className="relative h-[440px]">
          {order.slice(0, 3).reverse().map((t, k, arr) => {
            const depth = arr.length - 1 - k;
            return (
              <figure
                key={t.name}
                className="absolute inset-x-0 top-0 flex h-[380px] flex-col justify-between rounded-[24px] bg-white p-10 shadow-[0_30px_60px_-20px_rgba(10,20,90,0.5)] transition-transform duration-500"
                style={{ transform: `translate(${depth * 28}px, ${depth * 26}px) rotate(${depth * 3}deg) scale(${1 - depth * 0.04})`, opacity: 1 - depth * 0.25 }}
              >
                <div className="flex items-start justify-between">
                  <Stars />
                  <Logo t={t} size={40} />
                </div>
                <blockquote className="text-[24px] leading-[1.45] font-medium text-title">{t.quote}</blockquote>
                <Person t={t} />
              </figure>
            );
          })}
        </div>
      </div>
    </Band>
  );
}

/** E — Portrait cards: big photo (or initials tile) on top, short quote below; four across. */
function E() {
  const tint = ['#ffd8ec', '#d6f5e7', '#ffe9c7', '#dfe5ff'];
  return (
    <Band>
      <Heading />
      <div className="mt-14 grid grid-cols-4 gap-6">
        {items.slice(0, 4).map((t, k) => (
          <figure key={t.name} className="flex flex-col overflow-hidden rounded-[22px] bg-white">
            <div className="relative h-[230px]" style={{ background: tint[k] }}>
              {t.photo ? (
                <img src={t.photo} alt="" className="size-full object-cover" />
              ) : (
                <span className="flex size-full items-center justify-center font-poppins text-[64px] font-semibold text-royal/70">
                  {t.name.split(' ').map((w) => w[0]).join('')}
                </span>
              )}
              <span className="absolute bottom-4 left-4 flex size-12 items-center justify-center rounded-[14px] bg-white shadow">
                <Logo t={t} size={28} />
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-between gap-6 p-7">
              <blockquote className="text-[16px] leading-[1.55] text-copy">“{t.quote}”</blockquote>
              <figcaption>
                <p className="font-poppins text-[16px] font-semibold">{t.name}</p>
                <p className="font-poppins text-[12px] text-muted">{t.role}</p>
              </figcaption>
            </div>
          </figure>
        ))}
      </div>
    </Band>
  );
}

/** F — Chat thread: quotes as message bubbles from alternating sides, with a reply from SubscriptionPro. */
function F() {
  return (
    <Band>
      <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-16">
        <div className="self-center">
          <Heading align="left" />
          <p className="mt-6 max-w-[440px] text-[17px] leading-[1.5] text-white/70">Real messages from teams who moved their SaaS renewals to SubscriptionPro.</p>
        </div>
        <div className="flex flex-col gap-5 rounded-[28px] bg-white/10 p-8 backdrop-blur">
          {items.slice(0, 4).map((t, k) => {
            const right = k % 2 === 1;
            return (
              <div key={t.name} className={`flex items-end gap-3 ${right ? 'flex-row-reverse' : ''}`}>
                <Avatar t={t} size={40} />
                <div className={`max-w-[78%] rounded-[22px] px-6 py-4 ${right ? 'rounded-br-[6px] bg-[#16289c] text-white' : 'rounded-bl-[6px] bg-white text-copy'}`}>
                  <p className="text-[16px] leading-[1.5]">{t.quote}</p>
                  <p className={`mt-2 font-poppins text-[12px] ${right ? 'text-white/60' : 'text-muted'}`}>
                    {t.name} · {t.role}
                  </p>
                </div>
              </div>
            );
          })}
          <div className="flex items-center gap-2 self-start rounded-full bg-white/15 px-4 py-2 text-[13px] text-white/80">
            <span className="flex gap-1">
              {[0, 1, 2].map((d) => (
                <span key={d} className="size-[6px] animate-pulse rounded-full bg-white/80" style={{ animationDelay: `${d * 0.2}s` }} />
              ))}
            </span>
            1M+ more teams typing…
          </div>
        </div>
      </div>
    </Band>
  );
}

export const testimonialOptions = [
  { code: 'A', name: 'Spotlight', note: 'One large quote card at a time; the faces underneath switch it (click them).', C: A },
  { code: 'B', name: 'Masonry wall', note: 'Three columns of uneven cards plus a dark 4.9★ rating tile — feels like a busy review wall.', C: B },
  { code: 'C', name: 'Double marquee', note: 'Two rows of cards drifting in opposite directions, edges fading out. Always moving.', C: C },
  { code: 'D', name: 'Card deck', note: 'Heading, rating and arrows on the left; a stack of tilted cards on the right that flips with the arrows.', C: D },
  { code: 'E', name: 'Portrait cards', note: 'Four tall cards with a big photo on top and the product logo badge — more human, less text.', C: E },
  { code: 'F', name: 'Chat thread', note: 'Quotes as message bubbles from both sides in a frosted panel, ending with a “1M+ more typing…” chip.', C: F },
];

export function TestimonialOptions() {
  return (
    <>
      {testimonialOptions.map(({ code, name, note, C }) => (
        <Option key={code} id={`testimonials-${code.toLowerCase()}`} code={code} name={name} note={note}>
          <C />
        </Option>
      ))}
    </>
  );
}
